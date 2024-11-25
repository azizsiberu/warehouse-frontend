//path: src/components/Outgoing/OutgoingLabel/ProductList.js

import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const ProductList = ({ selectedProducts }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Produk yang Dikirim
      </Typography>
      <List>
        {selectedProducts.map((product, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <Grid container>
                <Grid xs={6}>
                  <ListItemText
                    primary={`Nama Produk: ${product.product.nama}`}
                    secondary={`Jumlah: ${product.variants.reduce(
                      (sum, variant) => sum + variant.jumlah,
                      0
                    )}`}
                  />
                </Grid>
                <Grid xs={6}>
                  <ListItemText
                    primary={`Finishing: ${
                      product.variants[0]?.final_finishing || "-"
                    }`}
                    secondary={`Warna: ${
                      product.variants[0]?.final_warna || "-"
                    }`}
                  />
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ProductList;
