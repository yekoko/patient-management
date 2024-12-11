import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CarePulse",
  description: "A healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans bg-dark-300 antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
