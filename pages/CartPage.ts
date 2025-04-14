module.exports = {
    itemSelector: '$inventory-item',
    cartLink: 'a.shopping_cart_link',

    removeItemByName(I: CodeceptJS.I, addedItems: string[], index: number): void {
        const itemName: string = addedItems[index];
        I.click(locate('button').withText('Remove')
            .inside(locate(this.itemSelector).withText(itemName)));
        addedItems.splice(index, 1);
        console.info(`Removed from cart item '${itemName}'`);
    },

    async grabCartCount(I: CodeceptJS.I): Promise<string> {
        return I.grabTextFrom(this.cartLink);
    },

    clickCheckoutButton(I: CodeceptJS.I): void {
        console.info(`Proceeding to Checkout`);
        I.click('Checkout');
    }
}