# Simplex currency exchange API

## Dependencies

* Node.js pre-installed

root folder `\..\simplex_xchange`

run ` npm install typescript ts-node express @types/express morgan @types/morgan axios @types/axios nodemon jest @types/jest ts-jest supertest`

* TypeScript: TypeScript compiler with static set type definitions
* Ts-node: run and configure Typescript execution environments
* Express: Node.js webapp framework for setting and managing web-based server
* @types/express: Type definitions for Express
* Morgan: A Node.js HTTP request logger
* @types/morgan: Type definitions for Morgan
* Axios: A Node.js promise-based HTTP client library for Node.js, for sending HTTP requests to query and consume
  resources from APIs.
* @types/Axios: Type definitions for Axios.
* Nodemon: A server utility library, in editor changes monitoring,restarts the server whenever code changes are
  detected.
* Jest a testing framework 
* Type definitions for jest
* ts-jest jest support for typescript

## Usage

* instead of v4 version latest v6 version was used for **exchange-api**
* `config.ts` `api_key` value can be modified if necessary
* In terminal from destination folder `\..\simplex_xchange` `npm run dev`
* server runs on `localhost:6060` by default - can be changed in `config.ts`
* In browser/postman `http://localhost:6060/quote?baseCurrency=EUR&quoteCurrency=ILS&baseAmount=1000`
* `npm test` to run a test package

## API request interface

Supported currencies are `USD`, `EUR`, `GBP` and `ILS`. API calculates the total amount expected
in the quoteCurrency accordingly to the exchange rate provided by the Third party service.

### GET /quote?baseCurrency=EUR&quoteCurrency=ILS&baseAmount=1000

* Query parameter: type // Description
* `baseCurrency: string`, // 3 letters ISO currency code. Currency to convert from.
* `quoteCurrency: string` // 3 letters ISO currency code. Currency to convert to.
* `baseAmount: integer` // The amount to convert in cents. Example: 100 (1 USD)

## API response interface

Response body: JSON with the following properties

* `exchangeRate: decimal` // the offered exchange rate. Up to 3 decimal digits.
* `quoteAmount: integer` // the expected amount in cents. You can choose the rounding policy.

## Third party exchange provider

Exchange rates are fetched from https://exchangerate-api.com. Issuing a GET request to the
following URL will return the latest exchange rates for several currencies when the base
currency USD: https://api.exchangerate-api.com/v4/latest/USD (latest v6 version was used instead)

## Caching

For performance and cost reasons exchange rates are to be cached. Please implement LRU
Cache algorithm. For the purpose of the exercise use in memory storage.
___

*2022, by Victor Aksionov*
