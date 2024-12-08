// path: src/components/Overview/OverviewCharts.js
import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PieChart from "./Charts/PieChart";
import BarChart from "./Charts/BarChart";

const OverviewCharts = ({ distribution, trend }) => {
  // Data untuk PieChart distribusi stok per lokasi gudang
  const locationLabels = Array.from(
    new Set(distribution.byLocation.map((loc) => loc.warehouse_name))
  );

  const locationData = locationLabels.map((name) => {
    return distribution.byLocation
      .filter((item) => item.warehouse_name === name)
      .reduce((total, item) => total + parseInt(item.total_stock, 10), 0);
  });

  const locationChartData = {
    labels: locationLabels,
    datasets: [
      {
        label: "Stok Per Gudang",
        data: locationData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  // Data untuk PieChart distribusi stok per kategori
  const categoryLabels = Array.from(
    new Set(distribution.byCategory.map((cat) => cat.kategori))
  );

  const categoryData = categoryLabels.map((kategori) => {
    return distribution.byCategory
      .filter((item) => item.kategori === kategori)
      .reduce((total, item) => total + parseInt(item.total_stock, 10), 0);
  });

  const categoryChartData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Stok Per Kategori",
        data: categoryData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          generateLabels: (chart) => {
            const data = chart.data;
            return data.labels.map((label, index) => {
              const value = data.datasets[0].data[index];
              return {
                text: `${label} (${value})`,
                fillStyle: data.datasets[0].backgroundColor[index],
              };
            });
          },
        },
      },
    },
  };

  // Data untuk BarChart tren stok
  const trendLabels = Array.from(
    new Set([
      ...trend.incoming.map((item) => item.warehouse_name),
      ...trend.outgoing.map((item) => item.warehouse_name),
    ])
  );

  const incomingThisMonth = trendLabels.map((name) => {
    const item = trend.incoming.find((inc) => inc.warehouse_name === name);
    return item ? parseInt(item.total_incoming_this_month, 10) : 0;
  });

  const outgoingThisMonth = trendLabels.map((name) => {
    const item = trend.outgoing.find((out) => out.warehouse_name === name);
    return item ? parseInt(item.total_outgoing_this_month, 10) : 0;
  });

  const incomingLastMonth = trendLabels.map((name) => {
    const item = trend.incoming.find((inc) => inc.warehouse_name === name);
    return item ? parseInt(item.total_incoming_last_month, 10) : 0;
  });

  const outgoingLastMonth = trendLabels.map((name) => {
    const item = trend.outgoing.find((out) => out.warehouse_name === name);
    return item ? parseInt(item.total_outgoing_last_month, 10) : 0;
  });

  const totalIncomingThisMonth = incomingThisMonth.reduce((a, b) => a + b, 0);
  const totalOutgoingThisMonth = outgoingThisMonth.reduce((a, b) => a + b, 0);
  const totalIncomingLastMonth = incomingLastMonth.reduce((a, b) => a + b, 0);
  const totalOutgoingLastMonth = outgoingLastMonth.reduce((a, b) => a + b, 0);

  const thisMonthTrendData = {
    labels: trendLabels,
    datasets: [
      {
        label: `Stok Masuk Bulan Ini (${totalIncomingThisMonth})`,
        data: incomingThisMonth,
        backgroundColor: "#36A2EB",
      },
      {
        label: `Stok Keluar Bulan Ini (${totalOutgoingThisMonth})`,
        data: outgoingThisMonth,
        backgroundColor: "#FF6384",
      },
    ],
  };

  const lastMonthTrendData = {
    labels: trendLabels,
    datasets: [
      {
        label: `Stok Masuk Bulan Lalu (${totalIncomingLastMonth})`,
        data: incomingLastMonth,
        backgroundColor: "#4BC0C0",
      },
      {
        label: `Stok Keluar Bulan Lalu (${totalOutgoingLastMonth})`,
        data: outgoingLastMonth,
        backgroundColor: "#FF9F40",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20,
        },
      },
    },
  };

  return (
    <Box>
      {/* PieChart Distribusi Stok */}
      <Typography variant="h6" gutterBottom>
        Distribusi Stok
      </Typography>
      <Grid container>
        <Grid size={6}>
          <Grid container spacing={3}>
            <Grid size={6}>
              <PieChart data={locationChartData} options={pieOptions} />
            </Grid>
            <Grid size={6}>
              <PieChart data={categoryChartData} options={pieOptions} />{" "}
            </Grid>
          </Grid>
        </Grid>

        {/* BarChart Tren Stok */}
        <Grid size={6}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography variant="h6" gutterBottom>
                Tren Stok Bulan Ini
              </Typography>
              <BarChart data={thisMonthTrendData} options={options} />
            </Grid>
            <Grid size={6}>
              <Typography variant="h6" gutterBottom>
                Tren Stok Bulan Lalu
              </Typography>
              <BarChart data={lastMonthTrendData} options={options} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewCharts;
