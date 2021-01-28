const OAuth = require("oauth");
const header = {
  "X-Yahoo-App-Id": "leieGQF7",
};
const request = new OAuth.OAuth(
  null,
  null,
  "dj0yJmk9blplV2pOeTFHYmZUJmQ9WVdrOWJHVnBaVWRSUmpjbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWY5",
  "9f3193bffd752f022a80da30d65a18f9526582aa",
  "1.0",
  null,
  "HMAC-SHA1",
  null,
  header
);

const getWeatherForecast = (location, callback) => {
  request.get(
    `https://weather-ydn-yql.media.yahoo.com/forecastrss?u=c&location=${location}&format=json`,
    null,
    null,
    function (err, data, result) {
      if (err) {
        callback(null, err);
      } else {
        const res = JSON.parse(data);
        callback(res, null);
      }
    }
  );
};

export { getWeatherForecast };
