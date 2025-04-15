import { loginAs } from "./utils";

Feature('Web automation tests');

Scenario('Login as locked out user should fail', async ({ I }) => {
    await loginAs(I, 'locked_out_user', 'secret_sauce');
});
