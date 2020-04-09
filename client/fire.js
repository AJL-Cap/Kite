import firebase from "firebase";
let fbConfig;
if (process.env.NODE_ENV !== "production") {
  fbConfig = require("../secrets");
} else {
  fbConfig = require("../production-secrets");
}

const fire = firebase.initializeApp(fbConfig);

export default fire;
