import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Page from "../shared/components/page";
import HeaderComponent from "../shared/components/header";
import {
  getAvailableTimesByBarber,
  getAppointmentsByBarber,
  getReviewsByBarber,
} from "../shared/service/useBarbershop";
import useUserStore from "../shared/store/useUserStore";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function ActivityPage() {
  const [chartData, setChartData] = useState(null);
  const [averagePriceChartData, setAveragePriceChartData] = useState(null);
  const [monthlyPercentage, setMonthlyPercentage] = useState(0);
  const [reviewDistributionData, setReviewDistributionData] = useState(null); // Novo estado para as distribuições de estrelas
  const { user } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schedules = await getAvailableTimesByBarber(user.id);
        const appointments = await getAppointmentsByBarber(user.id);
        const reviews = await getReviewsByBarber(user.id);

        const groupedData = {};

        schedules.forEach((item) => {
          const day = item.scheduleDay;
          if (!groupedData[day])
            groupedData[day] = { schedules: 0, appointments: 0, totalPrice: 0 };
          groupedData[day].schedules++;
        });

        appointments.forEach((item) => {
          const schedule = schedules.find((s) => s.id === item.scheduleId);
          if (schedule) {
            const day = schedule.scheduleDay;
            if (!groupedData[day])
              groupedData[day] = {
                schedules: 0,
                appointments: 0,
                totalPrice: 0,
              };
            groupedData[day].appointments++;
            groupedData[day].totalPrice += item.totalPrice;
          }
        });

        const labels = Object.keys(groupedData);
        const schedulesData = labels.map((day) => groupedData[day].schedules);
        const appointmentsData = labels.map(
          (day) => groupedData[day].appointments,
        );

        const totalSchedules = schedulesData.reduce((sum, val) => sum + val, 0);
        const totalAppointments = appointmentsData.reduce(
          (sum, val) => sum + val,
          0,
        );
        const overallPercentage =
          totalSchedules > 0 ? (totalAppointments / totalSchedules) * 100 : 0;

        setMonthlyPercentage(overallPercentage.toFixed(2));

        setChartData({
          labels,
          datasets: [
            {
              label: "Horários Disponíveis",
              data: schedulesData,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
            {
              label: "Agendamentos",
              data: appointmentsData,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });

        const averagePriceData = labels.map((day) =>
          groupedData[day].appointments > 0
            ? groupedData[day].totalPrice / groupedData[day].appointments
            : 0,
        );

        setAveragePriceChartData({
          labels,
          datasets: [
            {
              label: "Preço Médio por Agendamento",
              data: averagePriceData,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
          ],
        });

        // Processando avaliações para o gráfico de estrelas
        const reviewCounts = [0, 0, 0, 0, 0]; // Índices 0 a 4 representam 1 a 5 estrelas
        reviews.forEach((review) => {
          if (review.stars >= 1 && review.stars <= 5) {
            reviewCounts[review.stars - 1]++; // Contabiliza a quantidade de avaliações por estrela
          }
        });

        const totalReviews = reviews.length;
        const reviewPercentages = reviewCounts.map((count) =>
          totalReviews > 0 ? ((count / totalReviews) * 100).toFixed(2) : 0,
        );

        setReviewDistributionData({
          labels: [
            "1 Estrela",
            "2 Estrelas",
            "3 Estrelas",
            "4 Estrelas",
            "5 Estrelas",
          ],
          datasets: [
            {
              label: "Distribuição de Avaliações",
              data: reviewPercentages,
              backgroundColor: "rgba(153, 102, 255, 0.5)",
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [user.id]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Horários Disponíveis vs Agendamentos",
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Data",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Quantidade",
        },
      },
    },
  };

  const averagePriceOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Preço Médio por Agendamento",
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Data",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Preço (R$)",
        },
      },
    },
  };

  const reviewOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribuição de Avaliações por Estrelas",
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Estrelas",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Porcentagem (%)",
        },
        min: 0,
        max: 100,
      },
    },
  };

  const navigate = useNavigate();

  return (
    <Page>
      <HeaderComponent onClick={() => navigate(-1)} name="Atividade" />
      <div
        style={{
          boxSizing: "border-box",
          margin: "100px 20px 100px",
        }}
      >
        <h2
          style={{
            marginTop: "20px",
            color: "var(--secondary-light-black)",
            fontSize: "16px",
          }}
        >
          Porcentagem Geral do Mês: {monthlyPercentage}%
        </h2>
        {chartData && <Bar options={options} data={chartData} />}

        <h2
          style={{
            marginTop: "20px",
            color: "var(--secondary-light-black)",
            fontSize: "16px",
          }}
        >
          Preço Médio por Agendamento: R${" "}
          {averagePriceChartData?.datasets[0].data
            .reduce((acc, val) => acc + val, 0)
            .toFixed(2)}
        </h2>
        {averagePriceChartData && (
          <Bar options={averagePriceOptions} data={averagePriceChartData} />
        )}

        <h2
          style={{
            marginTop: "20px",
            color: "var(--secondary-light-black)",
            fontSize: "16px",
          }}
        >
          Porcentagem de Insatisfação:{" "}
          {(
            parseFloat(reviewDistributionData?.datasets[0].data[0] || 0) +
              parseFloat(reviewDistributionData?.datasets[0].data[1] || 0) || 0
          ).toFixed(2)}
          %
        </h2>

        {reviewDistributionData && (
          <Bar options={reviewOptions} data={reviewDistributionData} />
        )}
      </div>
    </Page>
  );
}

export default ActivityPage;
