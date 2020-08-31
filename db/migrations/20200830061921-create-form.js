"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Forms", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "Users",
					key: "id",
				},
			},
			officeTitle: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			candidatename: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			disctrict: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			address: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			occupation: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Forms");
	},
};
