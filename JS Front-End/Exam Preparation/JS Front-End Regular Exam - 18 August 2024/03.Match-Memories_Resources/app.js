function loadMatches(baseUrl, onSuccess) {
    fetch(baseUrl)
        .then(response => response.json())
        .then(onSuccess)
        .catch(error => console.error('Error: ', error));
}

function createMatch(baseUrl, match, onSuccess) {
    fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(match)
    })
        .then(response => response.json())
        .then(onSuccess)
        .catch(error => console.error('Error: ', error));
}

function updateMatch(baseUrl, match, onSuccess) {
    fetch(baseUrl + match._id, {
        method: 'PUT',
        body: JSON.stringify(match)
    })
        .then(response => response.json())
        .then(onSuccess)
        .catch(error => console.error('Error: ', error));
}

function deleteMatch(baseUrl, match, onSuccess) {
    fetch(baseUrl + match._id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(onSuccess)
        .catch(error => console.error('Error: ', error));
}




function createElement(tag, properties, container) {
    const element = document.createElement(tag)

    Object.keys(properties).forEach(key => {
        if ( typeof properties[key] === 'object' ) {
            element[key] ??= {};
            Object.assign(element[key], properties[key]);
        } else {
            element[key] = properties[key];
        }
    });

    if ( container ) container.append(element);

    return element;
}



function init() {

    const baseUrl = 'http://localhost:3030/jsonstore/matches/';
    const fields = [...document.querySelectorAll('#form form input[type="text"]')];
    const btnAddMatchEl = document.querySelector('#add-match');
    const btnEditMatchEl = document.querySelector('#edit-match');
    const listEl = document.querySelector('#list');

    btnAddMatchEl.addEventListener('click', createHandler);
    btnEditMatchEl.addEventListener('click', updateHandler);



    function loadEntries() {
        listEl.innerHTML = '';
        loadMatches(baseUrl, (result) => {
            Object.values(result).forEach(createEntry);
        });
    }

    function createEntry({ host, score, guest, _id }) {
        const entryEl = createElement('li', { className: 'match', dataset: { host, score, guest, _id }}, listEl);
        const infoEl = createElement('div', { className: 'info' }, entryEl);
        createElement('p', { textContent: host }, infoEl);
        createElement('p', { textContent: score }, infoEl);
        createElement('p', { textContent: guest }, infoEl);
        const buttonsEl = createElement('div', { className: 'btn-wrapper' }, entryEl);
        createElement('button', { className: 'change-btn', textContent: 'Change', onclick: changeHandler }, buttonsEl);
        createElement('button', { className: 'delete-btn', textContent: 'Delete', onclick: deleteHandler }, buttonsEl);
    }

    function deleteEntry({ host, score, guest, _id }) {
        listEl.querySelector(`li[data-_id="${_id}"]`).remove();
    }



    function createHandler(e) {
        e.preventDefault();

        const [ host, score, guest ] = fields.map(field => field.value);
        if ( ! host || ! score || ! guest ) return;
        const match = { host, score, guest };
        createMatch(baseUrl, match, (result) => {
            createEntry(result);
        });
        fields.forEach(field => field.value = '');
    }


    function updateHandler(e) {
        e.preventDefault();

        const [ host, score, guest ] = fields.map(field => field.value);
        if ( ! host || ! score || ! guest ) return;
        const entryEl = listEl.querySelector('li.active');
        const match = { host, score, guest, _id: entryEl.dataset._id };

        updateMatch(baseUrl, match, (result) => {
            loadEntries();
            fields.forEach(field => field.value = '');
            btnAddMatchEl.disabled = false;
            btnEditMatchEl.disabled = true;
        });
    }





    function changeHandler(e) {
        const entryEl = e.target.closest('li');
        const values = Object.values(entryEl.dataset);

        entryEl.classList.add('active');
        fields.forEach((field, index) => field.value = values[index]);

        btnAddMatchEl.disabled = true;
        btnEditMatchEl.disabled = false;
    }




    function deleteHandler(e) {
        const entryEl = e.target.closest('li');
        console.log(entryEl);

        const match = Object.assign({}, entryEl.dataset);
        deleteMatch(baseUrl, match, (result) => {
            deleteEntry(result);
        });
    }


    loadEntries();


    createElement('div', { class: 'testing', kokoSecretStore: { stuff: 'lazy'}}, document.querySelector('body'));

}

document.addEventListener('DOMContentLoaded', init);