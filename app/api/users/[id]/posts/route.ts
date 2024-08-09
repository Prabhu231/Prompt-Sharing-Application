import { connectDB } from "@utils/database"
import Prompt from "@models/prompt"
import { NextRequest } from "next/server"

interface Params {
    id: string;
  }

export const GET = async (req: NextRequest, {params}: {params: Params}) => {
    try {
        await connectDB()
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator')
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("FAILED", { status: 500 })
    }
}