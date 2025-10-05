// app/layout.jsx
import "./globals.css"; // Tailwind or other global styles

export const metadata = {
  title: "My Next.js App",
  description: "A modern web app built with Next.js 13+",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
