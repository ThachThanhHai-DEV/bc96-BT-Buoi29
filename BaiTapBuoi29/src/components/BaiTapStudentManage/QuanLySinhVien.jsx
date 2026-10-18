import React from "react";
import FormSinhVien from "./FormSinhVien";
import TableSinhVien from "./TableSinhVien";
import "./StudentManager.css";

export default function QuanLySinhVien() {
  return (

    <div className="student-manager-container container py-5">
      <h2 className="text-center font-weight-bold mb-4">REACT FORM - VALIDATION (ZUSTAND)</h2>
      <FormSinhVien />
      <TableSinhVien />
    </div>
  );
}