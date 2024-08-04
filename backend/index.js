import v2 from "dotenv"
v2.config();
import express from "express"
const app = express();
import dbConnect from  "./utils/dbConnect.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import cors from "cors"
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";

//middleware
app.use(express.json());
app.use(cookieParser())
//to parse the data into the body of the request 
app.use(express.urlencoded({extended:true}));
 
app.use(cors({
    origin: "http://localhost:5173", // Set origin as a string
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.get("/", (req, res) => {
    res.send("Hello World");
})

//routes
app.use("/api/v1/user",userRouter);
app.use("/api/v1/product",productRouter); 
app.use("/api/v1/cart",cartRouter);


//listent to the server
const port =  process.env.PORT || 3000
app.listen(port, async () => {
    try {
        await dbConnect();
        console.log(`Server is running on port ${port}`);
        
    } catch (error) {
        
    }
})