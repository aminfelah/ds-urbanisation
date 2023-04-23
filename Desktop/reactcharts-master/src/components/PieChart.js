import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

const PieChart = ({ chartData, chartName}) => {
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
      text: 'Number of validated commands per month',
      fontSize: 25,
    },
    legend: {
      display: true,
      position: 'right',
    },
  };

  return (
    <div className="chart">
      <Pie
        data={chartData}
        options={{
          responsive: true,
          title: {
            display: true,
            text: chartName,
            fontSize: 25,
          },
          legend: {
            display: false,
            position: 'bottom',
          },
        }}
      />
    </div>
  );
};

export default PieChart;
