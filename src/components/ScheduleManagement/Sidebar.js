// src/components/Sidebar/index.js

import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const Sidebar = ({ onTabChange, activeTab }) => {
  const menuItems = [
    { label: "Jadwal Sementara", tab: "temporary" },
    { label: "Jadwal Akhir", tab: "final" },
  ];

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          textAlign: "left",
          px: 3,
          py: 2,
          bgcolor: "primary.main",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Menu Jadwal
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => onTabChange(item.tab)} // Call onTabChange with the corresponding tab
              sx={{
                px: 3,
                borderRadius: "5px",
                bgcolor: activeTab === item.tab ? "grey.300" : "transparent", // Conditionally change the background color
                "&:hover": {
                  bgcolor: activeTab === item.tab ? "grey.400" : "transparent", // Darker gray on hover if active
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
