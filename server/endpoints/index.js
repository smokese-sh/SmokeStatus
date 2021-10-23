require("fs")
  .readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((fileName) => {
    const moduleName = fileName.split(".")[0];
    exports[moduleName] = require(`${__dirname}/${fileName}`);
  });
