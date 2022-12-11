import { Box, Button, Grid } from "@mui/material";
import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalAmount,
  REMOVE_FROM_CART,
} from "../../redux/slice/cartSlice";
import CartContent from "./cart-content/cart-content";
import CartHeaderTop from "./cart-header-top";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialog from "../dialog/dialog";

const CartHeader = forwardRef(({ isOpenCart, setIsOpenCart }, ref) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const cartOverlay = useRef(null);
  const cartWrapper = useRef(null);
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalAmount = useSelector(selectCartTotalAmount);

  // DIALOG
  const handleOpenAlert = () => setOpenAlert(!openAlert);

  const closeModal = () => {
    console.log("ref: ", ref.current);

    cartOverlay.current.style.animationName = "overlayHide";
    cartWrapper.current.style.animationName = "slideIn";

    const delay = setTimeout(() => {
      setIsOpenCart(false);
      clearTimeout(delay);
    }, 1000);

    delay;
  };

  useImperativeHandle(ref, () => ({
    closeModal,
  }));

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [cartItems, dispatch]);

  // SELECTED START

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = cartItems.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const renderResetFilters =
    selected.length > 0 ? (
      <Button
        startIcon={<DeleteIcon />}
        onClick={handleOpenAlert}
        sx={{
          p: 0,
          "&:hover": {
            background: "transparent",
            color: "secondary.main",
            textDecoration: "underline",
          },
        }}
      >
        Delete selected item(s)
      </Button>
    ) : null;

  // SELECTED END

  const handleConfirm = (isConfirmed) => {
    if (isConfirmed) {
      cartItems.map((item) => {
        selected.indexOf(item.id) !== -1 ? dispatch(REMOVE_FROM_CART({ product: item })) : null;
      });

      // dispatch(REMOVE_FROM_CART({ product: selectedRows }));
    }
    setOpenAlert(!openAlert);
  };

  //END DIALOG

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          background: "black",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          animationName: "overlayShow",
          animationDuration: "1s",
          animationFillMode: "forwards",
          "@keyframes overlayShow": {
            "0%": {
              opacity: 0,
            },
            "100%": {
              opacity: 0.5,
            },
          },
          "@keyframes overlayHide": {
            "0%": {
              opacity: 0.5,
            },
            "100%": {
              opacity: 0,
            },
          },
        }}
        ref={cartOverlay}
        onClick={closeModal}
      ></Box>
      <Box
        ref={cartWrapper}
        sx={{
          position: "relative",
          width: "960px",
          height: "450px",
          background: "white",
          zIndex: 4,
          borderRadius: 0,
          animationName: "slideOut",
          animationDuration: "0.9s",
          animationFillMode: "forwards",
          "@keyframes slideOut": {
            "0%": {
              transform: "translateY(-110%)",
            },
            "100%": {
              transform: "translateY(0)",
            },
          },
          "@keyframes slideIn": {
            "0%": {
              transform: "translateY(0)",
            },
            "100%": {
              transform: "translateY(-110%)",
            },
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            backgroundColor: "primary.gray",
            height: "70px",
          }}
        >
          <CartHeaderTop handleSelectAllClick={handleSelectAllClick} />
        </Box>
        <CartContent
          items={cartItems}
          selected={selected}
          handleClick={handleClick}
          totalQuantity={totalQuantity}
          totalAmount={totalAmount}
        />
        <Grid
          container
          sx={{
            backgroundColor: "primary.gray",
          }}
        >
          <Grid
            item
            xs={8}
            p={2}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {renderResetFilters}
          </Grid>
          <Grid item xs={4} p={2}>
            <Button variant="contained" sx={{ width: 1 }}>
              Checkout
            </Button>
          </Grid>
        </Grid>
        <AlertDialog openAlert={openAlert} handleConfirm={handleConfirm} />
      </Box>
    </>
  );
});

export default CartHeader;
