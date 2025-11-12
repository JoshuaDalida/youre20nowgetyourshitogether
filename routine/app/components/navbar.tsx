import { SignInButton, SignOutButton,UserButton, SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";

export default function Navbar(){
    return (
        <div>
            <SignedIn>
                <UserButton showName/>
                <SignOutButton/>
            </SignedIn>
            <SignedOut>
                <SignInButton/>
                <SignUpButton/>
            </SignedOut>
        </div>
    )
}