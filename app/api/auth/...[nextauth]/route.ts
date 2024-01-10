import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {
  FirestoreAdapter,
  FirebaseAdapterConfig,
} from "@next-auth/firebase-adapter"; // Updated import
import db from "../../../../firebase";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: FirestoreAdapter({ db } as FirebaseAdapterConfig),
});
