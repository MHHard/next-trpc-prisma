import { Inter } from "next/font/google";

import { TrpcProvider } from "../trpcClient/TrpcProvider.tsx";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TrpcProvider>
      <div className={inter.className}>{children}</div>
    </TrpcProvider>
  );
}
