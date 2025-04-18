import { SortOptions } from "../types";
import { BasePage } from "./BasePage";

// Page Object for Inventory Page

export class InventoryPage extends BasePage {
    protected itemName = '.inventory_item_label > a';
    protected itemPrice = '$inventory-item-price';

    protected addToCartButton = 'button[name^=add-to-cart]';
    addedItems: string[] = [];

    protected sortOptionSelect = '$product-sort-container';
    
    SORT_OPTIONS = {
        NAME_ASCENDING: 'Name (A to Z)',
        NAME_DESCENDING: 'Name (Z to A)',
        PRICE_ASCENDING: 'Price (low to high)',
        PRICE_DESCENDING: 'Price (high to low)'
    };

    // Clicks all 'Add to Cart' buttons while retrieving all item names and adding each item name to `addedItems`
    async addAllItemsToCart(I: CodeceptJS.I): Promise<void> {
        const count = await I.grabNumberOfVisibleElements(this.inventoryItem);
        for (let i = 0; i < count; i++) {
            await within(locate(this.inventoryItem).at(i + 1), async () => {
                I.click(this.addToCartButton);
                const itemName: string = await I.grabTextFrom(this.itemName);
                this.addedItems.push(itemName);
                console.info(`Clicked 'Add to Cart' button for item '${itemName}'`);
            });
        }
        console.info(`Added '${count}' items to cart`);
    }

    // Clicks the link of the `itemName`
    clickItemName(I: CodeceptJS.I, itemName: string): void {
        I.click(itemName);
        console.info(`Clicked item '${itemName}'`);
    }

    // Sorts items based on provided `sortOptions`
    selectSortItemsOption(I: CodeceptJS.I, sortOptions: SortOptions) {
        const { by, order } = sortOptions;
        const option = `${by.toUpperCase()}_${order.toUpperCase()}`;
        I.selectOption(this.sortOptionSelect, this.SORT_OPTIONS[option]);
        console.info(`Sorted products by ${this.SORT_OPTIONS[option]}`);
    }

    // Grabs all item names in the inventory to be used for sorting
    async grabAllItemNames(I: CodeceptJS.I): Promise<string[]> {
        return await I.grabTextFromAll(this.itemName)
    }

    // Grabs all item prices in the inventory to be used for sorting
    async grabAllItemPrices(I: CodeceptJS.I): Promise<number[]> {
        const itemPrices = await I.grabTextFromAll(this.itemPrice);
        return itemPrices.map(itemPrice => Number(itemPrice.replace(/[^0-9.]/g, '')));
    }

    // Gets an array of the expected order from `sortOptions`
    async getExpectedSortedNamesOrPrices(I: CodeceptJS.I, sortOptions: SortOptions): Promise<string[] | number[]> {
        const { by, order } = sortOptions;
        const isAscendingOrder = order === 'ascending';

        console.info(`Sorting items by ${by} in ${order} order`);

        if (by === 'name') {
            const sortedItemNames: string[] = (await this.grabAllItemNames(I)).sort();
            return isAscendingOrder ? sortedItemNames : sortedItemNames.reverse();
        }

        const sortedPrices: number[] = (await this.grabAllItemPrices(I)).sort((a, b) => a - b);
        return isAscendingOrder ? sortedPrices : sortedPrices.reverse();
    }
};
