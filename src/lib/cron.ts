import { CronJob } from 'cron'
import Sheetsu from "../sdk/sheetsu";
import {QuoteModel} from "../models/Quote";
import {DTO} from "../api/dto";
import Redis from "./redis";

const redis = new Redis()
const sheetsu = new Sheetsu()

function saveRandomQuoteEveryDay() {
    new CronJob('* * * * * *', () => {

        sheetsu.randomQuote()
            .then((quote) => {
                console.log('--- quote ---', quote)
                const quoteToSave = new QuoteModel(quote)
                return redis.saveQuote(quoteToSave)
            })
            .then(() => {
                return console.log(DTO.success.send())
            })
            .catch((err) => {
                console.log(err)
                return console.log(DTO.error.errorServer(err.msg, err.status))
            })

    }, null, true, 'America/Los_Angeles')
}