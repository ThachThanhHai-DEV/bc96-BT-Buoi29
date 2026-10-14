import React from "react";
import { useBookingStore } from "../../store/bookingStore";

export default function HangGhe({ hangGhe }) {
  const { gheDangChon, toggleGhe } = useBookingStore();


  if (hangGhe.hang === "") {
    return (
      <div className="d-flex justify-content-center align-items-center mb-1">
        <div className="d-flex">
        <span className="seat-label" style={{ visibility: "hidden" }}></span>
          {hangGhe.danhSachGhe.map((ghe, idx) => (
            <span key={idx} className="seat-label fw-bold text-warning">
              {ghe.soGhe}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Các hàng ghế chính 
  return (
    <div className="d-flex justify-content-center align-items-center mb-1">
      
      <div className="d-flex">
     
      <span className="seat-label fw-bold text-warning">{hangGhe.hang}</span>
        {hangGhe.danhSachGhe.map((ghe) => {
          const isSelected = gheDangChon.some((g) => g.soGhe === ghe.soGhe);

          let classGhe = "seat-btn seat-empty";
          if (ghe.daDat) classGhe = "seat-btn seat-reserved";
          else if (isSelected) classGhe = "seat-btn seat-selected";

          return (
            <button
              key={ghe.soGhe}
              className={classGhe}
              disabled={ghe.daDat}
              onClick={() => toggleGhe(ghe)}
            >
              {ghe.soGhe}
            </button>
          );
        })}
      </div>
    </div>
  );
}