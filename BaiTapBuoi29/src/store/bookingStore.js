import { create } from "zustand";

export const useBookingStore = create((set, get) => ({
  name: "",
  numSeats: 0,
  isSelecting: false, 
  gheDangChon: [],
  danhSachDaXacNhan: [],

  setName: (name) => set({ name }),
  setNumSeats: (numSeats) => set({ numSeats: Number(numSeats) }),

  startSelecting: () => {
    const { name, numSeats } = get();
    if (!name.trim() || numSeats <= 0) {
      alert("Vui lòng nhập Tên và Số lượng ghế hợp lệ!");
      return;
    }
    set({ isSelecting: true, gheDangChon: [] });
  },


  toggleGhe: (ghe) => {
    const { isSelecting, numSeats, gheDangChon } = get();

    if (!isSelecting) {
      alert("Vui lòng nhập Tên, Số ghế và nhấn 'Start Selecting' trước!");
      return;
    }

    const index = gheDangChon.findIndex((item) => item.soGhe === ghe.soGhe);
    let updated = [...gheDangChon];

    if (index !== -1) {
  
      updated.splice(index, 1);
    } else {
    
      if (updated.length >= numSeats) {
        alert(`Bạn chỉ được chọn tối đa ${numSeats} ghế!`);
        return;
      }
      updated.push(ghe);
    }

    set({ gheDangChon: updated });
  },

  confirmSelection: () => {
    const { name, numSeats, gheDangChon, danhSachDaXacNhan } = get();

    if (gheDangChon.length !== numSeats) {
      alert(`Vui lòng chọn đủ ${numSeats} ghế trước khi xác nhận!`);
      return;
    }

    const newRecord = {
      name,
      numSeats,
      seats: gheDangChon.map((g) => g.soGhe).join(", "),
    };

    set({
      danhSachDaXacNhan: [...danhSachDaXacNhan, newRecord],
      // Reset form sau khi đặt thành công
      isSelecting: false,
      gheDangChon: [],
      name: "",
      numSeats: 0,
    });
  },
}));