import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../shared/components/page";
import styled from "styled-components";
import InputMask from "react-input-mask";
import useUserStore from "../shared/store/useUserStore";
import HeaderComponent from "../shared/components/header";
import useStoreDataStore from "../shared/store/useStoreDataStore";
import { API_URL } from "../shared/service/constants";

const P = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  color: var(--secondary-light-black);
  padding: 10px;
  margin: 0;
`;

const DivService = styled.div`
  padding: 100px 20px 100px;
  color: var(--black);
  text-decoration: none;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Service = styled.div`
  align-items: center;
  max-width: 100%;
  border-radius: 5px;
  background: var(--white);
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;
  box-sizing: border-box;
`;

const Back = styled.button`
  width: 100%;
  height: 40px;
  font-family: Raleway;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  border-radius: 4px;
  color: var(--black);
  background-color: var(--light-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    background-color: var(--light-secondary);
    transform: scale(0.95);
  }
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
`;

const Next = styled(Back)`
  background-color: var(--primary);
`;

const NumberInput = styled(InputMask)`
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: 0.5px solid var(--light-gray);
  border-radius: 4px;
  color: var(--secondary-light-black);
  background-color: var(--secondary-light-gray);
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const InputName = styled(NumberInput)``;

const PasswordDiv = styled(NumberInput)``;

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
  line-height: 1.125em;
  width: 100%;
  max-width: 350px;
`;

function LoginPage() {
  const navigate = useNavigate();
  const { storeSlug } = useParams(); // Alterado para storeSlug
  const [number, setNumber] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [cpfSaved, setcpfSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ok, setOk] = useState(false);
  const [save, setSave] = useState(true);
  const [next, setNext] = useState(true);
  const { setUser } = useUserStore();
  const { storeData } = useStoreDataStore();
  const storeId = storeData.storeId;
  // // Função para buscar agendamentos do usuário
  // const fetchAppointments = (userId, storeId) => {
  //   fetch(`${API_URL}/appointments/user/${userId}/store/${storeId}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.error === "No appointments found") {
  //         console.log("Não há agendamentos disponíveis.");
  //       } else {
  //         setAppointments(data); // Atualiza a store com os agendamentos
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Erro ao buscar agendamentos:", error);
  //     });
  // };

  // // Atualizar agendamentos quando o usuário fizer login
  // useEffect(() => {
  //   if (user.logged && user.id) {
  //     fetchAppointments(user.id, storeId);
  //   }
  // }, [user.logged, user.id, storeId]);

  const handleNext = () => {
    const formattedCpf = cpf.replace("-", "");
    fetch(`${API_URL}/login/${formattedCpf}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data.barbershop_id === storeId) {
            setcpfSaved(true);
            setSave(true);
            setOk(true);
            setNext(false);
          } else {
            if (data.error) {
              setcpfSaved(false);
              setSave(false);
              setOk(true);
              setNext(false);
            } else {
              setErrorMessage(
                "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.",
              );
              setShowModal(true);
            }
          }
        }
      })
      .catch(() => {
        setErrorMessage(
          "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.",
        );
        setShowModal(true);
      });
  };

  const handleTestPassword = () => {
    const formattedCpf = cpf.replace("-", "");
    fetch(`${API_URL}/login/${formattedCpf}/${password}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setUser(data);
          navigate(`/store/${storeSlug}/myAccount`);
        } else {
          setErrorMessage("Senha incorreta.");
          setShowModal(true);
        }
      })
      .catch(() => {
        setErrorMessage(
          "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.",
        );
        setShowModal(true);
      });
  };

  const handleSave = () => {
    if (password !== passwordConfirm) {
      setErrorMessage("As senhas não coincidem.");
      setShowModal(true);
      return;
    }
    const formattedCpf = cpf.replace("-", "");
    const userData = {
      barbershop_id: storeId,
      name: name,
      phone_number: number,
      cpf: formattedCpf,
      password: password,
    };

    fetch(`${API_URL}/client`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("Erro ao salvar usuário");
        }
      })
      .then((data) => {
        setUser(data);
        setErrorMessage("Usuário salvo com sucesso");
        setShowModal(true);
        navigate(`/store/${storeSlug}/myAccount`);
      })
      .catch((error) => {
        console.error("Erro ao salvar usuário:", error);
        setErrorMessage(
          "Erro ao salvar usuário. Por favor, tente novamente mais tarde.",
        );
        setShowModal(true);
      });
  };

  return (
    <Page>
      <HeaderComponent
        name="Cadastro"
        onClick={() => navigate(`/store/${storeSlug}`)}
      />
      <DivService>
        <Service>
          <NumberInput
            mask="999999999-99"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          {!cpfSaved && ok && (
            <>
              <InputName
                placeholder="Digite seu nome"
                autoComplete="given-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <NumberInput
                mask="(99) 99999-9999"
                placeholder="Digite seu número de telefone"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />

              <PasswordDiv
                type="password"
                autoComplete="password"
                placeholder="********"
                minLength="8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordDiv
                type="password"
                autoComplete="password"
                placeholder="********"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </>
          )}
          {cpfSaved && ok && (
            <PasswordDiv
              type="password"
              autoComplete="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          {cpfSaved && save && !next && (
            <Next onClick={handleTestPassword}>Entrar</Next>
          )}
          {!cpfSaved && !save && !next && (
            <Next onClick={handleSave}>Criar Conta</Next>
          )}
          {next && <Next onClick={handleNext}>Próximo</Next>}
        </Service>
      </DivService>

      {showModal && (
        <ModalBackground onClick={() => setShowModal(false)}>
          <ModalDiv>
            <P>{errorMessage}</P>
          </ModalDiv>
        </ModalBackground>
      )}
    </Page>
  );
}

export default LoginPage;
