export const sqlite3Config = {
    client: 'sqlite3',
	connection: {
		filename: './db/ecommerce.sqlite'
	},
	useNullAsDefault: true
}

export const mariadbConfig = {
    client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'ecommerce'
	}
}