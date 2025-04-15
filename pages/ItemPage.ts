import { BasePage } from "./BasePage";

export class ItemPage extends BasePage {
    protected addToCartButton = '#add-to-cart';
    protected itemName = '$inventory-item-name';
    itemNameText: string;

    async clickAddToCartButton(I: CodeceptJS.I): Promise<void> {
        I.click(this.addToCartButton);
        this.itemNameText = await I.grabTextFrom(this.itemName);
        console.info(`Clicked 'Add to Cart' in item '${this.itemNameText}' page`);
    }
};
