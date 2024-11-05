import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";
import ModelUser from "../models/user.model.js";
import bcrypt from "bcrypt";

// Get current directory name from the URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads")); // Use __dirname here
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Middleware to handle single file upload with Multer
const upload = multer({ storage }).single("image");

// Define the CreateUser function
const CreateUser = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                msg: "Error uploading file",
                error: err.message,
            });
        }

        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(400).json({
                msg: "All fields are required",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                msg: "Password must be at least 8 characters",
            });
        }

        let user = await ModelUser.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({
                msg: "This user already exists in the database",
            });
        }

        try {
            const hashPass = await bcrypt.hash(password, 10);
            const userImage = req.file ? req.file.filename : null;

            const newUser = new ModelUser({
                name,
                username,
                email,
                password: hashPass,
                image: userImage, // Store the uploaded file's filename
            });

            await newUser.save();

            res.status(201).json({
                msg: "User created successfully",
                user: newUser,
            });
        } catch (error) {
            res.status(500).json({
                msg: "An error occurred while creating the user",
                error: error.message,
            });
        }
    });
};

export default CreateUser;
