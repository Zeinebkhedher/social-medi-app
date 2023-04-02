
const express = require ("express")
const bodyParser =require("body-parser") ;
const mongoose =require("mongoose") ;
const cors =require("cors") ;
const dotenv =require("dotenv") ;
const multer =require( "multer");
const helmet =require("helmet") ;
const morgan =require("morgan") ;
const path =require("path") ;
const { fileURLToPath } =require("url") ;
const { register } =require("./controllers/auth.js") ;
const { createPost } =require("./controllers/posts.js") ;
const authRoutes =require("./routes/auth.js") ;
const userRoutes =require("./routes/users.js") ;
const PostRoutes =require("./routes/posts.js") ;
const { verify } =require( "crypto");
const  verifyToken  =require("./middleware/auth.js") ;
const User =require("./models/User") ;
const Post =require("./models/Post") ;


const { users, posts } =require("./data/index.js") ;
/*configurations*/

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/*file storage*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/*Routes with files*/
app.post("/auth/register", upload.single("picture"), register);
app.post("posts", verifyToken, upload.single("picture"), createPost);

/*Routes*/
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", PostRoutes);

/*mongoose setup*/
const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then ( async () => {
    app.listen(PORT, () => console.log(`server Port : ${PORT}`));
    /* Add data */
    await User.deleteMany();
    await Post.deleteMany();


    await User.create(users);
    await Post.create(posts);

  })
  .catch((error) => console.log(`${error} did not connect`));
