import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import { regexEmail } from "../../../helpers/regexp";
import { newsletterHasEmail, postMail } from "../../../services/newsletter";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [inputEmail, setInputEmail] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const isEmail = regexEmail.test(inputEmail);

    // if email is invalid
    if (!isEmail)
      return toast.error("Wrong email address.", {
        position: "top-left",
      });

    newsletterHasEmail(inputEmail).then((hasEmail) => {
      if (hasEmail) {
        toast.info("You are already subscribed to our newsletter.", {
          position: "top-left",
        });
      } else {
        postMail(inputEmail);
      }
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "primary.middleBlack",
        py: {
          xs: 4,
          md: 7,
        },
        mt: 5,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          <Grid
            item
            sx={{
              width: {
                xs: "100%",
                md: "auto",
              },
            }}
          >
            <Typography
              variant="h4"
              component="h4"
              color="white"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  xs: "center",
                  md: "flex-start",
                },
              }}
            >
              <LocalPostOfficeIcon
                fontSize="large"
                sx={{
                  color: "primary.main",
                  mr: 2,
                }}
              />
              Newsletter
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography
              variant="h6"
              component="p"
              color="white"
              sx={{
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              Subscribe and follow our social media pages to keep up to date with news, sales and
              product promotions
            </Typography>
          </Grid>
          <Grid item xs>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                display: "flex",
                width: {
                  xs: "100%",
                },
                margin: "0 auto",
              }}
              onSubmit={(event) => handleSubmit(event)}
            >
              <FormControl
                fullWidth
                sx={{
                  backgroundColor: "white",
                }}
              >
                <OutlinedInput
                  placeholder="e-mail"
                  onChange={(event) => setInputEmail(event.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
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
                  }}
                >
                  Submit
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Newsletter;
