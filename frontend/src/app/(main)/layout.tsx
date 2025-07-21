import { BottomNav } from "@/components/nav/bottom-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="flex flex-col h-screen p-4">
      {children}
      </div>
      <BottomNav />
    </div>
  );
} 