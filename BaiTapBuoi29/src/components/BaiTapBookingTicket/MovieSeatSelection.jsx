import React from "react";
import danhSachGheData from "../../data/danhSachGhe.json";
import { useBookingStore } from "../../store/bookingStore";
import HangGhe from "./HangGhe";
import ThongTinDatGhe from "./ThongTinDatGhe";
import "./BaiTapBookingTicket.css";

export default function MovieSeatSelection() {
  const {
    name,
    numSeats,
    isSelecting,
    danhSachDaXacNhan,
    setName,
    setNumSeats,
    startSelecting,
    confirmSelection,
  } = useBookingStore();

  return (
    <div
      style={{
        backgroundImage: `url('/bgmovie.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.85)", minHeight: "100vh", padding: "30px 10px" }}>
        <h1 className=" text-center text-warning mb-4">MOVIE SEAT SELECTION</h1>

        <div className="booking-container">
          <p className="text-warning mb-3">Fill The Required Details Below And Select Your Seats</p>

          {/* Form Nhập liệu */}
          <div className="row mb-3">
            <div className="col-md-6 mb-2">
              <label className="form-label fw-bold">Name <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                value={name}
                disabled={isSelecting}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên..."
              />
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label fw-bold">Number of Seats <span className="text-danger">*</span></label>
              <input
                type="number"
                min="1"
                className="form-control"
                value={numSeats || ""}
                disabled={isSelecting}
                onChange={(e) => setNumSeats(e.target.value)}
                placeholder="Nhập số ghế..."
              />
            </div>
          </div>

          <button className="btn btn-start mb-4" onClick={startSelecting} disabled={isSelecting}>
            {isSelecting ? "Selecting Seats..." : "Start Selecting"}
          </button>

          {/* Chú thích loại ghế (Legend) */}
          <div className="legend-box">
            <div className="legend-item">
              <span className="square-icon square-selected"></span> Selected Seat
            </div>
            <div className="legend-item">
              <span className="square-icon square-reserved"></span> Reserved Seat
            </div>
            <div className="legend-item">
              <span className="square-icon square-empty"></span> Empty Seat
            </div>
          </div>
         {/* Màn hình (Screen) */}
          <div className="screen-box">SCREEN THIS WAY</div>
          {/* Sơ đồ Ghế (Duyệt qua danh sách và gọi component HangGhe) */}
          <div className="text-center mb-4 overflow-auto">
            <div className="seat-matrix-container">
              {danhSachGheData.map((hangGhe, idx) => (
                <HangGhe key={idx} hangGhe={hangGhe} />
              ))}
            </div>
          </div>

         

          {/* Khu vực hiển thị danh sách ghế đang chọn tạm thời & Tổng tiền */}
          <ThongTinDatGhe />

          <div className="text-center my-4">
            <button className="btn btn-confirm px-5 py-2" onClick={confirmSelection}>
              Confirm Selection
            </button>
          </div>

          {/* Bảng Kết Quả Các Lượt Đặt Thành Công */}
          <h3 className="text-warning text-center mt-5 mb-3">DANH SÁCH CÁC VÉ ĐÃ ĐẶT</h3>
          <table className="booking-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Number of Seats</th>
                <th>Seats</th>
              </tr>
            </thead>
            <tbody>
              {danhSachDaXacNhan.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-muted">Chưa có lượt đặt nào</td>
                </tr>
              ) : (
                danhSachDaXacNhan.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.numSeats}</td>
                    <td className="text-warning fw-bold">{item.seats}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}