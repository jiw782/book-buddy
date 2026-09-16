import { useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteReservation, getReservations } from "../api/reservations";
import { useAuth } from "../auth/AuthContext";

export default function Reservations() {
  const { token } = useAuth();
  const [reservations, setReservations] = useState([]);

  const syncReservations = async () => {
    const data = await getReservations(token);
    setReservations(data);
  };

  useEffect(() => {
    syncReservations();
  }, []);

  if (reservations.length <= 0)
    return (
      <p>
        You have not reserved any books yet. Browse{" "}
        <Link to="/books">our catalog</Link>!
      </p>
    );

  return (
    <ul id="reservations">
      {reservations.map((reservation) => (
        <Reservation
          key={reservation.id}
          reservation={reservation}
          syncReservations={syncReservations}
        />
      ))}
    </ul>
  );
}

function Reservation({ reservation, syncReservations }) {
  const { token } = useAuth();

  const returnBook = async () => {
    try {
      await deleteReservation(token, reservation.id);
      syncReservations();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <li className="reservation">
      <Link to={"/books/" + reservation.bookid}>{reservation.title}</Link>
      <p>{reservation.author}</p>
      <button onClick={returnBook}>Return book</button>
    </li>
  );
}
