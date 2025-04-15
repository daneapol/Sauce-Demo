import { SortOptions } from "../types";
import { BasePage } from "./BasePage";

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
    }

    clickItemName(I: CodeceptJS.I, itemName: string): void {
        I.click(itemName);
        console.info(`Clicked item '${itemName}'`);
    }

    selectSortItemsOption(I: CodeceptJS.I, sortOptions: SortOptions) {
        const { by, ascending } = sortOptions;
        const option = `${by.toUpperCase()}_${ascending ? 'ASCENDING' : 'DESCENDING'}`;
        I.selectOption(this.sortOptionSelect, this.SORT_OPTIONS[option]);
        console.info(`Sorting products by ${this.SORT_OPTIONS[option]}`);
    }

    async grabAllItemNames(I: CodeceptJS.I): Promise<string[]> {
        return await I.grabTextFromAll(this.itemName)
    }

    async grabAllItemPrices(I: CodeceptJS.I): Promise<number[]> {
        const itemPrices = await I.grabTextFromAll(this.itemPrice);
        return itemPrices.map(itemPrice => Number(itemPrice.replace(/[^0-9.]/g, '')));
    }

    async getExpectedSortedNamesOrPrices(I: CodeceptJS.I, sortOptions: SortOptions): Promise<string[] | number[]> {
        const { by, ascending } = sortOptions;

        if (by === 'name') {
            const sortedItemNames: string[] = (await this.grabAllItemNames(I)).sort();
            return ascending ? sortedItemNames : sortedItemNames.reverse();
        }

        const sortedPrices: number[] = (await this.grabAllItemPrices(I)).sort((a, b) => a - b);
        return ascending ? sortedPrices : sortedPrices.reverse();
    }
};
