module.exports = (sequelize, DataTypes) => {
    const Announcement = sequelize.define('Accouncement', {
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        details:{
            type: DataTypes.TEXT,
            allowNull:false
        }
    });

    return Announcement;
}