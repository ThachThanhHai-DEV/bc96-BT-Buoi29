import React from "react";
import { useBookingStore } from "../../store/bookingStore";

export default function ThongTinDatGhe() {
  const { gheDangChon, toggleGhe } = useBookingStore();

  // Tính tổng tiền các ghế đang chọn
  const tongTien = gheDangChon.reduce(
    (sum, ghe) => sum + (ghe.gia || 0),
    0
  );

  return (
    <div className="text-light mt-4">
      <h5 className="text-warning mb-3">DANH SÁCH GHẾ BẠN ĐANG CHỌN:</h5>
      
      <table className="table table-bordered table-dark text-center mb-2">
        <thead>
          <tr>
            <th>Số ghế</th>
            <th>Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {gheDangChon.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-muted">Chưa chọn ghế nào</td>
            </tr>
          ) : (
            gheDangChon.map((ghe) => (
              <tr key={ghe.soGhe}>
                <td className="text-warning fw-bold">{ghe.soGhe}</td>
                <td>{ghe.gia.toLocaleString()} VNĐ</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm px-3"
                    onClick={() => toggleGhe(ghe)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <th>Tổng tiền</th>
            <th colSpan="2" className="text-warning fs-5">
              {tongTien.toLocaleString()} VNĐ
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}