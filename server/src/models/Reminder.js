module.exports = (sequelize, DataTypes) => {
    const Reminder = sequelize.define('Reminder', {
        message:{
            type: DataTypes.STRING,
            allowNull:false
        },
    });

    Reminder.associate = function(models){
        Reminder.belongsTo(models.User);
        Reminder.belongsTo(models.Loan);
    };
    return Reminder;
}