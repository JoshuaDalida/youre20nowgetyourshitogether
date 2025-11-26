import { NextRequest,NextResponse } from "next/server";
import { tasks } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest){
    const body = await req.json();
        const {clerk_id, task_name} = body.body;

    try{
        console.log(clerk_id)
        console.log(task_name)

        await db.delete(tasks).where(
            and(
                eq(tasks.clerk_id, clerk_id),
                eq(tasks.task_name, task_name)
            )
        );
        return NextResponse.json(
            {message:"task deleted"},
            {status:200}
        )
    }
    catch(e){
        return NextResponse.json(
            {message: "error: " + e},
            {status: 500}
        )
    }
}