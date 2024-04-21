import React, { useState } from "react";
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as chartjs, LinearScale, registerables } from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

// Register Chart.js modules
chartjs.register(...registerables);

export default function Home() {
    const [selectedMonth, setSelectedMonth] = useState('January');

    const calculateCumulativeSum = (array) => {
        return array.reduce((acc, curr, index) => {
            if (index === 0) {
                return [curr];
            } else {
                return [...acc, acc[index - 1] + curr];
            }
        }, []);
    };

    const MonthlyExpensesData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'July'],
        datasets: [
            {
                label: 'Expenses',
                data: [200,100,440,210,250,260,220,150],
                fill: true,
                backgroundColor: 'rgba(255,0,0,0.2)',
                borderColor: 'rgba(255,0,0,1)',
                borderWidth: 2,
            },
            {
                label: 'Net Income',
                data: [300, 200, 340, 240, 370, 320],
                fill: true,
                backgroundColor: 'rgba(0,0,255,0.2)',
                borderColor: 'rgba(0,0,255,1)',
                borderWidth: 2,
                clip: false,
            },
        ],
    };

    const TotalStoredData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'July'],
        datasets: [
            {
                label: 'Cash and cash equivalents - YTD',
                data: calculateCumulativeSum([300/150, 200/150, 340/150, 240/150, 370/150, 320/150]),
                fill: true,
                backgroundColor: 'rgba(0,255,0,0.2)',
                borderColor: 'rgba(0,255,0,1)',
                borderWidth: 2,
                clip: false,
            },
        ],
    };

    const RequestsListData = {
        January: [
            { name: 'Replace Shower', value: 50, 'situation': 'Urgent' },
            { name: 'Fix Toilet', value: 125, 'situation': 'Solved' },
            { name: 'Install Water Fountains', value: 75, 'situation': 'Pending'},
        ],
        February: [
            { name: 'Repair Kitchen Sink', value: 60, 'situation': 'Pending' },
            { name: 'Paint Living Room', value: 100 , 'situation': 'Urgent'},
            { name: 'Replace Light Fixtures', value: 80, 'situation': 'Urgent' },
        ],
        March: [
            { name: 'Unclog Drains', value: 70, 'situation': 'Solved'},
            { name: 'Repair Garage Door', value: 110, 'situation': 'Pending'},
            { name: 'Install Ceiling Fans', value: 90, 'situation': 'Pending'},
        ],
        April: [
            { name: 'Fix Leaky Faucet', value: 55, 'situation': 'Solved'},
            { name: 'Replace Carpet', value: 135, 'situation': 'Urgent'},
            { name: 'Install Security System', value: 65, 'situation': 'Pending'},
        ],
        May: [
            { name: 'Paint Exterior Walls', value: 45, 'situation': 'Pending'},
            { name: 'Repair Roof Tiles', value: 120, 'situation': 'Urgent'},
            { name: 'Replace Windows', value: 85, 'situation': 'Pending'},
        ],
        July: [
            { name: 'Repair Fence', value: 75, 'situation': 'Pending'},
            { name: 'Install Solar Panels', value: 140, 'situation': 'Urgent'},
            { name: 'Upgrade HVAC System', value: 95, 'situation': 'Pending'},
        ]
    };
    

    const CostsBreakdownData = {
        January: {
            Maintenance: 200,
            Utilities: 150,
            Services: 100
        },
        February: {
            Maintenance: 180,
            Utilities: 160,
            Services: 110
        },
        March: {
            Maintenance: 220,
            Utilities: 140,
            Services: 120
        },
        April: {
            Maintenance: 190,
            Utilities: 170,
            Services: 130
        },
        May: {
            Maintenance: 210,
            Utilities: 180,
            Services: 140
        },
        July: {
            Maintenance: 230,
            Utilities: 190,
            Services: 150
        }
    };
    
    

    const doughnutChartOptions = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            tooltip: {
                enabled: true,
            },
            // Configure data labels
            datalabels: {
                display: true,
                color: 'white',
                font: {
                    size: 16
                },
                formatter: (value, context) => context.chart.data.labels[context.dataIndex],
            },
        },
        layout: {
            padding: {
                bottom: 10,
            }
        }
    };

    const lineChartOptions = {
        scales: {
            y: {
                suggestedMin: 0,
            },
        },
        maintainAspectRatio: false,
        aspectRatio: 2,
    };

    const NetIncomeOptions = {
        scales: {
            y: {
                suggestedMin: 0,
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            },
        },
    };

    return (
        <>
        <div className="flex items-center justify-center">
            <div className="w-3/5"> 
                <div className="text-white">
                    <div className="flex flex-row w-full justify-center items-center mb-4">
                        <div className="w-3/5 h-[35vh]">
                            <Line 
                                data={MonthlyExpensesData}
                                options={lineChartOptions}
                            />
                        </div>
                        <div className="w-full md:w-1/2 md:ml-2">
                            <div className="mb-4">
                                <h1 className="text-3xl text-white text-center">Requests List for {selectedMonth}</h1> 
                                <table className='justify-around' style={{ width: '100%' }}>
                                    <thead>
                                        <tr className="text-2xl mb-1">
                                            <th>Request</th>
                                            <th>$</th>
                                            <th>Situation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {RequestsListData[selectedMonth].map((request, index) => (
                                            <tr key={index} className={`text-2xl border-y-2 border-white gap-2`}>
                                                <td>{request.name}</td>
                                                <td>{request.value}</td>
                                                <td className={`${request.situation == "Urgent" ? "text-red-700" : (request.situation == "Solved" ? "text-green-700" : "text-yellow-400")}`}>{request.situation}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-center items-center mb-4">
                        <div className="w-3/5">
                            <Line 
                                data={TotalStoredData}
                                options={NetIncomeOptions}
                            />
                        </div>
                        <div className="w-2/5">
                            <Doughnut 
                                data={{
                                    labels: Object.keys(CostsBreakdownData[selectedMonth]),
                                    datasets: [{
                                        label: `Costs Breakdown for ${selectedMonth}`,
                                        data: Object.values(CostsBreakdownData[selectedMonth]),
                                        backgroundColor: ['#6D9EEB', '#1055CC', '#1C4587'],
                                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                                        borderWidth: 2,
                                    }]
                                }} 
                                options={doughnutChartOptions} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
