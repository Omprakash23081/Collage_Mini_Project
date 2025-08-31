import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./DB/connect.js";
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3000;

// This code initializes the server, connects to the database, and starts listening on the specified port. It also handles any errors that may occur during the connection or server startup.
connectDB()
  .then(
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })
  )
  .catch((error) => {
    console.error("Error starting server:", error);
  });

//write routes
import router from "./routes/user.routes.js";
app.use("/api/users", router);
