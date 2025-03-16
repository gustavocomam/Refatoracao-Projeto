import { useCallback, useEffect, useState } from "react";
import Page from "../shared/components/page";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import ClipLoader from "react-spinners/ClipLoader";
import { API_URL } from "../shared/service/constants";
import useUserStore from "../shared/store/useUserStore";

// Styled components
const Header = styled.div`
  width: 100%;
  max-width: 425px;
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.2));
`;

const H_1 = styled.h1`
  font-size: 25px;
  font-weight: 700;
  color: var(--black);
  margin: 0;
`;

const H_2 = styled.h2`
  font-size: 20px;
  color: var(--black);
`;

const Exit = styled.button`
  width: 35px;
  height: 35px;
  font-size: 18px;
  border: none;
  font-weight: 700;
  border-radius: 50%;
  color: var(--secondary);
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    color: var(--primary);
    background-color: var(--light-secondary);
    transform: scale(0.95);
  }
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
`;

const DivService = styled.div`
  padding: 100px 0;
  background-color: var(--white);
`;

const Service = styled.div`
  align-items: center;
  max-width: 100%;
  padding: 0 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 700;
  border: 0.5px solid var(--light-gray);
  border-radius: 4px;
  color: var(--secondary-light-black);
  background-color: var(--secondary-light-gray);
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  font-family: Raleway;
  font-size: 15px;
  font-weight: 700;
  border: none;
  margin-top: 10px;
  border-radius: 4px;
  color: var(--black);
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    background-color: var(--light-secondary);
    transform: scale(0.95);
  }
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
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
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;

const ModalDiv = styled.div`
  color: var(--black);
  text-align: center;
  background-color: var(--white);
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
`;

const P = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: var(--secondary-light-black);
  padding: 10px;
  margin: 0;
`;

function capitalizeFirstLetter(string) {
  let words = string.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(" ");
}

const LoadingContainerStyles = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 425px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
`;

function AddService() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [service, setService] = useState({
    name: "",
    servicePrice: "",
    barberId: null,
    serviceType: true,
  });
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      console.log("user", user);
      setService((prevService) => ({
        ...prevService,
        barberId: user.id,
      }));
    }
  }, [user]);

  const fetchService = useCallback(() => {
    if (type === "edit" && id) {
      setIsLoading(true);
      fetch(`${API_URL}/service/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setService({
            name: data.name,
            servicePrice: data.servicePrice.toString(),
            barberId: data.barberId,
            serviceType: data.serviceType,
          });
        })
        .catch((error) => {
          console.error("Error fetching service:", error);
          setErrorMessage("Erro ao carregar serviço.");
          setShowModal(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [type, id]);

  useEffect(() => {
    fetchService();
  }, [fetchService]);

  const handleServiceChange = useCallback((field, value) => {
    setService((prevService) => ({ ...prevService, [field]: value }));
  }, []);

  const handleServiceNameChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (value.length <= 50) {
        handleServiceChange("name", capitalizeFirstLetter(value));
      }
    },
    [handleServiceChange],
  );

  const handleServiceValueChange = useCallback((value) => {
    setService((prevService) => ({ ...prevService, servicePrice: value }));
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleAddService = useCallback(async () => {
    if (!service.barberId) {
      setErrorMessage("Usuário não encontrado.");
      setShowModal(true);
      return;
    }
    console.log("service", service);
    if (!service.name || !service.servicePrice) {
      setErrorMessage("Preencha todos os campos.");
      setShowModal(true);
      return;
    }

    const formattedService = {
      ...service,
      servicePrice: service.servicePrice.replace(",", "."),
    };

    setIsLoading(true);
    const method = type === "edit" ? "PUT" : "POST";
    const url =
      type === "edit" ? `${API_URL}/service/${id}` : `${API_URL}/service`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedService),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save service");
      }

      const action = type === "edit" ? "atualizado" : "adicionado";
      setErrorMessage(`Serviço ${action} com sucesso!`);
      setShowModal(true);

      if (type === "edit") {
        setTimeout(() => navigate(-1), 500);
      } else {
        setService({ name: "", servicePrice: "", barberId: user.id });
      }
    } catch (error) {
      console.error("Error saving service:", error);
      setErrorMessage(error.message);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  }, [service, type, navigate, id, user]);

  return (
    <Page>
      <>
        <Header>
          <H_1>{type === "edit" && id ? "Editar Serviço" : "Novo Serviço"}</H_1>
          <Exit onClick={() => navigate(-1)}>X</Exit>
        </Header>
        {isLoading ? (
          <LoadingContainerStyles>
            <ClipLoader loading={true} size={80} color={"var(--primary)"} />
          </LoadingContainerStyles>
        ) : (
          <DivService>
            <Service>
              <H_2>Nome do Serviço</H_2>
              <Input
                type="text"
                value={service.name}
                onChange={handleServiceNameChange}
                placeholder="'Corte de Cabelo'"
              />
              <H_2>Valor do Serviço</H_2>
              <CurrencyInput
                intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                value={service.servicePrice}
                onValueChange={handleServiceValueChange}
                placeholder="R$ 0,00"
              />
              <Button onClick={handleAddService}>
                {type === "edit" ? "Salvar alterações" : "Adicionar"}
              </Button>
            </Service>
          </DivService>
        )}

        {showModal && (
          <ModalBackground onClick={handleCloseModal}>
            <ModalDiv>
              <P>{errorMessage}</P>
            </ModalDiv>
          </ModalBackground>
        )}
      </>
    </Page>
  );
}

export default AddService;
