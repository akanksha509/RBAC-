import DashboardIcon from "@mui/icons-material/Dashboard";
import GradingIcon from "@mui/icons-material/Grading";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { AppProvider } from "@toolpad/core/react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import { SessionContext } from "./SessionContext";
import { useState, useCallback, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    title: "Users",
    icon: <DashboardIcon />,
  },
  {
    segment: "roles",
    title: "Roles",
    icon: <GradingIcon />,
  },
  {
    segment: "permissions",
    title: "Permissions",
    icon: <GppGoodIcon />,
  },
];

const BRANDING = {
  title: "RBAC Dashboard",
  logo: <img src="./logo.png" alt="logo" style={{ height: 100 }} />,
};

const THEME = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#8e24aa", // Rich purple
          light: "#ab47bc", // Bright purple
          dark: "#6a1b9a", // Deep purple
        },
        secondary: {
          main: "#7c4dff", // Vibrant violet
          light: "#b388ff", // Soft violet
          dark: "#5e35b1", // Dark violet
        },
        background: {
          default: "#f3e5f5", // Soft lavender
          paper: "#faf0ff", // Very light purple
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#ce93d8", // Light purple
          light: "#e1bee7", // Softer purple
          dark: "#9c27b0", // Deep purple
        },
        secondary: {
          main: "#7c4dff", // Bright violet
          light: "#b388ff", // Soft violet
          dark: "#5e35b1", // Dark violet
        },
        background: {
          default: "#120f1c", // Deep purple-black
          paper: "#1e1a2f", // Slightly lighter dark background
        },
      },
    },
  },
  typography: {
    fontFamily: ["Poppins", "Roboto", "Helvetica", "Arial", "sans-serif"].join(
      ","
    ),
    h1: {
      fontWeight: 600,
      letterSpacing: "-0.024rem",
      color: "#6a1b9a", // Deep purple for headings in light mode
    },
    h2: {
      fontWeight: 500,
      letterSpacing: "-0.016rem",
    },
    h3: {
      fontWeight: 500,
      letterSpacing: "-0.008rem",
    },
    h4: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontWeight: 300,
      lineHeight: 1.5,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global query configuration
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  const [session, setSession] = useState("");
  const navigate = useNavigate();

  const signIn = useCallback(() => {
    navigate("/sign-in");
  }, [navigate]);

  const signOut = useCallback(() => {
    setSession(null);
    navigate("/sign-in");
  }, [navigate]);

  const sessionContextValue = useMemo(
    () => ({ session, setSession }),
    [session, setSession]
  );

  return (
    <SessionContext.Provider value={sessionContextValue}>
      <QueryClientProvider client={queryClient}>
        <AppProvider
          navigation={NAVIGATION}
          branding={BRANDING}
          theme={THEME}
          session={session}
          authentication={{ signIn, signOut }}
        >
          <Outlet />
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionContext.Provider>
  );
}
