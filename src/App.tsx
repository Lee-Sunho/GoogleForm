import React from "react";
import { GlobalStyle } from "./style/GlobalStyle";
import { defaultTheme } from "./style/theme";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { Router } from "./Router";
import store from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

function App() {
  let persistor = persistStore(store);
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalStyle />
            <Router />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
