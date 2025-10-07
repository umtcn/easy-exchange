/**
 * Converter Component
 * Currency converter with Exchange Rate API integration
 */

'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ConvertIcon } from '../icons';
import { convertCurrency } from '@/utils/request-handler';
import { validateConversionInputs } from '@/utils/error-handler';
import { SUPPORTED_CURRENCIES, type CurrencyCode } from '@/utils/api-config';
import styles from './Converter.module.scss';

interface ConversionResult {
    amount: number;
    fromCurrency: CurrencyCode;
    toCurrency: CurrencyCode;
    convertedAmount: number;
    conversionRate: number;
    inverseRate: number;
}

// Currency flag mappings
const CURRENCY_FLAG_PATHS: Record<CurrencyCode, string> = {
    USD: '/icons/amerikan_flag.svg',
    GBP: '/icons/uk-flag-icon.svg',
    EUR: '/icons/eur-flag.svg',
};

// Currency symbols
const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
    USD: '$',
    GBP: '£',
    EUR: '€',
};

// Currency Dropdown Component
interface CurrencyDropdownProps {
    id: string;
    label: string;
    value: CurrencyCode;
    onChange: (value: CurrencyCode) => void;
    disabled?: boolean;
    excludeCurrency?: CurrencyCode;
}

function CurrencyDropdown({ id, label, value, onChange, disabled, excludeCurrency }: CurrencyDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (currency: CurrencyCode) => {
        onChange(currency);
        setIsOpen(false);
    };


    const selectedCurrency = SUPPORTED_CURRENCIES[value];

    return (
        <div className={styles.formGroup}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <div className={styles.customDropdown} ref={dropdownRef}>
                {/* Dropdown Button */}
                <button
                    type="button"
                    id={id}
                    className={`${styles.dropdownButton} ${isOpen ? styles.dropdownButtonOpen : ''}`}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                >
                    <Image
                        src={CURRENCY_FLAG_PATHS[value]}
                        alt={`${value} flag`}
                        width={24}
                        height={24}
                        className={styles.dropdownFlag}
                        priority
                        quality={100}
                    />
                    <span className={styles.dropdownText}>
                        {value} - {selectedCurrency.name}
                    </span>
                    <svg
                        className={`${styles.dropdownArrow} ${isOpen ? styles.dropdownArrowOpen : ''}`}
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 1L6 6L11 1"
                            stroke="#354E57"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                {/* Dropdown Options */}
                <div className={`${styles.dropdownOptions} ${isOpen ? styles.dropdownOptionsOpen : ''}`}>
                    {Object.entries(SUPPORTED_CURRENCIES)
                        .filter(([code]) => {
                            if (code === value) return false;
                            if (excludeCurrency && code === excludeCurrency) return false;
                            return true;
                        })
                        .map(([code, currency]) => (
                            <button
                                key={code}
                                type="button"
                                className={styles.dropdownOption}
                                onClick={() => handleSelect(code as CurrencyCode)}
                            >
                                <Image
                                    src={CURRENCY_FLAG_PATHS[code as CurrencyCode]}
                                    alt={`${code} flag`}
                                    width={24}
                                    height={24}
                                    className={styles.dropdownFlag}
                                    quality={100}
                                />
                                <span className={styles.dropdownText}>
                                    {code} - {currency.name}
                                </span>
                            </button>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default function Converter() {
    const [amount, setAmount] = useState<string>('10.00');
    const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('USD');
    const [toCurrency, setToCurrency] = useState<CurrencyCode>('GBP');
    const [result, setResult] = useState<ConversionResult | null>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (result && resultRef.current) {
            resultRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [result]);

    const handleFromCurrencyChange = (newFromCurrency: CurrencyCode) => {
        setFromCurrency(newFromCurrency);

        if (newFromCurrency === toCurrency) {
            const availableCurrency = (Object.keys(SUPPORTED_CURRENCIES) as CurrencyCode[])
                .find(code => code !== newFromCurrency);

            if (availableCurrency) {
                setToCurrency(availableCurrency);
            }
        }

        setResult(null);
        setError('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setResult(null);

        try {
            const numericAmount = parseFloat(amount);

            // Validate inputs
            validateConversionInputs(numericAmount, fromCurrency, toCurrency);

            setIsLoading(true);

            // Make API request
            const data = await convertCurrency(fromCurrency, toCurrency, numericAmount);

            // Set result
            setResult({
                amount: numericAmount,
                fromCurrency,
                toCurrency,
                convertedAmount: data.conversion_result || 0,
                conversionRate: data.conversion_rate,
                inverseRate: 1 / data.conversion_rate,
            });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setResult(null);
        setError('');
    };

    return (
        <section className={styles.converter}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <ConvertIcon className={styles.icon} />
                    <h2 className={styles.title}>Convert Fund</h2>
                </div>

                {/* Conversion Form */}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        {/* Amount Input */}
                        <div className={styles.formGroup}>
                            <label htmlFor="amount" className={styles.label}>
                                Amount
                            </label>
                            <div className={styles.inputWrapper}>
                                <span className={styles.currencySymbol}>
                                    {CURRENCY_SYMBOLS[fromCurrency]}
                                </span>
                                <input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className={styles.input}
                                    placeholder="10.00"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* From Currency - Custom Dropdown */}
                        <div className={styles.fromDropdownWrapper}>
                            <CurrencyDropdown
                                id="from-currency"
                                label="From"
                                value={fromCurrency}
                                onChange={handleFromCurrencyChange}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Exchange Icon */}
                        <div className={styles.exchangeIcon}>
                            <button
                                type="button"
                                onClick={swapCurrencies}
                                className={styles.swapButton}
                                disabled={isLoading}
                                aria-label="Swap currencies"
                            >
                                <Image
                                    src="/icons/exchance-icon.svg"
                                    alt="Swap currencies"
                                    width={48}
                                    height={48}
                                    priority
                                    quality={100}
                                />
                            </button>
                        </div>

                        {/* To Currency - Custom Dropdown */}
                        <CurrencyDropdown
                            id="to-currency"
                            label="To"
                            value={toCurrency}
                            onChange={setToCurrency}
                            disabled={isLoading}
                            excludeCurrency={fromCurrency}
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? 'Converting...' : 'Convert'}
                    </button>

                    {/* Conversion Result */}
                    {result && !error && (
                        <div className={styles.result} ref={resultRef}>
                            <p className={styles.resultAmount}>
                                {result.amount.toFixed(2)} {SUPPORTED_CURRENCIES[result.fromCurrency].name} =
                            </p>
                            <p className={styles.resultValue}>
                                {result.convertedAmount.toFixed(6)} {SUPPORTED_CURRENCIES[result.toCurrency].name}
                            </p>
                            <div className={styles.resultRates}>
                                <p className={styles.resultRate}>
                                    1 {result.fromCurrency} = {result.conversionRate.toFixed(6)} {result.toCurrency}
                                </p>
                                <p className={styles.resultRate}>
                                    1 {result.toCurrency} = {result.inverseRate.toFixed(6)} {result.fromCurrency}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && <div className={styles.error}>{error}</div>}
                </form>
            </div>
        </section>
    );
}
