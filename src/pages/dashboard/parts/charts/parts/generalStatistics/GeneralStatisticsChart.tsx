import { Box, VStack } from '@chakra-ui/react'
import React, { useContext, useMemo } from 'react'
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
import dashboardChartsContext from '../../context';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GeneralStatisticsChart() {
  const { states: { revenue }, isLoading } = useContext(dashboardChartsContext)

  const labels = revenue?.chart.map(el => el.title)

  const data = {
    labels,
    datasets: [
      {
        data: revenue?.chart.map(el => el.value),
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
    <AppSkeleton isLoaded={isLoading}>
      <VStack align="stretch">
        <AppTypography textAlign="right" color="#2BCFA1" fontSize="16px">${revenue?.total.toFixed(2)}</AppTypography>
        <Box borderTop="2px dashed rgba(128, 237, 207, 0.25)">
          <Bar options={options} data={data} height="100px" />
        </Box>
      </VStack>
    </AppSkeleton>
  )
}

export default GeneralStatisticsChart