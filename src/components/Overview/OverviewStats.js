// path: src/components/Overview/OverviewStats.js
import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const OverviewStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Total Stok
            </Typography>
            <Typography variant="h4">{stats.total_stock}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Jumlah Gudang
            </Typography>
            <Typography variant="h4">{stats.total_warehouses}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Total Produk dengan Stok
            </Typography>
            <Typography variant="h4">
              {stats.total_products_with_stock}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OverviewStats;
