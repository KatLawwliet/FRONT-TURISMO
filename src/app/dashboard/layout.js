import { Inter } from "next/font/google";
import './customScrollbab.css'

const inter = Inter({ subsets: ["latin"]});

export const metadata = {
  title: "TuristeAr",
  description: "App de Turismo",
  icons: {
      icon: [
          {
              url: 'https://kyrxwczgntdzbcamjivn.supabase.co/storage/v1/object/public/branded-storage/ims.png',
              sizes: '180x180'
          },
      ]
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{margin:0}}>
      <body className={inter.className} style={{margin:0}}>{children} </body>
    </html>
  );
}