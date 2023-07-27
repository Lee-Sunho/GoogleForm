import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { defaultTheme } from "./style/theme";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </>
);
