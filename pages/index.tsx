import Head from "next/head";
import Sidebar from "../components/sidebar/Sidebar";
import Center from "../components/center/Center";
import Player from "../components/player/Player";
import ErrorModal from "../components/ErrorModal/ErrorModal";
import { getSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import { isOnlyAccessibleToPremium } from "../atoms/errorModalAtom";
import { useEffect } from "react";

export default function Home() {
  const showModal = useRecoilValue(isOnlyAccessibleToPremium);

  useEffect(() => {
    console.log('Revalidate...')
  },[showModal])

  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify 2.0</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Center */}
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>

      {showModal && <ErrorModal />}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
