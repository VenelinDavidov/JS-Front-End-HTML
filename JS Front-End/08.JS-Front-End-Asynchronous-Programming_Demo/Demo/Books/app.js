function loadBooks(onSuccess) {
    fetch('http://localhost:3030/jsonstore/collections/books')
        .then(response => response.json())
        .then(onSuccess)
        .catch(error => console.error(error));
}

function createBook(book, onSuccess) {
    fetch('http://localhost:3030/jsonstore/collections/books/:id', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
        .then(response => response.json())
        .then(onSuccess)
        .catch(error => console.error(error));
}

function updateBook(book, onSuccess) {
    fetch(`http://localhost:3030/jsonstore/collections/books/${book._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
        .then(response => response.json())
        .then(onSuccess)
        .catch(error => console.error(error));
}

function deleteBook(book, onSuccess) {
    fetch(`http://localhost:3030/jsonstore/collections/books/${book._id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(onSuccess)
        .catch(error => console.error(error));
}


function createElement(tag, properties, container) {
    const element = document.createElement(tag);

    Object.keys(properties).forEach(property => {
        if ( typeof properties[property] === 'object' ) {
            Object.assign( element.dataset, properties[property] );
        } else {
            element[property] = properties[property];
        }
    });

    if ( container ) container.append(element);

    return element;
}

document.addEventListener('DOMContentLoaded', (e) => {

    const btnLoadAllEl = document.querySelector('#loadBooks');
    const booksTableEl = document.querySelector('table tbody');
    const formEl = document.querySelector('#form');
    const formSubmitEl = formEl.querySelector('button');

    formEl.dataset.status = 'create';

    function createEntry(book) {
        const entryEl = createElement('tr', { dataset: { id: book._id, title: book.title, author: book.author }}, booksTableEl);
        createElement('td', { textContent: book.title }, entryEl);
        createElement('td', { textContent: book.author }, entryEl);
        const actionsEl = createElement('td', { className: 'actions' }, entryEl);
        createElement('button', { textContent: 'Edit', onclick: editEntryHandler }, actionsEl);
        createElement('button', { textContent: 'Delete', onclick: deleteEntryHandler }, actionsEl);
    }

    function deleteEntry(bookId) {
        booksTableEl.querySelector(`tr[data-id="${bookId}"]`).remove();
    }

    function editEntryHandler(e) {
        const entryEl = e.target.closest('tr');
        const inputs = formEl.querySelectorAll('input');
        const fields = [ entryEl.dataset.title, entryEl.dataset.author ];

        booksTableEl.querySelectorAll('.editing').forEach(el => el.classList.remove('editing'));
        formEl.dataset.status = 'edit';
        formEl.dataset.book = entryEl.dataset.id;
        
        inputs.forEach((field, index) => field.value = fields[index]);

        entryEl.classList.add('editing');
    }
    
    function deleteEntryHandler(e) {
        const entryEl = e.target.closest('tr');
        const book = { _id: entryEl.dataset.id, title: entryEl.dataset.title, author: entryEl.dataset.author }

        deleteBook(book, (response) => {
            deleteEntry(response._id);
        });

    }

    function reloadEntries() {

        booksTableEl.innerHTML = '';

        loadBooks((result) => {
            Object.values(result).forEach(createEntry);
        });  
    }

    function formSubmit(e) {
        e.preventDefault();

        const status = formEl.dataset.status;
        const fields = formEl.querySelectorAll('input');

        const [ title, author ] = [...fields].map( field => field.value );

        if ( ! title || ! author ) return;

        if ( status === 'edit' ) {

            const bookId = formEl.dataset.book;
            const book = { _id: bookId, title: title, author: author }

            updateBook(book, (result) => {
                deleteEntry(book._id);
                createEntry(result);
            });

        } else {

            const book = { title, author };

            createBook(book, (response) => {
                createEntry(response);
            });

        }

        fields.forEach( field => field.value = '' );
        formEl.dataset.status = 'create';
    }

    formSubmitEl.addEventListener('click', formSubmit);
    btnLoadAllEl.addEventListener('click', reloadEntries);

    btnLoadAllEl.click();

    // createBook(newBook, (result) => console.log(result));
    // updateBook(newBook, (result) => console.log(result));
    // deleteBook(book1, (result) => console.log(result));
});