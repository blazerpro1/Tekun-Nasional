module.exports = (sequelize, DataTypes) => {
    const User_Loan = sequelize.define('User_Loans', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        approval: {
            type: DataTypes.STRING(8),
            allowNull: false,
            defaultValue: "pending",
        },
    });

    User_Loan.associate = function(models){
        User_Loan.hasMany(models.Reminders, {
            onDelete: "cascade"
        });
    };

    return User_Loan;
}