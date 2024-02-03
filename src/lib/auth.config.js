export const authConfig = {
    pages: {
        signIn:"/login"
    },
    providers: [],
    callbacks: {
        async jwt({token, user}){
            if(user){
                token.id = user.id;
                token.isAdmin = user._doc.isAdmin;
                token.email = user._doc.email;
                token.name = user._doc.username;
            }
            // console.log("User from JWT:", user);
            // console.log("Token from JWT:", token);
            return token;
        },
        async session({session, token}){
            if(token){
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
                session.user.email = token.email
                session.user.name = token.name
            }
            // console.log("Session:",session);
            return session;
        },
        authorized({ auth, request }){
            // console.log(auth.user);
            const user = auth?.user;
            const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
            const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
            const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

            //Only admin can reach the admin panel
            if(isOnAdminPanel && !user?.isAdmin){
                return false;
            };

            //Only registered user can see blogs
            if(isOnBlogPage && !user){
                return false
            }

            //Dont see Login if already logged in!
            //Redirect to Home after Login
            if(isOnLoginPage && user) {
                return Response.redirect(new URL("/", request.nextUrl));
            }
            return true;
        },
    }
}