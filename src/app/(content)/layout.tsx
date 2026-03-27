import SidebarApplication from "../_components/sidebar-application"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarApplication>
        {children}
    </SidebarApplication>
  );
}