'use strict';

var Sentry = require('@sentry/node');
var profilingNode = require('@sentry/profiling-node');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(
          n,
          k,
          d.get
            ? d
            : {
                enumerable: true,
                get: function () {
                  return e[k];
                },
              },
        );
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var Sentry__namespace = /*#__PURE__*/ _interopNamespaceDefault(Sentry);

// sentry

/**
 * sentry
 */
var index = () => {
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
    if (options.startProfiler) opt.integrations = [profilingNode.nodeProfilingIntegration()];

    // init
    Sentry__namespace.init(opt);
    if (options.startProfiler) Sentry__namespace.profiler.startProfiler();
  };

  // user
  sentry.user = (options) => {
    Sentry__namespace.setUser(options);
  };

  // log
  sentry.error = (error) => {
    Sentry__namespace.captureException(error);
  };
  sentry.warn = (msg) => {
    Sentry__namespace.captureMessage(msg, 'warning');
  };
  sentry.info = (msg) => {
    Sentry__namespace.captureMessage(msg, 'info');
  };

  //
  return sentry;
};

module.exports = index;
