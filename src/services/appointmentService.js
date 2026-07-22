// Appointment service. Auth is via the httpOnly JWT cookie (credentials:
// 'include'). Appointments are a hybrid endpoint (public create, admin manage).
const API_URL = '/api/appointments';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const appointmentService = {
    getAllAppointments: async () => {
        try {
            const response = await fetch(API_URL, { credentials: 'include' });
            if (!response.ok) throw new Error('Failed to fetch appointments');
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    createAppointment: async (appointmentData) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: JSON_HEADERS,
                credentials: 'include',
                body: JSON.stringify(appointmentData)
            });
            if (!response.ok) throw new Error('Booking failed');
            return await response.json();
        } catch (error) {
            console.error('Booking error:', error);
            throw error;
        }
    },

    updateAppointmentStatus: async (id, status) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: JSON_HEADERS,
                credentials: 'include',
                body: JSON.stringify({ status })
            });
            if (!response.ok) throw new Error('Update failed');
            return await response.json();
        } catch (error) {
            console.error('Update error:', error);
            throw error;
        }
    },

    getUserAppointments: async (email) => {
        try {
            const all = await appointmentService.getAllAppointments();
            return all.filter(apt => apt.email === email);
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    deleteAppointment: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Delete failed');
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    checkAvailability: async (date, timeSlot) => {
        try {
            const all = await appointmentService.getAllAppointments();
            const isTaken = all.some(apt => apt.date === date && apt.timeSlot === timeSlot && apt.status !== 'cancelled');
            return !isTaken;
        } catch (error) {
            return true; // Assume available if error
        }
    }
};
