import * as sheetsu from 'sheetsu-node'

const config = {
    'address': 'a5eccef6ce81',
    'api_key': process.env.API_KEY,
    'api_secret': process.env.API_SECRET
}

console.log(config)

const client = sheetsu(config)

export const read = () => client.read({ search: {isAlreadyShow: 'FALSE'}})

export const update = (columnName: string, value: string) => client.update(columnName, value, {isAlreadyShow: "FALSE"})