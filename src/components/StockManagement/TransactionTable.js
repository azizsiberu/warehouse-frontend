// path: src/components/StockManagement/TransactionTable.js
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockTransactions } from "../../redux/reducers/stockManagementReducer";
import { Box, Typography } from "@mui/material";
import Loading from "../Loading";

const TransactionTable = ({ productId, warehouseId }) => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(
    (state) => state.stockManagement
  );

  // Fetch transactions when productId or warehouseId changes
  useEffect(() => {
    if (productId) {
      console.log(
        "[TransactionTable] Fetching transactions for productId:",
        productId,
        "and warehouseId:",
        warehouseId
      );
      dispatch(fetchStockTransactions({ productId, warehouseId }));
    }
  }, [productId, warehouseId, dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="h6" color="error">
          {`Error: ${error}`}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {transactions.length === 0 ? (
        <Typography>No transactions found</Typography>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.details} - {transaction.date}
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

TransactionTable.propTypes = {
  productId: PropTypes.number.isRequired,
  warehouseId: PropTypes.number,
};

export default TransactionTable;
