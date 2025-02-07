// sentry
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

/**
 * sentry
 */
export default () => {
  // sentry
  const sentry = {};

  // error
  sentry.error = (error) => {
    Sentry.captureException(error);
  };
  // warn
  sentry.warn = (msg) => {
    Sentry.captureMessage(msg, 'warning');
  };
  // info
  sentry.info = (msg) => {
    Sentry.captureMessage(msg, 'info');
  };

  // init
  sentry.init = (dsn) => {
    Sentry.init({
      dsn: dsn,
      integrations: [nodeProfilingIntegration()],
      tracesSampleRate: 1.0,
    });
    Sentry.profiler.startProfiler();
  };

  //
  return sentry;
};
