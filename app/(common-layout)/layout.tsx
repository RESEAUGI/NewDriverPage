"use client";
import Footer from "@/components/Footer";
import CommonHeader from "@/components/CommonHeader";
import HeaderTop from "@/components/HeaderTop";
import MobileMenu from "@/components/MobileMenu";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <HeaderTop /> */}
      {/* <CommonHeader /> */}
      {/* <MobileMenu /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
}
