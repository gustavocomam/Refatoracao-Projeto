import { useParams, useNavigate } from "react-router-dom";
import HeaderComponent from "../shared/components/header";
import FooterNavButtons from "../shared/components/footerNavButtons";
import ServiceItem from "../shared/components/serviceItem";
import Page from "../shared/components/page";
import useScheduleStore from "../shared/store/useScheduleStore";

function ServicePage() {
  const { storeSlug } = useParams();
  const navigate = useNavigate();
  const { storeSchedule, setSelectedService } = useScheduleStore();

  const handleServiceSelection = () => {
    navigate(`/store/${storeSlug}/additionalService`);
  };

  const handleNoSelection = () => {
    setSelectedService(null);
    navigate(-1);
  };

  return (
    <Page>
      <HeaderComponent
        name="Serviço Selecionado"
        onClick={() => navigate(-1)}
      />
      <div style={{ marginTop: "95px" }}>
        <ServiceItem
          service={storeSchedule.selectedService}
          onClick={() => {}}
        />
      </div>
      <FooterNavButtons
        onClickPrev={handleNoSelection}
        onClickNext={handleServiceSelection}
      />
    </Page>
  );
}

export default ServicePage;
