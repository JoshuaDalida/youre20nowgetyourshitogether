import { NextRequest,NextResponse } from "next/server";
import { tasks } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest){
    const body = await req.json();
        const {clerkId, name} = body.body;

        const all_tasks = await db.select().from(tasks).where(eq(tasks.clerkId, clerkId));
        

        return NextResponse.json(
            {status:200},
            {all_tasks}
        )
}