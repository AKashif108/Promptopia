// GET(read)


import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req,{params}) => {
    try {
        await connectToDB();

        //.populate() is used to populate the creator field with the user data
        // from the user collection
        // https://mongoosejs.com/docs/populate.html
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) {
            return new Response("Prompt not found", {
                status: 404,
            });
        }

        return new Response(JSON.stringify(prompt), {
            status: 200,
        });
    } catch (error) {
        return new Response("Failed to get prompts", {
            status: 500,
        });
    }
}

// Patch (update) a prompt

export const PATCH = async (req, { params }) => {
    const {prompt,tag} = await req.json();
    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", {
                status: 404,
            });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {
            status: 200,
        });

    } catch (error) {
        return new Response("Failed to update prompt", {
            status: 500,
        });
    }
}


// DELETE (delete) a prompt
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", {
            status: 200,
        });
    } catch (error) {
        return new Response("Failed to delete prompt", {
            status: 500,
        });
        
    }
}
