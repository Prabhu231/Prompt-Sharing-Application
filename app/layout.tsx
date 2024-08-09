import "@styles/globals.css"
import Nav from "@components/nav"
import Provider from "@components/Provider"
import { ReactNode } from 'react'
import { Session } from "next-auth"

export const metadata = {
    title: "Prompt",
    description: "Discover and Share AI prompts"
}

function rootLayout({ children, session }: {
    children: ReactNode,
    session: Session
}) {
    return (
        <html>
            <body>
                <Provider session={session}>
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app">
                    <Nav />
                    {children}
                </main>
                </Provider>
            </body>
        </html>
    )
}


export default rootLayout