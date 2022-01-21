module.exports = (sequelize, DataTypes) => {
    const Reminder = sequelize.define('Reminders', {
        message: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        messageSid: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Reminder.associate = function(models){
        Reminder.belongsTo(models.User_Loans);
    };
    return Reminder;
}