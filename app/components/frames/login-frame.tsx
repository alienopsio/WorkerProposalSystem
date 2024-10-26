import Link from "next/link";
import { SelectPlanets } from "../content/select-planets";
import { LoginButton } from "../generic/buttons/login-button";

export const LoginFrame = () => {
  return (
    <main className={`flex flex-col items-center py-14 gap-5`}>
      <center>
        <h2 className={`font-semibold uppercase text-3xl mb-4`}>
          Worker Proposals
        </h2>
        <div
          className={`bg-black/40 p-14 border-t-8 border-[#9F9F9F] max-w-[700px] flex flex-col gap-10 justify-center items-center`}
        >
          <article className={`flex flex-col gap-6 justify-center items-center`}>
            <div className="flex flex-col text-[#00FFFF] justify-center items-center max-w-[250px]">
              <span className="cursor-pointer font-bold text-sm" onClick={() => open("https://wp.alienops.io/documentation")}>
                READ THE DOCUMENTATION
              </span>
              <hr className="w-full border-[#00FFFF]" />
            </div>
            <h3 className={`uppercase text-3xl font-light !tracking-[.07em]`}>
              Sign in with your Wallet
            </h3>
            <span className={`font-medium text-lg !tracking-[.10em]`}>
              first choose the planet you wish to interact with, before signing
              in
            </span>
          </article>
          <div className={`flex flex-col gap-4 items-center w-full max-w-[300px]`}>
            <SelectPlanets type={"button"} />
            <LoginButton />
          </div>

          <Link
            href={"?visitor=true"}
            className={`uppercase text-sm font-semibold hover:scale-110 hover:text-[#00FFFF] transition-all cursor-pointer duration-500`}
          >
            continue as visitor
          </Link>
        </div>
      </center>
      <span
        className={`flex flex-col items-center text-[#9F9F9F] !tracking-[.0em]`}
      >
        <span>
          Don&apos;t have a WAX Account?{" "}
          <Link
            href={"https://www.mycloudwallet.com/dashboard"}
            target="_blank"
            className={`text-[#00FFFF] cursor-pointer`}
          >
            Sign Up here
          </Link>{" "}
        </span>
        <span>Created by AlienOPs.io</span>
      </span>
    </main>
  );
};
