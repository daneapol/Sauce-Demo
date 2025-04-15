export class LoginPage {
    protected fields = {
        username: 'Username',
        password: 'Password',
    };
    protected loginButton = 'Login';

    login(I: CodeceptJS.I, username: string, password: string) {
        I.fillField(this.fields.username, username);
        I.fillField(this.fields.password, password);
        I.click(this.loginButton);
    }
};