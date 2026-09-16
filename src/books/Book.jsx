import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, useParams } from "react-router";

import { getBook } from "../api/books";
import { createReservation } from "../api/reservations";

export default function Book() {
  const { token } = useAuth();
  const { id } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    const syncBook = async () => {
      const data = await getBook(id);
      setBook(data);
    };
    syncBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div id="book">
      <figure className="center-children">
        <img alt={"Cover image of " + book.title} src={book.coverimage} />
      </figure>
      <section>
        <h1>{book.title}</h1>
        <p>{book.author}</p>
        <p>{book.description}</p>
        {token && <ReserveButton book={book} />}
      </section>
    </div>
  );
}

function ReserveButton({ book }) {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const reserveBook = async () => {
    setError(null);

    try {
      await createReservation(token, book.id);
      navigate("/account");
    } catch (e) {
      setError(e.message);
    }
  };

  if (!book.available)
    return <button disabled>Book is already reserved.</button>;

  return (
    <>
      <button onClick={reserveBook}>Reserve this book</button>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
