import { AuthWrapper } from "./AuthWrapper";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper>
      <div>{children}</div>
    </AuthWrapper>
  );
}
