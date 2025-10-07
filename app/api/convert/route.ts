/**
 * Currency Conversion API Route
 * Server-side endpoint for secure API key handling
 */

import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.EXCHANGE_API_KEY;
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

interface ConversionResponse {
    result: string;
    conversion_rate: number;
    conversion_result: number;
}

interface ErrorResponse {
    error: string;
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const from = searchParams.get('from');
        const to = searchParams.get('to');
        const amount = searchParams.get('amount');

        // Validation
        if (!from || !to || !amount) {
            return NextResponse.json(
                { error: 'Missing required parameters: from, to, amount' },
                { status: 400 }
            );
        }

        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            return NextResponse.json(
                { error: 'Amount must be a positive number' },
                { status: 400 }
            );
        }

        if (!API_KEY) {
            return NextResponse.json(
                { error: 'API key not configured' },
                { status: 500 }
            );
        }

        // Make request to Exchange Rate API
        const url = `${BASE_URL}/${API_KEY}/pair/${from}/${to}/${numericAmount}`;

        const response = await fetch(url, {
            next: {
                revalidate: 3600 // Cache for 1 hour
            }
        });

        if (!response.ok) {
            throw new Error(`Exchange Rate API returned ${response.status}`);
        }

        const data: ConversionResponse = await response.json();

        if (data.result !== 'success') {
            return NextResponse.json(
                { error: 'Failed to convert currency' },
                { status: 500 }
            );
        }

        // Return only necessary data
        return NextResponse.json({
            conversion_rate: data.conversion_rate,
            conversion_result: data.conversion_result,
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
            },
        });

    } catch (error) {
        console.error('Currency conversion error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
