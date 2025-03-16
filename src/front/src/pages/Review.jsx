import { useCallback, useEffect, useState } from "react";
import Page from "../shared/components/page";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import HeaderComponent from "../shared/components/header";
import Button from "../shared/components/baseButton";
import { API_URL } from "../shared/service/constants";
import useUserStore from "../shared/store/useUserStore";

const BarberInfo = styled.div`
  text-align: center;
  margin: 1rem 0;
  color: #333;
`;

const BarberName = styled.h3`
  font-size: 1.2rem;
`;

const ServiceDescription = styled.p`
  font-size: 1.1rem;
  color: #333;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.active ? "#ffcc00" : "#ddd")};
  font-size: 2rem;
  transition:
    transform 0.2s ease,
    color 0.2s ease;

  &:hover {
    transform: scale(1.2);
    color: #ffcc00;
  }
`;

const Content = styled.div`
  margin: 95px 20px 0;
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 1rem 0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
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

function AddReview() {
  const [hoverNota, setHoverNota] = useState(0);
  const handleRatingClick = (selectedStars) => {
    handleReviewChange("stars", selectedStars);
  };

  const { type, id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [barber, setBarberName] = useState("");
  const [scheduleDay, setScheduleDay] = useState("");
  const [review, setReview] = useState({
    clientId: user ? user.id : null,  
    barberId: null,
    comment: "",
    review_date: new Date().toISOString().split("T")[0],
    stars: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // fetch appointment, schedule and barber 
  const fetchAppointmentAndSchedule = useCallback(async (clientId) => {
    try {
      const appointmentResponse = await fetch(
        `${API_URL}/appointments/client/${clientId}`
      );
      if (!appointmentResponse.ok) {
        throw new Error("Erro ao buscar appointments");
      }
      const appointments = await appointmentResponse.json();
      if (!appointments.length) {
        throw new Error("Nenhum appointment encontrado");
      }
      const scheduleId = appointments[0]?.scheduleId;

      const scheduleResponse = await fetch(`${API_URL}/schedule/${scheduleId}`);
      if (!scheduleResponse.ok) {
        throw new Error("Erro ao buscar schedule");
      }

      const scheduleData = await scheduleResponse.json();
      const barberId = scheduleData.barberId;

      const barberResponse = await fetch(`${API_URL}/barber/${barberId}`);
      const barberData = await barberResponse.json();

      const rawDate = scheduleData.scheduleDay;
      const [year, month, day] = rawDate.split("-");
      const date = new Date(Date.UTC(year, month - 1, day));
      date.setUTCDate(date.getUTCDate() + 1);

      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return {
        date: formattedDate || "Data não encontrada",
        barberName: barberData.name || "Nome do barbeiro não encontrado",
        barberId: barberData.id || null,
      };
    } catch (error) {
      console.error("Erro ao buscar agendamento:", error);
      return { date: "Erro", barberName: "Erro", barberId: null };
    }
  }, []);

  useEffect(() => {
    const loadDetails = async () => {
      if (user && user.id) {
        const { date, barberName, barberId } = await fetchAppointmentAndSchedule(user.id);
        setScheduleDay(date);
        setBarberName(barberName);
        setReview((prevReview) => ({
          ...prevReview,
          barberId: barberId,
        }));
      }
    };
    loadDetails();
  }, [user, fetchAppointmentAndSchedule]);

  // avaliar -> api
  const handleReviewChange = useCallback((field, value) => {
    setReview((prevReview) => ({ ...prevReview, [field]: value }));
  }, []);

  const handleAddReview = useCallback(async () => {
    if (!review.barberId) {
      setErrorMessage("Barbeiro não encontrado.");
      setShowModal(true);
      return;
    }
    if (!review.comment || !review.stars) {
      setErrorMessage("Preencha todos os campos.");
      setShowModal(true);
      return;
    }

    const formattedReview = {
      ...review,
      review_date: new Date().toLocaleDateString("pt-BR"),
    };

    console.log("Review feito com sucesso ! ", formattedReview)

    setIsLoading(true);
    const method = type === "edit" ? "PUT" : "POST";
    const url = type === "edit" ? `${API_URL}/review/${id}` : `${API_URL}/review`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedReview),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao salvar a avaliação");
      }

      const action = type === "edit" ? "atualizado" : "adicionado";
      setErrorMessage(`Avaliação ${action} com sucesso!`);
      setShowModal(true);

      window.alert("Avaliação feita com sucesso!");

      if (type === "edit") {
        setTimeout(() => navigate(-1), 500);
      } else {
        setReview({
          clientId: user.id,
          barberId: user.id,
          comment: "",
          review_date: "",
          stars: 0,
        });
      }
    } catch (error) {
      console.error("Erro ao salvar review:", error);
      setErrorMessage(error.message);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  }, [review, type, navigate, id, user]);

  return (
    <Page>
      <HeaderComponent name="Avalie o Serviço" onClick={() => navigate(-1)} />
      <Content>
        <BarberInfo>
          <BarberName>Nome do Barbeiro: {barber}</BarberName>
          <ServiceDescription>Agendamento Realizado: {scheduleDay}</ServiceDescription>
        </BarberInfo>
        <RatingContainer>
          {[1, 2, 3, 4, 5].map((n) => (
            <StarButton
              key={n}
              {...(review.stars >= n || hoverNota >= n
                ? { active: "true" }
                : {})}
              onClick={() => handleRatingClick(n)}
              onMouseEnter={() => setHoverNota(n)}
              onMouseLeave={() => setHoverNota(0)}
            >
              <FaStar />
            </StarButton>
          ))}
        </RatingContainer>

        <Input
          placeholder="Escreva seu comentário..."
          type="text"
          value={review.comment}
          onChange={(e) => handleReviewChange("comment", e.target.value)}
        />
        <Button onClick={handleAddReview} disabled={isLoading}>
          {isLoading ? "Enviando..." : "Avaliar"}
        </Button>
      </Content>
    </Page>
  );
}

export default AddReview;