class BookList {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.headers = {
            'Content-Type': 'application/json'
        }
    }

    loadBooks(onSuccess) {
        const headers = { method: 'GET' }

        fancyFetch(this.baseUrl, headers, onSuccess);
    }

    createBook(book, onSuccess) {
        const headers = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(book)
        }

        fancyFetch(this.baseUrl, headers, onSuccess);
    }

    updateBook(book, onSuccess) {
        const headers = {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(book)
        }

        fancyFetch(this.baseUrl + book._id, headers, onSuccess);
    }

    deleteBook(book, onSuccess) {
        const headers = { method: 'DELETE' }

        fancyFetch(this.baseUrl + book._id, headers, onSuccess);
    }
}

