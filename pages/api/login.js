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
    let user = await User.findOne({});
    // { username, password },
    // { projection: { firstname: 1, lastname: 1, email: 1, username: 1 } }
    // ();
    // console.table(user);
    console.log("User return", user);
    // user = JSON.parse(JSON.stringify(user));
    // req.session?.user ? null : (req.session.user = user || {});
    user ? res.json({ user }) : res.json({ message: "No such users" });
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
