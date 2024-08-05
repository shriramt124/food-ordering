import v2 from "dotenv"
v2.config();
import express from "express"
const app = express();
import dbConnect from "./utils/dbConnect.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import cors from "cors"
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import bodyParser from "body-parser";
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:5173', // specify your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));

 
//to parse the data into the body of the request 
 
/* app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST','PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
}); */


//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);


//listent to the server
const port = process.env.PORT || 3000
app.listen(port, async () => {
    try {
        await dbConnect();
        console.log(`Server is running on port ${port}`);

    } catch (error) {

    }
})