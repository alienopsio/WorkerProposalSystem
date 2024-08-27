"use client";
import WorkerProposalsLayout from "./components/layouts/worker-proposal.layout";
import { LoginFrame } from "./components/frames/login-frame";
import Navbar from "./components/header/nav-bar";
import { useAuth } from "./hook/useAuth";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const { activeUserData } = useAuth();

  // get param from req login=true
  const searchParams = useSearchParams();
  const isVisitor = searchParams.get("visitor") === "true";
  const isLogin = !activeUserData?.actor && !isVisitor;

  return (
    <div className={`w-screen`}>
      <div className="bg-layout" />
      {isLogin ? (
        <LoginFrame />
      ) : (
        <>
          <Navbar />
          <WorkerProposalsLayout />
        </>
      )}
    </div>
  );
}
