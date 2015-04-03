"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("links", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      longLink: {
        type: DataTypes.STRING
      },
      shortLink: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("links").done(done);
  }
};