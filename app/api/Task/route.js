import { connectToDatabase } from "../../../app/lib/db";
import Task from "../../../app/model/Task";

export async function GET() {
  await connectToDatabase();
  const tasks = await Task.find();

  return Response.json(tasks);
}

export async function POST(req) {
  const { text } = await req.json();

  if (!text) {
    return Response.json(
      { error: "Text required" },
      { status: 400 }
    );
  }

  await connectToDatabase();

  const task = await Task.create({ text });

  return Response.json(task);
}

export async function PUT(req) {
  const { id, text } = await req.json();

  await connectToDatabase();

  const updatedTask =
    await Task.findByIdAndUpdate(
      id,
      { text },
      { new: true }
    );

  return Response.json(updatedTask);
}

export async function DELETE(req) {
  const { id } = await req.json();

  if (!id) {
    return Response.json(
      { error: "ID required" },
      { status: 400 }
    );
  }

  await connectToDatabase();

  await Task.findByIdAndDelete(id);

  return Response.json({
    message: "Task deleted successfully",
  });
}