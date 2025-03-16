import { useCallback } from "react";
import useStoreDataStore from "../store/useStoreDataStore";

const useStore = () => {
  const { storeData } = useStoreDataStore();
  const service = storeData.storeService;
  const additionalService = storeData.storeAdditionalService;
  const barbers = storeData.storeBarber;

  const getServiceById = useCallback(
    (serviceId) => {
      const serviceFound = service.filter(
        (service) => service.id === parseInt(serviceId),
      );
      return serviceFound[0];
    },
    [service],
  );

  const getAddServiceById = useCallback(
    (serviceId) => {
      const serviceFound = additionalService.filter(
        (service) => service.id === parseInt(serviceId),
      );
      return serviceFound[0];
    },
    [additionalService],
  );

  const getBarberById = useCallback(
    (barberId) => {
      const barberFound = barbers.filter(
        (barber) => barber.id === parseInt(barberId),
      );
      return barberFound[0];
    },
    [barbers],
  );
  return { getServiceById, getAddServiceById, getBarberById };
};

export default useStore;
