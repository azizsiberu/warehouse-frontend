// path: src/components/Overview/Charts/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registrasi elemen dan plugin
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, options }) => {
  return <Pie data={data} options={options} />;
};

export default PieChart;
