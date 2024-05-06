import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage.tsx";
import App from "./routes/App.tsx";
import TransactMoney from "./routes/transact-money.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorPage />}></Route>
      <Route path="/Home" element={<TransactMoney />} errorElement={<ErrorPage />}></Route>
      <Route path="/Send" element={<TransactMoney />} errorElement={<ErrorPage />}></Route>
      <Route path="/Bills" element={<TransactMoney />} errorElement={<ErrorPage />}></Route>
      <Route path="/Record" element={<TransactMoney />} errorElement={<ErrorPage />}></Route>
      <Route path="/Record/:id" element={<TransactMoney />} errorElement={<ErrorPage />}></Route>
      <Route path="/Record/:id/delete" element={<TransactMoney />} errorElement={<ErrorPage />}></Route>
      <Route path="/:user" element={<TransactMoney />} errorElement={<ErrorPage />}></Route>
      <Route path="/:user/update" element={<TransactMoney />} errorElement={<ErrorPage />}></Route>
      <Route path="/:user/delete" element={<TransactMoney />} errorElement={<ErrorPage />}></Route>
    </>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
