const Base_URL = 'http://localhost:3030/jsonstore/movies';

const loadBtn = document.querySelector('#load-movies');
const addBtn = document.querySelector('#add-movie');
const editBtn = document.querySelector('#edit-movie');

const titleInput = document.querySelector('#title');
const directorInput = document.querySelector('#director');
const yearInput = document.querySelector('#year');

const movieList = document.querySelector('#movie-list');

loadBtn.addEventListener('click', handleLoadButtonClik);
addBtn.addEventListener('click', handleAddButtonClik);
editBtn.addEventListener('click', handleEditButtonClik);

let selectedRecordId = null;


  async function handleLoadButtonClik() {

    const recordResponse = await fetch(Base_URL);
    const recordData = await recordResponse.json();
    const movieArr = Object.values(recordData);


    movieList.innerHTML = '';

    movieArr.forEach(movieObj => {

        const divMoveEl = document.createElement('div');
        divMoveEl.classList.add('movie');

        const divContentEl = document.createElement('div');
        divContentEl.classList.add('content');


        const nameElement = document.createElement('p');
        nameElement.textContent = movieObj.title;

        const directorElement = document.createElement('p');
        directorElement.textContent = movieObj.director;

        const yearElement = document.createElement('p');
        yearElement.textContent = movieObj.year;



        //buttons

        const buttonsDivEl = document.createElement('div');
        buttonsDivEl.classList.add('buttons-container');

        const changeBtnEl = document.createElement('button');
        changeBtnEl.classList.add('change-btn');
        changeBtnEl.textContent = 'Change';

        const deleteBtnEl = document.createElement('button');
        deleteBtnEl.classList.add('delete-btn');
        deleteBtnEl.textContent = 'Delete';


        divContentEl.appendChild(nameElement);
        divContentEl.appendChild(directorElement);
        divContentEl.appendChild(yearElement);

        buttonsDivEl.appendChild(changeBtnEl);
        buttonsDivEl.appendChild(deleteBtnEl);


        divMoveEl.appendChild(divContentEl);
        divMoveEl.appendChild(buttonsDivEl);

        movieList.appendChild(divMoveEl);


        changeBtnEl.addEventListener('click', populateFormForEdit);
        deleteBtnEl.addEventListener('click', handleDeleteButtonClik);


        async function handleDeleteButtonClik() {

            await fetch(`${Base_URL}/${movieObj._id}`, {
                method: 'DELETE'
            });
            await handleLoadButtonClik();
        }



        function populateFormForEdit() {
            titleInput.value = movieObj.title;
            directorInput.value = movieObj.director;
            yearInput.value = movieObj.year;

            editBtn.disabled = false;
            addBtn.disabled = true;

            selectedRecordId = movieObj._id;
        }
    })
}





async function handleAddButtonClik(e) {

      e.preventDefault();

    const title = titleInput.value.trim();
    const director = directorInput.value.trim();
    const year = Number(yearInput.value.trim());

    if (!title || !director || yearInput.value.trim() === '' || isNaN(year)) {
        return;
    }


    const createRes = await fetch(Base_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, director, year})
    });

    titleInput.value = '';
    directorInput.value = '';
    yearInput.value = '';

    editBtn.disabled = true;
    addBtn.disabled = false;

    await handleLoadButtonClik();
}






async function handleEditButtonClik(e) {

      e.preventDefault();

      const title = titleInput.value.trim();
      const director = directorInput.value.trim();
      const year = Number(yearInput.value.trim());

    if (!title || !director || yearInput.value.trim() === '' || isNaN(year)) {
        return;
    }

      const createRes = await fetch(`${Base_URL}/${selectedRecordId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({title, director, year, _id: selectedRecordId})
      });

      titleInput.value = '';
      directorInput.value = '';
      yearInput.value = '';

      addBtn.disabled = false;
      editBtn.disabled = true;

      await handleLoadButtonClik();
}