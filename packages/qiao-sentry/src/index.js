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
    // init
    Sentry.init(options);

    // profiler
    if (options.profilesSampleRate) Sentry.addIntegration(nodeProfilingIntegration());
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
