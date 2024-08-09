import { connectDB } from "@utils/database"
import Prompt from "@models/prompt"
import { NextRequest, NextResponse } from "next/server"
export const POST = async (req: NextRequest, res: NextResponse) => {
    const { userId, prompt, tag } = await req.json()
    try {
        await connectDB()
        const newPrompt = new Prompt({
            creator: userId.toString(),
            prompt,
            tag
        })
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.log("error from api route",error)
        return new Response(JSON.stringify("FAILED to create"), { status: 500 })
    }
}