import { useCallback, useEffect, useState } from "react";
import Page from "../shared/components/page";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import useStore from "../shared/hooks/useStore";
import InputMask from "react-input-mask";

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
  max-width: 325px;
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

function AddBarber() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { getBarberById } = useStore();
  const [barber, setBarber] = useState({ name: "", cpf: "" });
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchBarber = useCallback(() => {
    if (type === "edit" && id) {
      const fetchedBarber = getBarberById(id);
      if (fetchedBarber) {
        setBarber({
          name: fetchedBarber.name,
          cpf: fetchedBarber.cpf || "",
        });
      }
    }
  }, [type, id, getBarberById]);

  useEffect(() => {
    fetchBarber();
  }, [fetchBarber]);

  const handleBarberChange = useCallback((value) => {
    setBarber((prevBarber) => ({ ...prevBarber, barber: value }));
  }, []);

  const handleBarberNameChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (value.length <= 50) {
        handleBarberChange("name", capitalizeFirstLetter(value));
      }
    },
    [handleBarberChange],
  );

  const handleBarberCpfChange = useCallback(
    (e) => {
      const value = e.target.value;
      handleBarberChange("cpf", value);
    },
    [handleBarberChange],
  );

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  };

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const simulateApiCall = useCallback(async (action) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.8) {
          resolve(`Barbeiro ${action} com sucesso!`);
        } else {
          reject(
            `Erro ao ${action} Barbeiro. Por favor, tente novamente mais tarde.`,
          );
        }
      }, 100);
    });
  }, []);

  const handleAddBarber = useCallback(async () => {
    try {
      setErrorMessage("");

      if (!barber.name || !barber.cpf) {
        setErrorMessage("Preencha todos os campos.");
        setShowModal(true);
        return;
      }

      if (!validateCPF(barber.cpf)) {
        setErrorMessage(
          "CPF inválido. Por favor, verifique e tente novamente.",
        );
        setShowModal(true);
        return;
      }

      setIsLoading(true);

      const action = type === "edit" ? "atualizado" : "adicionado";
      const successMessage = await simulateApiCall(action);

      // Aqui você deve implementar a lógica real de adição/atualização do Barbeiro
      if (type === "edit" && id) {
        // Atualizar o barbeiro existente
        console.log("Updated barbers:", barber);
      } else {
        // Adicionar um novo barbeiro
        console.log("Submitting barber:", barber);
      }

      setErrorMessage(successMessage);
      setShowModal(true);

      if (type === "edit") {
        setTimeout(() => navigate(-1), 500);
      } else {
        setBarber({ name: "", cpf: "" });
      }
    } catch (error) {
      console.error("Erro ao processar Barbeiro:", error);
      setErrorMessage(error.toString());
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  }, [barber, type, simulateApiCall, navigate, id]);

  return (
    <Page>
      <>
        <Header>
          <H_1>
            {type === "edit" && id ? "Editar Barbeiro" : "Novo Barbeiro"}
          </H_1>
          <Exit onClick={() => navigate(-1)}>X</Exit>
        </Header>
        {isLoading ? (
          <LoadingContainerStyles>
            <ClipLoader loading={true} size={80} color={"var(--primary)"} />
          </LoadingContainerStyles>
        ) : (
          <DivService>
            <Service>
              <H_2>Nome do Barbeiro</H_2>
              <Input
                type="text"
                value={barber.name}
                onChange={handleBarberNameChange}
                placeholder="Nome do Barbeiro"
              />
              <H_2>CPF do Barbeiro</H_2>
              <InputMask
                mask="999.999.999-99"
                value={barber.cpf}
                onChange={handleBarberCpfChange}
              >
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    type="text"
                    placeholder="000.000.000-00"
                  />
                )}
              </InputMask>
              <Button onClick={handleAddBarber}>
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

export default AddBarber;
