import { connectDB } from "./connectDB";
import { Post, User } from "./models";

export const getPosts = async () => {
    try {
        connectDB();
        const posts = await Post.find();
        return posts
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch posts')
    }
};

export const getSignlePost = async (slug) => {
    try {
        connectDB();
        const post = await Post.findOne({slug});
        return post
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch post')
    }
};

export const getUser = async (id) => {
    try {
        connectDB()
        const user = await User.findById(id);
        return user
    } catch (error) {
        console.log(error);
        throw new Error('User not found')
    }
};

export const getUsers = async () => {
    try {
        connectDB()
        const users = await User.find();
        return users
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch users')
    }
}