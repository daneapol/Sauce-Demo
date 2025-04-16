import { CartPage } from "./pages/CartPage";
import { CheckoutOverviewPage } from "./pages/CheckoutOverviewPage";
import { CheckoutYourInformationPage } from "./pages/CheckoutYourInformationPage";
import { InventoryPage } from "./pages/InventoryPage";
import { loginAs } from "./utils";

Feature('Web automation tests');

Scenario('Standard user removes one item before completing order', async ({ I }) => {
    await loginAs(I, 'standard_user', 'secret_sauce');

    I.seeInCurrentUrl('/inventory');
    const inventoryPage = new InventoryPage();
    await inventoryPage.addAllItemsToCart(I);
    const addedItems = inventoryPage.addedItems;
    I.assertEqual((addedItems.length).toString(), await inventoryPage.grabCartCount(I), 'Added items count match the count in cart');
    inventoryPage.goToCart(I);

    I.seeInCurrentUrl('/cart.html');
    const cartPage = new CartPage();
    cartPage.removeItemByNameFromCart(I, addedItems, 2);
    I.assertEqual((addedItems.length).toString(), await cartPage.grabCartCount(I), 'Items count after removing item #3 match the count in cart');
    cartPage.clickCheckoutButton(I);

    I.seeInCurrentUrl('/checkout-step-one.html');
    const checkoutYourInformationPage = new CheckoutYourInformationPage()
    checkoutYourInformationPage.submitInformation(I, 'Daniel', 'Apolonio', '1700');

    I.seeInCurrentUrl('/checkout-step-two.html');
    const checkoutOverviewPage = new CheckoutOverviewPage();
    checkoutOverviewPage.validateItems(I, addedItems);
    checkoutOverviewPage.clickFinishButton(I);

    I.seeInCurrentUrl('/checkout-complete.html');
    I.see('Thank you for your order!');
});
