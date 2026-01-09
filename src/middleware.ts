import { auth } from "@/auth"

export default auth((req) => {
    // Logged in users are authenticated, otherwise null
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
