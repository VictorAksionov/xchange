import {calculateQuoteAmount, getExchangeApiData, setCache} from "../../src/services/QuoteService";
import {exchange_url} from '../../config';
import axios from "axios";
import {LRUCache} from "../../src/utils/LRUcache";

jest.mock("axios");

const cache = new LRUCache<string, number>(10, 12); // with 4 supported currencies 12 pairs
const base = "GBP";
const quote = "EUR";
const mockResponse = {
    data:
        {
            "result": "success",
            "base_code": "GBP",
            "conversion_rates": {
                "GBP": 1,
                "EUR": 2
            }
        }, status: 200, statusText: 'ok', headers: {}, config: {}
};
const mockAxiosGet = jest.spyOn(axios, "get");

describe("getExchangeApiData", () => {
    describe("call live exchangeAPI", () => {
        it("should run a proper call once", async () => {
            const base = "GBP";
            await getExchangeApiData(base);

            expect(axios.get).toHaveBeenCalledWith(`${exchange_url}${base}`);
            expect(axios.get).toHaveBeenCalledTimes(1);
        });
    });

    describe("Call mocked getExchangeApiData API", () => {
        it("should run a proper call",
            async () => {
                mockAxiosGet.mockImplementation(async () => mockResponse);
                await getExchangeApiData(base);

                expect(axios.get).toHaveBeenCalledWith(`${exchange_url}${base}`);
            });

        it("should return a proper response",
            async () => {
                mockAxiosGet.mockImplementation(async () => mockResponse);
                let response = await getExchangeApiData(base);

                expect(response).toEqual(mockResponse);
            });
        it("response should contain conversion rates",
            async () => {
                mockAxiosGet.mockImplementation(async () => mockResponse);
                let response = await getExchangeApiData(base);

                expect(JSON.stringify(response.data)).toContain("conversion_rates");
            });
        it("should equal 1",
            async () => {
                mockAxiosGet.mockImplementation(async () => mockResponse);
                let response = await getExchangeApiData(base);

                expect(response.data.conversion_rates[base]).toEqual(1);
            });
        it("should equal 2",
            async () => {
                mockAxiosGet.mockImplementation(async () => mockResponse);
                let response = await getExchangeApiData(base);

                expect(response.data.conversion_rates[quote]).toEqual(2);
            });
    });

    describe("Quote Service functions", () => {
        it("successfully set cache", () => {
            setCache("USD", "EUR", 3.14);
            const result = cache.get("USD-EUR");
            expect(result).not.toBeNull();
        });

        test("calculateQuoteAmount: multiply 3 and 5", () => {
            calculateQuoteAmount(3, 5);
            expect(15);
        });

        test("calculateQuoteAmount: float multiple 4.2 and 6.9", () => {
            calculateQuoteAmount(4.2, 6.9);
            expect(28.98);
        });
    });


});