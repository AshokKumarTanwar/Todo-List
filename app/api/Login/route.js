import {connectDB} from "../../lib/db";
import Task from "../../model/Task";


export async function POST(req) {

  const { email, password } =
    await req.json();

  await connectDB();

  const user =
    await User.findOne({ email });

  if (!user) {
    return Response.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    return Response.json(
      { error: "Wrong password" },
      { status: 400 }
    );
  }

  return Response.json({
    message: "Login Successful",
  });
}