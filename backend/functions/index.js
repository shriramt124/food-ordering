import v2 from "dotenv";
v2.config();
import express from "express";
import serverless from "serverless-http"; // Add this line
import dbConnect from "./utils/dbConnect.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import bodyParser from "body-parser";
import productRouter from './../routes/product.routes';
import cartRouter from './../routes/cart.routes';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'https://tastehouse.netlify.app', // specify your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);

// This is the part where you integrate with Netlify
const router = express.Router();
router.use("/", app); // Use the main app as a sub-router
app.use("/.netlify/functions/app", router);

export const handler = serverless(app); // Export the handler for Netlify

// Comment out the listen method, as Netlify will handle this
/*
const port = process.env.PORT || 3000;
app.listen(port, async () => {
    try {
        await dbConnect();
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.error(error);
    }
});
*/

// Instead, connect to the database here when the handler is invoked
(async () => {
    try {
        await dbConnect();
    } catch (error) {
        console.error("Database connection error:", error);
    }
})();
