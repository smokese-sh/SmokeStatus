const webpack = require("webpack");
const config = require("../../webpack/webpack.config");
let lastHash;

webpack(config).watch({ ignored: /node_modules/ }, (err, stats) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  if (stats.hash === lastHash) return;
  lastHash = stats.hash;
  process.stdout.write(
    stats.toString({
      colors: true,
      hash: true,
      timings: true,
      chunks: true,
      modules: false,
      children: false,
    }) + "\n\n"
  );
});
