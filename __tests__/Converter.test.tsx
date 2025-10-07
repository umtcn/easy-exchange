/**
 * Converter Component Unit Tests
 * Tests for currency conversion functionality
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Converter from '@/components/Converter/Converter';
import { convertCurrency } from '@/utils/request-handler';

// Mock the request handler
jest.mock('@/utils/request-handler', () => ({
    convertCurrency: jest.fn(),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        return <img {...props} />;
    },
}));

describe('Converter Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Initial Render', () => {
        it('should render the converter form with all elements', () => {
            render(<Converter />);

            // Check title
            expect(screen.getByText('Convert Fund')).toBeInTheDocument();

            // Check amount input
            const amountInput = screen.getByLabelText('Amount');
            expect(amountInput).toBeInTheDocument();
            expect(amountInput).toHaveValue(10); // Default value

            // Check From dropdown - should show USD initially
            const fromButton = screen.getByRole('button', { name: /from/i });
            expect(fromButton).toBeInTheDocument();
            expect(fromButton.textContent).toContain('USD');

            // Check To dropdown - should show GBP initially
            const toButton = screen.getByRole('button', { name: /to/i });
            expect(toButton).toBeInTheDocument();
            expect(toButton.textContent).toContain('GBP');

            // Check Convert button
            expect(screen.getByRole('button', { name: /convert/i })).toBeInTheDocument();
        });

        it('should display currency symbol based on selected from currency', () => {
            render(<Converter />);

            // USD is selected by default, should show $
            const currencySymbol = screen.getByText('$');
            expect(currencySymbol).toBeInTheDocument();
        });
    });

    describe('Amount Input', () => {
        it('should allow user to enter amount', async () => {
            const user = userEvent.setup();
            render(<Converter />);

            const amountInput = screen.getByLabelText('Amount') as HTMLInputElement;

            // Clear and type new amount
            await user.clear(amountInput);
            await user.type(amountInput, '100.50');

            expect(amountInput).toHaveValue(100.50);
        });

        it('should accept decimal values', async () => {
            const user = userEvent.setup();
            render(<Converter />);

            const amountInput = screen.getByLabelText('Amount') as HTMLInputElement;

            await user.clear(amountInput);
            await user.type(amountInput, '25.99');

            expect(amountInput).toHaveValue(25.99);
        });
    });

    describe('Currency Selection', () => {
        it('should allow selecting from currency', async () => {
            const user = userEvent.setup();
            render(<Converter />);

            // Click From dropdown button
            const fromButton = screen.getByRole('button', { name: /from/i });
            await user.click(fromButton);

            // Wait for dropdown to open and select EUR
            await waitFor(() => {
                const eurOptions = screen.getAllByText(/EUR - Euro/);
                expect(eurOptions.length).toBeGreaterThan(0);
            });

            const eurOptions = screen.getAllByText(/EUR - Euro/);
            await user.click(eurOptions[0]);

            // Check if currency symbol changed to €
            await waitFor(() => {
                expect(screen.getByText('€')).toBeInTheDocument();
            });
        });

        it('should allow selecting to currency', async () => {
            const user = userEvent.setup();
            render(<Converter />);

            // Click To dropdown button (second occurrence)
            const toButtons = screen.getAllByRole('button');
            const toButton = toButtons.find(button =>
                button.textContent?.includes('GBP - British Pound')
            );
            expect(toButton).toBeInTheDocument();
            await user.click(toButton!);

            // Wait for dropdown to open and select EUR
            await waitFor(() => {
                const allEurOptions = screen.getAllByText('EUR - Euro');
                expect(allEurOptions.length).toBeGreaterThan(0);
            });

            const eurOptions = screen.getAllByText('EUR - Euro');
            await user.click(eurOptions[eurOptions.length - 1]); // Click the last one (in To dropdown)

            // Check if EUR is now selected in To dropdown
            await waitFor(() => {
                const eurTexts = screen.getAllByText('EUR - Euro');
                expect(eurTexts.length).toBeGreaterThan(0);
            });
        });

        it('should exclude selected from currency from to dropdown options', async () => {
            const user = userEvent.setup();
            render(<Converter />);

            // Initially: From = USD, To = GBP
            // To dropdown should NOT show GBP (currently selected)
            // But SHOULD show USD (because it's different from To's current value)

            // Click To dropdown
            const toButton = screen.getByRole('button', { name: /to/i });
            await user.click(toButton);

            // Wait for dropdown to open
            await waitFor(() => {
                const dropdownOptions = screen.getAllByRole('button').filter(button =>
                    button.textContent?.includes('EUR - Euro')
                );
                expect(dropdownOptions.length).toBeGreaterThan(0);
            });

            // Check that USD IS available in To dropdown
            // (because excludeCurrency only excludes From currency, which is USD)
            // Actually, the logic excludes From currency FROM To dropdown
            // So if From=USD, To dropdown should NOT show USD
            const allButtons = screen.getAllByRole('button');
            const usdOptionsInToDropdown = allButtons.filter(button =>
                button.className.includes('dropdownOption') &&
                button.textContent?.includes('USD - US Dollar')
            );

            // USD should NOT be in To dropdown because From=USD
            expect(usdOptionsInToDropdown.length).toBe(0);
        });

        it('should automatically change to currency when from currency is changed to same value', async () => {
            const user = userEvent.setup();
            render(<Converter />);

            // Initially: From = USD, To = GBP
            const initialFromText = screen.getAllByText(/USD - US Dollar/)[0];
            expect(initialFromText).toBeInTheDocument();

            // Click From dropdown and change to GBP
            const fromButton = screen.getByRole('button', { name: /from/i });
            await user.click(fromButton);

            await waitFor(() => {
                const gbpOptions = screen.getAllByText(/GBP - British Pound/);
                expect(gbpOptions.length).toBeGreaterThan(0);
            });

            const gbpOptions = screen.getAllByText(/GBP - British Pound/);
            await user.click(gbpOptions[0]);

            // To should automatically change to a different currency (not GBP)
            await waitFor(() => {
                const fromButtons = screen.getAllByRole('button').filter(b => b.id === 'from-currency');
                const toButtons = screen.getAllByRole('button').filter(b => b.id === 'to-currency');

                const fromText = fromButtons[0]?.textContent;
                const toText = toButtons[0]?.textContent;

                // From and To should not be the same
                expect(fromText).not.toBe(toText);
            });
        });
    });

    describe('Currency Conversion', () => {
        it('should successfully convert currency when convert button is clicked', async () => {
            const user = userEvent.setup();

            // Mock successful API response
            const mockResponse = {
                conversion_result: 83.25,
                conversion_rate: 0.8325,
            };
            (convertCurrency as jest.Mock).mockResolvedValue(mockResponse);

            render(<Converter />);

            // Enter amount
            const amountInput = screen.getByLabelText('Amount') as HTMLInputElement;
            await user.clear(amountInput);
            await user.type(amountInput, '100');

            // Click Convert button
            const convertButton = screen.getByRole('button', { name: /convert/i });
            await user.click(convertButton);

            // Wait for API call
            await waitFor(() => {
                expect(convertCurrency).toHaveBeenCalledWith('USD', 'GBP', 100);
            });

            // Check if result is displayed
            await waitFor(() => {
                expect(screen.getByText(/100/)).toBeInTheDocument();
                expect(screen.getByText(/83.25/)).toBeInTheDocument();
            });
        });

        it('should show correct conversion result with currency names', async () => {
            const user = userEvent.setup();

            const mockResponse = {
                conversion_result: 50.00,
                conversion_rate: 0.5,
            };
            (convertCurrency as jest.Mock).mockResolvedValue(mockResponse);

            render(<Converter />);

            const amountInput = screen.getByLabelText('Amount') as HTMLInputElement;
            await user.clear(amountInput);
            await user.type(amountInput, '100');

            const convertButton = screen.getByRole('button', { name: /convert/i });
            await user.click(convertButton);

            await waitFor(() => {
                // Check that both currency names appear in the result
                const usDollarElements = screen.queryAllByText(/US Dollar/);
                const britishPoundElements = screen.queryAllByText(/British Pound/);
                expect(usDollarElements.length).toBeGreaterThan(0);
                expect(britishPoundElements.length).toBeGreaterThan(0);
            });
        });

        it('should handle API errors gracefully', async () => {
            const user = userEvent.setup();

            // Mock API error
            (convertCurrency as jest.Mock).mockRejectedValue(
                new Error('Network error')
            );

            render(<Converter />);

            const convertButton = screen.getByRole('button', { name: /convert/i });
            await user.click(convertButton);

            // Check if error message is displayed
            await waitFor(() => {
                expect(screen.getByText(/Network error/)).toBeInTheDocument();
            });
        });

        it('should validate amount is not zero', async () => {
            const user = userEvent.setup();
            render(<Converter />);

            const amountInput = screen.getByLabelText('Amount') as HTMLInputElement;
            await user.clear(amountInput);
            await user.type(amountInput, '0');

            const convertButton = screen.getByRole('button', { name: /convert/i });
            await user.click(convertButton);

            // Should show validation error
            await waitFor(() => {
                expect(screen.getByText(/enter a valid amount greater than zero/i)).toBeInTheDocument();
            });

            // API should not be called
            expect(convertCurrency).not.toHaveBeenCalled();
        });

        it('should validate amount is a positive number', async () => {
            const user = userEvent.setup();

            // Mock to ensure API is not called
            (convertCurrency as jest.Mock).mockResolvedValue({
                conversion_result: 0,
                conversion_rate: 0,
            });

            render(<Converter />);

            const amountInput = screen.getByLabelText('Amount') as HTMLInputElement;

            // HTML5 number input with min="0" should prevent negative values
            // But we can still test by setting value directly
            fireEvent.change(amountInput, { target: { value: '-10' } });

            const convertButton = screen.getByRole('button', { name: /convert/i });
            await user.click(convertButton);

            // Should either show validation error or not call API with negative value
            await waitFor(() => {
                const errorElement = screen.queryByText(/enter a valid amount greater than zero/i);
                if (errorElement) {
                    expect(errorElement).toBeInTheDocument();
                } else {
                    // If no error shown, API should not have been called with negative value
                    if ((convertCurrency as jest.Mock).mock.calls.length > 0) {
                        const callArgs = (convertCurrency as jest.Mock).mock.calls[0];
                        expect(callArgs[2]).toBeGreaterThan(0);
                    }
                }
            }, { timeout: 2000 });
        });
    });

    describe('Swap Currencies', () => {
        it('should swap from and to currencies when exchange icon is clicked', async () => {
            const user = userEvent.setup();
            render(<Converter />);

            // Initially: From = USD, To = GBP
            expect(screen.getByText('USD - US Dollar')).toBeInTheDocument();

            // Find and click the swap button by aria-label
            const swapButton = screen.getByRole('button', { name: /swap currencies/i });
            await user.click(swapButton);

            // After swap: From should show GBP
            await waitFor(() => {
                const buttons = screen.getAllByRole('button');
                const fromButton = buttons.find(btn =>
                    btn.id === 'from-currency' && btn.textContent?.includes('GBP')
                );
                expect(fromButton).toBeInTheDocument();
            });
        });

        it('should clear previous results when swapping currencies', async () => {
            const user = userEvent.setup();

            const mockResponse = {
                conversion_result: 83.25,
                conversion_rate: 0.8325,
            };
            (convertCurrency as jest.Mock).mockResolvedValue(mockResponse);

            render(<Converter />);

            // First convert
            const convertButton = screen.getByRole('button', { name: /convert/i });
            await user.click(convertButton);

            await waitFor(() => {
                expect(screen.getByText(/83.25/)).toBeInTheDocument();
            });

            // Now swap currencies
            const swapButton = screen.getByRole('button', { name: /swap currencies/i });
            await user.click(swapButton);

            // Result should be cleared
            await waitFor(() => {
                expect(screen.queryByText(/83.25/)).not.toBeInTheDocument();
            });
        });
    });

    describe('Loading State', () => {
        it('should show loading state during conversion', async () => {
            const user = userEvent.setup();

            // Mock delayed API response
            (convertCurrency as jest.Mock).mockImplementation(
                () => new Promise(resolve => setTimeout(() => resolve({
                    conversion_result: 50,
                    conversion_rate: 0.5,
                }), 1000))
            );

            render(<Converter />);

            const convertButton = screen.getByRole('button', { name: /convert/i });
            await user.click(convertButton);

            // Button should be disabled during loading
            expect(convertButton).toBeDisabled();
        });
    });

    describe('Currency Symbol Updates', () => {
        it('should update currency symbol when from currency changes', async () => {
            const user = userEvent.setup();
            render(<Converter />);

            // Initially USD ($)
            expect(screen.getByText('$')).toBeInTheDocument();

            // Change to EUR
            const fromButton = screen.getByText('USD - US Dollar').closest('button');
            await user.click(fromButton!);

            await waitFor(() => {
                const eurOptions = screen.getAllByText('EUR - Euro');
                expect(eurOptions.length).toBeGreaterThan(0);
            });

            const eurOptions = screen.getAllByText('EUR - Euro');
            await user.click(eurOptions[0]); // Click first EUR option in dropdown

            // Should show € symbol
            await waitFor(() => {
                expect(screen.getByText('€')).toBeInTheDocument();
            });
        });
    });
});
