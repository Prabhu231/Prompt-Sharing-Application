import NextAuth, { Session, User as NextAuthUser, Profile, Account } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from "@utils/database";
import User from '@models/user';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async session({ session }: { session: Session }) {
            if (session.user) {
                const sessionUser = await User.findOne({
                    email: session.user.email,
                });

                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                }
            }
            return session;
        },
        async signIn({profile }: {profile?: Profile }) {
            try {
                await connectDB();

                if (profile) {
                    const userExists = await User.findOne({
                        email: profile.email,
                    });

                     if (!userExists) {
                    const newUser = {
                        email: profile?.email,
                        username: profile.name ?  profile?.name.replace(" ", "").toLowerCase() : '',
                        image: profile?.image,
                    }
                    await User.create(newUser);
 }
                } else {
                    console.log("Profile is undefined");
                    return false;
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
