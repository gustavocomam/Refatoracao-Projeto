import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faChartBar,
  faUser,
  faTools,
  faPlusSquare,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DivGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px;
`;

export const IconButton = styled.button`
  color: var(--secondary);
  padding: 15px;
  width: 100%;
  min-height: 89px;
  border-radius: 5px;
  gap: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
  &:active {
    background-color: var(--light-gray);
    transform: scale(0.9);
  }
`;

export const ButtonLabel = styled.span`
  font-size: 12px;
  text-align: center;
`;

function AdminAccount({
  storeSlug,
  handleService,
  handleAdditionalService,
  handleBarber,
}) {
  const navigate = useNavigate();

  const handleAvailableTimes = () => {
    navigate(`/store/${storeSlug}/admin`);
  };

  const handleMonthlyActivity = () => {
    navigate(`/store/${storeSlug}/activity`);
  };

  const handleFeedBackActivity = () => {
    navigate(`/store/${storeSlug}/feedback`);
  };

  return (
    <DivGrid>
      <IconButton onClick={handleAvailableTimes}>
        <FontAwesomeIcon icon={faCalendar} size="2x" />
        <ButtonLabel>Horários</ButtonLabel>
      </IconButton>
      <IconButton onClick={handleMonthlyActivity}>
        <FontAwesomeIcon icon={faChartBar} size="2x" />
        <ButtonLabel>Atividade</ButtonLabel>
      </IconButton>
      <IconButton onClick={handleService}>
        <FontAwesomeIcon icon={faTools} size="2x" />
        <ButtonLabel>Serviços</ButtonLabel>
      </IconButton>
      <IconButton onClick={handleAdditionalService}>
        <FontAwesomeIcon icon={faPlusSquare} size="2x" />
        <ButtonLabel>Serv. Adicionais</ButtonLabel>
      </IconButton>
      <IconButton onClick={handleBarber}>
        <FontAwesomeIcon icon={faUser} size="2x" />
        <ButtonLabel>Barbeiros</ButtonLabel>
      </IconButton>
      <IconButton onClick={handleFeedBackActivity}>
        <FontAwesomeIcon icon={faStar} size="2x" />
        <ButtonLabel>FeedBack</ButtonLabel>
      </IconButton>
    </DivGrid>
  );
}

export default AdminAccount;
