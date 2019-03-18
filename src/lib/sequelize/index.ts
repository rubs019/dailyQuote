import Sequelize from 'sequelize'
import { Logger } from '../../helpers/logHelpers'
import data from './data.json'
import { Quotes } from './models/quotes.model'

const dbName = 'db.sqlite'
export const sequelize = new Sequelize.Sequelize({
    dialect: 'sqlite',
    storage: dbName
})

export const loadSequelize = async (get, res, next) => {
    try {
        await sequelize.authenticate()
        Logger.info('Connection has been established successfully !')
        const quoteModel = Quotes(sequelize)
        await sequelize.sync({ force: false })
        next()
    } catch (e) {
        Logger.info('Unable to connect to the database:', e)
        next()
    }
}

const addToDb = quotes => {
    data.forEach(async d => {
        const user = await quotes.create({
            born: d.born,
            died: d.died,
            job: d.job,
            message: d.message,
            name: d.name,
            nationality: d.nationality,
            show: d.show
        })
    })
}
