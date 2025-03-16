import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../shared/components/page";
import styled from "styled-components";
import "../assets/css/index.css";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FaceIcon from "@mui/icons-material/Face";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import useScheduleStore from "../shared/store/useScheduleStore";
import useStoreDataStore from "../shared/store/useStoreDataStore";
import LoadingComponent from "../shared/components/loading";
import ServiceList from "../shared/components/serviceList";
import useUserStore from "../shared/store/useUserStore";
import {
  getBarbershop,
  getAllServicesByBarbershop,
  getBarbersByBarbershop,
} from "../shared/service/useBarbershop";

const Capa = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
  max-width: 425px;
  max-height: 220px;
  min-height: 220px;
  background-color: lightgrey;
`;

const Content = styled.div`
  max-width: 425px;
  min-width: 320px;
  min-height: 100svh;
  background-color: var(--primary);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ImgProfileWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImgProfile = styled.img`
  width: 170px;
  min-width: 170px;
  height: 170px;
  min-height: 170px;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--secondary);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  color: var(--black);
  margin: 120px 0 0;
`;

const SecondTitle = styled.h2`
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  color: var(--black);
`;

const H_1 = styled.h3`
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  color: var(--black);
  margin: 30px 0 20px;
`;

const BtnSchedule = styled.button`
  margin: 20px auto 5px;
  text-align: center;
  color: var(--white);
  background-color: var(--secondary);
  width: 213px;
  height: 45px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:active {
    background-color: var(--light-secondary);
    color: var(--black);
    transform: scale(0.95);
  }
`;

const Location = styled.div`
  width: 169px;
  height: 123px;
  border-radius: 5px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 0 auto 14px;
`;

const LocationImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
  &:active {
    opacity: 0.5;
  }
`;

const Adress = styled.div`
  color: var(--black);
  font-family: Raleway;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  padding: 0 10px;
`;

const SocialContainer = styled.div`
  margin: 0 auto 30px;
`;

const SocialMedia = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  text-align: center;
  margin: 0 auto 1rem;
  color: var(--black);
  justify-content: start;
  gap: 0.5rem;
`;

const FooterFixed = styled.div`
  position: fixed;
  bottom: 0;
  background-color: var(--secondary);
  height: 72px;
  width: 425px;
  max-width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: var(--white);
  &:active {
    color: var(--primary);
    transform: scale(0.95);
  }
`;

const PaddingButton = styled.div`
  padding: 10px;
  background-color: var(--white);
  border-radius: 5px;
  position: relative;
  top: -20px;
  border: 1px solid var(--light-black);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  &:active {
    background-color: var(--light-gray);
    transform: scale(0.95);
  }
`;

function Home() {
  const navigate = useNavigate();
  const { storeSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorStore, setErrorStore] = useState(null);
  const { setSelectedService } = useScheduleStore();
  const {
    storeData,
    setStoreData,
    setStoreService,
    setStoreAdditionalService,
    setStoreBarber,
  } = useStoreDataStore();
  const { user } = useUserStore();
  const slugParts = storeSlug.split("-");
  const idString = slugParts.pop();
  const storeId = parseInt(idString);

  const services = [
    ...(storeData?.storeService || []),
    ...(storeData?.storeAdditionalService || []),
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const barbershop = await getBarbershop(storeId);
      setStoreData(barbershop);

      const barbers = await getBarbersByBarbershop(storeId);
      setStoreBarber(barbers);
      console.log(barbers);

      const services = await getAllServicesByBarbershop(storeId);
      const additionalServices = services.filter(
        (service) => service.serviceType === false,
      );
      const mainServices = services.filter(
        (service) => service.serviceType === true,
      );
      setStoreService(mainServices);
      setStoreAdditionalService(additionalServices);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorStore("Erro ao carregar os dados da barbearia.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!storeSlug || !storeId) {
      setErrorStore("Store slug or ID not provided.");
      setLoading(false);
      return;
    }

    if (storeData.storeId) {
      return;
    }

    fetchData();
  }, [storeId]);

  const handleServiceClick = (serviceId) => {
    const selectedService = services.find(
      (service) => service.id === serviceId,
    );

    if (!user) {
      alert("Por favor, faça login para agendar um serviço.");
      navigate(`/store/${storeSlug}/login`);
      return;
    }

    if (selectedService) {
      setSelectedService(selectedService);
      navigate(`/store/${storeSlug}/service`);
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Page style={{ height: "auto" }}>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Content>
          {errorStore ? (
            <div>Error: {errorStore}</div>
          ) : (
            <>
              <Capa src="/assets/img/capa.jpg" alt="Barber Book Capa" />
              <Content>
                <ImgProfileWrapper>
                  <ImgProfile
                    src="/assets/img/profile.svg"
                    alt="Barber Book Logo"
                  />
                </ImgProfileWrapper>
                <Title>{storeData?.storeName || ""}</Title>
                <SecondTitle>BARBERSHOP</SecondTitle>
                <BtnSchedule onClick={scrollToServices}>
                  AGENDAR HORÁRIO
                </BtnSchedule>
                <div
                  style={{ textAlign: "center", color: "black" }}
                  id="services"
                >
                  <H_1>Selecione o Serviço</H_1>
                  <ServiceList
                    services={services}
                    onServiceClick={handleServiceClick}
                  />
                </div>
                <H_1>Localização</H_1>
                <Location>
                  <a
                    href={storeData?.locationUrl || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LocationImage
                      src="/assets/img/location.png"
                      alt="Location"
                    />
                  </a>
                </Location>
                <Adress style={{ marginTop: "10px", padding: "0 40px" }}>
                  {storeData?.storeAddress || ""}
                </Adress>
                <SocialContainer>
                  <H_1>Redes Sociais</H_1>
                  <SocialMedia>
                    <WhatsAppIcon />
                    <Adress>{storeData?.storePhone || ""}</Adress>
                  </SocialMedia>
                  <SocialMedia style={{ marginBottom: "100px" }}>
                    <InstagramIcon />
                    <Adress>@{storeData?.storeInstagram || ""}</Adress>
                  </SocialMedia>
                </SocialContainer>
              </Content>

              <FooterFixed>
                <Button>
                  <FaceIcon
                    style={{ width: "1.4em", height: "1.4em" }}
                    onClick={() =>
                      user?.logged
                        ? navigate(`/store/${storeSlug}/visagism`)
                        : navigate(`/store/${storeSlug}/login`)
                    }
                  />
                </Button>
                <PaddingButton>
                  <Button
                    style={{ color: "var(--secondary)" }}
                    onClick={scrollToServices}
                  >
                    <CalendarMonthIcon
                      style={{ width: "1.4em", height: "1.4em" }}
                    />
                  </Button>
                </PaddingButton>
                <Button>
                  <PermIdentityIcon
                    style={{ width: "1.4em", height: "1.4em" }}
                    onClick={() =>
                      user
                        ? navigate(`/store/${storeSlug}/myAccount`)
                        : navigate(`/store/${storeSlug}/login`)
                    }
                  />
                </Button>
              </FooterFixed>
            </>
          )}
        </Content>
      )}
    </Page>
  );
}

export default Home;
