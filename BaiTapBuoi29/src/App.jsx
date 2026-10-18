import { Route, Routes } from "react-router-dom";
import MovieSeatSelection from './components/BaiTapBookingTicket/MovieSeatSelection'
import QuanLySinhVien from "./components/BaiTapStudentManage/QuanLySinhVien";


function App() {

  return (

  <Routes>
        <Route path="movie-booking" element={<MovieSeatSelection />} />
        <Route path="student-manager" element={<QuanLySinhVien />} />
      </Routes>
    
  )
}

export default App
