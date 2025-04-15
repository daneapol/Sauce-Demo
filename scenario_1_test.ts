import { CartPage } from "./pages/CartPage";
import { CheckoutOverviewPage } from "./pages/CheckoutOverviewPage";
import { CheckoutYourInformationPage } from "./pages/CheckoutYourInformationPage";
import { InventoryPage } from "./pages/InventoryPage";
import { LoginPage } from "./pages/LoginPage";

Feature('Web automation tests');

Scenario('Standard user removes one item before completing order', async ({ I }) => {
    I.amOnPage('/');
    I.see('Swag Labs');
    const loginPage = new LoginPage();
    loginPage.login(I, 'standard_user', 'secret_sauce');

    I.seeInCurrentUrl('/inventory');
    const inventoryPage = new InventoryPage();
    await inventoryPage.addAllItemsToCart(I);
    const addedItems = inventoryPage.addedItems;
    I.assertEqual((addedItems.length).toString(), await inventoryPage.grabCartCount(I));
    inventoryPage.goToCart(I);

    I.seeInCurrentUrl('/cart.html');
    const cartPage = new CartPage();
    cartPage.removeItemByName(I, addedItems, 2);
    I.assertEqual((addedItems.length).toString(), await cartPage.grabCartCount(I));
    cartPage.clickCheckoutButton(I);

    I.seeInCurrentUrl('/checkout-step-one.html');
    const checkoutYourInformationPage = new CheckoutYourInformationPage()
    checkoutYourInformationPage.sendInformation(I, 'Daniel', 'Apolonio', '1700');

    I.seeInCurrentUrl('/checkout-step-two.html');
    const checkoutOverviewPage = new CheckoutOverviewPage();
    checkoutOverviewPage.validateItems(I, addedItems);
    checkoutOverviewPage.clickFinishButton(I);

    I.seeInCurrentUrl('/checkout-complete.html');
    I.see('Thank you for your order!');
});
