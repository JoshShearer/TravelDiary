import express from 'express';

//initialize http server
const app = express();

//Handle / Route
app.get('/', (req, res)=>
res.send('Hello World')
)

//Launch the server on port 3000
const server = app.listen(3000, () => {
    const { address, port} = server.address();
    console.log(`Listening at http://${address}:${port}`);
});