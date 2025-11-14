import {db} from "@/db/drizzle";
import { eq } from "drizzle-orm";
import {users} from "@/db/schema"
import {NextResponse, NextRequest} from "next/server";


export async function POST(req: NextRequest){
    try {
        //gets json
        const body = await req.json();
        const { clerkId, name,email} = body.body;

        //case if there is no id
        if(clerkId.length < 0) {
            console.log('unknown user id')
        }

        //check database if user exists, by the id
        const checkExisting = await db
            .select()
            .from(users)
            .where(eq(users.clerk_id, clerkId));
        console.log('checked user') 

        //case if user already exists
        if (checkExisting.length > 0){
            console.log('user already exists')
            return NextResponse.json(
            {message: "User Already Exists in DB"},
            {status : 200})
        }

        //inserts user into database if they don't exist already
        await db.insert(users).values({
            clerk_id: clerkId,
            name: name,
            email: email
        })
        
        console.log('user created')
        return NextResponse.json(
            {message: "User Created"},
            {status : 200}
        )
    }
    catch(e){
        console.log(e)
        return NextResponse.json(
            {message : "Error : " + e},
            {status: 500}    
        )
    }
}