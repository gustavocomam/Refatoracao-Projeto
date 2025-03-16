import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FaceIcon from "@mui/icons-material/Face";
import StarIcon from "@mui/icons-material/Star";
import Page from "../shared/components/page";
import HeaderComponent from "../shared/components/header";
import { useCallback, useEffect, useState } from "react";
import useUserStore from "../shared/store/useUserStore";
import { API_URL } from "../shared/service/constants";

const BarberName = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: var(--black);
  margin-top: 80px; 
  margin-left: 20px;
`;

const FeedbackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 20px;
`;
const FeedbackItem = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--black);
`;

const UserName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin: 8px;
`;

const UserFeedback = styled.p`
  font-size: 14px;
  color: var(--black);
  margin: 10px 0 0;
  padding: 0;
`;

const StarRating = styled.div`
  display: flex;
  gap: 3px;
  color: var(--secondary);
`;

function Feedback() {
  const navigate = useNavigate();
  const [feedback, setFeedbacks] = useState([]);
  const [barber, setBarberName] = useState("");
  const { user } = useUserStore();

  const fetchClientName = useCallback(async (clientId) => {
    if (!clientId) return "Cliente Anônimo"; 
    try {
      const response = await fetch(`${API_URL}/client/${clientId}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar o nome do cliente");
      }
      const data = await response.json();
      return data.name || "Cliente Anônimo"; 
    } catch (error) {
      console.error("Erro no fetch do nome do cliente:", error);
      return "Cliente Anônimo"; 
    }
  }, []);

  const fetchFeedback = useCallback(async () => {
    if (!user?.id) {
      console.error("ID do barbeiro não encontrado no user");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/review/barber/${user.id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar os feedbacks");
      }

      const data = await response.json();
      console.log("Feedbacks", data); 

      const feedbackData = await Promise.all(
        data.map(async (item) => {
          const clientName = await fetchClientName(item.clientId); 
          return {
            ...item,
            clientName, 
          };
        }),
      );

      setFeedbacks(feedbackData); 
      setBarberName("João Cabeleireiro");
    } catch (error) {
      console.error("Erro no fetch dos feedbacks:", error);
    }
  }, [user, fetchClientName]);

  useEffect(() => {
    if (user) {
      fetchFeedback();
      console.log("user", user);
    }
  }, [user, fetchFeedback]);

  return (
    <Page>
      <HeaderComponent name="Feedback" onClick={() => navigate(-1)} />
      <BarberName>Barbeiro: {user.name} </BarberName>
      <FeedbackList>
        {feedback.map((item) => (
          <FeedbackItem key={item.id}>
            <UserInfo>
              <FaceIcon
                style={{ fontSize: "24px", color: "var(--light-black)" }}
              />
              <UserName>{item.clientName}</UserName>
            </UserInfo>
            <StarRating>
              {[...Array(item.stars)].map((_, index) => (
                <StarIcon key={index} style={{ fontSize: "20px" }} />
              ))}
            </StarRating>
            <UserFeedback>{item.comment}</UserFeedback>
          </FeedbackItem>
        ))}
      </FeedbackList>
    </Page>
  );
}

export default Feedback;
