import { Bike, Home } from "lucide-react";
import Link from "next/link";

const footerItem = [
  {
    icon: <Home />,
    text: "ホーム",
    path: "/",
  },
  {
    icon: <Bike />,
    text: "サイクリング",
    path: "/cycling",
  },
];

type Props = {
  path: string;
};

export default function Footer({ path }: Props) {
  return (
    <div className="fixed bottom-0 z-50 flex h-[8%] w-full max-w-screen-sm items-center justify-center gap-20 border-l-2 border-r-2 border-gray-50 bg-gray-100 px-10">
      {footerItem.map((item) => {
        const isLocated = path === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`
              my-0.5 flex w-[80px] flex-col items-center justify-center rounded-md py-1 ${
                isLocated ? "bg-gray-200" : ""
              }
            `}
          >
            {item.icon}
            <p
              className={`
              ${isLocated ? "font-bold text-black" : "text-gray-500"}
              mt-1
              text-xs              
            `}
            >
              {item.text}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
