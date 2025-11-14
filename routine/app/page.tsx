import Navbar from "./components/navbar";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export default async function Home() {
  const all_users = await db.select().from(users);

  return (
    <div>
      <Navbar/>
    </div>
  );
}
