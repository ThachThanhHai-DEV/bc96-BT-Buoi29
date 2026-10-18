import { create } from "zustand";

export const useStudentStore = create((set, get) => ({

  mangSinhVien: [
    { maSV: "1", hoTen: "Nguyễn Văn A", soDienThoai: "0938111111", email: "nguyenvana@gmail.com" },
    { maSV: "2", hoTen: "Nguyễn Văn B", soDienThoai: "0938222232", email: "nguyenvanb@gmail.com" }
  ],
  
  studentEdit: null,

  addStudent: (newStudent) => {
    const { mangSinhVien } = get();

    if (mangSinhVien.some((item) => item.maSV === newStudent.maSV)) {
      alert("Mã sinh viên đã tồn tại!");
      return false;
    }
    set({ mangSinhVien: [...mangSinhVien, newStudent] });
    return true;
  },


  deleteStudent: (maSV) => {
    const { mangSinhVien } = get();
    set({ mangSinhVien: mangSinhVien.filter((item) => item.maSV !== maSV) });
  },

 
  setStudentEdit: (student) => {
    set({ studentEdit: student });
  },

 
  updateStudent: (studentUpdated) => {
    const { mangSinhVien } = get();
    set({
      mangSinhVien: mangSinhVien.map((item) =>
        item.maSV === studentUpdated.maSV ? studentUpdated : item
      ),
      studentEdit: null, 
    });
  },
}));