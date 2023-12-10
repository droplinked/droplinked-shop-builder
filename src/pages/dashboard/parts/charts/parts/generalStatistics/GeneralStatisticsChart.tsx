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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GeneralStatisticsChart() {
  const { states: { revenue } } = useContext(dashboardChartsContext)

  const getMonths = useMemo(() => {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => ({
      title: month.substring(0, 3),
      value: revenue?.chart.find(el => el.title === month)?.value || 0
    }))
  }, [revenue])

  const labels = getMonths.map(el => el.title)

  const data = {
    labels,
    datasets: [
      {
        data: getMonths.map(el => el.value),
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