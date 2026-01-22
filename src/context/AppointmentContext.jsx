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

    const loadUserAppointments = () => {
        if (user?.email) {
            const userApts = appointmentService.getUserAppointments(user.email);
            setUserAppointments(userApts);
        }
    };

    const loadAllAppointments = () => {
        const allApts = appointmentService.getAllAppointments();
        setAppointments(allApts);
    };

    const createAppointment = async (appointmentData) => {
        const newAppointment = appointmentService.createAppointment(appointmentData);
        loadUserAppointments();
        return newAppointment;
    };

    const updateAppointmentStatus = (id, status, notes) => {
        const updated = appointmentService.updateAppointmentStatus(id, status, notes);
        loadAllAppointments();
        if (user) loadUserAppointments();
        return updated;
    };

    const deleteAppointment = (id) => {
        appointmentService.deleteAppointment(id);
        loadAllAppointments();
        if (user) loadUserAppointments();
    };

    const checkAvailability = (date, timeSlot) => {
        return appointmentService.checkAvailability(date, timeSlot);
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
