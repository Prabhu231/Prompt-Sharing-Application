import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

export const GET = async (request: NextRequest, { params }: { params: Params }) => {
    try {
        await connectDB();

        const prompt = await Prompt.findById(params.id).populate("creator");
        if (!prompt) return new NextResponse("Prompt Not Found", { status: 404 });

        return new NextResponse(JSON.stringify(prompt), { status: 200 });

    } catch (error) {
        return new NextResponse("Error", { status: 500 });
    }
}

export const PATCH = async (request: NextRequest, { params }: { params: Params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new NextResponse("not found", { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new NextResponse("updated Prompts", { status: 200 });
    } catch (error) {
        return new NextResponse("Error Updating", { status: 500 });
    }
};

export const DELETE = async (request: NextRequest, { params }: { params: Params }) => {
    try {
        await connectDB();

        await Prompt.findByIdAndDelete(params.id);

        return new NextResponse("Prompt deleted", { status: 200 });
    } catch (error) {
        return new NextResponse("Error", { status: 500 });
    }
};
