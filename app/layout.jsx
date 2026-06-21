import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Brennan Injury Law — Personal Injury Attorneys',
  description:
    'Brennan Injury Law represents people injured in car accidents, workplace incidents, and falls. Free case review. No fee unless we win.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
