importScripts("/js/offline-analytics-fork.js");
goog.offlineGoogleAnalytics.initialize({
  parameterOverrides: {
    cd1: 'true',
    cd2: 'pwa'
  }
});