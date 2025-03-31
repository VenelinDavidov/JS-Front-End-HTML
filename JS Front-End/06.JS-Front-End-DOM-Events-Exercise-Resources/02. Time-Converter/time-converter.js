document.addEventListener('DOMContentLoaded', solve);

function solve() {

    const values = {days: 86400, hours: 3600, minutes: 60, seconds: 1}

    const daysElement = document.querySelector('#days-input');
    const hoursElement = document.querySelector('#hours-input');
    const minutesElement = document.querySelector('#minutes-input');
    const secondsElement = document.querySelector('#seconds-input');

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', handleSubmitEvent)
    });

    function handleSubmitEvent(e) {
        e.preventDefault();

        const currentInputEl = e.target.querySelector('input[type="number"]');
        const currentValue = Number(currentInputEl.value);


        if (currentValue < 1) return;

        const key = currentInputEl.getAttribute('id').split('-input')[0];
        const multiplier = values[key];

        updateValues(currentValue * multiplier);

    }

    function updateValues(secondsAmount) {
        daysElement.value = Number(secondsAmount / values.days).toFixed(2);
        hoursElement.value = Number(secondsAmount / values.hours).toFixed(2);
        minutesElement.value = Number(secondsAmount / values.minutes).toFixed(2);
        secondsElement.value = Number(secondsAmount / values.seconds).toFixed(2);
    }
}