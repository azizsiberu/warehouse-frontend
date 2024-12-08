// path: src/components/Overview/RecentActivities.js
import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const RecentActivities = ({ activities }) => {
  if (!activities) return null;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Aktivitas Terbaru
      </Typography>
      <List>
        {activities.incoming.map((activity) => (
          <ListItem key={`incoming-${activity.id}`}>
            <ListItemText
              primary={`Stok Masuk: ${activity.product_name}`}
              secondary={`Jumlah: ${activity.jumlah}, Lokasi: ${activity.warehouse_name}`}
            />
          </ListItem>
        ))}
        {activities.outgoing.map((activity) => (
          <ListItem key={`outgoing-${activity.id}`}>
            <ListItemText
              primary={`Stok Keluar: ${activity.product_name}`}
              secondary={`Jumlah: ${activity.jumlah}, Lokasi: ${activity.warehouse_name}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecentActivities;
