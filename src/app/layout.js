import Link from 'next/link';
import './globals.css';
import '../styles/app.min.css';
// import "../styles/tailwind.css"
import '../styles/custom.css';
import Header from './includes/header/page';
import Footer from './includes/footer/page';

export const metadata = {
  title: 'My Website',
  description: 'Next.js Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
