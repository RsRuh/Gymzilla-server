const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://gymzilla:65F3yyorV44OjHYx@cluster0.v8gjvac.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {

    try {
        const usersCollection = client.db('gymzillaDB').collection('users');
        const productsCollection = client.db('gymzillaDB').collection('products');
        const packagesCollection = client.db('gymzillaDB').collection('packages');


        app.post('/users', async (req, res) => {
            const query = req.body;
            const cursor = await usersCollection.insertOne(query)
            res.send(cursor)
        })

        app.post('/products', async (req, res) => {
            const query = req.body;
            const cursor = await productsCollection.insertOne(query)
            res.send(cursor)
        })
        app.post('/packages', async (req, res) => {
            const query = req.body;
            const cursor = await packagesCollection.insertOne(query)
            res.send(cursor)
        })

        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = await productsCollection.find(query).toArray();
            res.send(cursor)
        })
        app.get('/packages', async (req, res) => {
            const query = {};
            const cursor = await packagesCollection.find(query).toArray();
            res.send(cursor)
        })



    }
    finally {

    }
}


run().catch(err => console.error(err))




app.get('/', (req, res) => {
    res.send('Gymzilla server is running');
})
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})