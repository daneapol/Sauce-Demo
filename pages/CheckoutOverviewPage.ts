import { BasePage } from "./BasePage";

export class CheckoutOverviewPage extends BasePage {
    protected finishButton = 'Finish';

    validateItems(I: CodeceptJS.I, addedItems: string[]): void {
        I.waitNumberOfVisibleElements(this.inventoryItem, addedItems.length);
        for (const item of addedItems) {
            I.see(item);
        }
    }

    clickFinishButton(I: CodeceptJS.I): void {
        I.click(this.finishButton);
        console.info(`Finished order`);
    }
};
