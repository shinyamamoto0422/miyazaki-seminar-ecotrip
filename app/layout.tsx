"use client";

import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Footer from "@/components/layout/footer";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  return (
    <html lang="ja">
      <body className={cx(sfPro.variable, inter.variable)}>
        {pathName === "/" && (
          <div className="fixed z-[-1] h-screen w-full bg-[url('/nature.png')] bg-cover bg-center" />
        )}
        <main className="flex w-full flex-col p-2">{children}</main>
        <Footer path={pathName} />
        <Analytics />
      </body>
    </html>
  );
}
