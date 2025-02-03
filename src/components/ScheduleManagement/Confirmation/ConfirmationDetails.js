// path: src/components/ScheduleManagement/Confirmation/ConfirmationDetails.js
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ConfirmationDetails = ({ selectedStocks }) => {
  return (
    <Box sx={{ marginBottom: 2, padding: 2, borderBottom: "1px solid #ddd" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Detail Produk
      </Typography>
      {selectedStocks.length > 0 ? (
        <Grid container spacing={2}>
          {selectedStocks.map((stock, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Paper elevation={2} sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 2 }}>
                    <img
                      src={stock.foto_produk}
                      alt={stock.produk_nama}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 5,
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 10 }}>
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {stock.produk_nama} x {stock.jumlah}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Grid container spacing={1}>
                            <Grid size={6}>
                              {stock.final_warna && (
                                <Typography>Warna</Typography>
                              )}
                              {stock.final_finishing && (
                                <Typography>Finishing</Typography>
                              )}
                              <Typography>Lokasi</Typography>
                            </Grid>
                            <Grid size={6}>
                              {stock.final_warna && (
                                <Typography>: {stock.final_warna}</Typography>
                              )}
                              {stock.final_finishing && (
                                <Typography>
                                  : {stock.final_finishing}
                                </Typography>
                              )}
                              <Typography>: {stock.final_gudang}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          {stock.final_is_custom && (
                            <Box sx={{ border: "1px solid #ddd", padding: 2 }}>
                              <Typography variant="h6" sx={{ mb: 1 }}>
                                🔹 Custom Detail
                              </Typography>
                              <Grid container spacing={1}>
                                <Grid size={6}>
                                  {stock.final_ukuran && (
                                    <Typography>Ukuran</Typography>
                                  )}
                                  {stock.final_kain && (
                                    <Typography>Kain</Typography>
                                  )}
                                  {stock.final_kaki && (
                                    <Typography>Kaki</Typography>
                                  )}
                                  {stock.final_dudukan && (
                                    <Typography>Dudukan</Typography>
                                  )}
                                  {stock.final_bantal_peluk !== null && (
                                    <Typography>Bantal Peluk</Typography>
                                  )}
                                  {stock.final_bantal_sandaran !== null && (
                                    <Typography>Bantal Sandaran</Typography>
                                  )}
                                </Grid>
                                <Grid size={6}>
                                  {stock.final_ukuran && (
                                    <Typography>
                                      : {stock.final_ukuran}
                                    </Typography>
                                  )}
                                  {stock.final_kain && (
                                    <Typography>
                                      : {stock.final_kain}
                                    </Typography>
                                  )}
                                  {stock.final_kaki && (
                                    <Typography>
                                      : {stock.final_kaki}
                                    </Typography>
                                  )}
                                  {stock.final_dudukan && (
                                    <Typography>
                                      : {stock.final_dudukan}
                                    </Typography>
                                  )}
                                  {stock.final_bantal_peluk !== null && (
                                    <Typography>
                                      : {stock.final_bantal_peluk}
                                    </Typography>
                                  )}
                                  {stock.final_bantal_sandaran !== null && (
                                    <Typography>
                                      : {stock.final_bantal_sandaran}
                                    </Typography>
                                  )}
                                </Grid>
                              </Grid>
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>Tidak ada produk yang dipilih.</Typography>
      )}
    </Box>
  );
};

export default ConfirmationDetails;
