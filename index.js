const express = require("express");
const app = express();
const PORT = 2104;
const bearerToken = require("express-bearer-token");
const cors = require("cors");

const userRouter = require("./src/routers/user");
const postRouter = require("./src/routers/content")

app.use(cors());
app.use(bearerToken());
app.use("/public", express.static("public"));
app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);


// error handler
app.use((error, req, res, next) => {
  console.log({ error });

  const errorObj = {
    status: "Error",
    message: error.message,
    detail: error,
  };

  const httpCode = typeof error.code == "number" ? error.code : 500;
  res.status(httpCode).send(errorObj);
});

// app.use((error, req, res, next) => {
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(error.code || 500);
//   res.json({ message: error.message || "An unknown error occurred!" });
// });
// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// app.use((err, req, res, next) => {
//   res.locals.error = err;
//   const status = err.status || 500;
//   res.status(status);
//   res.render("error");
// });


app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
