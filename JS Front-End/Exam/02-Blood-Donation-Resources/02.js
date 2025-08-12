window.addEventListener("load", solve);

function solve() {

    const bloodInput = document.querySelector('#type');
    const ageInput = document.querySelector('#age');
    const genderInput = document.querySelector('#gender');

    const registerBtn = document.querySelector('#register-btn');

    const registeredList = document.querySelector('#registered-list');
    const confirmedList = document.querySelector('#confirmed-list');

    registerBtn.addEventListener('click', inRegister);

    function inRegister(event) {
        event.preventDefault();

        const bloodType = bloodInput.value.trim();
        const age = ageInput.value.trim();
        const gender = genderInput.value;


        if (!bloodType || !age || !gender){
            return;
        }

        const liEl = document.createElement('li');
        const articleEl = document.createElement('article');

        const pBloodType = document.createElement('p');
        pBloodType.textContent = `Blood Type: ${bloodType}`;

        const pGenderEl = document.createElement('p');
        pGenderEl.textContent = `Gender: ${gender}`;

        const pAgeEl = document.createElement('p');
        pAgeEl.textContent = `Age: ${age}`;


        // Buttons
        const buttonsDivEl = document.createElement('div');
        buttonsDivEl.classList.add('buttons');

        const editButtonEl = document.createElement('button');
        editButtonEl.classList.add('edit-btn');
        editButtonEl.textContent = 'Edit';


        const doneButtonEl = document.createElement('button');
        doneButtonEl.classList.add('done-btn');
        doneButtonEl.textContent = 'Confirm';


        articleEl.appendChild(pBloodType);
        articleEl.appendChild(pGenderEl);
        articleEl.appendChild(pAgeEl);

        buttonsDivEl.appendChild(editButtonEl);
        buttonsDivEl.appendChild(doneButtonEl);

        liEl.appendChild(articleEl);
        liEl.appendChild(buttonsDivEl);

        registeredList.appendChild(liEl);

        bloodInput.value = '';
        ageInput.value = '';
        genderInput.value = '';


        editButtonEl.addEventListener('click', handleEditBtnClick);
        doneButtonEl.addEventListener('click', handleDoneBtnClick);



        function handleEditBtnClick() {
            bloodInput = bloodType;
            ageInput = age;
            genderInput = gender;

            liEl.remove();
        }


        function handleDoneBtnClick() {

            confirmedList.appendChild(liEl);
            editButtonEl.remove();
            doneButtonEl.remove();

            const clearButtonEl = document.createElement('button');
            clearButtonEl.classList.add('clear-btn');
            clearButtonEl.textContent = 'Clear';

            liEl.appendChild(clearButtonEl);

            clearButtonEl.addEventListener('click', handleClearBtnClick);

            function handleClearBtnClick() {

                liEl.remove();
            }
        }
    }
}