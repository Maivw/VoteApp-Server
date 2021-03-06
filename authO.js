const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const authConfig = {
	domain: "maivw.us.auth0.com",
	audience: "https://voteApp/api",
};

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
	}),

	audience: authConfig.audience,
	issuer: `https://${authConfig.domain}/`,
	algorithm: ["RS256"],
});

module.exports = {
	authConfig,
	checkJwt,
};
