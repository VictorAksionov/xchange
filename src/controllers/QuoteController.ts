import {Request, Response} from 'express';

import {getExchangeRateAndAmount} from '../services/QuoteService'
import {isValidCurrency} from '../services/CurrencyService'
import {ErrorMessage} from "../utils/ErrorMessage";
// @ts-ignore
import {exchange_url} from '../../config';


// TODO:wrap Request and Response in DTOs
export const getQuote = async (req: Request, res: Response) => {
    // validate currencies from request
    if (!isValidCurrency(<string>req.query.baseCurrency, <string>req.query.quoteCurrency)) {
        return res.status(400).json(
            ErrorMessage.E1
        );
    }
    return res.status(200).json(
        await getExchangeRateAndAmount(
            <string>req.query.baseCurrency,
            <string>req.query.quoteCurrency,
            Number(req.query.baseAmount)
        )
    );
}

export default {getQuote};