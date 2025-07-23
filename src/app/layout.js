import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "Mentorship Platform",
  description: "1:1 session booking app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <main className="min-h-screen bg-gray-50">{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
