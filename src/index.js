require("dotenv").config()

const express = require("express")
const app = express()

const myRoutes = require("./routes/index")
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use("/api",myRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port http://127.0.0.1:${PORT}/`)
})
