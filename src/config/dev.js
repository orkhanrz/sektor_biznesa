const config = {
	sql: {
		host: process.env.SQL_HOST,
		user: process.env.SQL_USER,
		password: process.env.SQL_PASSWORD,
		dbName: process.env.SQL_DB_NAME,
		dialect: process.env.SQL_DIALECT
	},
	jwt: {
		key: process.env.JWT_SECRET_KEY,
	},
	session: {
		key: process.env.SESSION_SECRET_KEY,
	},
};

module.exports = config;
