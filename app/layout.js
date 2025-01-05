
import "./globals.css";



export const metadata = {
  title: "StyleDivaa | Designer Dresses & Fashion Courses",
  description: "StyleDivaa is a Bangalore-based designer boutique offering exquisite dresses and professional fashion courses. Serving clients across India with unmatched elegance and creativity.",
  keywords: "StyleDivaa, designer dresses, fashion courses, Bangalore boutique, custom tailoring, wardrobe consultancy, India fashion",
  authors: [{ name: "StyleDivaa", url: "https://styledivaa.com" }],
  openGraph: {
    type: "website",
    url: "https://styledivaa.com",
    title: "StyleDivaa | Designer Dresses & Fashion Courses",
    description: "StyleDivaa - Redefining elegance with designer dresses and professional fashion courses. Based in Bangalore, serving clients all over India.",
    images: [
      {
        url: "../public/assets/styledivaalogo.png",
        width: 800,
        height: 600,
        alt: "StyleDivaa Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StyleDivaa | Designer Dresses & Fashion Courses",
    description: "StyleDivaa - Redefining elegance with designer dresses and professional fashion courses. Based in Bangalore, serving clients all over India.",
    images: ["../public/assets/styledivaalogo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
