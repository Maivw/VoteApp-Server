"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Users",
			[
				{
					username: "Demo",
					email: "demo@gmail.com",
					password:
						"$2a$10$l16QhY4ALqAtY83nlyvukuan7hd59W1TT.wCVBAbe8p80bI17Rk9i",
					party: "Libertarian",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Users", null, {});
	},
};
