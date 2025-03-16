import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useStoreScheduleStore = create(
  devtools((set) => ({
    storeSchedule: {
      selectedService: null,
      additionalService: null,
      barber: null,
      schedule_id: null,
      total_price: null,
    },
    setSelectedService: (service) =>
      set((state) => {
        const newStoreSchedule = {
          ...state.storeSchedule,
          selectedService: service,
        };
        return {
          storeSchedule: {
            ...newStoreSchedule,
            total_price: calculateTotalPrice(newStoreSchedule),
          },
        };
      }),
    setAdditionalService: (additionalService) =>
      set((state) => {
        const newStoreSchedule = {
          ...state.storeSchedule,
          additionalService,
        };
        return {
          storeSchedule: {
            ...newStoreSchedule,
            total_price: calculateTotalPrice(newStoreSchedule),
          },
        };
      }),
    setBarber: (barber) =>
      set((state) => ({
        storeSchedule: {
          ...state.storeSchedule,
          barber,
        },
      })),
    setScheduleId: (schedule_id) =>
      set((state) => ({
        storeSchedule: {
          ...state.storeSchedule,
          schedule_id,
        },
      })),
    setTotalPrice: (total_price) =>
      set((state) => ({
        storeSchedule: {
          ...state.storeSchedule,
          total_price,
        },
      })),
    resetSchedule: () =>
      set(() => ({
        storeSchedule: {
          selectedService: null,
          additionalService: null,
          barber: null,
          schedule_id: null,
          total_price: null,
        },
      })),
  })),
);

// Função para calcular o total de preços
function calculateTotalPrice(storeSchedule) {
  let totalPrice = 0;

  totalPrice += storeSchedule.selectedService?.price || 0;
  return totalPrice;
}

export default useStoreScheduleStore;
