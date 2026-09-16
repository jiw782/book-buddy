import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        <img src="/books.png" alt="Book Buddy logo" />
        <p>Book Buddy</p>
      </NavLink>
      <nav>
        <NavLink to="/books">Books</NavLink>
        {token ? (
          <>
            <NavLink to="/account">Account</NavLink>
            <a href="#" onClick={() => logout()}>
              Log out
            </a>
          </>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
