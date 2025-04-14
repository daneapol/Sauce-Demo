module.exports = {
    itemSelector: '$inventory-item',
    finishButton: 'Finish',

    waitForNumberOfItems(I: CodeceptJS.I, itemCount: number): void {
        I.waitNumberOfVisibleElements(this.itemSelector, itemCount);
    },

    clickFinishButton(I: CodeceptJS.I): void {
        I.click(this.finishButton);
        console.info(`Finished order`);
    }
};
