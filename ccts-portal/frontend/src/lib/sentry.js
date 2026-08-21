import * as Sentry from '@sentry/react';

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN || '';
const SENTRY_ENVIRONMENT = import.meta.env.VITE_SENTRY_ENVIRONMENT || 'development';

// Initialize Sentry for React
export const initSentry = () => {
    if (!SENTRY_DSN) {
        console.info('Sentry DSN not configured. Error tracking disabled.');
        return;
    }

    Sentry.init({
        dsn: SENTRY_DSN,
        environment: SENTRY_ENVIRONMENT,
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration({
                maskAllText: true,
                blockAllMedia: true
            })
        ],
        tracesSampleRate: SENTRY_ENVIRONMENT === 'production' ? 0.1 : 1.0,
        replaysSessionSampleRate: SENTRY_ENVIRONMENT === 'production' ? 0.05 : 1.0,
        replaysOnErrorSampleRate: 1.0,
        beforeSend(event, hint) {
            // Don't send events in development
            if (SENTRY_ENVIRONMENT === 'development') {
                console.error('Sentry Event:', event, hint);
                return null;
            }
            return event;
        },
        beforeSendTransaction(event) {
            if (SENTRY_ENVIRONMENT === 'development') {
                return null;
            }
            return event;
        }
    });
};

// Set user context
export const setSentryUser = (user) => {
    if (!user) {
        Sentry.setUser(null);
        return;
    }

    Sentry.setUser({
        id: user._id || user.id,
        email: user.email,
        username: user.name,
        role: user.role
    });
};

// Set tag context
export const setSentryTag = (key, value) => {
    Sentry.setTag(key, value);
};

// Set extra context
export const setSentryContext = (key, value) => {
    Sentry.setContext(key, value);
};

// Capture exception
export const captureException = (error, context) => {
    if (context) {
        Sentry.setContext('error_context', context);
    }
    Sentry.captureException(error);
};

// Capture message
export const captureMessage = (message, level = 'info') => {
    Sentry.captureMessage(message, level);
};

// Performance monitoring
export const startPerformanceTransaction = (name) => {
    return Sentry.startTransaction({ name });
};

// React Error Boundary wrapper
export const SentryErrorBoundary = Sentry.withErrorBoundary;

export { Sentry };
