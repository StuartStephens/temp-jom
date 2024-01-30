import "./App.scss";
import { AuthProvider } from "./contexts/Auth/Context";
import { CMColorModeProvider } from "./contexts/ColorModeContext/CMColorModeContext";
import { MainLayout } from "./layouts/MainLayout";
import "bootstrap-icons/font/bootstrap-icons.min.css";

function App() {
  return (
    <CMColorModeProvider>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </CMColorModeProvider>
  );
}

export default App;
