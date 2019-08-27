import { Sequelize } from 'sequelize'
import sequelize from '../lib/database/sequelize-connection'

import User from './User'

const models = {
    User: User.init( sequelize, Sequelize )
}

Object.values( models )
    .filter( model => typeof model.associate === 'function' )
    .forEach( model => model.associate( models ) )

const db = {
    ...models,
    sequelize
}

export default db
