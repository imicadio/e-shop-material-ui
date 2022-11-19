import { Fragment } from "react";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthConsumer, AuthProvider } from "../contexts/auth-context";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { registerChartJs } from "../utils/register-chart-js";
import { theme } from "../theme";
import { AuthGuard } from "../components/auth-guard";
import { Loader } from "../components/loader/loader";

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const renderComponent = (auth) => {
    // console.log(auth);
    if (auth.isLoading) return <Loader />;

    if (pageProps.protected && pageProps.userTypes) {
      if (pageProps.protected && pageProps.userTypes.indexOf(auth.user.role) !== -1) {
        return getLayout(<Component {...pageProps} />);
      } else if (!auth.isAuthenticated) {
        return <AuthGuard pageProps={pageProps} />;
      } else {
        return <AuthGuard pageProps={pageProps} />;
      }
    } else {
      return getLayout(<Component {...pageProps} />);
    }
  };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Material Kit Pro</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <AuthConsumer>{(auth) => renderComponent(auth)}</AuthConsumer>
          </AuthProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
