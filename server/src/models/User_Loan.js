module.exports = (sequelize, DataTypes) => {
    const User_Loan = sequelize.define('User_Loans', {
        approval: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });

    // User_Loan.associate = function (models){
    //     User_Loan.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     })

    //     User_Loan.belongsTo(models.Loan,{
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     })
    // }
    return User_Loan;
}