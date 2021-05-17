import { withSession } from "next-session";
import { sessionOptions } from "../../lib/config";
// import { connectToDatabase } from "../../util/mongodb";
// const MongoStore = require("connect-mongo")(expressSession);
// var MongoDBStore = require("connect-mongodb-session")(expressSession);

// const sessionOptions = {
//   name: "sms_geo.sid",
//   secret: "sms_geo_dotty_",
//   store: new MongoDBStore({
//     uri: process.env.MONGODB_URI,
//     databaseName: process.env.MONGODB_DB,
//     collection: "mySessions",
//   }),
//   cookie: {
//     httpOnly: true,
//     maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 days
//   },
// };

// const handler = async (req, res) => {
//   try {
//     const { db, client } = await connectToDatabase();
//     if (req.method !== "POST")
//       return res.json({ error: "Wrong http method used, use POST method" });

//     // get req body data
//     const { firstname, lastname, username, email, password } = JSON.parse(
//       req.body
//     );
//     // console.log(firstname, lastname, req.params, req.query, "req body");
//     if (firstname == "undefined" || firstname == null) return;

//     // return the logged in user detail in the database
//     let result = await db
//       .collection("users")
//       .insertOne({ firstname, lastname, username, email, password });
//     // console.log("User return", user);
//     const user = JSON.parse(JSON.stringify(result.ops[0]));
//     console.log(user);
//     req.session.user = user || {};
//     res.json({ message: "User added successfully", user });
//   } catch (err) {
//     console.log(err.message || err.toString());
//     res.json({ error: err.message || err.toString() });
//   }
// };

// export const config = {
//   api: {
//     externalResolver: true,
//   },
// };

export default withSession(handler, sessionOptions);
