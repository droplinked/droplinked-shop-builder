import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import { Bar } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AppTypography from 'components/common/typography/AppTypography';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GeneralStatisticsChart() {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const data = {
    labels,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40, 21, 45, 66, 33, 25],
        backgroundColor: '#2BCFA1',
      }
    ],
  };

  const options = {
    responsive: true,
    datasets: {
      bar: {
        barThickness: 32,
        borderRadius: 3
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    }
  };

  return (
    <VStack align="stretch">
      <AppTypography textAlign="right" color="#2BCFA1" fontSize="16px">$6823.96</AppTypography>
      <Box borderTop="2px dashed rgba(128, 237, 207, 0.25)">
        <Bar options={options} data={data} height="80px" />
      </Box>
    </VStack>
  )
}

export default GeneralStatisticsChart