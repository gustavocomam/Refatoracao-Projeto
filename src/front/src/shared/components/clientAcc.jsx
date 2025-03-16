import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCut, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DivGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 20px;
`;

const IconButton = styled.button`
  color: var(--secondary);
  padding: 15px;
  width: 100%;
  min-height: 89px;
  border-radius: 5px;
  gap: 5px;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
`;

const ButtonLabel = styled.span`
  font-size: 12px;
  text-align: center;
`;
function UserAccount({ storeSlug }) {
  const navigate = useNavigate();

  const handleMyAppointments = () => {
    navigate(`/store/${storeSlug}/myappointments`);
  };

  const handleMyIdealCut = () => {
    navigate(`/store/${storeSlug}/visagism`);
  };

  const handleReviews = () => {
    navigate(`/store/${storeSlug}/review`);
  };

  return (
    <DivGrid>
      <IconButton onClick={handleMyAppointments}>
        <FontAwesomeIcon icon={faCalendar} size="2x" />
        <ButtonLabel>Meus Agendamentos</ButtonLabel>
      </IconButton>
      <IconButton onClick={handleMyIdealCut}>
        <FontAwesomeIcon icon={faCut} size="2x" />
        <ButtonLabel>Meu Corte Ideal</ButtonLabel>
      </IconButton>
      <IconButton onClick={handleReviews}>
        <FontAwesomeIcon icon={faStar} size="2x" />
        <ButtonLabel>Avaliações</ButtonLabel>
      </IconButton>
    </DivGrid>
  );
}

export default UserAccount;
