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


        if (!bloodType || !age || !gender) return;


        const li = document.createElement('li');

        const article = document.createElement('article');
        article.innerHTML = `
                <p>Blood Type: ${bloodType}</p>
                <p>Gender: ${gender}</p>
                <p>Age: ${age}</p>
                `;
        li.appendChild(article);


        const buttonsDivEl = document.createElement('div');
        buttonsDivEl.classList.add('buttons');

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';


        editBtn.addEventListener('click', () => {
            bloodInput.value = bloodType;
            ageInput.value = age;
            genderInput.value = gender;
            li.remove();
        });

        const confirmBtn = document.createElement('button');
        confirmBtn.classList.add('done-btn');
        confirmBtn.textContent = 'Confirm';

        confirmBtn.addEventListener('click', () => {
            li.remove();

            const confirmedLi = document.createElement('li');
            const confirmedArticle = article.cloneNode(true);
            const clearBtn = document.createElement('button');
            clearBtn.className = 'clear-btn';
            clearBtn.textContent = 'Clear';
            clearBtn.addEventListener('click', () => {
                confirmedLi.remove();
            });

            confirmedLi.appendChild(confirmedArticle);
            confirmedLi.appendChild(clearBtn);
            confirmedList.appendChild(confirmedLi);
        });

        buttonsDivEl.appendChild(editBtn);
        buttonsDivEl.appendChild(confirmBtn);
        li.appendChild(buttonsDivEl);

        registeredList.appendChild(li);


        bloodInput.value = '';
        ageInput.value = '';
        genderInput.value = '';
    }
}