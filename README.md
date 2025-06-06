# Sauce Demo Web Automation Tests

This project contains end-to-end automated tests for the [Sauce Demo](https://www.saucedemo.com/) web application using `CodeceptJS` and `.feature` files written in Gherkin language.


## Getting Started

### 1. Install [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/en)

### 2. Clone the repository
```
git clone https://github.com/daneapol/Sauce-Demo.git
cd Sauce-Demo
```

### 3. Install dependencies
```
npm install
```

### 4. Run the tests
```
npx codeceptjs run
```

### To run specific features
```
npx codeceptjs run --grep "Standard user removes one item before completing order"
npx codeceptjs run --grep "Problem user adds one item to cart"
npx codeceptjs run --grep "Standard user sorts items by name in ascending order"
npx codeceptjs run --grep "Login as locked out user should fail"
```
OR
```
npx codeceptjs run --features features/scenario_1.feature
npx codeceptjs run --features features/scenario_2.feature
npx codeceptjs run --features features/scenario_3.feature
npx codeceptjs run --features features/scenario_4.feature
```

### To examine results
Add `--verbose` to any command to see detailed logs. For example:
```
npx codeceptjs run --grep "Standard user removes one item before completing order" --verbose
npx codeceptjs run --features features/scenario_1.feature --verbose
```

For **failed tests**, screenshots are saved to the `/output/` directory.
