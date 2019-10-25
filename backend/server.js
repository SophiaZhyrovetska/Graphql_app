const express = require( "express" );
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/userSchemas');
const app = express();
const port = 3000;
app.use('*', cors());
app.use('/graphql', cors(), graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true,
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/typescript_app', { useNewUrlParser: true });
const connection = mongoose.connection;connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});


app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );