import {db} from "../../../db/drizzle";
import {users} from "../../../db/schema"
import {NextResponse, NextRequest} from "next/server";


export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const {email, name, clerkId} = body.data;

        await await db.insert(users).values({
            clerk_id: clerkId,
            name: name,
            email: email
        })

        return NextResponse.json(
            {message: "User Created"},
            {status : 200}
        )
    }
    catch(e){
        return NextResponse.json(
            {message : "Error : " + e},
            {status: 500}    
        )
    }
}