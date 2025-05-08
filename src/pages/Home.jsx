import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Avatar,
  useTheme,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EmergencyMode from "../components/EmergencyMode";
import {
  PsychologyAlt,
  Analytics,
  Book,
  Spa,
  Emergency,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";

const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: "2rem",
  borderRadius: "20px",
  transition: "0.3s",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center", // Añadido para centrado general
  textAlign: "center", // Añadido para centrar texto
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[8],
  },
  cursor: "pointer",
}));

const Home = () => {
  const navigate = useNavigate();
  const [openEmergency, setOpenEmergency] = useState(false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(160deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
        padding: { xs: "2rem 1rem", md: "4rem 2rem" },
      }}
    >
      <Container maxWidth="xl">
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 8,
            position: "relative",
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              m: "auto",
              mb: 4,
              bgcolor: "primary.main",
              animation: `${floating} 6s ease-in-out infinite`,
            }}
          >
            <PsychologyAlt sx={{ fontSize: 60 }} />
          </Avatar>

          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 900,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Tu Espacio Emocional
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
              maxWidth: "800px",
              mx: "auto",
              mb: 4,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
            }}
          >
            Un ecosistema inteligente para tu bienestar emocional, combinando IA
            avanzada con herramientas terapéuticas interactivas.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/chat")}
            startIcon={<PsychologyAlt />}
            sx={{
              px: 6,
              py: 2,
              borderRadius: "50px",
              fontSize: "1.1rem",
              boxShadow: 4,
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            Comenzar Sesión
          </Button>
        </Box>

        {/* Features Grid - Iconos centrados */}
        <Grid
          container
          spacing={3}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
            mb: 8,
            justifyItems: "center",
          }}
        >
          <Grid item sx={{ width: "100%", minWidth: 300, display: "flex" }}>
            <FeatureCard onClick={() => navigate("/grafico")}>
              <Analytics 
                color="primary" 
                sx={{ 
                  fontSize: 50, 
                  mb: 2,
                  mx: 'auto' // Centrado horizontal
                }} 
              />
              <Typography variant="h5" gutterBottom>
                Análisis Emocional
              </Typography>
              <Typography color="text.secondary">
                Visualiza tu progresión emocional con gráficos interactivos y
                análisis predictivo.
              </Typography>
            </FeatureCard>
          </Grid>

          <Grid item sx={{ width: "100%", minWidth: 300, display: "flex" }}>
            <FeatureCard onClick={() => navigate("/diario")}>
              <Book 
                color="primary" 
                sx={{ 
                  fontSize: 50, 
                  mb: 2,
                  mx: 'auto' // Centrado horizontal
                }} 
              />
              <Typography variant="h5" gutterBottom>
                Diario Inteligente
              </Typography>
              <Typography color="text.secondary">
                Tu diario con análisis automático de sentimientos y sugerencias
                personalizadas.
              </Typography>
            </FeatureCard>
          </Grid>

          <Grid item sx={{ width: "100%", minWidth: 300, display: "flex" }}>
            <FeatureCard onClick={() => navigate("/relajacion")}>
              <Spa 
                color="primary" 
                sx={{ 
                  fontSize: 50, 
                  mb: 2,
                  mx: 'auto' // Centrado horizontal
                }} 
              />
              <Typography variant="h5" gutterBottom>
                Espacio Zen
              </Typography>
              <Typography color="text.secondary">
                Técnicas de realidad aumentada para meditación y control de
                ansiedad.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>

        {/* Emergency Section */}
        <Box
          sx={{
            textAlign: "center",
            position: "sticky",
            bottom: "2rem",
            zIndex: 1000,
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenEmergency(true)}
            startIcon={<Emergency />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "15px",
              fontSize: "1rem",
              boxShadow: 6,
              "&:hover": {
                animation: "pulse 1.5s infinite",
              },
            }}
          >
            Modo Crisis
          </Button>
        </Box>

        <EmergencyMode
          open={openEmergency}
          onClose={() => setOpenEmergency(false)}
        />
      </Container>
    </Box>
  );
};

export default Home;