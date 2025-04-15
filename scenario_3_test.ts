import { InventoryPage } from "./pages/InventoryPage";
import { SortOptions } from "./types";
import { loginAs } from "./utils";

Feature('Web automation tests');

Scenario('Standard user sorts products by name', async ({ I }) => {
    await loginAs(I, 'standard_user', 'secret_sauce');

    I.seeInCurrentUrl('/inventory');
    const inventoryPage = new InventoryPage();
    const sortOptions: SortOptions = { by: 'name', ascending: true };
    inventoryPage.selectSortItemsOption(I, sortOptions);

    const isSortedByName = sortOptions.by === 'name';
    const namesOrPricesToBeValidated = isSortedByName ?
        await inventoryPage.grabAllItemNames(I) : await inventoryPage.grabAllItemPrices(I);
    const namesOrPricesExpectedOrder = await inventoryPage.getExpectedSortedNamesOrPrices(I, sortOptions);
    I.assertDeepEqual(namesOrPricesToBeValidated, namesOrPricesExpectedOrder, `Order of item ${isSortedByName ? 'names' : 'prices'} match the expected order after sorting`);
});
