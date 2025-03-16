import styled from "styled-components";
import ServiceItem from "./serviceItem";
import "../../assets/css/index.css";

export const DivService = styled.div``;

function ServiceList({ services, onServiceClick }) {
  return (
    <DivService>
      {services && services.length > 0 ? (
        services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            onClick={() => {
              "Serviço selecionado:", service;
              onServiceClick(service.id);
            }}
          />
        ))
      ) : (
        <div>Serviços não disponíveis</div>
      )}
    </DivService>
  );
}

export default ServiceList;
