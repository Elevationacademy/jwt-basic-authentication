import { Sequelize } from 'sequelize'
import md5 from 'md5'

class User extends Sequelize.Model {
    static init( sequelize, DataTypes ) {
        return super.init( {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            modelName: 'User',
            hooks: {
                beforeCreate( user ) {
                    user.password = user.password && user.password !== '' ? md5( user.password ) : ''
                }
            },
            timestamps: false,
            sequelize
        })
    }

    static associate( models ) {
        this.hasOne( models.Profile, {
            foreignKey: 'user_id',
            as: 'profile'
        } )
    }
}

export default User
