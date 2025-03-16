import styled from "styled-components";
import BarberItem from "./barberItem";
import "../../assets/css/index.css";

export const DivBarber = styled.div`
  margin-top: 95px;
`;

function BarberList({ barbers }) {
  return (
    <DivBarber>
      {barbers && barbers.length > 0 ? (
        barbers.map((barber) => <BarberItem key={barber.id} barber={barber} />)
      ) : (
        <div>Sem barbeiros disponiveis</div>
      )}
    </DivBarber>
  );
}

export default BarberList;
