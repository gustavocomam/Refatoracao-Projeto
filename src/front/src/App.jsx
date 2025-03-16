import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Page from "./shared/components/page";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import MyAcc from "./pages/MyAcc";
import LandingPage from "./pages/LandingPage";
import AddService from "./pages/AddService";
import AddAdditionalService from "./pages/AddAdditionalService";
import AddBarber from "./pages/AddBarber";
import Review from "./pages/Review";
import Feedback from "./pages/Feedback";
import ServicePage from "./pages/ServicePage";
import AdditionalService from "./pages/AdditionalService";
import BaberPage from "./pages/BarberPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import AdminPage from "./pages/Admin";
import MyAppointments from "./pages/MyAppointments";
// import StoreRegister from './pages/StoreRegister';
// import MyScheduling from './pages/MyScheduling';
import ActivityPage from "./pages/ActivityPage";
// import AdminPage from './pages/Admin';
import Visagism from "./pages/Visagism";
// import ServicePage from './pages/ServicePage';
// import AdditionalService from './pages/AdditionalService';
// import Scheduling from './pages/Scheduling';
// import BaberPage from "./pages/BarberPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Roote />} />
        <Route path="/store/:storeSlug" element={<Home />} />
        <Route path="/store/:storeSlug/login" element={<LoginPage />} />
        <Route path="/store/:storeSlug/myAccount" element={<MyAcc />} />
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/store/:storeSlug/review" element={<Review />} />
        <Route path="/store/:storeSlug/feedback" element={<Feedback />} />
        <Route
          path="/store/:storeSlug/addService/:type?/:id?"
          element={<AddService />}
        />
        <Route
          path="/store/:storeSlug/addAdditionalService/:type?/:id?"
          element={<AddAdditionalService />}
        />
        <Route
          path="/store/:storeSlug/addBarber/:type?/:id?"
          element={<AddBarber />}
        />
        <Route path="/store/:storeSlug/service" element={<ServicePage />} />
        <Route
          path="/store/:storeSlug/additionalService"
          element={<AdditionalService />}
        />
        <Route path="/store/:storeSlug/barber" element={<BaberPage />} />
        <Route
          path="/store/:storeSlug/appointments"
          element={<AppointmentsPage />}
        />
        <Route path="/store/:storeSlug/admin" element={<AdminPage />} />
        <Route path="/store/:storeSlug/visagism" element={<Visagism />} />
        {/* <Route path="/storeRegister" element={<StoreRegister />} /> */}
        <Route
          path="/store/:storeSlug/myappointments"
          element={<MyAppointments />}
        />
        <Route path="/store/:storeSlug/activity" element={<ActivityPage />} />
      </Routes>
    </Router>
  );
}

const Roote = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/landingPage");
    }, 1800);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <Page>
      <img
        src="./assets/img/logo.svg"
        alt=""
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          margin: "auto",
          opacity: 0.8,
          paddingTop: "20vh",
          animation: "fadeInUp 1.5s ease-in-out forwards",
        }}
      />
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Page>
  );
};

export default App;
