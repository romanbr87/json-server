import mongoose, { Connection, ConnectOptions, Mongoose } from "mongoose";

const dbConnectionString =
  "mongodb+srv://romanbr87:qwerty60@kishurit.1f6aocy.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("debug", true);
mongoose.set('bufferCommands', true);
mongoose.set('strictQuery', true);

mongoose.Promise = global.Promise;

const options = { 
  useNewUrlParser: true, 
  autoIndex: true, 
  promiseLibrary: global.Promise, 
  useUnifiedTopology: true
};

const connectToDatabase = async (): Promise<Mongoose> => {
  try {
    const connection: Mongoose = await mongoose.connect(dbConnectionString, options);
    console.log('\ndatabase connected. Ready state:', connection.connection.readyState);
    return connection;
  } catch (error) {
    console.log('CONNECTION ERROR:', error);
    throw error;
  }
};

const db: Connection = mongoose.connection;

/*db.on("error", (error) => {
  console.error("CONNECTION ERROR:", error);
});

db.once("open", () => {
  console.log("\ndatabase connected. Ready state:", db.readyState);
});*/

export { connectToDatabase, db as default };
export const collections = db.collections;
export const collection = db.collection;
