import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { tasks } from "@/db/schema";

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body);

    const { clerk_id } = body;

    const all_tasks = await db.select()
        .from(tasks)
        .where(eq(tasks.clerk_id, clerk_id));

    console.log(all_tasks);

    return NextResponse.json(all_tasks, { status: 200 });
}
