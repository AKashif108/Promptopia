import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, res) => {
    try {
        await connectToDB();

        //.populate() is used to populate the creator field with the user data
        // from the user collection
        // https://mongoosejs.com/docs/populate.html
        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {
            status: 200,
        });
    } catch (error) {
        return new Response("Failed to get prompts", {
            status: 500,
        });
    }
}

