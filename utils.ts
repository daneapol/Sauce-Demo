import { LoginPage } from "./pages/LoginPage";
import { SortOptions } from "./types";

export const loginAs = async (I: CodeceptJS.I, username: string, password: string) => {
    I.amOnPage('/');
    const loginPage = new LoginPage();
    loginPage.login(I, username, password);
    I.seeInCurrentUrl('/inventory');
};

export const toSortOptions = (by: string, order: string): SortOptions => {
    return {
        by: by as SortOptions['by'],
        order: order as SortOptions['order'],
    }
}