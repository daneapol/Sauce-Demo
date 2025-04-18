import { BasePage } from "./BasePage";

// Page Object for Cart Page

export class CartPage extends BasePage {
    // Retrieves item name from `addedItems` array through the `index`, locates item name, and clicks 'Remove' button
    removeItemByNameFromCart(I: CodeceptJS.I, addedItems: string[], index: number): void {
        const itemName: string = addedItems[index];
        I.click(locate('button').withText('Remove')
            .inside(locate(this.inventoryItem).withText(itemName)));
        addedItems.splice(index, 1);
        console.info(`Removed item '${itemName}' from cart`);
    }

    // Clicks 'Checkout' button to proceed to checkout
    clickCheckoutButton(I: CodeceptJS.I): void {
        console.info(`Proceeding to Checkout`);
        I.click('Checkout');
    }
}