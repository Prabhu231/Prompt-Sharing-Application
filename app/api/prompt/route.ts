import { connectDB } from "@utils/database"
import Prompt from "@models/prompt"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
    try {
        await connectDB()
        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("FAILED", { status: 500 })
    }
}