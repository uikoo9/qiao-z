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
  sentry.init = (options) => {
    // opt
    const opt = {
      dsn: options.dsn,
    };

    // trace
    if (options.tracesSampleRate) opt.tracesSampleRate = options.tracesSampleRate;

    // profiler
    if (options.startProfiler) opt.integrations = [nodeProfilingIntegration()];

    // init
    Sentry.init(opt);
    if (options.startProfiler) Sentry.profiler.startProfiler();
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
