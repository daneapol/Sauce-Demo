const { I } = inject();
import { CartPage } from '../pages/CartPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutYourInformationPage } from '../pages/CheckoutYourInformationPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ItemPage } from '../pages/ItemPage';
import { SortOptions } from '../types';
import { loginAs, toSortOptions } from '../utils';

const inventoryPage = new InventoryPage();
const itemPage = new ItemPage();
const cartPage = new CartPage();
const checkoutYourInformationPage = new CheckoutYourInformationPage();
const checkoutOverviewPage = new CheckoutOverviewPage();

Given('I log in as {string} with password {string}', async (username: string, password: string) => {
    await loginAs(I, username, password);
});

Then('I should be in the inventory page', () => {
    I.seeInCurrentUrl('/inventory');
});

When('I add all items to the cart', async () => {
    await inventoryPage.addAllItemsToCart(I);
});

Then('the number of items should match the cart count', async () => {
    I.assertEqual(
        (inventoryPage.addedItems.length).toString(),
        await inventoryPage.grabCartCount(I),
        'Added items count match the count in cart'
    );
});

When('I go to the cart page', () => {
    inventoryPage.goToCart(I);
});

Then('I should be in the cart page', () => {
    I.seeInCurrentUrl('/cart.html');
});

const ordinalWordToIndex: Record<string, number> = {
    'first': 0, 'second': 1, 'third': 2, 'fourth': 3, 'fifth': 4, 'sixth': 5   
};

When('I remove the {string} item from the cart', (ordinalWord: string) => {
    cartPage.removeItemByNameFromCart(I, inventoryPage.addedItems, ordinalWordToIndex[ordinalWord]);
});

When('I proceed to checkout', () => {
    cartPage.clickCheckoutButton(I);
});

Then('I should be in the checkout page with information fields', () => {
    I.seeInCurrentUrl('/checkout-step-one.html');
});

When('I submit customer information with first name {string}, last name {string}, and postal code {string}', (firstName: string, lastName: string, postalCode: string) => {
    checkoutYourInformationPage.submitInformation(I, firstName, lastName, postalCode);
});

Then('I should be in the checkout overview page', () => {
    I.seeInCurrentUrl('/checkout-step-two.html');
});

Then('the listed items should match the items in the cart', () => {
    checkoutOverviewPage.validateItems(I, inventoryPage.addedItems);
});

When('I finish the checkout', () => {
    checkoutOverviewPage.clickFinishButton(I);
});

Then('I should be in the confirmation page', () => {
    I.seeInCurrentUrl('/checkout-complete.html');
});

Then('I should see the order confirmation message', () => {
    I.see('Thank you for your order!');
});

When('I click on item {string}', (itemToCart: string) => {
    inventoryPage.clickItemName(I, itemToCart);
});

Then('I should be in the item page', () => {
    I.seeInCurrentUrl('/inventory-item.html');
});

When('I click on the \'Add to Cart\' button', async () => {
    await itemPage.clickAddToCartButton(I);
});

Then('I should see the item added to cart', () => {
    I.see(itemPage.itemNameText);
});

When('I sort items by {string} in {string} order', (by: string, order: string) => {
    inventoryPage.selectSortItemsOption(I, toSortOptions(by, order));
});

Then('the items should be sorted by {string} in {string} order', async (by: string, order: string) => {
    const actual = by === 'name'
        ? await inventoryPage.grabAllItemNames(I)
        : await inventoryPage.grabAllItemPrices(I);
    const expected = await inventoryPage.getExpectedSortedNamesOrPrices(I, toSortOptions(by, order));
    I.assertDeepEqual(actual, expected, `The items are sorted by ${by} in ${order} order as expected`);
});