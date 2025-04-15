export class BasePage {
    protected cartLink = '$shopping-cart-link';
    protected inventoryItem = '$inventory-item';
  
    goToCart(I: CodeceptJS.I): void {
        I.click(this.cartLink);
    }

    async grabCartCount(I: CodeceptJS.I): Promise<string> {
        return await I.grabTextFrom(this.cartLink);
    }
}