import express from 'express';
import {adminSignup, adminlogin} from '../controllers/adminController.js';

const router = express.Router();

router.post("/signup", adminSignup);

router.post("/login", adminlogin);

export default router;