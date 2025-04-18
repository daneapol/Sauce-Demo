// Page Object for Login Page

export class LoginPage {
    protected fields = {
        username: 'Username',
        password: 'Password',
    };
    protected loginButton = 'Login';

    // Performs login
    login(I: CodeceptJS.I, username: string, password: string) {
        console.info('Logging in');
        I.fillField(this.fields.username, username);
        I.fillField(this.fields.password, password);
        I.click(this.loginButton);
    }
};