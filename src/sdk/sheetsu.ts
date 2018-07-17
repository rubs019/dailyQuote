import * as sheetsu from 'sheetsu-node'
import {QuoteModel} from "../models/Quote";





export default class Sheetsu {
    private config = {
        'address': 'a5eccef6ce81',
        'api_key': process.env.API_KEY,
        'api_secret': process.env.API_SECRET
    }

    private client = sheetsu(this.config)

    public read = () => this.client.read({ search: {isAlreadyShow: 'FALSE'}})

    public update = (columnName: string, value: string) => this.client.update(columnName, value, {isAlreadyShow: "FALSE"})

    randomQuote(): Promise<QuoteModel> {
        return this.read()
            .then((result) => {
                const res = JSON.parse(result)
                const randomNumber = Math.floor(Math.random() * res.length)
                console.log(res[randomNumber])
                return res[randomNumber]
            })
            .catch((err) => err)
    }
}