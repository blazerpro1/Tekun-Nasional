module.exports = {
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


// module.exports = {
//     HOST: "localhost",
//     USER: "postgres",
//     PASSWORD: "6221234",
//     DB: "tekun",
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   };