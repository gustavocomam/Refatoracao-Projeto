import styled from "styled-components";
import ExitButton from "./exitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ModalDiv = styled.div`
  color: var(--black);
  text-align: center;
  background-color: var(--white);
  border-radius: 5px;
  padding: 20px;
  width: 100%;
  max-width: 350px;
`;

const ModalServiceList = styled.div`
  text-align: left;
`;

const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid var(--light-gray);
`;

const ServiceName = styled.span`
  color: var(--black);
`;

const DeleteIcon = styled.span`
  cursor: pointer;
`;

const EditIcon = styled.span`
  cursor: pointer;
`;

const HeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 15px 5px;
`;

const ServiceModal = ({
  modalType,
  service,
  additionalService,
  barbers,
  handleEditService,
  handleEditAdditionalService,
  handleEditBarber,
  handleDeleteService,
  handleDeleteAd,
  handleDeleteBarber,
  onClose,
}) => {
  const getItems = () => {
    switch (modalType) {
      case "service":
        return service;
      case "additionalService":
        return additionalService;
      case "barbers":
        return barbers;
      default:
        return [];
    }
  };

  const getTitle = () => {
    switch (modalType) {
      case "service":
        return "Serviços";
      case "additionalService":
        return "Serviços Adicionais";
      case "barbers":
        return "Barbeiros";
      default:
        return "";
    }
  };

  const handleEdit = (id) => {
    switch (modalType) {
      case "service":
        handleEditService(id);
        break;
      case "additionalService":
        handleEditAdditionalService(id);
        break;
      case "barbers":
        handleEditBarber(id);
        break;
    }
  };

  const handleDelete = (id) => {
    switch (modalType) {
      case "service":
        handleDeleteService(id);
        break;
      case "additionalService":
        handleDeleteAd(id);
        break;
      case "barbers":
        handleDeleteBarber(id);
        break;
    }
  };

  const items = getItems();

  return (
    <ModalDiv>
      <HeaderModal>
        <h2 style={{ margin: "0" }}>{getTitle()}</h2>
        <ExitButton onClick={onClose}>X</ExitButton>
      </HeaderModal>
      <ModalServiceList>
        {items.map((item) => (
          <ServiceItem key={item.id}>
            <div style={{ display: "flex", gap: "10px" }}>
              <EditIcon onClick={() => handleEdit(item.id)}>
                <FontAwesomeIcon icon={faEdit} color="var(--secondary)" />
              </EditIcon>
              <ServiceName>{item.name}</ServiceName>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <DeleteIcon onClick={() => handleDelete(item.id)}>
                <FontAwesomeIcon icon={faTrash} color="var(--secondary)" />
              </DeleteIcon>
            </div>
          </ServiceItem>
        ))}
      </ModalServiceList>
    </ModalDiv>
  );
};

export default ServiceModal;
