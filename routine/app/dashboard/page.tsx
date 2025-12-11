'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect } from "react";
import TaskList from "../components/tasks/TaskList";

export default function page(){
    const {isSignedIn, user, isLoaded} = useUser();
    

    function createUser() {
        
        try{    
            console.log('trying to check and insert user')
            const res = fetch("/api/create_and_check_user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    body: {
                    clerkId: user?.id,
                    email: user?.emailAddresses[0].emailAddress,
                    name: user?.fullName,}
        }),
        });}
         catch(e){
            console.log(e)
        }
    }


    useEffect(()=> {
        if(isSignedIn){
            createUser()
        }
    },[isSignedIn, user])

 
 if (!isLoaded) {
    return <div>Loading...</div>
  }

  // Use `isSignedIn` to protect the content
  if (!isSignedIn) {
    return <div>Sign in to view this page</div>
  }

  // Use `user` to access the current user's data
  return(
    <div>
        <p>Hello {user.firstName}!</p>
        <TaskList/>
    </div>
    )
}