"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "./connectDB";
import { Post, User } from "./models";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs"

export const addPost = async (previousState, formData) => {
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
        revalidatePath('/admin')
        console.log('Saved to DB');
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = async ( formData) => {
    const { id } = Object.fromEntries(formData)
    console.log('Deleted from DB');
    try {
        connectDB()
        revalidatePath('/blog')
        revalidatePath('/admin')
        await Post.findByIdAndDelete(id)
    } catch (error) {
        
    }
};

export const addUser = async (previousState, formData) => {
    const { username, email, password, image } = Object.fromEntries(formData);

    try {
        connectDB();
        const newUser = new User({
           username,
           email,
           password,
           image
        });
        await newUser.save();
        revalidatePath('/admin')
        console.log('Saved to DB');
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData)
    try {
        connectDB()
        revalidatePath('/admin')
        await Post.deleteMany({userId: id})
        await User.findByIdAndDelete(id)
        console.log('Deleted from DB');
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
           return {error: 'User already exists!'}
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

  export const login = async(previousState, formData) => {
    const { email, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", {email, password});
        return {success: true}
    } catch (error) {
        console.log(error);
        if(error.message.includes('CredentialsSignin')){
            return {error: 'Invalid email or password!'}
        }
        throw error;
    }
  }
