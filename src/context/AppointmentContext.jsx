import React, { createContext, useContext, useState, useEffect } from 'react';
import { appointmentService } from '@/services/appointmentService';
import { useAuth } from './AuthContext';

const AppointmentContext = createContext();

export const useAppointments = () => {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error('useAppointments must be used within AppointmentProvider');
    }
    return context;
};

export const AppointmentProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);
    const [userAppointments, setUserAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user?.email) {
            loadUserAppointments();
        }
        setLoading(false);
    }, [user]);

    const loadUserAppointments = async () => {
        if (user?.email) {
            const userApts = await appointmentService.getUserAppointments(user.email);
            setUserAppointments(userApts);
        }
    };

    const loadAllAppointments = async () => {
        const allApts = await appointmentService.getAllAppointments();
        setAppointments(allApts);
    };

    const createAppointment = async (appointmentData) => {
        const newAppointment = await appointmentService.createAppointment(appointmentData);
        await loadUserAppointments();
        return newAppointment;
    };

    const updateAppointmentStatus = async (id, status, notes) => {
        const updated = await appointmentService.updateAppointmentStatus(id, status, notes);
        await loadAllAppointments();
        if (user) await loadUserAppointments();
        return updated;
    };

    const deleteAppointment = async (id) => {
        await appointmentService.deleteAppointment(id);
        await loadAllAppointments();
        if (user) await loadUserAppointments();
    };

    const checkAvailability = async (date, timeSlot) => {
        return await appointmentService.checkAvailability(date, timeSlot);
    };

    const value = {
        appointments,
        userAppointments,
        loading,
        createAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        checkAvailability,
        loadAllAppointments,
        refreshAppointments: loadUserAppointments
    };

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );
};
