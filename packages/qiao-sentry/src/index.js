// sentry
import * as Sentry from '@sentry/node';

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

  //
  return sentry;
};
