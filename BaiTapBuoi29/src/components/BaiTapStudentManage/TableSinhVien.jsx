import React, { useState } from "react";
import { useStudentStore } from "../../store/studentStore";

export default function TableSinhVien() {
  const { mangSinhVien, deleteStudent, setStudentEdit } = useStudentStore();
  const [keyword, setKeyword] = useState("");

  
  const danhSachLoc = mangSinhVien.filter(
    (sv) =>
      sv.hoTen.toLowerCase().includes(keyword.toLowerCase()) ||
      sv.maSV.includes(keyword)
  );

  return (
    <div>
    
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm theo Mã SV hoặc Họ tên..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

   
      <table className="table">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {danhSachLoc.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                Không tìm thấy sinh viên nào
              </td>
            </tr>
          ) : (
            danhSachLoc.map((sv) => (
              <tr key={sv.maSV}>
                <td>{sv.maSV}</td>
                <td>{sv.hoTen}</td>
                <td>{sv.soDienThoai}</td>
                <td>{sv.email}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => setStudentEdit(sv)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(sv.maSV)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}