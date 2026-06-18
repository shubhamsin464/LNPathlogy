import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'L.N. Pathology | Best Diagnostic Centre in Gorakhpur',
  description: 'L.N. Pathology provides accurate pathology testing, health checkups, blood tests, thyroid tests, diabetes testing and home sample collection in Gorakhpur.',
  openGraph: {
    title: 'L.N. Pathology | Best Diagnostic Centre in Gorakhpur',
    description: 'Trusted pathology lab in Gorakhpur. Book your blood test online today with home collection facilities.',
    url: 'https://lnpathology.com',
    siteName: 'L.N. Pathology',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Schema Markup for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "name": "L.N. Pathology",
              "url": "https://lnpathology.com",
              "logo": "https://lnpathology.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-8815832425",
                "contactType": "customer service"
              },
              "location": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "BS Complex, Opp. Petrol Pump, Basharatpur",
                  "addressLocality": "Gorakhpur",
                  "addressRegion": "UP",
                  "postalCode": "273004",
                  "addressCountry": "IN"
                }
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
