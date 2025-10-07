/**
 * API Request Handler
 * Centralized request handling with server-side API routes
 */

import { handleAPIError } from './error-handler';

interface ConversionResponse {
    conversion_rate: number;
    conversion_result: number;
}

interface ExchangeRateResponse {
    result: 'success';
    conversion_rate: number;
    conversion_result?: number;
}

/**
 * Convert currency using server-side API route
 * @param fromCurrency - Source currency code (USD, GBP, EUR)
 * @param toCurrency - Target currency code (USD, GBP, EUR)
 * @param amount - Amount to convert
 * @returns Promise with conversion result
 */
export async function convertCurrency(
    fromCurrency: string,
    toCurrency: string,
    amount: number
): Promise<ExchangeRateResponse> {
    try {
        // Call our server-side API route instead of external API directly
        const url = `/api/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check for HTTP errors
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to convert currency');
        }

        // Parse JSON response
        const data: ConversionResponse = await response.json();

        // Return response in expected format
        return {
            result: 'success',
            conversion_rate: data.conversion_rate,
            conversion_result: data.conversion_result,
        } as ExchangeRateResponse;
    } catch (error) {
        // Pass to centralized error handler
        handleAPIError(error);
    }
}

/**
 * Get exchange rate between two currencies (without amount)
 * @param fromCurrency - Source currency code
 * @param toCurrency - Target currency code
 * @returns Promise with exchange rate
 */
export async function getExchangeRate(
    fromCurrency: string,
    toCurrency: string
): Promise<ExchangeRateResponse> {
    // Use convertCurrency with amount 1 to get the rate
    return convertCurrency(fromCurrency, toCurrency, 1);
}
