import styled from "styled-components";

const Service = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr;
  align-items: center;
  max-width: 100%;
  padding: 0 10px;
  height: 70px;
  border-radius: 5px;
  background: var(--white);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--light-black);
  margin: 0 20px 20px;
  box-sizing: border-box;
  cursor: pointer;
  &:active {
    background: var(--light-gray);
    transform: scale(0.95);
  }
`;

const ServiceText = styled.div`
  flex-grow: 1;
  padding: 0 10px;
  font-size: 16px;
  font-weight: 700;
  color: var(--black);
  text-align: start;
`;

const ServicePrice = styled.div`
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  max-width: 75.5px;
  justify-self: end;
  justify-content: end;
  color: var(--black);
  padding: 0 10px;
  border-left: 2px solid var(--light-black);
  height: 53px;
  display: flex;
  align-items: center;
`;

function ServiceItem({ service, onClick }) {
  return service ? (
    <Service onClick={onClick}>
      <ServiceText>{service.name}</ServiceText>
      <ServicePrice>R$ {service.servicePrice.toFixed(2)}</ServicePrice>
    </Service>
  ) : (
    <p>Serviço indisponível.</p>
  );
}

export default ServiceItem;
