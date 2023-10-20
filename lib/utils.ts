export function extractPrice(...elements: any) {
    for (const element of elements) {
        const priceText = element.text().trim();
        // Remove the dollar sign and cents
        // Remove the dollar sign
        // Get the part before the decimal point (dollars)
        if (priceText) {
            return priceText.replace('$', '');
        }
    }
    return '';
}

export function stockStatus(outOfStockStatus: any) {
    if (outOfStockStatus === 'currently unavailable.') {
        const outOfStock = true;
        return outOfStock;
    } else if (outOfStockStatus === 'temporarily out of stock.') {
        const outOfStock = true;
        return outOfStock;
    } else {
        return false;
    }
}


