import { useEffect, useState } from "react";
import { getBookings, createBooking, updateBooking, deleteBooking } from "../api";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    customer: "",
    service: "",
    location: ""
  });
  const services = ["Plumber", "Electrician", "Carpenter", "Painter", "Cleaner"];
  const fetchBookings = async () => {
    const res = await getBookings();
    setBookings(res.data);
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBooking({
      customer: form.customer,
      service: { title: form.service },
      location: form.location,
      bookingTime: new Date(),
      status: "Pending" 
    });
    setForm({ customer: "", service: "", location: "" });
    fetchBookings();
  };
  const handleDelete = async (id) => {
    await deleteBooking(id);
    fetchBookings();
  };
  const handleAction = async (booking) => {
    let newStatus = booking.status;
    if (booking.status === "Pending") newStatus = "Confirmed";
    else if (booking.status === "Confirmed") newStatus = "Completed";
    await updateBooking(booking._id, { status: newStatus });
    fetchBookings();
  };
  const getStatusColor = (status) => {
    if (status === "Pending") return "#FFC107"; // Yellow
    if (status === "Confirmed") return "#007BFF"; // Blue
    if (status === "Completed") return "#4CAF50"; // Green
    return "#ccc";
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Local Service Booking Platform</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Customer Name"
          value={form.customer}
          onChange={(e) => setForm({ ...form, customer: e.target.value })}
          required
          style={styles.input}
        />
        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          required
          style={styles.input}
        >
          <option value="">Select Service</option>
          {services.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Book Service</button>
      </form>

      {/* TABLE */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th>S.No</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={b._id} style={i % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <td>{i + 1}</td>
              <td>{b.customer}</td>
              <td>{b.service?.title}</td>
              <td>{b.location}</td>
              <td>
                <span style={{ ...styles.statusBadge, backgroundColor: getStatusColor(b.status) }}>
                  {b.status}
                </span>
              </td>
              <td>
                {b.status !== "Completed" && (
                  <button style={styles.actionButton} onClick={() => handleAction(b)}>
                    {b.status === "Pending" ? "Confirm" : "Complete"}
                  </button>
                )}
                <button style={styles.deleteButton} onClick={() => handleDelete(b._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "50px auto",
    padding: "30px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f4f8",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
  },
  title: {
    fontSize: "32px",
    marginBottom: "25px",
    color: "#333"
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "30px"
  },
  input: {
    flex: 1,
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "12px 30px",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "16px",
    textAlign: "center",
    borderRadius: "6px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  headerRow: {
    backgroundColor: "#007BFF",
    color: "#fff",
    height: "50px"
  },
  evenRow: {
    backgroundColor: "#ffffff"
  },
  oddRow: {
    backgroundColor: "#f2f2f2"
  },
  statusBadge: {
    padding: "8px 12px",
    borderRadius: "12px",
    fontWeight: "bold",
    color: "#fff",
    minWidth: "100px",
    display: "inline-block"
  },
  actionButton: {
    padding: "6px 12px",
    marginRight: "5px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default Bookings;