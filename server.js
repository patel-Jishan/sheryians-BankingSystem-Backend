require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");

connectToDB()
  .then(() => {
    console.log("✅ DB Connected");

    app.listen(3000, () => {
      console.log("🚀 Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("❌ DB Error:", err.message);
  });