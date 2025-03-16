import { API_URL } from "./constants";
// Consultar todas as barbearias
export const getAllBarbershops = async () => {
  try {
    const response = await fetch(`${API_URL}/barbershop`);
    if (!response.ok) {
      throw new Error(
        `Erro ao buscar barbearias: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar barbearias:", error);
    throw error;
  }
};

export const getBarbersByBarbershop = async (id) => {
  try {
    const response = await fetch(`${API_URL}/barber/barbers/${id}`);
    if (!response.ok) {
      throw new Error(
        `Erro ao buscar barbeiros da barbearia ${id}: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar barbeiros da barbearia ${id}:`, error);
    throw error;
  }
};

// Consultar uma barbearia por ID
export const getBarbershop = async (id) => {
  try {
    const response = await fetch(`${API_URL}/barbershop/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(
        `Erro ao buscar barbearia ${id}: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar barbearia ${id}:`, error);
    throw error;
  }
};

export const getAllServicesByBarbershop = async (id) => {
  try {
    const response = await fetch(
      `${API_URL}/service/barbershop/${id}/services`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json(); // Try to get error details
      const errorMessage = errorData?.message || response.statusText;
      throw new Error(
        `Erro ao buscar serviços: ${response.status} ${errorMessage}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao buscar serviços para barbearia ${id}:`, error);
    throw error; // Re-throw for handling in the component
  }
};

export const postAvailableTimes = async (
  barberId,
  scheduleDay,
  scheduleTime,
  available,
) => {
  try {
    const response = await fetch(`${API_URL}/schedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        barberId,
        scheduleDay,
        scheduleTime,
        available,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Erro ao agendar horário: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao agendar horário:", error);
    throw error;
  }
};

export const getReviewsByBarber = async (barberId) => {
  try {
    const response = await fetch(`${API_URL}/review/barber/${barberId}`);
    if (!response.ok) {
      throw new Error(
        `Erro ao buscar avaliações: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    throw error;
  }
}

export const getAppointmentsByBarber = async (barberId) => {
  try {
    const response = await fetch(`${API_URL}/appointments/barber/${barberId}`);
    if (!response.ok) {
      throw new Error(
        `Erro ao buscar agendamentos: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    throw error;
  }
}

export const getAvailableTimesByBarber = async (barberId) => {
  try {
    const response = await fetch(`${API_URL}/schedule/barber/${barberId}`);
    if (!response.ok) {
      throw new Error(
        `Erro ao buscar horários disponíveis: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar horários disponíveis:", error);
    throw error;
  }
};

export const postAppointment = async (
  clientId,
  barberId,
  scheduleId,
  serviceId,
  additionalservice_id,
  totalPrice,
) => {
  try {
    const response = await fetch(`${API_URL}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId,
        barberId,
        scheduleId,
        serviceId,
        additionalservice_id,
        totalPrice,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Erro ao agendar horário: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao agendar horário:", error);
    throw error;
  }
};

export const mutateSchedule = async (scheduleId, available) => {
  try {
    const response = await fetch(`${API_URL}/schedule/${scheduleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available }),
    });
    if (!response.ok) {
      throw new Error(
        `Erro ao atualizar horário: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar horário:", error);
    throw error;
  }
};

export const getAppointmentsByClient = async (clientId) => {
  try {
    const response = await fetch(`${API_URL}/appointments/client/${clientId}`);
    if (!response.ok) {
      throw new Error(
        `Erro ao buscar agendamentos: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    throw error;
  }
};
// Criar uma barbearia
export const createBarbershop = async (barbershopData) => {
  try {
    const response = await fetch(`${API_URL}/barbershop`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(barbershopData),
    });
    if (!response.ok) {
      throw new Error(
        `Erro ao criar barbearia: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar barbearia:", error);
    throw error;
  }
};

// Atualizar uma barbearia
export const updateBarbershop = async (id, barbershopData) => {
  try {
    const response = await fetch(`${API_URL}/barbershop/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(barbershopData),
    });
    if (!response.ok) {
      throw new Error(
        `Erro ao atualizar barbearia ${id}: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao atualizar barbearia ${id}:`, error);
    throw error;
  }
};

export const getScheduleById = async (scheduleId) => {
  try {
    const response = await fetch(`${API_URL}/schedule/${scheduleId}`);
    if (!response.ok) {
      throw new Error(
        `Erro ao buscar horário ${scheduleId}: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar horário ${scheduleId}:`, error);
    throw error;
  }
};

export const deleteAppointmentById = async (appointment) => {
  const appointmentId = appointment.id;
  const scheduleId = appointment.scheduleId;

  try {
    // Exclui o agendamento
    const response = await fetch(`${API_URL}/appointments/${appointmentId}`, {
      method: "DELETE",
    });

    // Verifica se a exclusão do agendamento foi bem-sucedida
    if (!response.ok) {
      throw new Error(
        `Erro ao excluir agendamento ${appointmentId}: ${response.status} ${response.statusText}`,
      );
    }

    // Atualiza o horário após excluir o agendamento
    const updatedSchedule = await mutateSchedule(scheduleId, true);
    console.log("Horário atualizado com sucesso:", updatedSchedule);

    return response;
  } catch (error) {
    console.error(`Erro ao excluir agendamento ${appointmentId}:`, error);
    throw error;
  }
};

// Excluir uma barbearia
export const deleteBarbershop = async (id) => {
  try {
    const response = await fetch(`${API_URL}/barbershop/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(
        `Erro ao excluir barbearia ${id}: ${response.status} ${response.statusText}`,
      );
    }
    return response;
  } catch (error) {
    console.error(`Erro ao excluir barbearia ${id}:`, error);
    throw error;
  }
};
