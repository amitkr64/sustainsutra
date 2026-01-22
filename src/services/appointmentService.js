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
    }
};
