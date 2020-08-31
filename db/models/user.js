"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			username: DataTypes.STRING,
			occupation: DataTypes.STRING,
			disctric: DataTypes.STRING,
			address: DataTypes.STRING,
			party: DataTypes.STRING,
		},
		{}
	);
	User.associate = function (models) {
		User.hasMany(models.Form, { foreignKey: "userId" });
	};
	return User;
};
