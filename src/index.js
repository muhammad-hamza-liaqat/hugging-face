require("dotenv").config()

const express = require("express")
const app = express()

const myRoutes = require("./routes/index")
const corsMiddleware = require("./config/corsConfig")
const requestLogger = require("./middleware/requestLogger")
const notFoundHandler = require("./middleware/notFoundHandler")

const PORT = process.env.PORT || 8000
app.use(requestLogger);

app.use(corsMiddleware);
app.use(express.json());
app.use("/api", myRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port http://127.0.0.1:${PORT}/`)
})
