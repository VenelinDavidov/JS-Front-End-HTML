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

function logger(label, value) {
    const storageKey = label + ' Logging - ' + new Date().toISOString();
    const storageValue = JSON.stringify(value);

    console.log(storageKey, storageValue);

    localStorage.setItem(storageKey, storageValue);
}

function fancyFetch(url, headers, onSuccess, onError) {
    fetch(url, headers)
        .then(response => response.json())
        .then(result => {
            logger('Results', result);
            onSuccess(result);
        })
        .catch(error => {
            logger('Error', error);
            if ( onError ) onError(error);
        });
}