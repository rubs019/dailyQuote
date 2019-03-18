import Sequelize from 'sequelize'

export const Quotes = sequelize => {
    return sequelize.define('quotes', {
        born: {
            type: Sequelize.STRING
        },
        died: {
            type: Sequelize.STRING
        },
        job: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.STRING
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        nationality: {
            type: Sequelize.STRING
        },
        show: {
            type: Sequelize.BOOLEAN
        }
    })
}
