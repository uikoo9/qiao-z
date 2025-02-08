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
      integrations: [],
    };

    // trace
    if (options.tracesSampleRate) opt.tracesSampleRate = options.tracesSampleRate;

    // profiler
    if (options.profilesSampleRate) {
      opt.profilesSampleRate = options.profilesSampleRate;
      opt.integrations.push(nodeProfilingIntegration());
    }

    // init
    Sentry.init(opt);
    if (options.profilesSampleRate) Sentry.profiler.startProfiler();
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
