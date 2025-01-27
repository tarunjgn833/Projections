import sequelize from '../config/database.js';
import Projections from '../models/projections.js';
import MigrationStatus from '../models/migration-status.js';
import { readCSVData } from '../utils/csvUtils.js';

const MIGRATION_NAME = 'initial_csv_import';

const migration = async () => {
  try {
    await sequelize.sync();

    const migrationStatus = await MigrationStatus.findOne({
      where: { migrationName: MIGRATION_NAME }
    });

    if (migrationStatus?.executed) {
      console.log('Migration was already executed on:', migrationStatus.executedAt);
      process.exit(0);
    }

    console.log('Starting Migration...');

    await sequelize.transaction(async (t) => {
      const data = await readCSVData();
      
      await Projections.bulkCreate(
        data.map(row => ({
          rank: isNaN(parseInt(row.Rank1)) ? 0 : parseInt(row.Rank1),
          yearType: row.YearType,
          year: row.Year,
          value: isNaN(parseFloat(row.Value)) ? 0 : parseFloat(row.Value),
          unit: row.Unit,
          attribute: row.Attribute,
          commodity: row.Commodity,
          commodityType: row.CommodityType
        })),
        { transaction: t }
      );

      await MigrationStatus.create({
        migrationName: MIGRATION_NAME,
        executed: true,
        executedAt: new Date()
      }, { transaction: t });
    });

    console.log('CSV migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migration();