import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useStoreDataStore = create(
  devtools((set) => ({
    storeData: {
      storeId: "",
      storeName: "",
      storeAddress: "",
      storePhone: "",
      storeInstagram: "",
      storeSchedule: "",
      storeService: [],
      storeAdditionalService: [],
      storeBarber: [],
    },
    setStoreData: (data) =>
      set(() => ({
        storeData: {
          storeId: data.id || "",
          storeName: data.name || "",
          storeAddress: data.address || "",
          storePhone: data.phone_number || "",
          storeInstagram: data.instagram || "",
          storeSchedule: data.storeSchedule || "",
          storeService: Array.isArray(data.storeService)
            ? data.storeService
            : [],
          storeAdditionalService: Array.isArray(data.storeAdditionalService)
            ? data.storeAdditionalService
            : [],
        },
        storeBarber: Array.isArray(data.storeBarber) ? data.storeBarber : [],
      })),
    setStoreService: (services) =>
      set((state) => ({
        storeData: {
          ...state.storeData,
          storeService: Array.isArray(services) ? [...services] : [],
        },
      })),
    setStoreAdditionalService: (additionalServices) =>
      set((state) => ({
        storeData: {
          ...state.storeData,
          storeAdditionalService: Array.isArray(additionalServices)
            ? [...additionalServices]
            : [],
        },
      })),
    setStoreBarber: (barbers) => {
      set((state) => ({
        storeData: {
          ...state.storeData,
          storeBarber: Array.isArray(barbers) ? [...barbers] : [],
        },
      }));
    },
  })),
);

export default useStoreDataStore;
