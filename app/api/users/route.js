// app/api/users/route.js (POST route)
import { NextResponse } from 'next/server';
import connectDB from '../config/db';
import User from '../models/User';
import Otp from '../models/Otp';
import { emailRegistration } from '../utils/emailRegistration';


