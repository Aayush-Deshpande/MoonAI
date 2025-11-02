export const metadata = {
  title: "Viora – Where Voice Meets Intelligence",
  description: "Viora helps brands automate communication using emotionally intelligent AI voices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
