import SideBar from "@/components/SideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[90dvh]">
      <SideBar /> {/* Sidebar stays persistent across dashboard pages */}
      <main className="flex-1 p-6">{children}</main> {/* Page content renders dynamically */}
    </div>
  );
}
