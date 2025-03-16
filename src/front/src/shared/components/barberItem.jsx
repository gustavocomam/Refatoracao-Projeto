import styled from "styled-components";
import useScheduleStore from "../store/useScheduleStore";
import { useNavigate, useParams } from "react-router-dom";
import defaultPhoto from "../../../public/assets/img/logo.svg";

const Barber = styled.div`
  display: flex;
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

const BarberName = styled.div`
  flex-grow: 1;
  padding: 0 10px;
  font-size: 16px;
  font-weight: 700;
  color: var(--black);
  text-align: start;
  border-left: 1px solid var(--light-black);
`;

const BarberPhoto = styled.img`
  width: 100%;
  max-width: 53px;
  object-fit: contain;
  border-radius: 5px;
  margin-right: 10px;
  height: 53px;
  display: flex;
  align-items: center;
`;

function BarberItem({ barber }) {
  const navigate = useNavigate();
  const { storeSlug } = useParams();
  const { setBarber } = useScheduleStore();

  const handleClick = () => {
    setBarber(barber);
    navigate(`/store/${storeSlug}/appointments`);
  };

  return barber ? (
    <Barber onClick={handleClick}>
      <BarberPhoto
        src={barber.photo ? barber.photo : defaultPhoto}
        alt={barber.name}
      />
      <BarberName>{barber.name}</BarberName>
    </Barber>
  ) : (
    <p>Barbeiro indisponível.</p>
  );
}

export default BarberItem;
