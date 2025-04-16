import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    removeItemByNameFromCart(I: CodeceptJS.I, addedItems: string[], index: number): void {
        const itemName: string = addedItems[index];
        I.click(locate('button').withText('Remove')
            .inside(locate(this.inventoryItem).withText(itemName)));
        addedItems.splice(index, 1);
        console.info(`Removed item '${itemName}' from cart`);
    }

    clickCheckoutButton(I: CodeceptJS.I): void {
        console.info(`Proceeding to Checkout`);
        I.click('Checkout');
    }
}