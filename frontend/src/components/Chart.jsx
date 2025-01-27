import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { fetchHistogramData } from '../api/apiService';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Chart = ({ column }) => {
  const [histogramData, setHistogramData] = useState(null);


  useEffect(() => {
    if (!column) return;
    const getHistogram = async () => {
      try {
        const data = await fetchHistogramData(column);

        const chartData = {
          labels: Object.keys(data),
          datasets: [
            {
              label: `Histogram for ${column}`,
              data: Object.values(data),
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        };
        setHistogramData(chartData);
      } catch (error) {
        console.error('Error fetching histogram data:', error);
      }
    };

    getHistogram();
  }, [column]);



  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false, 
          maxRotation: 90, 
          minRotation: 45,
          padding: 10,
        },
        grid: {
          display: false, 
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
      <div id="chartContainer" style={{ height: '600px', maxWidth: '100%', marginTop: '20px' }}>
        {histogramData ? (
          <Bar data={histogramData} options={chartOptions} />
        ) : (
          <p>Loading histogram data...</p>
        )}
      </div>
  );
};

export default Chart;
