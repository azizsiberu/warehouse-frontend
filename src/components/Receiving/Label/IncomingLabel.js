// path: /src/components/Receiving/Label/IncomingStockLabel.js
import React, { useRef } from "react";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SelectedProductList from "./SelectedProductList";

const IncomingLabel = ({ selectedProducts, selectedLocation }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <Box>
      <Box ref={printRef} id="printableArea">
        <Grid container spacing={2}>
          {selectedProducts?.map((productData, index) => {
            const jumlah = productData.jumlah || 1;
            return Array.from({ length: jumlah }).map((_, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={`${index}-${i}`}>
                <SelectedProductList
                  selectedProducts={[productData]}
                  showImage={false}
                />
              </Grid>
            ));
          })}
        </Grid>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          position: "sticky",
          bottom: 0,
          backgroundColor: "#fff",
          py: 2,
          zIndex: 10,
          borderTop: "1px solid #ddd",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePrint}
        >
          Print
        </Button>
      </Box>
    </Box>
  );
};

export default IncomingLabel;
