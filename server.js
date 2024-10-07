const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
require('dotenv').config()

const {GoogleGenerativeAI} = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY)

app.post('/gemini', async (req, res) => {
    // console.log(req.body.history)
    // console.log(req.body.message)
    try{
        const model = genAI.getGenerativeModel({model:"gemini-pro"})

        const chat = model.startChat({
            history: req.body.history
        })
        const msg = req.body.message

        const result = await chat.sendMessage(msg)
        const response = await result.response

        if (!response) {
            throw new Error("No response from the model");
        }

        const text = response.text()
        res.send(text)} 

    catch(error){
        console.error("Error during chat:", error);
        res.status(500).send("Error processing the request.");
        }
})

app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))

