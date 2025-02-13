// app/api/users/route.js (POST route)
import { NextResponse } from 'next/server';
import connectDB from '../config/db';
import User from '../model/User';
import Otp from '../model/Otp';
import { emailRegistration } from '../utils/emailRegistration';


