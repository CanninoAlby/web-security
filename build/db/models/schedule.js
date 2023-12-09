'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    schedule.init({
        title: DataTypes.STRING,
        date: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'schedule',
        underscored: true,
    });
    return schedule;
};
