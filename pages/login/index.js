import React from "react";
import Image from "next/image";
import { getProviders, signIn } from "next-auth/react";

function LoginPage(props) {
  const { providers } = props;

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn(providers.spotify.id, { callbackUrl: "/" })
  }

  return (
    <div className=" flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <div className="flex flex-col items-center">
        <Image
          className="pb-8"
          src="/images/spotify-logo.png"
          alt="Spotify Logo"
          width={100}
          height={100}
        />
        <button
          className="bg-green-400 text-white p-5 rounded-full"
          onClick={handleSignIn}
        >
          Login with {providers.spotify.name}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
