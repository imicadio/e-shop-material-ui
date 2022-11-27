import {
  Box,
  Button,
  FormControl,
  IconButton,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

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
        <TextField
          placeholder="Search"
          type="text"
          variant="outlined"
          fullWidth
          onChange={handleSearch}
          value={wordEntered}
          InputProps={{
            endAdornment: wordEntered && (
              <IconButton aria-label="toggle password visibility" onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            ),
          }}
        />

        {/* <FormControl fullWidth>
          <OutlinedInput
            placeholder="Search prouct in list"
            onChange={handleSearch}
            value={wordEntered}
          />
          <IconButton aria-label="delete">
            <ClearIcon />
          </IconButton>
        </FormControl> */}
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
