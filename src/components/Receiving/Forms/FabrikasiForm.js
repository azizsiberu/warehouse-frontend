// path: src/components/Receiving/Forms/FabrikasiForm.js

import React, { useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../../redux/reducers/productReducer";

const FabrikasiForm = ({ productId }) => {
  const dispatch = useDispatch();
  const { productDetails } = useSelector((state) => state.products);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body2">Dimensi</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            : {productDetails?.panjang} x {productDetails?.lebar} x{" "}
            {productDetails?.tinggi} cm
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FabrikasiForm;
