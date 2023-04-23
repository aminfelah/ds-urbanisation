import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

const BarChart = ({ chartData,chartName }) => {
  const [delayed, setDelayed] = useState(false);

  const options = {
    responsive: true,
    animation: {
      onComplete: () => {
        setDelayed(true);
      },
      delay: (context) => {
        let delay = 0;
        if (
          context.type === 'data' &&
          context.mode === 'default' &&
          !delayed
        ) {
          delay = context.dataIndex * 2200 + context.datasetIndex * 900;
        }
        return delay;
      },
    },
    title: {
      display: true,
      text: chartName,
      fontSize: 25,
    },
    legend: {
      display: false,
      position: 'bottom',
    },
  };

  return (
    <Bar data={chartData} options={options} />
  );
};

export default BarChart;
