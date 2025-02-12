import { BarElement, CategoryScale, Chart as ChartJS, ChartOptions, Legend, LinearScale, Tooltip } from "chart.js"
import { SalesData } from "lib/apis/dashboard/interfaces"
import React from "react"
import { Bar } from "react-chartjs-2"

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

interface Props {
    salesData?: SalesData[]
}

export default function StackedBarChart({ salesData }: Props) {
    // Prepare chart data from backend response
    const chartData = {
        labels: salesData?.map(item => item.date),
        datasets: [
            {
                label: "Direct",
                data: salesData?.map(item => item.directSales),
                backgroundColor: "#2BCFA1",
                borderRadius: 8
            },
            {
                label: "Affiliate",
                data: salesData?.map(item => item.affiliateSales),
                backgroundColor: "#C5A3FF",
                borderRadius: 8
            }
        ]
    }

    const options: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: false,
                external: context => {
                    const tooltipModel = context.tooltip

                    if (!tooltipModel || tooltipModel.opacity === 0) {
                        const tooltipEl = document.getElementById("custom-tooltip")
                        if (tooltipEl) tooltipEl.style.opacity = "0"
                        return
                    }

                    // Get Chart Element
                    let tooltipEl = document.getElementById("custom-tooltip")
                    if (!tooltipEl) {
                        tooltipEl = document.createElement("div")
                        tooltipEl.id = "custom-tooltip"
                        tooltipEl.style.position = "absolute"
                        document.body.appendChild(tooltipEl)
                    }

                    // Get tooltip position
                    const position = context.chart.canvas.getBoundingClientRect()

                    // Get dataset and index
                    const dataIndex = tooltipModel.dataPoints?.[0]?.dataIndex
                    if (dataIndex === undefined) return

                    const salesInfo = salesData?.[dataIndex]
                    if (!salesInfo) return

                    // Calculate percentages
                    const totalSales = salesInfo.directSales + salesInfo.affiliateSales
                    const directPercentage = totalSales ? (salesInfo.directSales / totalSales) * 100 : 0
                    const affiliatePercentage = totalSales ? (salesInfo.affiliateSales / totalSales) * 100 : 0

                    // Create tooltip HTML content
                    tooltipEl.innerHTML = `
                        <p style="border-bottom: 1px solid #292929; padding: 12px; font-size: 14px; font-weight: 500">${salesInfo.date}</p>

                        <div style="display: flex; flex-direction: column; gap: 4px; border-bottom: 1px solid #292929; padding: 12px">
                            <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px">
                                <p>Total earning</p>
                                <p style="font-weight: 500">${salesInfo.totalSales.toFixed(2)}</p>
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 16px; padding: 12px">
                            <div style="display: flex; justify-content: space-between; align-items: center; gap: 16px">
                                <div style="display: flex; align-items: center; gap: 8px">
                                    <div style="width: 4px; height: 16px; border-radius: 4px; background-color: #2BCFA1"></div>
                                    <span>Direct</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 8px">
                                    <span>${directPercentage}%</span>
                                    <div style="width: 4px; height: 4px; border-radius: 50%; background-color: #292929"></div>
                                    <span>${salesInfo.directSales.toFixed(2)}</span>
                                </div>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center">
                                 <div style="display: flex; align-items: center; gap: 8px">
                                    <div style="width: 4px; height: 16px; border-radius: 4px; background-color: #C5A3FF"></div>
                                    <span>Affiliate</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 8px">
                                    <span>${affiliatePercentage}%</span>
                                    <div style="width: 4px; height: 4px; border-radius: 50%; background-color: #292929"></div>
                                    <span>${salesInfo.affiliateSales.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    `

                    // Position the tooltip
                    tooltipEl.style.opacity = "1"
                    tooltipEl.style.minWidth = '170px';
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.top = tooltipModel.caretY + 150 + 'px';
                    tooltipEl.style.left = tooltipModel.caretX + 250 + 'px';
                    tooltipEl.style.border = "1px solid #292929";
                    tooltipEl.style.borderRadius = "8px";
                    tooltipEl.style.padding = "0";
                    tooltipEl.style.backgroundColor = '#1C1C1C';
                    tooltipEl.style.color = '#FFF';
                    tooltipEl.style.fontSize = "12px";
                    tooltipEl.style.opacity = "1";
                    tooltipEl.style.transition = "opacity 0.2s";
                }
            }
        },
        scales: {
            x: { stacked: true, ticks: { color: "#FFF" } },
            y: { stacked: true, ticks: { color: "#FFF" } }
        }
    }

    return <Bar data={chartData} options={options} />
}