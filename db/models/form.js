"use strict";
module.exports = (sequelize, DataTypes) => {
	const Form = sequelize.define(
		"Form",
		{
			userId: DataTypes.INTEGER,
			officeTitle: DataTypes.STRING,
			candidatename: DataTypes.STRING,
			disctrict: DataTypes.STRING,
			address: DataTypes.STRING,
			occupation: DataTypes.STRING,
		},
		{}
	);
	Form.associate = function (models) {
		Form.belongsTo(models.User, { foreignKey: "userId" });
	};
	return Form;
};
