import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://www.saucedemo.com',
      show: true
    },
    ChaiWrapper: {
      require: 'codeceptjs-chai'
    }
  },
  include: {
    I: './steps_file',
    InventoryPage: './pages/InventoryPage',
    CartPage: './pages/CartPage',
    CheckoutYourInformationPage: './pages/CheckoutYourInformationPage',
    CheckoutOverviewPage: './pages/CheckoutOverviewPage'
  },
  plugins: {
    customLocator: {
      enabled: true,
      attribute: 'data-test'
    },
    '@codeceptjs/cucumber': {
      require: [
        './steps/gherkin_steps.ts'
      ]
    }
  },
  gherkin: {
    features: './features/*.feature',
    steps: [
      './steps/gherkin_steps.ts'
    ]
  },
  name: 'Sauce-Demo'
}