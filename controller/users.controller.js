import mongoose from "mongoose";
import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

async function userSignUp(req, res) {

    //checking are there any error in input given by user from frontend through the body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //if error return that to frontend 
        return res.status(422).json({ success: false, error: errors.array() });
    }

    try {
        //destructure info from body
        const { fullName, email, password, phone } = req.body;

        //normalized email so that avoid conflict
        const normalizedEmail = email.trim().toLowerCase();

        //check if user already exists
        const findOldUser = await User.findOne({ normalizedEmail });
        if (findOldUser) {
            return res.status(409).json({ success: false, message: 'User already Exists' });
        }

        //hash password using bcrypt library by NPM
        const hashPassword = await bcrypt.hash(password, 12);

        //create user object
        const newUser = {
            fullName, email: normalizedEmail, password: hashPassword, phone
        };

        //create and store user info in DB and send response to frontend 
        await User.create(newUser);
        res.status(201).json({ success: true, message: 'New user created Successfully' });

    } catch (error) {
        //log error for developer used in development
        console.log(`Error in userSignUp ${error}`);

        //error for user used in production
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function userLogin(req, res) {
    //to validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return error 
        return res.status(422).json({ success: false, error: errors.array() });
    }

    try {
        //destructure input from body
        const { email, password } = req.body;

        // normalized Email to avoid blackspace issues
        const normalizedEmail = email.trim().toLowerCase();

        //find if user is there in DB (authenticate)
        const currentUser = await User.findOne({ email: normalizedEmail });

        //if user not there return error
        if (!currentUser) {
            return res.status(400).json({ success: false, message: 'Invalid Credentials' });
        }

        // compare password with encrypted password in DB
        const result = await bcrypt.compare(password, currentUser.password);
        if (!result) {
            return res.status(400).json({ success: false, message: 'Invalid Credentials' });
        }

        // Generating JWT token to return to frontend and store it in Cookie
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        //return message and Token
        res.status(200).json({ success: true, message: 'Login Successful', token });

    } catch (error) {
        //log error for developer used in development
        console.log(`Error in userLogin ${error}`);

        //error for user used in production
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export {
    userLogin,
    userSignUp,
};