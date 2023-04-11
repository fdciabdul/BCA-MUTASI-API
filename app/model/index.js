const { Sequelize, DataTypes } = require('sequelize');
const config = require("../config/Database");

// Initialize database connection and models.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
    logging: false // Disable SQL query logging for performance reasons.
  }
);

// Define Akun model
const Akun = sequelize.define('akun', {
  username: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  link: {
    type: DataTypes.STRING(100)
  },
  tanggalawal: {
    type: DataTypes.STRING(100)
  },
  bulanawal: {
    type: DataTypes.STRING(100)
  },
  tanggalakhir: {
    type: DataTypes.STRING(100)
  },
  bulanakhir: {
    type: DataTypes.STRING(100)
  }
});
sequelize.queryInterface.showAllTables().then(tables => {
  if (!tables.includes("akuns")) {
    console.log("Table akuns does not exist");
    return sequelize.queryInterface.createTable("akuns", Akun.rawAttributes);
  }
}).then(() => {
  if (!tables.includes("mutasis")) {
    console.log("Table mutasis does not exist");
    return sequelize.queryInterface.createTable("mutasis", Mutasi.rawAttributes);
  }
}).catch(err => console.log());

// Define Mutasi model
const Mutasi = sequelize.define('mutasi', {
  link: {
    type: DataTypes.STRING(11),
    primaryKey: true
  },
  mutasi: DataTypes.JSON(),
  menit: DataTypes.INTEGER(110)
});

// check if table exists
sequelize.queryInterface.showAllTables().then(tables => {
  if (!tables.includes("akuns")) {
    console.log("Table akuns does not exist");
    return sequelize.queryInterface.createTable("akuns", Akun.rawAttributes);
  }
}).then(() => {
  if (!tables.includes("mutasis")) {
    console.log("Table mutasis does not exist");
    return sequelize.queryInterface.createTable("mutasis", Mutasi.rawAttributes);
  }
}).catch(err => console.log());

sequelize.sync()
  .then(() => console.log('Database synced successfully.'))
  .catch(err => console.log('Error syncing database:', err));

// Export database models.
module.exports = {
  Akun,
  Mutasi
};
