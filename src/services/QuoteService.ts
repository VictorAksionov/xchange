import type {ExchangeRate} from "../models/ExchangeRate";
import {LRUCache} from "../utils/LRUcache";
import axios, {AxiosResponse} from "axios";
// @ts-ignore
import {exchange_url} from '../../config';


const cache = new LRUCache<string, number>(10, 12); // with 4 supported currencies 12 pairs


// TODO: implement better logging
export async function getExchangeRateAndAmount(baseCurrency: string, quoteCurrency: string, baseAmount: number): Promise<{ [key: string]: number }> {
    console.log(`Cached rates:`, cache.entries())
    console.log(`Attempt to get exchange rate from cache for: ${baseCurrency}-${quoteCurrency}`)
    let exchangeRate = cache.get(`${baseCurrency}-${quoteCurrency}`)
    if (!exchangeRate) {
        // third party api call for exchange data
        let exchangeApiResponse: AxiosResponse = await getExchangeApiData(baseCurrency);
        // third party api response data
        let exchangeApiRates: ExchangeRate = exchangeApiResponse.data;
        // conversion
        let exchangeRate = exchangeApiRates.conversion_rates[quoteCurrency];
        setCache(baseCurrency, quoteCurrency, exchangeRate);
        let quoteAmount = calculateQuoteAmount(baseAmount, exchangeRate);

        return {
            exchangeRate: Number(exchangeRate.toFixed(3)),
            quoteAmount: Number(Math.round(quoteAmount))
        }
    } else {
        console.log(`Using cached exchange rates:`)
        let quoteAmount = calculateQuoteAmount(baseAmount, exchangeRate);
        return {
            exchangeRate: Number(exchangeRate.toFixed(3)),
            quoteAmount: Number(Math.round(quoteAmount))
        }
    }
}

export function getExchangeApiData(baseCurrency: string): Promise<AxiosResponse> {
    //console.log(`Requested currencies not in cache. Using API quota for exchange-api:`);
    return axios.get(`${exchange_url}${baseCurrency}`);
}

export function calculateQuoteAmount(amount: number, rate: number): number {
    return amount * rate;
}

export function setCache(baseCurrency: string, quoteCurrency: string, exchangeRate: number): void {
    // console.log(`Set ${baseCurrency}-${quoteCurrency}, ${exchangeRate} in cache`);
    cache.set(`${baseCurrency}-${quoteCurrency}`, exchangeRate)
}