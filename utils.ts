import { LoginPage } from "./pages/LoginPage";

export const loginAs = async (I: CodeceptJS.I, username: string, password: string) => {
    I.amOnPage('/');
    const loginPage = new LoginPage();
    loginPage.login(I, username, password);
    I.seeInCurrentUrl('/inventory');
};