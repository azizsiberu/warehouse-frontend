// Path: /src/components/Outgoing/OutgoingLabel/ProductList.js

import React from "react";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";

const ProductList = ({ selectedProducts }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Product List
      </Typography>
      <List>
        {selectedProducts.map((product, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <Typography variant="body2">
                {product.product.nama} -{" "}
                {product.variants.reduce(
                  (sum, variant) => sum + variant.jumlah,
                  0
                )}{" "}
                pcs
              </Typography>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ProductList;
