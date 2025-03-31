function solve() {

    const tableHeadRow = document.querySelectorAll('table thead tr');
    const tableBodyRows = document.querySelectorAll('table tbody tr');
    const outputElement = document.querySelector('#output');



    const chekedInputEl = [...tableHeadRow.children]
        .map((th, i) => ({el: th.children[0], name: th.children[0].getAttribute('name'), index: i}))
        .filter(object => object.el.checked);

    const outputData = [...tableBodyRows]
        .map(row => {

            return chekedInputEl.reduce((acc, input) => {
                acc[input.name] = row.children[input.index].textContent;

                return acc;
            }, {})

        });

    outputElement.value = JSON.stringify(outputData);
}

//
// function generateReport() {
//     const tableHeadElement = document.querySelectorAll('table thead th');
//     const tableRowElement = document.querySelectorAll('table tbody tr');
//     const outputElement = document.querySelector('#output');

//     const columns = [];
//     for (let tableHead of tableHeadElement) {
//         const checkBox = tableHead.querySelector('input[type=checkbox]');
//         columns.push({
//             name: tableHead.textContent.toLowerCase().trim(),
//             active: checkBox.checked,
//         });
//     }
//     let rows = [];
//     for (let tableRow of tableRowElement) {
//         const tableData = tableRow.querySelectorAll('td');
//         let row = {};
//         for (let i = 0; i < tableData.length; i++) {
//             if (columns[i].active) {
//                 row[columns[i].name] = tableData[i].textContent;
//             }
//         }
//         rows.push(row)
//     }
//     outputElement.value = JSON.stringify(rows, null, 2);
// }