
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/NavBar";
import { AuthProvider } from "../AuthProvider";
import OfflineNotice from "@/components/OfflineNotice";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Click2Canteen | Online Food Ordering System",
  description:
    "Click2Canteen is an online food ordering system for employees, students, staff, and visitors to order meals quickly and conveniently.",
  keywords: [
    "Click2Canteen",
    "food ordering system",
    "canteen app",
    "canteen management",
    "online ordering",
    "canteen food delivery",
  ],
  authors: [{ name: "Tun Kraway Soe" }],
  creator: "Tun Kraway Soe",
  metadataBase: new URL("https://click2canteen.vercel.app"),
  openGraph: {
    title: "Click2Canteen | Order Food Online",
    description:
      "Order meals online with Click2Canteen — fast, simple, and reliable.",
    url: "https://click2canteen.vercel.app",
    siteName: "Click2Canteen",
    images: [
      {
        url: "https://click2canteen.vercel.app/click2canteen.png",
        width: 1200,
        height: 630,
        alt: "Click2Canteen Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Click2Canteen | Order Food Online",
    description: "Click2Canteen makes canteen food ordering simple and fast.",
    images: ["https://click2canteen.vercel.app/click2canteen.png"],
    creator: "@your_twitter_handle", 
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://click2canteen.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <OfflineNotice />
          <NavBar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
