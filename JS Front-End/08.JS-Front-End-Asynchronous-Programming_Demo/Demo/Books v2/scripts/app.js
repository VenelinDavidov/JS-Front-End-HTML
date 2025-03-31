document.addEventListener('DOMContentLoaded', (e) => {

    const books = new BookList('http://localhost:3030/jsonstore/collections/books/');

    const booksTableEl = document.querySelector('table tbody');
    const formEl = document.querySelector('#create-update-book form');
    const formDialogButtonEl = document.querySelector('#create-update-book-toggle');

    formEl.dataset.status = 'create';

    function createEntry(book) {
        const entryEl = createElement('tr', { dataset: { id: book._id, title: book.title, author: book.author }}, booksTableEl);
        createElement('td', { textContent: book.title }, entryEl);
        createElement('td', { textContent: book.author }, entryEl);
        const actionsEl = createElement('td', { className: 'actions' }, entryEl);
        createElement('button', { className: 'edit', textContent: 'Edit', onclick: editEntryHandler }, actionsEl);
        createElement('button', { className: 'delete', textContent: 'Delete', onclick: deleteEntryHandler }, actionsEl);
    }

    function deleteEntry(bookId) {
        document.startViewTransition(() => {
            booksTableEl.querySelector(`tr[data-id="${bookId}"]`).remove();
        });
    }

    function editEntryHandler(e) {
        const entryEl = e.target.closest('tr');
        const inputs = formEl.querySelectorAll('input');
        const fields = [ entryEl.dataset.title, entryEl.dataset.author ];

        const dialogEl = document.querySelector('#create-update-book');
        dialogEl.querySelector('legend').textContent = 'Edit book';
        dialogEl.querySelector('button').textContent = 'Update';
        dialogEl.showModal();

        booksTableEl.querySelectorAll('.editing').forEach(el => el.classList.remove('editing'));
        formEl.dataset.status = 'edit';
        formEl.dataset.book = entryEl.dataset.id;
        
        inputs.forEach((field, index) => field.value = fields[index]);

        entryEl.classList.add('editing');
    }
    
    function deleteEntryHandler(e) {
        const entryEl = e.target.closest('tr');
        const book = { _id: entryEl.dataset.id, title: entryEl.dataset.title, author: entryEl.dataset.author }

        books.deleteBook(book, (response) => {
            deleteEntry(response._id);
        });

    }

    function reloadEntries() {
        booksTableEl.innerHTML = '';

        books.loadBooks((result) => {
            Object.values(result).forEach(createEntry);
        });  
    }

    formDialogButtonEl.addEventListener('click', (e) => {
        const dialogEl = document.querySelector('#create-update-book');
        const fields = dialogEl.querySelectorAll('input');

        fields.forEach(field => field.value = '');
        
        dialogEl.querySelector('form').dataset.book = '';
        dialogEl.querySelector('form').dataset.status = 'create';
        dialogEl.querySelector('legend').textContent = 'Add book';
        dialogEl.querySelector('button').textContent = 'Add';

        dialogEl.showModal();
    });

    formEl.addEventListener('submit', (e) => {
        e.preventDefault();

        const dialogEl = document.querySelector('#create-update-book');
        const status = formEl.dataset.status;
        const fields = formEl.querySelectorAll('input');

        const [ title, author ] = [...fields].map( field => field.value );

        if ( ! title || ! author ) return;

        if ( status === 'edit' ) {

            const bookId = formEl.dataset.book;
            const book = { _id: bookId, title: title, author: author }

            books.updateBook(book, (result) => {
                deleteEntry(book._id);
                createEntry(result);
            });

        } else {

            const book = { title, author };

            books.createBook(book, (response) => {
                document.startViewTransition(() => {
                    createEntry(response);
                })
            });
        }

        fields.forEach( field => field.value = '' );
        formEl.dataset.status = 'create';
        dialogEl.close();
    });

    reloadEntries();
});