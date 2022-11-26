import { Box, Button, FormControl, OutlinedInput, Typography } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({
  customClass,
  children,
  wordEntered,
  handleSearch,
  handleClear,
  btnSearch,
  searchbar,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <FormControl fullWidth>
          <OutlinedInput
            placeholder="Search prouct in list"
            onChange={handleSearch}
            value={wordEntered}
          />
        </FormControl>
        <Button
          variant="contained"
          sx={{
            md: {
              display: "block",
            },
          }}
        >
          <Typography
            variant="body1"
            component="p"
            sx={{
              textTransform: "capitalize",
              fontWeight: "bold",
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            Search
          </Typography>
          <SearchIcon
            sx={{
              display: {
                xs: "block",
                md: "none",
              },
            }}
          />
        </Button>
      </Box>
      {children}
    </Box>
  );
};

export default Search;
