import { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, FormHelperText, Grid, Tab, Tabs, TextField, Typography } from "@mui/material";
import { auth, ENABLE_AUTH } from "../../lib/auth";
import { Logo } from "../../components/logo";
import { useAuthContext } from "../../contexts/auth-context";
import Router from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebaseAuth } from "../../lib/firebase";
import { userObject } from "../../helpers/userObject";

const Page = () => {
  const [tab, setTab] = useState("email");
  const [emailSent, setEmailSent] = useState(false);
  const authContext = useAuthContext();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Your password is too short.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const { email, password } = values;

        const user = {};

        // Update Auth Context state
        authContext.signIn(user, email, password);

        helpers.setSubmitting(false);
        setEmailSent(true);
        // Redirect to home page
        Router.push("/").catch(console.error);
      } catch (err) {
        console.error(err);
        helpers.setFieldError("submit", err.message || "Something went wrong");
        helpers.setSubmitting(false);
      }
    },
  });

  const formikRegister = useFormik({
    initialValues: {
      email: "",
      passwordRegister: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      passwordRegister: Yup.string()
        .required("Password is required")
        .min(8, "Your password is too short.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("passwordRegister"), null], "Passwords must match"),
    }),

    onSubmit: async (values, helpers) => {
      const createUserRole = async (postData) => {
        try {
          const response = await fetch(
            process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL + "/user.json",
            {
              method: "POST",
              mode: "cors",
              cache: "no-cache",
              credentials: "same-origin",
              headers: {
                "Content-Type": "application/json",
              },
              redirect: "follow",
              referrerPolicy: "no-referrer",
              body: JSON.stringify(postData),
            }
          );

          if (response.status < 200 || response.status >= 400) {
            throw new Error("Something went wrong");
          }
        } catch (error) {
          console.log(" 😣😣😣 FAILED POST DATA: ", error);
        }
      };

      const { email, passwordRegister } = values;

      createUserWithEmailAndPassword(firebaseAuth, email, passwordRegister)
        .then((userCredential) => {
          const user = userCredential.user;

          const userBody = userObject;

          userBody.id = user.uid;
          userBody.email = email;
          userBody.password = passwordRegister;
          userBody.role = "user";

          createUserRole(userBody);

          toast.success("Succes Register...");
        })
        .catch((error) => {
          toast.error(error.message);
        });
      Router.push("/").catch(console.error);
    },
  });

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const handleRetry = () => {
    setEmailSent(false);
  };

  return (
    <>
      <ToastContainer />
      <Head>
        <title>Sign in | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: "flex",
          flex: "1 1 auto",
        }}
      >
        <Grid container sx={{ flex: "1 1 auto" }}>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              backgroundColor: "neutral.50",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                p: 3,
              }}
            >
              <NextLink href="/" passHref>
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                  />
                </a>
              </NextLink>
            </Box>
            <Box
              sx={{
                flex: "1 1 auto",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  maxWidth: 500,
                  px: 3,
                  py: "100px",
                  width: "100%",
                }}
              >
                {emailSent ? (
                  <div>
                    <Typography sx={{ mb: 1 }} variant="h4">
                      Confirm your email
                    </Typography>
                    <Typography>
                      We emailed a magic link to&nbsp;
                      <Box
                        component="span"
                        sx={{
                          color: "primary.main",
                        }}
                      >
                        {formik.values.email}
                      </Box>
                      <br />
                      Click the link to to log in.
                    </Typography>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        gap: 3,
                        mt: 3,
                      }}
                    >
                      <Typography color="text.secondary" variant="body2">
                        Wrong email?
                      </Typography>
                      <Button color="inherit" onClick={handleRetry}>
                        Use a different email
                      </Button>
                    </Box>
                  </div>
                ) : (
                  <div>
                    <Typography sx={{ mb: 1 }} variant="h4">
                      Welcome
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }} variant="body2">
                      Sign up on the internal platform
                    </Typography>
                    <Tabs onChange={handleTabChange} sx={{ mb: 3 }} value={tab}>
                      <Tab label="Email" value="email" />
                      <Tab label="Register" value="register" />
                    </Tabs>
                    {tab === "email" && (
                      <div>
                        <TextField
                          error={Boolean(formik.touched.email && formik.errors.email)}
                          fullWidth
                          helperText={formik.touched.email && formik.errors.email}
                          label="Email Address"
                          name="email"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="email"
                          value={formik.values.email}
                          variant="outlined"
                        />

                        <TextField
                          error={Boolean(formik.touched.password && formik.errors.password)}
                          fullWidth
                          helperText={formik.touched.password && formik.errors.password}
                          label="Password email"
                          name="password"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="password"
                          value={formik.values.password}
                          variant="outlined"
                          sx={{ mt: 3 }}
                        />

                        <FormHelperText sx={{ mt: 1 }}>Enter a valid email.</FormHelperText>
                        {formik.errors.submit && (
                          <Typography color="error" sx={{ mt: 2 }} variant="body2">
                            {formik.errors.submit}
                          </Typography>
                        )}
                        <Button
                          fullWidth
                          size="large"
                          sx={{ mt: 3 }}
                          onClick={() => formik.handleSubmit()}
                          variant="contained"
                          disabled={!(formik.isValid && formik.dirty)}
                        >
                          Login
                        </Button>
                      </div>
                    )}
                    {tab === "register" && (
                      <div>
                        {/* <Typography
                          sx={{ mb: 1 }}
                          variant="h6"
                        >
                          Not available in the demo
                        </Typography> */}
                        {/* <Typography color="text.secondary">
                          Zalter Identity does support SMS passcodes, but to prevent unnecessary costs we disabled this feature in the demo.
                        </Typography> */}
                        <TextField
                          error={Boolean(
                            formikRegister.touched.email && formikRegister.errors.email
                          )}
                          fullWidth
                          helperText={formikRegister.touched.email && formikRegister.errors.email}
                          label="Email Address"
                          name="email"
                          onBlur={formikRegister.handleBlur}
                          onChange={formikRegister.handleChange}
                          type="email"
                          value={formikRegister.values.email}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(
                            formikRegister.touched.passwordRegister &&
                              formikRegister.errors.passwordRegister
                          )}
                          fullWidth
                          helperText={
                            formikRegister.touched.passwordRegister &&
                            formikRegister.errors.passwordRegister
                          }
                          label="Password"
                          name="passwordRegister"
                          onBlur={formikRegister.handleBlur}
                          onChange={formikRegister.handleChange}
                          type="password"
                          value={formikRegister.values.passwordRegister}
                          variant="outlined"
                          sx={{ my: 3 }}
                        />
                        <TextField
                          error={Boolean(
                            formikRegister.touched.confirmPassword &&
                              formikRegister.errors.confirmPassword
                          )}
                          fullWidth
                          helperText={
                            formikRegister.touched.confirmPassword &&
                            formikRegister.errors.confirmPassword
                          }
                          label="Confirm Password"
                          name="confirmPassword"
                          onBlur={formikRegister.handleBlur}
                          onChange={formikRegister.handleChange}
                          type="password"
                          value={formikRegister.values.confirmPassword}
                          variant="outlined"
                        />
                        <Button
                          fullWidth
                          size="large"
                          sx={{ mt: 3 }}
                          onClick={() => formikRegister.handleSubmit()}
                          variant="contained"
                          disabled={!(formikRegister.isValid && formikRegister.dirty)}
                        >
                          Register
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              alignItems: "center",
              background: "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              "& img": {
                maxWidth: "100%",
              },
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography
                align="center"
                color="inherit"
                sx={{
                  fontSize: "24px",
                  lineHeight: "32px",
                  mb: 1,
                }}
                variant="h1"
              >
                Authentication sponsored by&nbsp;
                <Box
                  component="a"
                  href="https://zalter.com?ref=devias-mk-react"
                  sx={{ color: "#15B79E" }}
                  target="_blank"
                >
                  zalter.com
                </Box>
              </Typography>
              <Typography align="center" sx={{ mb: 3 }} variant="subtitle1">
                Create secure, seamless user experiences with Zalter Passwordless Authentication.
              </Typography>
              <img alt="" src="/static/images/sign-in-illustration.svg" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Page;

export async function getStaticProps() {
  return {
    props: {
      protected: false,
    },
  };
}
