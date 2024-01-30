import { connectDB } from "@/lib/connectDB"
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";


export const GET = async (request, { params }) => {
    const { slug } = params;
    try {
        connectDB();
        const post = await Post.findOne({slug});
        return NextResponse.json(post)
    } catch (error) {
        console.log(error);
    }
};

export const DELETE = async (request, { params }) => {
    const { slug } = params;
    try {
        connectDB();
        await Post.findOneAndDelete({slug});
        return NextResponse.json('Post Deleted')
    } catch (error) {
        console.log(error);
    }
}