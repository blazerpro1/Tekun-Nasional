const bcrypt = require('bcryptjs')

async function hashPassword (user) {
    const SALT_FACTOR = 8
  
    if (!user.changed('password')) {
      return
    }
    const genSalt = await bcrypt.genSalt(SALT_FACTOR)
    const hash = await bcrypt.hash(user.password, genSalt)
    user.setDataValue('password', hash)
  }

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        ic_number:{
            type: DataTypes.STRING(12),
            allowNull:false,
            unique: true
        },
        phone_number:{
            type: DataTypes.STRING(20),
            allowNull:false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        },
        roles: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        
    }, {
        hooks: {
            beforeSave: hashPassword
        }
    });

    User.associate = function(models){
        User.belongsToMany(models.Loan,{ through: "User_Loans"});

        User.hasMany(models.Appeal,{
            onDelete: "cascade"
        });
    };
    
    User.prototype.comparePassword = function (password) {
        return bcrypt.compare(password, this.password)
     }

    return User;
}