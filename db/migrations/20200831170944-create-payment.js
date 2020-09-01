"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Payments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},

			payerId: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				unique: true,
				references: {
					model: "Users",
					key: "id",
				},
			},
			emailAddress: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},
			amount: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			currentcyCode: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			payerName: {
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
		return queryInterface.dropTable("Payments");
	},
};
