import { InventoryPage } from "./pages/InventoryPage";
import { ItemPage } from "./pages/ItemPage";
import { loginAs } from "./utils";

Feature('Web automation tests');

Scenario('Problem user adds one item to cart', async ({ I }) => {
    await loginAs(I, 'problem_user', 'secret_sauce');

    I.seeInCurrentUrl('/inventory');
    const inventoryPage = new InventoryPage();
    const itemToCart = 'Test.allTheThings() T-Shirt (Red)';  // 'Sauce Labs Bolt T-Shirt'
    inventoryPage.clickItemName(I, itemToCart);

    I.seeInCurrentUrl('/inventory-item.html');
    const itemPage = new ItemPage();
    await itemPage.clickAddToCartButton(I);
    itemPage.goToCart(I);

    I.seeInCurrentUrl('/cart.html');
    console.info(`Target item to cart: '${itemToCart}' | Actual item added to cart: '${itemPage.itemNameText}'`);
    I.see(itemPage.itemNameText);
});
