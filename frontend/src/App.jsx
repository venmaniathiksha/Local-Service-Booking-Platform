import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookings from "./pages/Bookings";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bookings />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;