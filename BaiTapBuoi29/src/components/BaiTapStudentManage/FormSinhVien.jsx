import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStudentStore } from "../../store/studentStore";

export default function FormSinhVien() {
  const { studentEdit, addStudent, updateStudent, setStudentEdit } = useStudentStore();

  const signupSchema = Yup.object().shape({
    maSV: Yup.string().required("Mã SV không được để trống!"),
    hoTen: Yup.string().required("Họ tên không được để trống!"),
    soDienThoai: Yup.string()
      .required("Số điện thoại không được để trống!")
      .matches(/^[0-9]{10,11}$/, "Số điện thoại phải từ 10-11 chữ số!"),
    email: Yup.string()
      .required("Email không được để trống!")
      .email("Email không đúng định dạng!"),
  });

  const formik = useFormik({
    enableReinitialize: true, 
    initialValues: {
      maSV: studentEdit ? studentEdit.maSV : "",
      hoTen: studentEdit ? studentEdit.hoTen : "",
      soDienThoai: studentEdit ? studentEdit.soDienThoai : "",
      email: studentEdit ? studentEdit.email : "",
    },
    validationSchema: signupSchema,
    onSubmit: (values, { resetForm }) => {
      if (studentEdit) {
        updateStudent(values);
      } else {
        const success = addStudent(values);
        if (success) {
          resetForm(); 
        }
      }
    },
  });

  return (
    <div className="card text-left mb-4">
      <div className="card-header bg-dark text-white font-weight-bold">
        {studentEdit ? "CHỈNH SỬA SINH VIÊN" : "THÔNG TIN SINH VIÊN"}
      </div>
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label>Mã SV</label>
              <input
                type="text"
                className="form-control"
                disabled={studentEdit !== null} // Khóa mã SV khi sửa
                {...formik.getFieldProps("maSV")}
                // name="maSV"
                // value={formik.values.maSV}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
              />
              {formik.errors.maSV && formik.touched.maSV && (
                <small className="text-danger">{formik.errors.maSV}</small>
              )}
            </div>
            
            <div className="col-md-6 form-group mb-3">
              <label>Họ tên</label>
              <input
                type="text"
                className="form-control"
                {...formik.getFieldProps("hoTen")}
                // name="hoTen"
                // value={formik.values.hoTen}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
              />
              {formik.errors.hoTen && formik.touched.hoTen && (
                <small className="text-danger">{formik.errors.hoTen}</small>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label>Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                {...formik.getFieldProps("soDienThoai")}
                // name="soDienThoai"
                // value={formik.values.soDienThoai}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
              />
              {formik.errors.soDienThoai && formik.touched.soDienThoai && (
                <small className="text-danger">{formik.errors.soDienThoai}</small>
              )}
            </div>

            <div className="col-md-6 form-group mb-3">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                {...formik.getFieldProps("email")}
                // name="email"
                // value={formik.values.email}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <small className="text-danger">{formik.errors.email}</small>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`btn ${studentEdit ? "btn-primary" : "btn-success"}`}
            disabled={!formik.isValid || !formik.dirty} 
          >
            {studentEdit ? "Cập nhật sinh viên" : "Thêm sinh viên"}
          </button>

          {studentEdit && (
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={() => {
                setStudentEdit(null);
                formik.resetForm();
              }}
            >
              Hủy
            </button>
          )}
        </form>
      </div>
    </div>
  );
}