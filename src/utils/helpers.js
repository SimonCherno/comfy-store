export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US',
        {
            style:'currency',
            currency: 'USD'
        }).format(price / 100);
}

export const getUniqueValues = (type, products) => {
    let unique = new Set(products.map((p)=> p[type]).flat());
    return ['all', ...unique];
}
