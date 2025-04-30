import prisma from "@/lib/prisma";

export async function POST(req) {
  function decodeJWT(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(jsonPayload);
  }

  try {
    const body = await req.json();
    const { credential } = body;

    const decodedToken = decodeJWT(credential);

    const { email, name } = decodedToken;

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { email, name },
      });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Authentication error:", error);
    return new Response(JSON.stringify({ message: "Authentication failed" }), {
      status: 500,
    });
  }
}
