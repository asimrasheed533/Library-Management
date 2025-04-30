import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    // Check for missing fields
    if (!email || !name || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Check if user already exists
    const exist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exist) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // Return the created user, excluding the password
    return NextResponse.json(
      {
        message: "User created successfully",
        user: { id: user.id, email: user.email, name: user.name },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/register:", error);
    return NextResponse.json(
      { message: "Internal Error", error: error.message },
      { status: 500 }
    );
  }
}
