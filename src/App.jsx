import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Box } from "@mui/material";
import { ChatProvider } from "./context/ChatContext";
import Navbar from "../src/components/Nabvar";
import Footer from "../src/components/Footer";
import Home from "../src/pages/Home";
import Chat from "../src/pages/Chat";
import EmotionChart from "../src/components/EmotionChart";
import GraficoEmocional from "../src/pages/GraficoEmocional";
import DiarioEmocional from "../src/pages/DiarioEmocional";
import Mindfulness from "./components/Mindfulness";
import EmergencyMode from "./components/EmergencyMode";
import { useState, useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import './App.css'


function App() {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#4caf50" },
          secondary: { main: "#ff9800" },
        },
      }),
    [mode]
  );

  return (
     <Container sx={{ width: '100%' }} > 
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <ChatProvider>
          <Router>
          <Navbar mode={mode} toggleTheme={toggleTheme} />
            {/* Box contenedor que ocupa todo el ancho y el alto disponible */}
            <Box
              sx={{
                width: "100%",
                 minHeight: '100vh',
                 overflowX: 'hidden', // Ajusta según la altura combinada de Navbar y Footer
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Container sin restricción de ancho */}
              <Container
                maxWidth={false}
                sx={{
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  px: 2, // Padding horizontal para que no toque los bordes en dispositivos pequeños
                }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/emociones" element={<EmotionChart />} />
                  <Route path="/grafico" element={<GraficoEmocional />} />
                  <Route path="/diario" element={<DiarioEmocional />} />
                  <Route path="/relajacion" element={<Mindfulness />} />
                  <Route path="/emergencia" element={<EmergencyMode />} />
                </Routes>
              </Container>
            </Box>
            <Footer mode={mode} toggleTheme={toggleTheme} />
          </Router>
        </ChatProvider>
      </ThemeProvider>
    </Container> 
  );
}

export default App;
