import "./globals.css";

// Root layout — locale layout at app/[locale]/layout.tsx provides <html> and <body>
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
