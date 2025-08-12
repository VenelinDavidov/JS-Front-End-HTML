const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)

const DEBUG = false;
const slowMo = 500;
const interval = 500;
const timeout = 7000;


const mockData = {
  list: [
    {
      title: 'Inception',
      director: 'Christopher Nolan',
      year: '2010',
      _id: '1001',
    },
    {
      title: 'Barbie',
      director: 'Greta Gerwig',
      year: '2023',
      _id: '1002',
    },
    {
      title: 'Joker',
      director: 'Todd Phillips',
      year: '2019',
      _id: '1003',
    },
    {
      title: 'It',
      director: 'Andy Muschietti',
      year: '2017',
      _id: '1004',
    },
  ],
};


const endpoints = {
  catalog: '/jsonstore/movies',
  byId: (id) => `/jsonstore/movies/${id}`,
};

let browser;
let context;
let page;

describe('E2E tests', function () {
  // Setup
  this.timeout(DEBUG ? 120000 : timeout);
  before(
    async () =>
    (browser = await chromium.launch(
      DEBUG ? { headless: false, slowMo } : {}
    ))
  );
  after(async () => await browser.close());
  beforeEach(async () => {
    context = await browser.newContext();
    setupContext(context);
    page = await context.newPage();
  });
  afterEach(async () => {
    await page.close();
    await context.close();
  });

  describe('My Movie Watchlist Tests', () => {
    it('Load Movies', async () => {
      const data = mockData.list;
      const { get } = await handle(endpoints.catalog);
      get(data);

      await page.goto(host);
      await page.click('#load-movies', { timeout: interval });

      const list = await page.$$eval(`#movie-list .movie`, (movies) =>
        movies.map((el) => el.textContent.trim())
      );
      expect(list.length).to.equal(data.length);
    });

    it('Add Movie', async () => {
      const data = mockData.list[0];
      await page.goto(host);

      const { post } = await handle(endpoints.catalog);
      const { onRequest } = post();

      await page.waitForSelector('#form');
      await page.fill('#title', data.title, { timeout: interval });
      await page.fill('#director', data.director, { timeout: interval });
      await page.fill('#year', data.year, { timeout: interval });

      const [request] = await Promise.all([
        onRequest(),
        page.click('#add-movie', { timeout: interval }),
      ]);

      const postData = JSON.parse(request.postData());

      expect(postData.title).to.equal(data.title);
      expect(postData.director).to.equal(data.director);
      expect(postData.year).to.equal(data.year);

      const title = await page.$eval('#title', (el) => el.value, { timeout: interval });
      const director = await page.$eval('#director', (el) => el.value, { timeout: interval });
      const year = await page.$eval('#year', (el) => el.value, { timeout: interval });

      expect(title).to.equal('');
      expect(director).to.equal('');
      expect(year).to.equal('');;
    });

    it('Edit Movie (Has Input)', async () => {
      await page.goto(host);
      const data = mockData.list[0];
      await page.click('#load-movies', { timeout: interval });
      await page.click('#movie-list .movie .change-btn', { timeout: interval });

      const allInputs = await page.$$eval('#form input', (inputs) =>
        inputs.map((i) => i.value)
      );

      expect(allInputs[0]).to.equal(data.title);
      expect(allInputs[1]).to.equal(data.director);
      expect(allInputs[2]).to.equal(data.year);
    });

    it('Edit Movie (Makes API Call)', async () => {
      const data = mockData.list[0];
      await page.goto(host);
      const { put } = await handle(endpoints.byId(data._id));
      const { onRequest } = put({ id: data._id });

      await page.click('#load-movies', { timeout: interval });
      await page.click('#movie-list .movie .change-btn', { timeout: interval });

      await page.fill('#title', data.title + ' 2');

      const [request] = await Promise.all([
        onRequest(),
        page.click('#edit-movie'),
      ]);

      const postData = JSON.parse(request.postData());
      expect(postData.title).to.equal(data.title + ' 2');
    });

    it('Delete Movie', async () => {
      const data = mockData.list[0];
      await page.goto(host);
      const { del } = await handle(endpoints.byId(data._id));
      const { onResponse, isHandled } = del({ id: data._id });

      await page.click('#load-movies', { timeout: interval });
      await page.waitForSelector('#movie-list');
      await Promise.all([
        onResponse(),
        page.click('#movie-list .movie .delete-btn', { timeout: interval }),
      ]);

      expect(isHandled()).to.be.true;

    });
  });
});

async function setupContext(context) {
  // Catalog and Details
  await handleContext(context, endpoints.catalog, { get: mockData.list });
  await handleContext(context, endpoints.catalog, { post: mockData.list[0] });

  await handleContext(context, endpoints.byId('1001'), {
    get: mockData.list[0],
  });

  // Block external calls
  await context.route(
    (url) => url.href.slice(0, host.length) != host,
    (route) => {
      if (DEBUG) {
        console.log('Preventing external call to ' + route.request().url());
      }
      route.abort();
    }
  );
}

function handle(match, handlers) {
  return handleRaw.call(page, match, handlers);
}

function handleContext(context, match, handlers) {
  return handleRaw.call(context, match, handlers);
}

async function handleRaw(match, handlers) {
  const methodHandlers = {};
  const result = {
    get: (returns, options) => request('GET', returns, options),
    get2: (returns, options) => request('GET', returns, options),
    post: (returns, options) => request('POST', returns, options),
    put: (returns, options) => request('PUT', returns, options),
    patch: (returns, options) => request('PATCH', returns, options),
    del: (returns, options) => request('DELETE', returns, options),
    delete: (returns, options) => request('DELETE', returns, options),
  };

  const context = this;

  await context.route(urlPredicate, (route, request) => {
    if (DEBUG) {
      console.log('>>>', request.method(), request.url());
    }

    const handler = methodHandlers[request.method().toLowerCase()];
    if (handler == undefined) {
      route.continue();
    } else {
      handler(route, request);
    }
  }); ``

  if (handlers) {
    for (let method in handlers) {
      if (typeof handlers[method] == 'function') {
        handlers[method](result[method]);
      } else {
        result[method](handlers[method]);
      }
    }
  }

  return result;

  function request(method, returns, options) {
    let handled = false;

    methodHandlers[method.toLowerCase()] = (route, request) => {
      handled = true;
      route.fulfill(respond(returns, options));
    };

    return {
      onRequest: () => context.waitForRequest(urlPredicate),
      onResponse: () => context.waitForResponse(urlPredicate),
      isHandled: () => handled,
    };
  }

  function urlPredicate(current) {
    if (current instanceof URL) {
      return current.href.toLowerCase().includes(match.toLowerCase());
    } else {
      return current.url().toLowerCase().includes(match.toLowerCase());
    }
  }
}

function respond(data, options = {}) {
  options = Object.assign(
    {
      json: true,
      status: 200,
    },
    options
  );

  const headers = {
    'Access-Control-Allow-Origin': '*',
  };
  if (options.json) {
    headers['Content-Type'] = 'application/json';
    data = JSON.stringify(data);
  }

  return {
    status: options.status,
    headers,
    body: data,
  };
}
