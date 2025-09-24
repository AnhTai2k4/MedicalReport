const FormRoutes = require("./FormRoutes");

const routes = (app) => {
  app.use("/form", FormRoutes);
};

module.exports = routes;

//formater - prettier/ eslint
