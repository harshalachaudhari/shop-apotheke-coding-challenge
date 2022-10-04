/* eslint-disable no-undef */
const app = require("./app");
const config = require("./config/config.json");
const env = process.env.NODE_ENV;
const configration = config[env];

app.listen(configration.PORT, () => {
  console.log(`server running at port ${configration.PORT}`);
});
