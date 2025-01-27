import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Projections = sequelize.define('Projections', {
  rank: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Rank1'
  },
  yearType: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'YearType'
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Year'
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'Value'
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Unit'
  },
  attribute: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Attribute'
  },
  commodity: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Commodity'
  },
  commodityType: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'CommodityType'
  }
}, {
  timestamps: true,
  tableName: 'projections_data'
});

export default Projections;