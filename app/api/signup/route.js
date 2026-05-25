import { connectToDatabase } from "@/app/lib/db";
import User from "@/app/model/User";

import bcrypt from "bcryptjs";

export async function POST(request) {

    try {

        await connectToDatabase();

        const body = await request.json();

        const { name, email, password } = body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return Response.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return Response.json({
            message: "Signup Successful",
            user
        });

    } catch (error) {

        console.log(error);

        return Response.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}