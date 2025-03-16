import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import MockUpImg from "../../public/assets/img/mockup.svg";
import SearchableDropdown from "../shared/components/searchableDropdown";
import { getAllBarbershops } from "../shared/service/useBarbershop";

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  background-color: var(--primary);
  flex-direction: column;
`;

const Circles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    circle,
    #eb8b1637 10%,
    rgba(255, 255, 255, 0) 70%
  );
  pointer-events: none;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ImgHeader = styled.img`
  max-width: 200px;
  height: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DivMockUp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
  background-color: var(--primary);
  @media (max-width: 768px) {
    margin: 0 0 40px 0;
    flex-direction: column;
  }
`;

const MockUp = styled.img`
  width: 100%;
  max-width: 600px;
  z-index: 2;

  @media (max-width: 768px) {
    text-align: center;
    gap: 20px;
  }
`;

const Text = styled.div`
  margin: auto 0 auto 70px;

  @media (max-width: 768px) {
    margin: 10px 40px;
    text-align: center;
  }
`;

const Name = styled.h1`
  font-size: 38px;
  margin-top: 0;
  font-weight: 800;
  color: var(--secondary);
  font-family: "Montserrat", sans-serif;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const SecondaryName = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: var(--secondary);
  line-height: 1.9;
  font-family: "Montserrat", sans-serif;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Button = styled.button`
  width: 210px;
  height: 48px;
  font-family: Raleway;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  color: var(--white);
  background-color: var(--secondary);
  margin: 32px 0;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LoadingContainerStyles = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
`;

function LandingPage() {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [selectedStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBarbershops = async () => {
      try {
        const barbershops = await getAllBarbershops();
        setStores(barbershops);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar barbearias:", error);
      }
    };

    fetchBarbershops();
  }, []);

  const handleStoreSelect = (storeName) => {
    const store = stores.find((store) => store.name === storeName);
    if (store) {
      const slug = generateSlug(store.name, store.id);
      navigate(`/store/${slug}`);
    }
  };

  const generateSlug = (name, storeId) => {
    const baseSlug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .trim();

    return `${baseSlug}-${storeId}`;
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingContainerStyles>
          <ClipLoader loading={isLoading} size={80} color={"var(--primary)"} />
        </LoadingContainerStyles>
      </Container>
    );
  }

  return (
    <Container>
      <div style={{ maxWidth: "1440px", margin: "0 auto", flex: 1 }}>
        <Circles />
        <Header>
          <ImgHeader src="../assets/img/book.png" alt="" />
          <SearchableDropdown
            options={stores}
            label="name"
            id="store-dropdown"
            selectedVal={selectedStore}
            handleChange={handleStoreSelect}
          />
        </Header>
        <DivMockUp>
          <Text>
            <Name>
              Agendamento de horários e assistente de visagismo com IA.
            </Name>
            <SecondaryName>
              Modernize sua barbearia com nosso sistema de agendamento e
              assistente de visagismo alimentado por inteligência artificial.
              Permita-nos simplificar sua gestão de horários enquanto oferecemos
              aos seus clientes uma experiência inovadora e personalizada.
            </SecondaryName>
            <Button onClick={() => navigate("/StoreRegister")}>
              Cadastrar Barbearia
            </Button>
          </Text>
          <MockUp src={MockUpImg} alt="Mockup" />
        </DivMockUp>
      </div>
    </Container>
  );
}

export default LandingPage;
