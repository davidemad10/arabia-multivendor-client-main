import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./i18n.tsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./i18n.js";
import { Backdrop, CircularProgress } from "@mui/material";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3, retryDelay: 1000 } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider autoHideDuration={3000}>
            <Suspense
              fallback={
                <Backdrop
                  sx={(theme) => ({ color: "#fff", zIndex: 1 })}
                  open={true}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              }
            >
              <App />
            </Suspense>
          </SnackbarProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
