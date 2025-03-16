import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../shared/components/page";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useUserStore from "../shared/store/useUserStore";
import HeaderComponent from "../shared/components/header";
import useScheduleStore from "../shared/store/useScheduleStore";
import PrevButton from "../shared/components/prevButton";
import {
  getAvailableTimesByBarber,
  postAppointment,
  mutateSchedule,
} from "../shared/service/useBarbershop";

const CalendarContainer = styled.div`
  padding: 95px 20px;
  color: var(--black);
  text-align: center;
  display: flex;
  justify-content: center;
`;

const FooterContainer = styled.div`
  width: 100%;
  height: 60px;
  max-width: 425px;
  background-color: var(--secondary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
`;

const HeaderModal = styled.div`
  width: 350px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 0 20px;
  box-sizing: border-box;
  background-color: var(--white);
  align-items: center;
  border-radius: 5px;
`;

const ModalOverlay = styled.div`
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

const ScheduleList = styled.div`
  width: 350px;
  max-width: 100%;
  background-color: var(--white);
  font-family: Arial, Helvetica, sans-serif;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: var(--secondary);
    color: var(--white);
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--primary);
    }

    &:active {
      background-color: var(--dark-primary);
    }
  }
`;

const H1 = styled.h1`
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  color: var(--black);
  margin: 0;
`;

function AppointmentsPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setAppointments, user } = useUserStore();
  const { storeSchedule, resetSchedule, setScheduleId } = useScheduleStore();

  const barberID = storeSchedule.barber?.id;

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const handleDayClick = useCallback(
    async (value) => {
      const selectedDay = value.toISOString().split("T")[0];

      setLoading(true);
      setError("");
      try {
        const availableTimesForBarber =
          await getAvailableTimesByBarber(barberID);

        const filteredTimes = availableTimesForBarber.filter(
          (time) => time.scheduleDay === selectedDay && time.available === true,
        );

        const timesList = filteredTimes.map((time) => {
          const formattedTime = time.scheduleTime.slice(0, 5);
          return { time: formattedTime, scheduleId: time.id };
        });

        setAvailableTimes(timesList);
        setShowModal(true);
        setSelectedDate(value);
      } catch (error) {
        setError("Erro ao buscar horários disponíveis.");
      } finally {
        setLoading(false);
      }
    },
    [barberID],
  );

  const handleButtonClick = useCallback(
    async (scheduleId) => {
      setScheduleId(scheduleId);
      setAppointments(selectedDate.toISOString().split("T")[0], scheduleId);
      setLoading(true);
      setError("");

      const { id: clientId } = user;
      const { barber, selectedService, additionalService, total_price } =
        storeSchedule;

      if (!clientId) {
        console.error("ID do cliente não encontrado:", clientId);
        setLoading(false);
        setShowModal(false);
        return;
      }

      try {
        const response = await postAppointment(
          clientId,
          barber?.id,
          scheduleId,
          selectedService?.id,
          additionalService?.id,
          total_price,
        );

        if (!response) throw new Error("Erro ao agendar horário");

        await mutateSchedule(scheduleId, false);
        alert("Horário agendado com sucesso!");
        resetSchedule();
        navigate(-4);
      } catch (error) {
        setError("Erro ao agendar horário.");
        console.error("Error during scheduling:", error);
      } finally {
        setLoading(false);
        setShowModal(false);
      }
    },
    [
      user,
      storeSchedule,
      selectedDate,
      navigate,
      resetSchedule,
      setAppointments,
      setScheduleId,
    ],
  );

  const handleExit = () => {
    navigate(-4);
    resetSchedule();
  };

  return (
    <Page>
      <HeaderComponent name="Agendar Horário" onClick={handleExit} />
      <CalendarContainer>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          minDate={minDate}
          maxDate={maxDate}
          onClickDay={handleDayClick}
        />
      </CalendarContainer>
      <FooterContainer>
        <PrevButton onClick={() => navigate(-1)} />
      </FooterContainer>
      {showModal && (
        <ModalOverlay>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <HeaderModal>
              <H1>Horários disponíveis</H1>
              <Exit onClick={() => setShowModal(false)}>x</Exit>
            </HeaderModal>
            {loading ? (
              <p>Carregando...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <ScheduleList>
                {loading ? (
                  <p>Carregando...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : availableTimes.length === 0 ? (
                  <p>Sem horários disponíveis</p>
                ) : (
                  <ScheduleList>
                    {availableTimes.map(({ time, scheduleId }) => (
                      <button
                        key={scheduleId}
                        onClick={() => handleButtonClick(scheduleId)}
                      >
                        {time}
                      </button>
                    ))}
                  </ScheduleList>
                )}
              </ScheduleList>
            )}
          </div>
        </ModalOverlay>
      )}
    </Page>
  );
}

export default AppointmentsPage;
