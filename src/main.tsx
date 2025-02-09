import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { makeServer } from "./services/mirage.ts";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
