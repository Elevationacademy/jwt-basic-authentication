import { Sequelize } from 'sequelize'

class Profile extends Sequelize.Model {
    static init( sequelize, DataTypes ) {
        return super.init( {
            user_id: DataTypes.INTEGER,
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            hobbie: DataTypes.STRING,
            image_url: DataTypes.TEXT
        }, { sequelize } )
    }
}

export default Profile
