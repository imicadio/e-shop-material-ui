import { Box, Button, FormControl, OutlinedInput } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ customClass, children, wordEntered, handleSearch, handleClear, btnSearch, searchbar }) => {

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        width: '100%'
      }}>
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
          <SearchIcon />
        </Button>
      </Box>
      
    </Box>
  );
};

export default Search;
