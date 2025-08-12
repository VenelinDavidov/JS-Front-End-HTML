const baseUrl = 'http://localhost:3030/jsonstore/movies';

const loadBtn = document.querySelector('#load-movies');
const addBtn = document.querySelector('#add-movie');
const editBtn = document.querySelector('#edit-movie');

const titleInput = document.querySelector('#title');
const directorInput = document.querySelector('#director');
const yearInput = document.querySelector('#year');

const movieList = document.querySelector('#movie-list');



let currentMovieId = null;


loadBtn.addEventListener('click', async () => {
    try {
        const res = await fetch(baseUrl);
        const data = await res.json();

        movieList.innerHTML = '';

        Object.entries(data).forEach(([id, movie]) => {
            const movieDiv = createMovieElement(id, movie);
            movieList.appendChild(movieDiv);
        });
    } catch (error) {
        console.error('Error loading movies:', error);
    }
});


addBtn.addEventListener('click', async () => {
    const title = titleInput.value.trim();
    const director = directorInput.value.trim();
    const year = yearInput.value.trim();

    if (!title || !director || !year) return;

    try {
        await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, director, year }),
        });

        clearForm();
        loadBtn.click(); // Reload movies
    } catch (error) {
        console.error('Error adding movie:', error);
    }
});




editBtn.addEventListener('click', async () => {
    if (!currentMovieId) return;

    const updatedMovie = {
        title: titleInput.value.trim(),
        director: directorInput.value.trim(),
        year: yearInput.value.trim()
    };

    if (!updatedMovie.title || !updatedMovie.director || !updatedMovie.year) return;

    try {
        await fetch(`${baseUrl}/${currentMovieId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMovie)
        });

        clearForm();
        toggleFormMode(false);
        loadBtn.click(); // Reload movies
    } catch (error) {
        console.error('Error editing movie:', error);
    }
});



function createMovieElement(id, movie) {
    const div = document.createElement('div');
    div.classList.add('movie');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    contentDiv.innerHTML = `
    <p>${movie.title}</p>
    <p>${movie.director}</p>
    <p>${movie.year}</p>
  `;

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('buttons-container');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('change-btn');
    editBtnEl.textContent = 'Edit';
    editBtnEl.addEventListener('click', () => {
        titleInput.value = movie.title;
        directorInput.value = movie.director;
        yearInput.value = movie.year;

        currentMovieId = id;
        toggleFormMode(true);
        div.remove(); // Remove from DOM
    });

    const deleteBtnEl = document.createElement('button');
    deleteBtnEl.classList.add('delete-btn');
    deleteBtnEl.textContent = 'Remove';
    deleteBtnEl.addEventListener('click', async () => {
        try {
            await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
            loadBtn.click(); // Reload movies
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    });

    btnContainer.appendChild(editBtnEl);
    btnContainer.appendChild(deleteBtnEl);

    div.appendChild(contentDiv);
    div.appendChild(btnContainer);

    return div;
}

function clearForm() {
    titleInput.value = '';
    directorInput.value = '';
    yearInput.value = '';
    currentMovieId = null;
}

function toggleFormMode(isEditing) {
    editBtn.disabled = !isEditing;
    addBtn.disabled = isEditing;
}
