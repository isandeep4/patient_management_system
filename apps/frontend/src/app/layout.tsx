import { UserProvider } from "./contextApi/userContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <UserProvider>{children}</UserProvider>;
      </body>
    </html>
  );
}
