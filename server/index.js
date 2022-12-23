const express = require('express')
const getAllAppReviewsInPlayStore = require("./scrapper");
const app = express()
const port = 80

const path = require("path");
app.use(express.static("../dist"));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"..", "dist", "index.html"));
});


app.get('/getReviews', async (req, res) => {
    const {packageName} = req.query;

    const result = await getAllAppReviewsInPlayStore(packageName);

    res.setHeader("Access-Control-Allow-Origin", '*')
    res.send(JSON.stringify({data: result}))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})