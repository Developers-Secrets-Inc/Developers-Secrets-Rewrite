import { AppHeader } from "@/components/headers/app-header";
import { Footer } from "@/components/sections/landing/main";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
      <Footer className="max-w-5xl mx-auto" />
    </>
  )
}
