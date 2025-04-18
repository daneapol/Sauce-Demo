// This is the superclass for Page Objects past a successful login.
//   - Inventory Page       - Checkout: Your Information Page
//   - Item Page            - Checkout: Overview Page
//   - Cart Page
//
// This is not extended by Login Page since the cart and inventory items are not there.

export class BasePage {
    protected cartLink = '$shopping-cart-link';
    protected inventoryItem = '$inventory-item';
  
    // Clicks the cart icon at the upper right
    goToCart(I: CodeceptJS.I): void {
        I.click(this.cartLink);
    }

    // Grabs the number from the cart icon
    async grabCartCount(I: CodeceptJS.I): Promise<string> {
        return await I.grabTextFrom(this.cartLink);
    }
}