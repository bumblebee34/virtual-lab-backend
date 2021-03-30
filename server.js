const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const config = require('config');
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(cors({ origin: "*" }))

// Connection details of db
const mongoURI = config.get('mongoURI');

const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect(mongoURI, { useNewUrlParser: true }, { useUnifiedTopology: true });

let gfs;

conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    console.log("Connection Successful");
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = file.originalname;
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads"
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

// Routes for images

app.post("/", upload.single("img"), (req, res, err) => {
    res.send(req.files);
  });
  
app.get("/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: "No file exists"
            });
        }

        // Check if image
        if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
        // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
            } else {
                res.status(404).json({
                err: "Not an image"
            });
        }
    });
});

// Adding routes
app.use('/user/student' , require('./routes/student'));
app.use('/user/faculty' , require('./routes/faculty'));
app.use('/user/login/student' , require('./routes/loginStudent'));
app.use('/user/login/faculty' , require('./routes/loginFaculty'));
app.use('/assignment' , require('./routes/assignment'));

const port = process.env.NODE_ENV || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
