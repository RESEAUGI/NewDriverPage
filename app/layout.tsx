import "./globals.css";
import "@/public/styles/styles.scss";
import "@/public/styles/line-awesome.min.css";

export const metadata = {
  title: "Placewise - Online Booking NextJS Template",
  description: "A nextjs template for online booking system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={` bg-[var(--bg-1)] text-[var(--neutral-700)]`}>
        {children}
      </body>
    </html>
  );
}
