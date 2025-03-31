function solve (stock, ordered) {
    const storage = {};

    for (let i = 0; i < stock.length; i+=2) {
      storage[stock[i]] = Number(stock[i + 1])
    }

    for (let i = 0; i < ordered.length; i+=2) {
        if (!storage.hasOwnProperty(ordered[i]) ) storage[ordered[i]] = 0;
        storage[ordered[i]] += Number(ordered[i + 1]);
    }

    for (const product in storage ){
        console.log(`${product} -> ${storage[product]}`);
    }
}

