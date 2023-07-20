import React from "react";
import { GlobalStyle } from "./style/GlobalStyle";
import { defaultTheme } from "./style/theme";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { Router } from "./Router";
import store from "./redux/modules/configureStore";

function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <GlobalStyle />
          <Router />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
