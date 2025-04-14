module.exports = {
    item: '.inventory_item',
    itemName: '.inventory_item_label > a',
    cartLink: '$shopping-cart-link',
    addToCartButton: 'button[name^=add-to-cart]',

    async addAllItemsToCart(I: CodeceptJS.I): Promise<string[]> {
        const count = await I.grabNumberOfVisibleElements(this.item);
        const addedItems: string[] = [];

        for (let i = 0; i < count; i++) {
            await within(locate(this.item).at(i + 1), async () => {
                I.click(this.addToCartButton);
                const itemName: string = await I.grabTextFrom(this.itemName);
                addedItems.push(itemName);
                console.info(`Clicked 'Add to Cart' button for item '${itemName}'`);
            });
        }

        return addedItems;
    },

    goToCart(I: CodeceptJS.I): void {
        I.click(this.cartLink);
    },

    async grabCartCount(I: CodeceptJS.I): Promise<string> {
        return await I.grabTextFrom(this.cartLink);
    }
};
