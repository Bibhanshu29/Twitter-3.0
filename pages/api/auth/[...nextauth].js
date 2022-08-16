import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"
 import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: '2.0',
    }),
    // ...add more providers here
  ],
})



// Bearer Token
// AAAAAAAAAAAAAAAAAAAAAPQUegEAAAAAHsSDC1VwhNuEsWSLPcONVGoY%2BSY%3DrroObNSzZBQnCsk78VtdN7gzYlwlzrWF6QmPATLPtGJRAO4SvR

// Secret Token
// ejzAHZfiGtTjo4tFzqvqfBT7Ft3DXDC8WCFHyuncCZdVUwP33g

// Api key
// GBGymZztPGHJ1CVSOekS6eOgT

