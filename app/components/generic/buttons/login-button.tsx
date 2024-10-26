import { useAuth } from "@/app/hook/useAuth"

export const LoginButton = () => {
  const { signIn } = useAuth()

  const handleSignIn = async () => {
    await signIn()
    // history.back()
  }

  return (
    <button
      onClick={handleSignIn}
      className={`border-2 border-white bg-white text-black uppercase px-14 py-3 font-semibold cursor-pointer w-full`}
    >
      sign in
    </button>
  )
}
