const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');

const SENTRY_DSN = process.env.SENTRY_DSN || '';
const SENTRY_ENVIRONMENT = process.env.NODE_ENV || 'development';

const initSentry = (app) => {
    if (!SENTRY_DSN) {
        console.log('Sentry DSN not configured. Error tracking disabled.');
        return;
    }

    Sentry.init({
        dsn: SENTRY_DSN,
        environment: SENTRY_ENVIRONMENT,
        integrations: [
            nodeProfilingIntegration()
        ],
        tracesSampleRate: SENTRY_ENVIRONMENT === 'production' ? 0.1 : 1.0,
        profilesSampleRate: SENTRY_ENVIRONMENT === 'production' ? 0.1 : 1.0,
        beforeSend(event, hint) {
            // Don't send events in development
            if (SENTRY_ENVIRONMENT === 'development') {
                console.error('Sentry Event:', event, hint);
                return null;
            }
            return event;
        }
    });

    // The request handler must be the first middleware
    app.use(Sentry.Handlers.requestHandler());

    // Tracing handler
    app.use(Sentry.Handlers.tracingHandler());

    console.log('Sentry initialized');
};

// Error handler (must be before other error middleware)
const sentryErrorHandler = Sentry.Handlers.errorHandler();

module.exports = {
    initSentry,
    sentryErrorHandler,
    Sentry
};
