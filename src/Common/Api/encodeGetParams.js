const encodeGetParams = (p) =>
    Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join('='))
        .join('&');

export default encodeGetParams;
