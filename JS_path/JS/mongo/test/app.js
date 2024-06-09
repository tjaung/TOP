const { MongoClient } = require('mongodb');
const uri = require('./atlas_uri')

console.log(uri)
const client = new MongoClient(uri)
const dbname = "sample_airbnb"

const connectToDataBase = async () => {
    try {
        await client.connect();
        console.log(`Connected to the ${dbname} database`)
    }
    catch(err){
        console.error("Error connecting to the database")
    }
}

// const main = async () => {
//     try {
//         connectToDataBase()
//     }
//     catch (err) {
//         console.error(`Error connecting to client: ${err}`)
//     }
//     finally {
//         await client.close()
//     }
// }

const main = async () => {
    try {
       await connectToDataBase()
       console.log("Connected to MongoDB Atlas!")
       // list out all the databases in the cluster
       const dbs = await client.db().admin().listDatabases()
       console.table(dbs.databases)
    } catch (error) {
       console.error(error)
    } finally {
       await client.close()
    }
 }
 
 // Run the main function, catch any errors and finally close the connection when the main function is done
 main()
    .catch((err) => console.log(err))
    .finally(() => client.close())