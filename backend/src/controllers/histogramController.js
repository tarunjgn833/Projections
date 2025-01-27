import { fn, col, literal } from 'sequelize';
import Projections from '../models/projections.js';

const generateHistogramData = async (column) => {
  try {
    const results = await Projections.findAll({
      attributes: [
        column, 
        [fn('COUNT', col(column)), 'frequency']
      ],
      group: [column], 
      order: [[fn('COUNT', col(column)), 'DESC']] 
    });

    const columnFrequency = {};
    results.forEach(result => {
      const columnValue = result.dataValues[column]; 
      const frequencyValue = result.dataValues['frequency'];
      columnFrequency[columnValue] = frequencyValue;
    });
    return columnFrequency;
  } catch (error) {
    console.error(error);
  }
};


export const getColumns = async (req, res) => {
  try {
    const tableAttributes = await Projections.describe();
    const columns = Object.keys(tableAttributes).filter(
      attr => !['createdAt', 'updatedAt', 'id'].includes(attr)
    );
    res.json(columns);
  } catch (err) {
    console.error('Error in getColumns:', err);
    res.status(500).json({ error: err.message });
  }
};

export const getHistogram = async (req, res) => {
  const column = req.params.column;

  try {
    const tableAttributes = await Projections.describe();
    if (!tableAttributes[column]) {
      return res.status(400).json({ error: `Column "${column}" not found in database` });
    }

    const histogram = await generateHistogramData(column);
    res.render('index', { histogram, columnName: column });
  } catch (err) {
    console.error('Error in getHistogram:', err);
    res.status(500).json({ error: err.message });
  }
};

export const getHistogramRaw = async (req, res) => {
  const column = req.params.column;

  try {
    const tableAttributes = await Projections.describe();
    if (!tableAttributes[column]) {
      return res.status(400).json({ error: `Column "${column}" not found in database` });
    }
    const rawHistogramData = await generateHistogramData(column);
    res.json(rawHistogramData);
  } catch (err) {
    console.error('Error in getHistogramRaw:', err);
    res.status(500).json({ error: err.message });
  }
};