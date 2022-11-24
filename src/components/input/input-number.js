import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const InputNumber = ({ amount }) => {
  
  return (
    <>
      <FormControl
        sx={{
          display: "flex",
          alignItems: "cetner",
          flexDirection: "row",
          border: 1,
          borderColor: 'primary.gray'
        }}
      >
        <OutlinedInput
          sx={{
            maxWidth: "70px",
            fieldset: {
              border: 0, 
            }            
          }}
          value={amount}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "primary.gray",
            borderLeft: 1,
            borderColor: 'primary.gray'
          }}
        >
          <IconButton
            aria-label="increment"
            sx={{
              borderRadius: 0,
              "&:hover": {
                backgroundColor: "primary.lightGray",
              },
            }}
          >
            <AddIcon
              sx={{
                fontSize: "12px",
              }}
            />
          </IconButton>
          <Divider />
          <IconButton
            aria-label="decrement"
            sx={{
              borderRadius: 0,
              "&:hover": {
                backgroundColor: "primary.lightGray",
              },
            }}
          >
            <RemoveIcon
              sx={{
                fontSize: "12px",
              }}
            />
          </IconButton>
        </Box>
      </FormControl>

      <Button
        variant="contained"
        sx={{
          py: 2,
          ml: 1,
        }}
      >
        <AddShoppingCartIcon />{" "}
        <Box
          component="span"
          sx={{
            ml: 1,
            display: {
              xs: "none",
              xl: "block",
            },
          }}
        >
          Add to cart
        </Box>
      </Button>
    </>
  );
};

export default InputNumber;
