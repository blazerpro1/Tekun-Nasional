module.exports = (sequelize, DataTypes) => {
    const Announcement = sequelize.define('Announcement', {
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