export default {
  worker: {
    name: "cross-domain-iframe",
    compatibilityDate: "2026-09-24",
    compatibilityFlags: ["nodejs_compat"],
    entrypoint: "./src/index.js",
    workersDev: true,
    observability: {
      enabled: true,
      headSamplingRate: 1,
    },
    assets: {
      notFoundHandling: "none",
      htmlHandling: "none",
      runWorkerFirst: ["/", "/index.html"],
    },
  },
};
