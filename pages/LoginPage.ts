module.exports = {
    fields: {
        username: 'Username',
        password: 'Password',
    },
    loginButton: 'Login',

    login(I: CodeceptJS.I, username: string, password: string) {
        I.fillField(this.fields.username, username);
        I.fillField(this.fields.password, password);
        I.click(this.loginButton);
    }
};
