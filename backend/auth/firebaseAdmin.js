const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(
    require("../pikassistent-firebase-adminsdk-fbsvc-97b3d104e5.json")
  )
});

module.exports = admin;