import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

// nextjs gives gives us api endpoints
interface Props{
  tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {
  return (
    <div className="lg:max-w-6xl mx-auto mx-h-screen overflow-hidden">
      <Head>
        <title>Twitter 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />

      <main className="grid grid-cols-9">
        {/* <Sidebar> */}
        <Sidebar />
        {/* Feed */}
        <Feed tweets={tweets} />
        {/* Widgets */}
        <Widgets />

        {/* creating a serverside render to fetch data */}
      </main>
    </div>
  )
}

export default Home 

// serverside render - typically normal react app loads up entire bundle to user browser
// so serverside render all the javascript work is handle on the serverside and user simply gets the output

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const tweets = await fetchTweets();
  return {
    props: {
      tweets,
    },
  }
}



// Oauth2.0 client Id-
// TGRVLW1jR04zNVdXdU1IeEF2MTA6MTpjaQ

// Client secret-
// nF0QpScXsABNDYhwbMwG445Wtxl-v2m_0v9X_hWbAxYwW-QUTB