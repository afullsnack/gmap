import { withSession } from "next-session";
import { sessionOptions } from "../../lib/config";
import User from "../../models/User";
// const MongoStore = require("connect-mongo")(expressSession);
// var MongoDBStore = require("connect-mongodb-session")(expressSession);

// var store = new MongoDBStore({
//   uri: process.env.MONGODB_URI,
//   databaseName: process.env.MONGODB_DB,
//   collection: "mySessions",
// });

const handler = async (req, res) => {
  try {
    // const db = await connectToDatabase();
    if (req.method !== "POST")
      return res.json({ error: "Wrong http method used, use POST method" });

    // get req body data
    const { username, password } = JSON.parse(req.body);

    // return the logged in user detail in the database
    let result = await User.findOne({ username, password }, [
      "firstname",
      "lastname",
      "email",
      "username",
    ]);
    // console.table(result);
    console.log("User return", result);
    const user = JSON.parse(JSON.stringify(result));
    req.session.user = user || {};
    user
      ? res.json({ data: { user, message: "Found User" } })
      : res.json({ data: { message: "No such users" } });
  } catch (err) {
    console.log(err.message || err.toString());
    res.json({ error: err.message || err.toString() });
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};

export default withSession(handler, sessionOptions);
