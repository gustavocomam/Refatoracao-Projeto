import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../shared/components/page";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import HeaderComponent from "../shared/components/header";
import FooterComponent from "../shared/components/footer";
import useUserStore from "../shared/store/useUserStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import useStoreDataStore from "../shared/store/useStoreDataStore";
import ServiceModal from "../shared/components/serviceModal";
import AdminAccount from "../shared/components/adminAcc";
import UserAccount from "../shared/components/clientAcc";
import ActionModal from "../shared/components/actionModal";
import { API_URL } from "../shared/service/constants";

const DivService = styled.div`
  margin: 100px 20px;
  color: var(--black);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgProfileWrapper = styled.div`
  width: 169px;
  height: 169px;
  border-radius: 50%;
  background-color: var(--light-gray);
  display: flex;
  margin: 20px auto;
`;

const ImgProfile = styled.img`
  width: 169px;
  height: 169px;
  border-radius: 50%;
  object-fit: cover;
`;

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

const LoadingContainerStyles = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
`;

const LogoutButton = styled.button`
  width: 100%;
  height: 40px;
  font-size: 15px;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  color: var(--black);
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function MyAcc() {
  const navigate = useNavigate();
  const { storeSlug } = useParams();
  const [loading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user, clearUser } = useUserStore();
  const {
    storeData,
    setStoreService,
    setStoreAdditionalService,
    setStoreBarber,
  } = useStoreDataStore();
  const { barbers } = storeData;
  const [modalType, setModalType] = useState("");
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionModalType, setActionModalType] = useState("");
  const service = storeData.storeService;
  const additionalService = storeData.storeAdditionalService;

  useEffect(() => {
    const fetchServices = async () => {
      if (user && user.id) {
        try {
          const response = await fetch(`${API_URL}/service/barber/${user.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          const service = data.filter(
            (service) => service.serviceType === true,
          );
          const additional = data.filter(
            (additional) => additional.serviceType === false,
          );
          setStoreService(service);
          setStoreAdditionalService(additional);
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      }
    };

    fetchServices();
  }, [user, setStoreService, setStoreAdditionalService]);

  const handleLogout = () => {
    clearUser();
    navigate(`/store/${storeSlug}`);
  };

  const handleDeleteService = (serviceId) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este serviço?",
    );
    if (confirmDelete) {
      fetch(`${API_URL}/service/${serviceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStoreService(service.filter((service) => service.id !== serviceId));
    }
  };

  const handleDeleteAd = (serviceId) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este serviço adicional?",
    );
    if (confirmDelete) {
      fetch(`${API_URL}/service/${serviceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStoreAdditionalService(
        additionalService.filter((service) => service.id !== serviceId),
      );
    }
  };

  const handleDeleteBarber = (barber_id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este barbeiro?",
    );
    if (confirmDelete) {
      setStoreBarber(barbers.filter((barber) => barber.id !== barber_id));
    }
  };

  const handleEditService = (serviceId) => {
    const parsedServiceId = parseInt(serviceId);
    navigate(`/store/${storeSlug}/addService/edit/${parsedServiceId}`);
  };

  const handleEditAdditionalService = (serviceId) => {
    const parsedServiceId = parseInt(serviceId);
    navigate(
      `/store/${storeSlug}/addAdditionalService/edit/${parsedServiceId}`,
    );
  };

  const handleEditBarber = (barber_id) => {
    const parsedBarber_id = parseInt(barber_id);
    navigate(`/store/${storeSlug}/addBarber/edit/${parsedBarber_id}`);
  };

  const handleService = () => {
    setShowActionModal(true);
    setActionModalType("service");
    setModalType("service");
  };

  const handleAdditionalService = () => {
    setShowActionModal(true);
    setActionModalType("additionalService");
    setModalType("additionalService");
  };

  const handleBarber = () => {
    setShowActionModal(true);
    setActionModalType("barbers");
    setModalType("barbers");
  };

  useEffect(() => {
    if (!user) {
      navigate(`/store/${storeSlug}/login`);
    }
  }, [user, navigate, storeSlug]);

  return (
    <>
      {user ? (
        <Page>
          <HeaderComponent
            name="Minha Conta"
            onClick={() => navigate(`/store/${storeSlug}`)}
          />
          {loading ? (
            <LoadingContainerStyles>
              <ClipLoader loading={true} size={80} color={"var(--primary)"} />
            </LoadingContainerStyles>
          ) : (
            <DivService>
              <h2 style={{ margin: "10px" }}>Olá, {user.name}</h2>
              <ImgProfileWrapper>
                <ImgProfile
                  src="/assets/img/profile.svg"
                  alt="Foto de Perfil"
                />
              </ImgProfileWrapper>
              {user.admin ? (
                <AdminAccount
                  storeSlug={storeSlug}
                  handleService={handleService}
                  handleAdditionalService={handleAdditionalService}
                  handleBarber={handleBarber}
                />
              ) : (
                <UserAccount storeSlug={storeSlug} />
              )}
            </DivService>
          )}

          {showModal && (
            <ModalBackground onClick={() => setShowModal(false)}>
              <ServiceModal
                modalType={modalType}
                service={service}
                additionalService={additionalService}
                barbers={barbers}
                handleEditService={handleEditService}
                handleEditAdditionalService={handleEditAdditionalService}
                handleEditBarber={handleEditBarber}
                handleDeleteService={handleDeleteService}
                handleDeleteAd={handleDeleteAd}
                handleDeleteBarber={handleDeleteBarber}
                onClose={() => setShowModal(false)}
              />
            </ModalBackground>
          )}

          {showActionModal && (
            <ActionModal
              setShowModal={setShowModal}
              type={actionModalType}
              onClose={() => setShowActionModal(false)}
              storeSlug={storeSlug}
            />
          )}
          <FooterComponent>
            <LogoutButton onClick={handleLogout}>
              Sair
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ marginLeft: "5px" }}
              />
            </LogoutButton>
          </FooterComponent>
        </Page>
      ) : null}
    </>
  );
}

export default MyAcc;
