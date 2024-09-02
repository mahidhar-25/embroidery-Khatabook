import { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import client from "@/lib/db/index";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    // Providers array will be configured in the next steps
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Add logic to verify credentials here
                if (!credentials) return null;
                const { email, password } = credentials;
                // Fetch user and password hash from your database
                // Example: const user = await getUserByEmail(email)
                const user = await client.user.findUnique({
                    where: { username: email },
                });

                if (user && bcrypt.compareSync(password, user.password)) {
                    return { id: user.id, username: user.username };
                } else {
                    throw new Error("Invalid credentials");
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60, // 1 day
    },
    pages: {
        signIn: "/signIn", // Custom sign-in page
    },
    // Additional configuration will be added here
};
export const getAuth = () => getServerSession(authOptions);
