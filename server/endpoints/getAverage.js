module.exports = class getAverage {
  constructor(app) {
    this.app = app;
    this.url = "/api/v1/getAverage";
  }

  async run(req, res) {
    const array = await this.app.collection.find().toArray();
    let query = req.query?.span;

    switch (query) {
      case "day":
        array.filter(
          (data) => new Date(data).toDateString() === new Date().toDateString()
        );
        res.json({
          data: array.map((data) => ({
            time: data._id,
            average: data.averageRes,
          })),
        });
        break;
      case "month":
        // this is for day, but shrug
        array.filter(
          (data) => new Date(data).toDateString() === new Date().toDateString()
        );
        res.json({
          data: array.map((data) => ({
            time: data._id,
            average: data.averageRes,
          })),
        });
        break;
      case "year":
        // this is for day, but shrug
        array.filter(
          (data) => new Date(data).toDateString() === new Date().toDateString()
        );
        res.json({
          data: array.map((data) => ({
            time: data._id,
            average: data.averageRes,
          })),
        });
        break;
      default:
        // returns day
        array.filter(
          (data) => new Date(data).toDateString() === new Date().toDateString()
        );
        res.json({
            data: array.map((data) => ({
              time: data._id,
              average: data.averageRes,
            })),
          });
        break;
    }
  }
};
