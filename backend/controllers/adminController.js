import adminSchema from '../models/adminModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const adminSignup = async (req, res, next) => {
    const { adminname, email, password, confirmpassword } = req.body;
    let existingUser;
    try {
        existingUser = await adminSchema.findOne({ email: email });
    } catch (err) {
        console.log(err);
    }
    if (existingUser) {
        return res
            .status(400)
            .json({ message: "User already exists! Login Instead" });
    }
    const hashedPassword = bcrypt.hashSync(password);
    const hashedconfirmpassword = bcrypt.hashSync(confirmpassword);
    const user = new adminSchema({
        adminname,
        email,
        password: hashedPassword,
        confirmpassword: hashedconfirmpassword,
    });

    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }
    return res.status(201).json({ message: user });
};


export const adminlogin = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await adminSchema.findOne({ email: email });

    } catch (err) {
        return new Error(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "User not found. Signup Please" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Inavlid Email / Password" });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "35s",
    });

    console.log("Generated Token\n", token);

    if (req.cookies[`${existingUser._id}`]) {
        req.cookies[`${existingUser._id}`] = "";
    }

    res.cookie(String(existingUser._id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30), // 30 seconds
        httpOnly: true,
        sameSite: 'Lax',
    });

    return res
        .status(200)
        .json({ message: "Successfully Logged In", user: existingUser, token });
};


 

