const express = require("express");
const app = express();
const config = require("./config.json");
const { CronJob } = require("cron");
const https = require("https");

class SmokeStatus {
  constructor() {
    this.app = app;
    // this.loadEndpoints();
    app.listen(80);

    this.testEndpoints();

    new CronJob(
      "*/15 * * * * *",
      () => {
        this.testEndpoints();
      },
      null,
      true,
      "America/Los_Angeles"
    ).start();
  }

  loadEndpoints() {
    const endpoints = require("./endpoints");
    for (const endpoint in endpoints) {
      console.log(endpoints[endpoint]);
    }
  }

  async testEndpoints() {
    let tests = [];

    const request = (url) => {
      return new Promise((resolve, reject) => {
        const req = https.get(url);
        req.on("response", (res) => {
          const chunks = [];
          res.on("data", (chunk) => chunks.push(chunk));
          res.on("end", () => {
            resolve(chunks)
          });
        });
      })
    };

    for (let test of config.tests) {
      const start = Date.now();
      const url = test.startsWith("https") ? test : `${config.domain}${test}`;
      await request(url);
      tests.push({ url, time: Date.now() - start });
    }
    console.log(tests);
    // for (let test in config.tests) {
    //   test = config.tests[test];
    //   const startTime = process.hrtime();
    //   const url = test.startsWith("https") ? test : `${config.domain}${test}`;
    //   const request = https.get(url);
    //   request.on("response", (res) => {
    //     let chunks = "";
    //     res.on("data", (chunk) => (chunks += chunk));
    //     res.on("end", () => {
    //       const time = process.hrtime(startTime)[1] / 1000000;
    //       tests.push({url, time});
    //     });
    //   });
    // }
  }

  testSite() {}
}

new SmokeStatus();
