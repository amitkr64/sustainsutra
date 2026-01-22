const API_URL = '/api/appointments';

export const appointmentService = {
    getAllAppointments: async () => {
        try {
            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`
                }
            });
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
                headers: {
                    'Content-Type': 'application/json',
                    // Optional auth if user is logged in, but defined as public/hybrid
                    'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`
                },
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
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`
                },
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
            // In a real MERN app, we'd have a specific endpoint or use query params
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
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`
                }
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
            // Simple check: fetch all and see if any matches
            const all = await appointmentService.getAllAppointments();
            const isTaken = all.some(apt => apt.date === date && apt.timeSlot === timeSlot && apt.status !== 'cancelled');
            return !isTaken;
        } catch (error) {
            return true; // Assume available if error
        }
    }
};
