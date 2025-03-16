import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useUserStore = create(
  devtools((set) => ({
    user: {
      name: "Elias Gabriel",
      phone_number: "(31) 98767-9867",
      id: "1",
      admin: true,
      appointments: [],
    },
    setUser: (data) =>
      set((state) => ({
        user: {
          ...state.user,
          name: data.name,
          phone_number: data.phone_number,
          id: data.id,
          admin: data.admin ? data.admin : false,
          appointments: state.user.appointments,
        },
      })),
    setAppointments: (date, time, service, additionalService) =>
      set((state) => ({
        user: {
          ...state.user,
          appointments: [
            ...state.user.appointments,
            { date, time, service, additionalService },
          ],
        },
      })),
    clearUser: () =>
      set(() => ({
        user: {
          name: "",
          phone_number: "",
          id: "",
          admin: false,
          appointments: [],
        },
      })),
  })),
);

export default useUserStore;
