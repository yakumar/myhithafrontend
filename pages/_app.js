import "../styles/globals.css";
import theme from "../theme";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { Provider } from "mobx-react";
import { useStores } from "../hooks/use-stores";

function MyApp({ Component, pageProps }) {
  // const store = useStores();

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />

        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
