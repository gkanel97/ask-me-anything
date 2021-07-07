module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "migrationsTableName": "migrations",
  "migrations": ["dist/migration/*{.ts,.js}"],
  "cli": {
    "migrationsDir": "migration"
  },
  "ssl": {
    rejectUnauthorized: false
  }
}
