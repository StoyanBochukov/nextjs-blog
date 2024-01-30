"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "./connectDB";
import { Post, User } from "./models";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs"

export const addPost = async (formData) => {
    const { title, desc, slug, userId } = Object.fromEntries(formData);

    try {
        connectDB();
        const newPost = new Post({
            title,
            desc,
            slug,
            userId
        });
        await newPost.save();
        revalidatePath('/blog')
        console.log('Saved to DB');
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData)
    console.log('Deleted from DB');
    revalidatePath('/blog')
    try {
        connectDB()
        await Post.findByIdAndDelete(id)
    } catch (error) {
        
    }
};

export const handleGitHubLogin = async () => {
    "use server"
    await signIn("github");
  }

  export const handleLogout = async () =>{
    "use server"
    await signOut({
        redirect: true,
        redirectTo: '/'
    })
  }

  export const register = async (previousState ,formData) => {
    const { username, email, image, password, repeatPassword } = Object.fromEntries(formData);
    if(password !== repeatPassword){
        return { error: "Passwords do not match" };
    }
    try {
        connectDB();
        const user = await User.findOne({email});
        if(user){
           return 'User already exists'
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                image
            });
            await newUser.save();
            console.log('New User Created in DB');
            return { success: true };
    } catch (error) {
        console.log(error);
    }
  };

  export const login = async(formData) => {
    const { email, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", {email, password});
    } catch (error) {
        console.log(error);
        return{ error: "Something went wrong"}
    }
  }
