import { BasePage } from "./BasePage";

// Page Object for Checkout: Overview Page

export class CheckoutOverviewPage extends BasePage {
    protected finishButton = 'Finish';

    // Checks if the name of each item from `addedItems` is seen in the overview
    validateItems(I: CodeceptJS.I, addedItems: string[]): void {
        I.seeNumberOfVisibleElements(this.inventoryItem, addedItems.length);
        for (const item of addedItems) {
            I.see(item);
        }
    }

    // Clicks 'Finish' button to finish the order
    clickFinishButton(I: CodeceptJS.I): void {
        console.info(`Finishing order`);
        I.click(this.finishButton);
    }
};
