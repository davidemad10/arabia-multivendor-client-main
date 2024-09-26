import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./i18n.tsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./i18n.js";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3, retryDelay: 1000 } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback="loading">
            <App />
          </Suspense>
        </QueryClientProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
