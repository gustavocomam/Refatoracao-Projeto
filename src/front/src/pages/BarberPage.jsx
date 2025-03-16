import Page from "../shared/components/page";
import HeaderComponent from "../shared/components/header";
import FooterNavButtons from "../shared/components/footerNavButtons";
import BarberList from "../shared/components/barberList";
import { useNavigate } from "react-router-dom";
import useStoreDataStore from "../shared/store/useStoreDataStore";

function BaberPage() {
  const navigate = useNavigate();
  const { storeData } = useStoreDataStore();
  const barbers = storeData.storeBarber;
  console.log(storeData);
  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <Page>
      <HeaderComponent
        name="Escolha seu barbeiro"
        onClick={() => navigate(-3)}
      />
      <BarberList barbers={barbers} />
      <FooterNavButtons onClickPrev={handlePrev} />
    </Page>
  );
}
export default BaberPage;
