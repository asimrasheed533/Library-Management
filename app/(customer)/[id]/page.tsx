import React from "react";
import Detail from "./Detail";
import { cookies } from "next/headers";

export default async function id() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  return (
    <div>
      <Detail token={token} />
    </div>
  );
}
