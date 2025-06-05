import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function POST() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: token },
      select: { email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    (await cookies()).delete("token");

    return NextResponse.json({ message: "Successfully logged out" });
  } catch (error: any) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
