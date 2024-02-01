import { VStack } from '@chakra-ui/react';
import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip
} from "chart.js";
import Annotation from 'chartjs-plugin-annotation';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import AppTypography from 'components/common/typography/AppTypography';
import DashboardEmpty from 'pages/dashboard/parts/parts/empty/DashboardEmpty';
import React, { useCallback, useContext, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import dashboardChartsContext, { IrevenueChartItem } from '../../context';
import generalStatisticsModel from './model';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Annotation
);

function GeneralStatisticsChart() {
  const { states: { revenue }, isLoading } = useContext(dashboardChartsContext)
  const { findMaxRevenue } = generalStatisticsModel;
  const barChartValues = revenue?.chart.map(el => el.value) || []
  const maxRevenue = useCallback(()=> findMaxRevenue(revenue),[revenue])

  const data = {
    labels: revenue?.chart.map(el => el.title),
    datasets: [
      {
        data: barChartValues,
        backgroundColor: '#2BCFA1',
      },
    ]
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
      annotation: {
        annotations: {
          line: {
            yMin: Math.max(...barChartValues),
            yMax: Math.max(...barChartValues),
            borderColor: '#2BCFA1',
            borderWidth: 1,
            borderDash: [5, 5]
          }
        }
      },
      tooltip: {
        enabled: false,
        external: function (context) {
          // Tooltip Element
          let tooltipEl = document.getElementById('chartjs-tooltip');

          // Create element on first render
          if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-tooltip';
            document.body.appendChild(tooltipEl);
          }

          // Hide if no tooltip
          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = "0";
            return;
          }

          if (tooltipModel.body) {
            const title = tooltipModel.title[0]
            const data = revenue?.chart.find(el => el.title === title).details

            let innerHtml = `
            <div style="display: flex; flex-direction: column; gap: 10px">
              <p style="text-align: center; font-weight: 600">${title}</p>

              <div style="height: 1px; background-color: #878787"></div>

              <div style="display: flex; flex-direction: column; gap: 4px">
                ${typeof data.order !== "undefined" ? `
                  <div style="display: flex; justify-content: space-between">
                    <p style="color: #878787">Order</p>
                    <p>${data.order}</p>
                  </div>
                `: ""}
                
                ${typeof data.revenue !== "undefined" ? `
                  <div style="display: flex; justify-content: space-between">
                    <p style="color: #878787">Earning</p>
                    <p>$${data.revenue}</p>
                  </div>
                `: ""}

                ${typeof data.profit !== "undefined" ? `
                <div style="display: flex; justify-content: space-between">
                  <p style="color: #878787">Profit</p>
                  <p>$${data.profit}</p>
                </div>
                `: ""}
              </div>

              <div style="height: 1px; background-color: #878787"></div>

              <div style="display: flex; flex-direction: column; gap: 4px">
                ${typeof data.direct !== "undefined" ? `
                  <div style="display: flex; justify-content: space-between">
                    <div style="display: flex; align-items: center; gap: 4px">
                      <div style="width: 8px; height: 8px; border:2px solid #2BCFA1; border-radius: 50%;"></div>
                      <p style="color: #878787">Direct</p>
                    </div>
                    <p>$${data.direct}</p>
                  </div>
                ` : ""}
                
                ${typeof data.affiliate !== "undefined" ? `
                  <div style="display: flex; justify-content: space-between">
                    <div style="display: flex; align-items: center; gap: 4px">
                      <div style="width: 8px; height: 8px; border:2px solid #9C4EFF; border-radius: 50%;"></div>
                      <p style="color: #878787">Affiliate</p>
                    </div>
                    <p>$${data.affiliate}</p>
                  </div>
                `: ""}
                
                ${data.affiliate || data.direct ? `
                  <div style="display: flex; height: 11px; border-radius: 8px; background-color: #878787; overflow: hidden;">
                    <div style="width: ${(data.direct * 100 / data.profit) || 0}%; max-width: 100%; height: 100%; background-color: #2BCFA1"></div>
                    <div style="width: ${(data.affiliate * 100 / data.profit) || 0}%; max-width: 100%; height: 100%; background-color: #9C4EFF"></div>
                  </div>
                ` : ""}
              </div>
            </div>
            `
            tooltipEl.innerHTML = innerHtml;
          }

          tooltipEl.style.width = '170px';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.top = tooltipModel.caretY + 160 + 'px';
          tooltipEl.style.left = tooltipModel.caretX + 50 + 'px';
          tooltipEl.style.opacity = "1";
          tooltipEl.style.transition = "opacity 0.2s";
          tooltipEl.style.borderRadius = "8px";
          tooltipEl.style.padding = "12px 16px";
          tooltipEl.style.backgroundColor = '#333';
          tooltipEl.style.color = '#fff';
          tooltipEl.style.fontSize = "12px";
        }
      },
      legend: {
        display: false,
      },
    }
  };
  return (
    <AppSkeleton isLoaded={isLoading}>
      {revenue?.chart?.length ? (
        <VStack align="stretch">
          <AppTypography textAlign="right" color="#2BCFA1" fontSize="16px">${maxRevenue()}</AppTypography>
          <Bar options={options} data={data} height="100px" />
        </VStack>
      ) : <DashboardEmpty minHeight="300px" />}
    </AppSkeleton>
  )
}

export default GeneralStatisticsChart