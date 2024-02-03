import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from "./connectDB";
import { User } from "./models";
import bcrypt from 'bcryptjs'
import { authConfig } from "./auth.config";


//Login with Credentials
const login = async(credentials) => {
    try {
        connectDB()
        const user = await User.findOne({ email: credentials.email });
        if(!user){
            throw new Error("User not found!")
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if(!isPasswordCorrect){
            throw new Error("Wrong credentials!")
        };

        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Something went wrong')
    }
}



export const { handlers:{GET, POST}, auth, signIn, signOut } = NextAuth({ ...authConfig, providers: [ GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET
  }),
  CredentialsProvider({
    async authorize(credentials) {
       try {
        const user = await login(credentials);
        // console.log("These are the Credentials Object", credentials);
        // console.log("This is User", user);
        return user;
       } catch (error) {
        console.log(error);
        return null
       } 
    }
  }),
 ],
 callbacks:{
    async signIn({ user, account, profile }) {
        // console.log("User from auth.js:", user);
        if(account.provider === 'github') {
            connectDB();
            try {
                const user = await User.findOne({email: profile.email});
                if(!user){
                    const newUser = await User.create({
                        username: profile.name,
                        email: profile.email,
                        image: profile.avatar_url,
                    });
                    await newUser.save();
                }
            } catch (error) {
                console.log(error);
                return false
            }
        }
        return true;
    },
    ...authConfig.callbacks,
 }
})