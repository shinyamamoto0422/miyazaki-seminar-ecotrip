"use client";

import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Footer from "@/components/layout/footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  return (
    <html lang="ja">
      <body className={cx(sfPro.variable, inter.variable)}>
        {/* spの幅にする */}
        <div className="mx-auto flex h-screen max-w-screen-sm justify-center border-l-2 border-r-2 border-gray-100">
          {pathName === "/" && (
            <div className="fixed z-[-1] h-screen w-full max-w-screen-sm bg-[url('/nature.png')] bg-cover bg-center" />
          )}
          <main className="flex h-[92%] w-full flex-col p-2">{children}</main>

          <Footer path={pathName as string} />

          <Analytics />
        </div>
      </body>
    </html>
  );
}
