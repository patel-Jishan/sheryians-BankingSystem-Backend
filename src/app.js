const  express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors") 
const app=express()

// CORS middleware
app.use(cors({
  origin: "http://localhost:5173", // 👈 frontend URL (React/Vite)
  credentials: true                // 👈 cookies allow karega
}))


app.use(express.json())
app.use(cookieParser())

// Routes  required
const authRouter =require("./routes/auth.routes")
const accountRouter =require("./routes/account.routes")
const transactionRoutes = require("./routes/transaction.routes")

app.get("/", (req, res) => {
    res.send("Ledger Service is up and running")
})

// Use Routes 
app.use("/api/auth",authRouter)
app.use("/api/accounts",accountRouter)
app.use("/api/transactions",transactionRoutes)
module.exports=app