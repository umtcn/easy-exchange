# Converter Component - Test Documentation

## Test Coverage

This test suite provides comprehensive coverage of all core functionalities of the Converter component.

### ✅ Tested Features

#### 1. **Initial Render**
- ✓ Correct rendering of form elements
- ✓ Validation of default values (Amount: 10, From: USD, To: GBP)
- ✓ Currency symbol display

#### 2. **Amount Input**
- ✓ User can enter amount values
- ✓ Decimal numbers are accepted
- ✓ Input validation

#### 3. **Currency Selection**
- ✓ User can select currency from "From" dropdown
- ✓ User can select currency from "To" dropdown
- ✓ Selected currency in "From" dropdown is excluded from "To" dropdown
- ✓ Automatic currency change when same currency is selected in both dropdowns

#### 4. **Currency Conversion**
- ✓ API request is triggered when Convert button is clicked
- ✓ API response is processed correctly
- ✓ Correct values are displayed in the result section
- ✓ Currency names are displayed properly
- ✓ API errors are caught and displayed
- ✓ Zero value validation
- ✓ Positive number validation

#### 5. **Swap Currencies**
- ✓ From and To currencies are swapped when swap button is clicked
- ✓ Previous results are cleared after swap

#### 6. **Loading State**
- ✓ Button is disabled during API request
- ✓ "Converting..." text is displayed

#### 7. **Currency Symbol Updates**
- ✓ Symbol updates when From currency changes ($ → € → £)

## Test Statistics

```
Test Suites: 1 passed
Tests:       17 passed
Time:        ~3.3s
```

## Testing Technologies Used

- **Jest**: Test framework
- **React Testing Library**: Component testing
- **@testing-library/user-event**: Simulating user interactions
- **Mock Functions**: Mocking API calls

## Test Commands

```bash
# Run all tests
npm test

# Run only Converter tests
npm test Converter.test.tsx

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Important Notes

⚠️ **Next.js Image Component Warning**: During tests, a warning is displayed for the `priority` prop. This is due to the mocking of the Next.js Image component and does not affect test results.

## Future Improvements

- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Performance testing
- [ ] Accessibility (a11y) testing
- [ ] Visual regression testing

