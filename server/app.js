const express = require("express");
const app = express();
const config = require("./config.json");
const { CronJob } = require("cron");
const https = require("https");
const { MongoClient } = require("mongodb");

class SmokeStatus {
  constructor() {
    this.app = app;
    new MongoClient(config.mongoUri)
      .connect()
      .then((res) => res.db(config.mongoDb))
      .then((db) => {
        this.collection = db.collection("stats");
      });

    this.loadEndpoints();

    this.app.listen(config.serverPort);
    new CronJob(
      "0 */15 * * * *",
      () => {
        this.testEndpointResponse();
      },
      null,
      true,
      "America/Los_Angeles"
    ).start();
  }

  loadEndpoints() {
    const endpoints = require("./endpoints");
    for (let endpoint in endpoints) {
      endpoint = endpoints[endpoint];
      const Ep = new endpoint(this);
      this.app.get(Ep.url, async (req, res) => await Ep.run(req, res));
    }
  }

  async testEndpointResponse() {
    let tests = [];
    const request = (url) => {
      return new Promise((resolve, reject) => {
        const req = https.get(url);
        req.on("response", (res) => {
          const chunks = [];
          res.on("data", (chunk) => chunks.push(chunk));
          res.on("end", () => {
            resolve(chunks);
          });
        });
      });
    };
    for (let test of config.tests) {
      const start = Date.now();
      const url = test.startsWith("https") ? test : `${config.domain}${test}`;
      await request(url);
      tests.push({ url, resTime: Date.now() - start, time: start });
    }
    let average = 0;
    for (let { resTime } of tests) {
      average += resTime;
    }
    average = Math.round(average / tests.length);
    this.collection.insertOne({
      _id: tests[0].time,
      averageRes: average,
      tests: tests,
    });
  }

  testSite() {
      // todo, if api is working then site probably is :agony:
  }
}

new SmokeStatus();
