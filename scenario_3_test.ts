import { InventoryPage } from "./pages/InventoryPage";
import { LoginPage } from "./pages/LoginPage";
import { SortOptions } from "./types";

Feature('Web automation tests');

Scenario('Standard user sorts products by name', async ({ I }) => {
    I.amOnPage('/');
    I.see('Swag Labs');
    const loginPage = new LoginPage();
    loginPage.login(I, 'standard_user', 'secret_sauce');

    I.seeInCurrentUrl('/inventory');
    const inventoryPage = new InventoryPage();
    const sortOptions: SortOptions = { by: 'name', ascending: true };
    inventoryPage.selectSortItemsOption(I, sortOptions);

    const namesOrPricesToBeValidated = sortOptions.by === 'name' ?
        await inventoryPage.grabAllItemNames(I) : await inventoryPage.grabAllItemPrices(I);
    const namesOrPricesExpectedOrder = await inventoryPage.getExpectedSortedNamesOrPrices(I, sortOptions);
    I.assertDeepEqual(namesOrPricesToBeValidated, namesOrPricesExpectedOrder);
});
