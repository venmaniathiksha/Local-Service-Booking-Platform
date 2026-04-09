import axios from "axios";
export const API_BASE = "http://localhost:5000/api/bookings";
export const getBookings = () => axios.get(API_BASE);
export const createBooking = (data) => axios.post(`${API_BASE}/create`, data);
export const deleteBooking = (id) => axios.delete(`${API_BASE}/${id}`);
export const updateBooking = (id, data) => axios.put(`${API_BASE}/${id}`, data);