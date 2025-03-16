import { useParams, useNavigate } from "react-router-dom";
import Page from "../shared/components/page";
import HeaderComponent from "../shared/components/header";
import FooterNavButtons from "../shared/components/footerNavButtons";
import ServiceList from "../shared/components/serviceList";
import useScheduleStore from "../shared/store/useScheduleStore";
import useStoreDataStore from "../shared/store/useStoreDataStore";

function AdditionalService() {
  const { storeSlug } = useParams();
  const navigate = useNavigate();
  const { setAdditionalService } = useScheduleStore();
  const { storeData } = useStoreDataStore();
  const additionalServices = storeData.storeAdditionalService;

  const handleServiceSelection = (service) => {
    if (service) {
      setAdditionalService(service);
      navigate(`/store/${storeSlug}/barber`);
    } else {
      console.error("Serviço adicional não encontrado.");
    }
  };

  const handleNoSelection = () => {
    setAdditionalService(null);
    navigate(`/store/${storeSlug}/barber`);
  };

  return (
    <Page>
      <HeaderComponent
        name="Serviços Adicionais"
        onClick={() => {
          navigate(-2);
        }}
      />
      {additionalServices ? (
        <div style={{ marginTop: "95px" }}>
          <ServiceList
            services={additionalServices}
            onServiceClick={handleServiceSelection}
          />
        </div>
      ) : (
        <p>Nenhum serviço adicional disponível.</p>
      )}
      <FooterNavButtons
        onClickPrev={() => navigate(-1)}
        onClickNext={handleNoSelection}
      />
    </Page>
  );
}

export default AdditionalService;
