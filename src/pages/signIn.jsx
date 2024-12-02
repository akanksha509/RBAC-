import { SignInPage } from "@toolpad/core/SignInPage";
import { useNavigate } from "react-router-dom";
import { useSession } from "../SessionContext";
import { fakeAsyncGetSession } from "../api/users";
import AnimatedBackground from "../components/AnimatedBackground/AnimatedBackground";

export default function SignIn() {
  const { setSession } = useSession();
  const navigate = useNavigate();

  return (
    <div>
      <AnimatedBackground />
      <SignInPage
        providers={[{ id: "credentials", name: "Credentials" }]}
        signIn={async (provider, formData, callbackUrl) => {
          // Demo session
          try {
            const user_session = await fakeAsyncGetSession(formData);
            if (user_session) {
              setSession(user_session);
              navigate(callbackUrl || "/", { replace: true });
              return {};
            }
          } catch (error) {
            return {
              error:
                error instanceof Error ? error.message : "An error occurred",
            };
          }
          return {};
        }}
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>
  );
}
