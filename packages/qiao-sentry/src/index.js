// sentry
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

/**
 * sentry
 */
export default () => {
  // sentry
  const sentry = {};

  // init
  sentry.init = (dsn) => {
    Sentry.init({
      dsn: dsn,
      integrations: [nodeProfilingIntegration()],
      tracesSampleRate: 1.0,
    });
    Sentry.profiler.startProfiler();
  };

  // user
  sentry.user = (options) => {
    Sentry.setUser(options);
  };

  // log
  sentry.error = (error) => {
    Sentry.captureException(error);
  };
  sentry.warn = (msg) => {
    Sentry.captureMessage(msg, 'warning');
  };
  sentry.info = (msg) => {
    Sentry.captureMessage(msg, 'info');
  };

  //
  return sentry;
};
