import { Sequelize } from 'sequelize'
import sequelize from '../lib/database/sequelize-connection'

import User from './User'
import Profile from './Profile'

const models = {
    User: User.init( sequelize, Sequelize ),
    Profile: Profile.init( sequelize, Sequelize )
}

Object.values( models )
    .filter( model => typeof model.associate === 'function' )
    .forEach( model => model.associate( models ) )

const db = {
    ...models,
    sequelize
}

export default db
