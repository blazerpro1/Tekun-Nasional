module.exports = {
    production: false,
    port: process.env.PORT || 3000,

    db: {
      database: process.env.DB_NAME || 'tekun',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '6221234',
      options: {
        dialect: process.env.DIALECT || 'postgres',
        host: process.env.HOST || 'localhost',
        storage: './tekun.postgres'
      }
    },
    authentication: {
      jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}

