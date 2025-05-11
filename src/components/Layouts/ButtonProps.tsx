import { useState, useEffect } from "react";

interface ButtonProps {
  setIsOpen: (open: boolean) => void;
}

const ResponsiveButton: React.FC<ButtonProps> = ({ setIsOpen }) => {
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <button
      className="flex items-center text-white font-bold outline-none px-4 py-2 rounded-md relative text-xl gap-4 cursor-pointer bg-[#0052cc] hover:bg-[#003d99] hover:scale-105 duration-300"
      onClick={() => setIsOpen(true)}
    >
      {/* Decorative Left Triangle */}
      <span
        className="absolute left-[-17px] top-0 w-[20px] h-full"
        style={{
          background: "linear-gradient(135deg, #0052cc, #003d99)",
          clipPath: "polygon(100% 0, 0% 50%, 100% 100%)",
        }}
      />

      {/* Icon */}
      <img height={15} width={15} src="/assets/images/icon/coin.png" alt="Coin Icon" />

      {/* Hide Loyalty 45 if screen size < 720px */}
      {screenSize >= 720 && <span>Loyalty 45</span>}
    </button>
  );
};

export default ResponsiveButton;
