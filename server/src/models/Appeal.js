module.exports = (sequelize, DataTypes) => {
    const Appeal = sequelize.define('Appeal', {
        details:{
            type: DataTypes.TEXT,
            allowNull:false
        },
        document:{
            type: DataTypes.STRING
        },
        approval: {
            type: DataTypes.STRING(8),
            allowNull: false,
            defaultValue: "pending",
        },
    });

    Appeal.associate = function(models){
        Appeal.belongsTo(models.User);
        Appeal.belongsTo(models.Loan);
    };
    return Appeal;
}