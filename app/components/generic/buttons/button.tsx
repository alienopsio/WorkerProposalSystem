import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  state?: string;
  size?: string;
}

export const Button = ({ onClick, children, state, size }: ButtonProps) => {
  const isActive = state === "active";
  const isLight = state === "light";

  const isDanger = state === "danger";
  const isWarning = state === "warning";
  const isMuted = state === "muted";
  const isCompleted = state === "completed";
  const isExpired = state === "expired";

  return (
    <button
      onClick={onClick}
      className={`border-[1.75px] w-full rounded uppercase text-xs font-bold mt-1 border-solid align-middle border-black px-5 py-2 ${
        isActive && "bg-[#00FFFF] text-black"
      } ${
        isLight &&
        "bg-white text-black hover:bg-transparent hover:text-white hover:border-white transition-all hover:border-[1.75px]"
      } ${
        !isLight &&
        !isActive &&
        "bg-black text-white hover:bg-transparent hover:text-black hover:border-black transition-all hover:border-[1.75px]"
      }
      ${
        isDanger &&
        "bg-red-500 text-white hover:text-red-500 hover:border-red-700 hover:bg-black transition-all"
      }
      ${
        isWarning &&
        "bg-yellow-500 text-white hover:bg-black hover:text-yellow-500 hover:border-yellow-700 transition-all"
      }
      ${
        isMuted &&
        "bg-black border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white hover:border-gray-500 transition-all"
      }
      ${size === "fat" && "py-4"}
      ${
        isCompleted &&
        "bg-green-500 text-white hover:bg-transparent hover:text-green-500 hover:border-green-700 transition-all"
      }
      ${
        isExpired &&
        "bg-gray-600 text-white hover:bg-transparent hover:text-gray-500 hover:border-gray-700 transition-all"
      }
      `}
    >
      {children}
    </button>
  );
};
