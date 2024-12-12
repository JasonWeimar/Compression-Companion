import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserController = {
    "register": async (req, res) => {
        try {
            const newUser = await UserModel.create(req.body)

            const userToken = jwt.sign({"id": newUser._id}, process.env.SECRET_KEY)

            return res
                .cookie("userToken", userToken, {"httpOnly": true})
                .status(201)
                .json(newUser)
        } catch(err) {
            console.log(err)
            return res.status(400).json(err) 
        }
    },

    "login": async (req, res) => {
        try {
            const user = await UserModel.findOne({ "username": req.body.username });
    
            if (!user) {
                return res.status(400).json({
                    "errors": {
                        "message": "Invalid username or password."
                    }
                });
            }
    
            const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
    
            if (!isCorrectPassword) {
                return res.status(400).json({
                    "errors": {
                        "message": "Invalid username or password."
                    }
                });
            }
    
            const userToken = jwt.sign({ "id": user._id }, process.env.SECRET_KEY);
    
            return res
                .cookie("userToken", userToken, { "httpOnly": true })
                .json({ "msg": "Login successful." });
    
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                "errors": {
                    "message": "An error occurred during login. Please try again."
                }
            });
        }
    },

    "logout": async (req, res) => {
        res.clearCookie("userToken")
        return res.status(200).json({"msg": "Logout successful"});
    },

    "editUser": async (req, res) => {
        const userId = req.params.id;
        const { username, weight, heightFeet, heightInches, skillLevel, userAvatar } = req.body;

        try {
            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: userId },
                
                { username, weight, heightFeet, heightInches, skillLevel, userAvatar },
                { runValidators: true, new: true }
            );

            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ message: "User not found!" });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    "getOneUser": async (req, res) => {
        try {
            const oneUser = await UserModel.findById(req.params.id)
            res.json(oneUser)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
}

export default UserController;