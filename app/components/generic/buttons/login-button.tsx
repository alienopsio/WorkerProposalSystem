import { useAuth } from "@/app/hook/useAuth"
import { setUserProperties, trackEvent } from "@/app/GAnalytics";

export const LoginButton = () => {
  const { signIn } = useAuth()

  const handleSignIn = async () => {
    await signIn()
    // history.back()
  }
  const handleLoginclick = () => {
    setUserProperties({
      set_user_role: 'login'
    });
    trackEvent('click_button', 'login', 'sign in with your wallet');
    handleSignIn()
  }
  return (
    <button
      onClick={handleLoginclick}
      className={`border-2 border-white bg-white text-black uppercase px-14 py-3 font-semibold cursor-pointer w-full`}
    >
      sign in
    </button>
  )
}
