import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// METHOD GET for READ
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompts not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Fail to fetch all Prompts ", { status: 500 });
  }
};

// METHOD PATCH for READ
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    const exitingPromt = await Prompt.findById(params.id);

    if (!exitingPromt) return new Prompt("Promt not found", { status: 404 });

    exitingPromt.prompt = prompt;
    exitingPromt.tag = tag;

    await exitingPromt.save();

    return new Response(JSON.stringify(exitingPromt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update Prompt", { status: 500 });
  }
};

// METHOD DELETE for READ
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successful", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
