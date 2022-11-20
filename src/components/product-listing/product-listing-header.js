import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import ViewDayIcon from "@mui/icons-material/ViewDay";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ProductListingHeader = ({
  setListView,
  hadleSearch,
  itemsPerPage,
  handleItemsPerPage,
  currentPage,
  handleCurrentPage,
  totalPages,
  search,
}) => {
  return (
    <Paper
      elevation="12"
      square
      sx={{
        p: 3,
        mt: 3,
      }}
    >
      <Grid container spacing={5}>
        {/* Switch view */}
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton aria-label="normal-list" onClick={() => setListView(false)}>
            <CalendarViewDayIcon />
          </IconButton>
          <IconButton aria-label="big-list" onClick={() => setListView(true)}>
            <ViewDayIcon />
          </IconButton>
        </Grid>

        {/* Total per page */}
        <Grid item>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" component="p">
              Items
            </Typography>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 50 }}>
              <Select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPage(e.target.value)}
                label="Items per page"
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2" component="p">
              of {totalPages} pages
            </Typography>
          </Box>
        </Grid>

        {/* Search */}
        <Grid
          item
          xs
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
          }}
        >
          <FormControl fullWidth>
            <OutlinedInput placeholder="Please enter text" onChange={hadleSearch} />
          </FormControl>
          <Button
            variant="contained"
            sx={{
              md: {
                display: "block",
              },
            }}
          >
            <SearchIcon />
          </Button>
        </Grid>

        {/* Pagination */}
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            width: "130px",
          }}
        >
          <IconButton
            aria-label="prev-page"
            size="small"
            onClick={() => currentPage > 1 && handleCurrentPage(currentPage - 1)}
          >
            <ArrowBackIosIcon fontSize="inherit" />
          </IconButton>
          <TextField
            id="standard-basic"
            className="is-flex is-align-items-center filter-input__search"
            variant="standard"
            value={currentPage}
            onChange={(e) => handleCurrentPage(inputBetweenNumber(e.target.value, totalPages))}
          />
          <IconButton
            aria-label="next-page"
            size="small"
            onClick={() => currentPage < totalPages && handleCurrentPage(currentPage + 1)}
          >
            <ArrowForwardIosIcon fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductListingHeader;
