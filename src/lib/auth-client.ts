import { createAuthClient } from "better-auth/react"
import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    plugins: [
        magicLinkClient()
    ],
    
    /** the base url of the server (optional if you're using the same domain) */
    // baseURL: "http://localhost:3000"
})