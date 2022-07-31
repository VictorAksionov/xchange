import { isSameCurrency, isValidCurrency, isCurrencySupported} from '../../src/services/CurrencyService';

describe("Currency Service functions", () => {
    it("isSameCurrency: same currency are true ", () => {
        const result = isSameCurrency("USD", "USD");
        expect(result).toBeTruthy();
    });

    it("isSameCurrency: different currencies are false", () => {
        const result = isSameCurrency("USD", "EUR");
        expect(result).toBeFalsy();
    });

    it("isCurrencySupported: check supported currency", () => {
        const result = isCurrencySupported("ILS");
        expect(result).toBeTruthy();
    });

    it("isCurrencySupported: check unsupported currency", () => {
        const result = isCurrencySupported("BYN");
        expect(result).toBeFalsy();
    });

    it("isValidCurrency: currency quote validation", () => {
        const result = isValidCurrency("USD", "EUR");
        expect(result).toBeTruthy();
    });

    it("isValidCurrency: unsupported currency", () => {
        const result = isValidCurrency("USD", "BYN");
        expect(result).toBeFalsy();
    });

    it("isValidCurrency: same currency", () => {
        const result = isValidCurrency("USD", "USD");
        expect(result).toBeFalsy();
    });
});

