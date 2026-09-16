import { Link } from "react-router";
import { useState, useEffect } from "react";
import { getBooks } from "../api/books";

import "./books.css";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const syncBooks = async () => {
      const data = await getBooks();
      setBooks(data);
    };
    syncBooks();
  }, []);

  const [filter, setFilter] = useState("");
  const filteredBooks = books.filter((book) =>
    new RegExp(filter, "i").test(book.title + book.author),
  );

  return (
    <>
      <h1>Catalog</h1>
      <SearchForm setFilter={setFilter} />
      <ul id="books">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </ul>
    </>
  );
}

function SearchForm({ setFilter }) {
  const onSearch = (formData) => {
    const search = formData.get("search");
    setFilter(search);
  };
  return (
    <form action={onSearch} id="search">
      <input
        name="search"
        type="search"
        placeholder="Search for a book..."
        aria-label="Search for a book"
      />
      <button>Search</button>
    </form>
  );
}

function BookCard({ book }) {
  return (
    <li className="book">
      <figure className="center-children">
        <img src={book.coverimage} alt={"Cover image of " + book.title} />
      </figure>
      <div>
        <h2>
          <Link to={"/books/" + book.id}>{book.title}</Link>
        </h2>
        <p className="author">{book.author}</p>
        <p>{book.description.slice(0, 150)}...</p>
      </div>
    </li>
  );
}
