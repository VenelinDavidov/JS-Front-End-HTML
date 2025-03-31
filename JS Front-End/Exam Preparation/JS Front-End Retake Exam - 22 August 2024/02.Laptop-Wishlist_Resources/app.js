window.addEventListener("load", solve);

function solve() {

    function createElement(tag, properties, container) {
        const element = document.createElement(tag);

        Object.keys(properties).forEach(key => {
            if (typeof properties[key] === 'object') {
                Object.assign(element[key], properties[key]);
            } else {
                element[key] = properties[key];
            }
        });

        if (container) container.append(element);

        return element;
    }

    // Get DOM elements
    const inputs = [...document.querySelectorAll('form.laptop-info input')];
    const btnAddEl = document.querySelector('#add-btn');
    const btnClearEl = document.querySelector('#laptops-container button.clear');

    const listCheckEl = document.querySelector('#check-list');
    const listWishEl = document.querySelector('#laptops-list');

    // Add event listener to the Add button
    btnAddEl.addEventListener('click', addHandler);
    btnClearEl.addEventListener('click', clearHandler);


     function createEntry ({ model, storage, price}) {
         const entryEl = createElement('li', { className: 'laptop-item', dataset: { model, storage, price }}, listCheckEl);
         const articleEl = createElement('article', {}, entryEl);
         createElement('p', { textContent: model }, articleEl);
         createElement('p', { textContent: 'Memory: ' + storage + ' TB' }, articleEl);
         createElement('p', { textContent: 'Price: ' + price + '$' }, articleEl);
         createElement('button', { onclick: editHandler, className: 'btn edit', textContent: 'edit' }, entryEl);
         createElement('button', { onclick: confirmHandler, className: 'btn ok', textContent: 'ok' }, entryEl);
     }



    function addHandler(e) {
        e.preventDefault();

        const [ model, storage, price ] = inputs.map(field => field.value);
        if ( ! model || ! storage || ! price ) return;
        createEntry({ model, storage, price });
        inputs.forEach(field => field.value = '');
        btnAddEl.disabled = true;
    }





    function clearHandler(e) {

        e.preventDefault();
        listWishEl.innerHTML = '';
    }




    function editHandler(e) {
        e.preventDefault();

        const entryEl = e.target.closest('li');
        const values = Object.values(entryEl.dataset);
        inputs.forEach((field, index) => field.value = values[index]);
        entryEl.remove();
        btnAddEl.disabled = false;
    }





    function confirmHandler(e) {
        e.preventDefault();

        const entryEl = e.target.closest('li');
        entryEl.remove();
        entryEl.querySelectorAll('button').forEach(btn => btn.remove());
        listWishEl.append(entryEl);
        btnAddEl.disabled = false;
    }






}
  