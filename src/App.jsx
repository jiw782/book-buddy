import { Route, Routes } from "react-router";

import Account from "./account/Account";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Book from "./books/Book";
import Books from "./books/Books";
import Error404 from "./Error404";
import Layout from "./layout/Layout";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Books />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<Book />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
