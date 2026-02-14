import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import SmoothScroll from '@/components/smooth-scroll';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'zod-based-form | Modern Form Library',
  description: 'The ultimate form library for React and Zod.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
        </SmoothScroll>
        <Toaster position="bottom-right" theme="dark" richColors />
      </body>
    </html>
  );
}
