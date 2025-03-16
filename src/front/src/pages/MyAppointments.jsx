import { useEffect, useState } from "react";
import Page from "../shared/components/page";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TrashIcon from "@mui/icons-material/Delete";
import { ClipLoader } from "react-spinners";
import {
  deleteAppointmentById,
  getAppointmentsByClient,
  getScheduleById,
} from "../shared/service/useBarbershop";
import useUserStore from "../shared/store/useUserStore";

const H1 = styled.h1`
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  color: var(--black);
  margin: 0;
`;

const P = styled.p`
  margin: 0;
  padding: 0;
  color: var(--black);
  line-height: 1.5;
  font-size: 1rem;
  font-weight: 700;
`;

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
  margin-top: 100px;
  padding: 20px;
  color: var(--black);
`;

const Button = styled.button`
  width: 100%;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  border: none;
  color: var(--black);
  background-color: var(--white);
  border-bottom: 1px solid var(--light-gray);
  box-sizing: border-box;
  text-align: left;
  padding: 10px;
  display: grid;
  grid-template-columns: 5fr 1fr;
  &:active {
    border-left: 5px solid var(--primary);
    border-right: 5px solid transparent;
    background-color: var(--secondary-light-gray);
    transform: scale(0.95);
  }
`;

const CancelButton = styled.button`
  background-color: var(--primary);
  color: var(--black);
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  line-height: 1.125em;
  width: 100%;
  max-width: 350px;
`;

const ModalButton = styled.button`
  background-color: var(--primary);
  color: var(--black);
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  width: 100%;
  &:active {
    background-color: var(--light-secondary);
    transform: scale(0.95);
  }
`;

const LoadingContainerStyles = styled.div`
  width: 100svw;
  height: 100svh;
  max-width: 425px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
`;

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [schedules, setSchedules] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    const fetchAppointmentsAndSchedules = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const appointmentsData = await getAppointmentsByClient(user.id);
        setAppointments(appointmentsData);

        // Fetch and store schedules in a separate state
        const schedulesData = {};
        await Promise.all(
          appointmentsData.map(async (appointment) => {
            try {
              const scheduleData = await getScheduleById(
                appointment.scheduleId,
              );
              schedulesData[appointment.scheduleId] = scheduleData;
            } catch (error) {
              console.error(
                `Error fetching schedule ${appointment.scheduleId}:`,
                error,
              );
              schedulesData[appointment.scheduleId] = null;
            }
          }),
        );
        setSchedules(schedulesData);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        setError(
          "Não foi possível carregar os agendamentos. Tente novamente mais tarde.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentsAndSchedules();
  }, [user?.id]);

  const sortByDateAsc = (a, b) => {
    const dateA = new Date(a.appointmentsDate);
    const dateB = new Date(b.appointmentsDate);
    return dateA - dateB;
  };

  const sortByDateDesc = (a, b) => {
    const dateA = new Date(a.appointmentsDate);
    const dateB = new Date(b.appointmentsDate);
    return dateB - dateA;
  };

  const formatWeekday = (dateString) => {
    try {
      if (!dateString) {
        return "Data não disponível";
      }

      const date = new Date(dateString + "T00:00:00");

      if (isNaN(date.getTime())) {
        return "Data inválida";
      }

      const options = {
        weekday: "long",
        day: "numeric",
        month: "short",
      };

      return date.toLocaleDateString("pt-BR", options);
    } catch (error) {
      console.log("Error formatting date:", error);
      return "Erro na data";
    }
  };

  const handleExit = () => {
    navigate(-1);
  };

  const handleCancel = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const deleteAppointment = async () => {
    try {
      await deleteAppointmentById(selectedAppointment);

      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== selectedAppointment.id,
        ),
      );
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
      setError(
        "Não foi possível cancelar o agendamento. Tente novamente mais tarde.",
      );
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString.slice(0, 5);
  };

  return (
    <Page>
      <Header>
        <H1>Meus Agendamentos</H1>
        <Exit onClick={handleExit}>X</Exit>
      </Header>
      {loading && (
        <LoadingContainerStyles>
          <ClipLoader color={"#000"} loading={loading} size={50} />
        </LoadingContainerStyles>
      )}
      <DivService>
        {error ? (
          <P style={{ textAlign: "center" }}>{error}</P>
        ) : appointments.length ? (
          appointments
            .sort(sortByDateAsc) // You can adjust sorting here
            .map((appointment) => {
              const schedule = schedules[appointment.scheduleId];
              return (
                <Button key={appointment.id}>
                  <P>
                    {formatTime(schedule?.scheduleTime)} |{" "}
                    {formatWeekday(schedule?.scheduleDay) ||
                      "Data não disponível"}
                  </P>
                  <CancelButton onClick={() => handleCancel(appointment)}>
                    <TrashIcon />
                  </CancelButton>
                </Button>
              );
            })
        ) : (
          <P>Você ainda não tem agendamentos.</P>
        )}
      </DivService>
      {showModal && (
        <ModalBackground>
          <ModalDiv>
            <P>Deseja realmente cancelar este agendamento?</P>
            <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
              <ModalButton onClick={deleteAppointment}>Sim</ModalButton>
              <ModalButton onClick={() => setShowModal(false)}>Não</ModalButton>
            </div>
          </ModalDiv>
        </ModalBackground>
      )}
    </Page>
  );
}

export default MyAppointments;
