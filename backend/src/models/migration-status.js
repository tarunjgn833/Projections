import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const MigrationStatus = sequelize.define('MigrationStatus', {
  migrationName: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  executed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  executedAt: {
    type: DataTypes.DATE
  }
});

export default MigrationStatus;