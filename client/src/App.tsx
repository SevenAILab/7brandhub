import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProviderList from "./pages/ProviderList";
import ProviderDetail from "./pages/ProviderDetail";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import Join from "./pages/Join";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Layout from "./components/Layout";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      {/* Admin route without Layout */}
      <Route path={"/admin"} component={Admin} />

      {/* Auth routes without Layout */}
      <Route path={"/login"} component={Login} />
      <Route path={"/register"} component={Register} />

      {/* Public routes with Layout */}
      <Route>
        <Layout>
          <Switch>
            <Route path={"/"} component={Home} />
            <Route path={"/providers"} component={ProviderList} />
            <Route path={"/providers/:slug"} component={ProviderDetail} />
            <Route path={"/categories"} component={Categories} />
            <Route path={"/about"} component={About} />
            <Route path={"/favorites"} component={Favorites} />
            <Route path={"/join"} component={Join} />
            <Route path={"/blog"} component={Blog} />
            <Route path={"/blog/:slug"} component={BlogPost} />
            <Route path={"/404"} component={NotFound} />
            {/* Final fallback route */}
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
