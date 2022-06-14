import {SupportedCurrency} from "../utils/SupportedCurrency";

export function isValidCurrency(base: string, quote: string): boolean {
    return (isCurrencySupported(base) && isCurrencySupported(quote) && !isSameCurrency(base, quote))
}

function isCurrencySupported(currency: string): boolean {
    return (currency in SupportedCurrency)
}

function isSameCurrency(currency: string, compareCurrency:string): boolean {
    return currency === compareCurrency;
}