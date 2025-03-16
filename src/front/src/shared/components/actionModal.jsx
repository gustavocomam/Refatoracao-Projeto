import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { IconButton, ButtonLabel } from "../../shared/components/adminAcc";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ActionModal = ({ onClose, type, storeSlug, setShowModal }) => {
  const navigate = useNavigate();

  const handleAdd = () => {
    switch (type) {
      case "service":
        navigate(`/store/${storeSlug}/addService`);
        break;
      case "additionalService":
        navigate(`/store/${storeSlug}/addAdditionalService`);
        break;
      case "barbers":
        navigate(`/store/${storeSlug}/addBarber`);
        break;
      default:
        console.error("Invalid type");
    }
    onClose();
  };

  const handleList = () => {
    onClose();

    setTimeout(() => {
      switch (type) {
        case "service":
          setShowModal(true);
          break;
        case "additionalService":
          setShowModal(true);
          break;
        case "barbers":
          setShowModal(true);
          break;
        default:
          console.error("Invalid type");
      }
    }, 0);
  };

  return (
    <ModalBackground onClick={onClose}>
      <div
        style={{ background: "white", padding: "35px", borderRadius: "5px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            color: "var(--black)",
            margin: "0px",
            paddingBottom: "25px",
          }}
        >
          O que deseja fazer?
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <IconButton onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlusSquare} size="2x" />
            <ButtonLabel>Adicionar</ButtonLabel>
          </IconButton>
          <IconButton onClick={handleList}>
            <FontAwesomeIcon icon={faList} size="2x" />
            <ButtonLabel>Listar</ButtonLabel>
          </IconButton>
        </div>
      </div>
    </ModalBackground>
  );
};

export default ActionModal;
