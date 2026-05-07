const express = require('express')
const investorRoutes = require('./routes/investorRoute')
const fundRoutes = require('./routes/fundRoute')
const sipRoutes = require('./routes/sipRoute')

const app = express()

app.use(express.json())
app.use('/api/investors',investorRoutes)
app.use('/api/funds',fundRoutes)
app.use('/api/sip',sipRoutes)

app.get('/',(req,res)=>{
    res.send("Home Page")
})

app.listen(3000,()=>{
    console.log("Server running on port 3000");
})