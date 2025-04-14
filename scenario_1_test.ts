const LoginPage = require('./pages/LoginPage');
const InventoryPage = require('./pages/InventoryPage');
const CartPage = require('./pages/CartPage');
const CheckoutStep1Page = require('./pages/CheckoutStep1Page');
const CheckoutStep2Page = require('./pages/CheckoutStep2Page');

Feature('Web automation tests');

Scenario('Standard user removes one item before completing order', async ({ I }) => {
    I.amOnPage('/');
    I.see('Swag Labs');
    LoginPage.login(I, 'standard_user', 'secret_sauce');

    I.seeInCurrentUrl('/inventory');
    const addedItems: string[] = await InventoryPage.addAllItemsToCart(I);
    I.assertEqual((addedItems.length).toString(), await InventoryPage.grabCartCount(I));
    InventoryPage.goToCart(I);

    I.seeInCurrentUrl('/cart.html');
    CartPage.removeItemByName(I, addedItems, 2);
    I.assertEqual((addedItems.length).toString(), await CartPage.grabCartCount(I));
    CartPage.clickCheckoutButton(I);

    I.seeInCurrentUrl('/checkout-step-one.html');
    CheckoutStep1Page.sendInformation(I, 'Daniel', 'Apolonio', '1700');

    I.seeInCurrentUrl('/checkout-step-two.html');
    CheckoutStep2Page.waitForNumberOfItems(I, addedItems.length);
    CheckoutStep2Page.clickFinishButton(I);

    I.seeInCurrentUrl('/checkout-complete.html');
    I.see('Thank you for your order!');
});
