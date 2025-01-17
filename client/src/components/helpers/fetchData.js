import wrapPromise from "./wrapPromise";

function fetchData(url) {
    const promise = fetch(url).then((r) => r.json()).then(data => data);

    return wrapPromise(promise)
};

export default fetchData;