module.exports = (sequelize, DataTypes) => {
    const Loan = sequelize.define('Loan', {
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        details:{
            type: DataTypes.TEXT,
            allowNull:false
        },
        amount:{
            type: DataTypes.DOUBLE,
            allowNull:false
        },
        
    });

    Loan.associate = function(models){
        Loan.belongsToMany(models.User,{ through: "User_Loans" });
        Loan.hasMany(models.Appeal, {
            onDelete: "cascade"
        });
    };

    return Loan;
}