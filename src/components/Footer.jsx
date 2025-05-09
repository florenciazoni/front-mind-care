import { Box, Typography, IconButton, styled, useTheme } from "@mui/material";
import { Favorite, PsychologyAlt, GitHub, Email } from "@mui/icons-material";

const GradientFooter = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === "dark"
    ? theme.palette.background.paper
    : `linear-gradient(135deg, #FFF9FB 0%, #F5F9FF 100%)`,
  backdropFilter: "blur(10px)",
  borderTop: `1px solid ${theme.palette.divider}`,
  position: "relative",
  overflow: "hidden",
  boxShadow: theme.shadows[1],
  color: theme.palette.text.primary,
}));

const FooterWave = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "-10px",
  left: 0,
  right: 0,
  height: "20px",
  background:
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : `linear-gradient(90deg, #FFB3C6 0%, #9AD4FF 100%)`,
  clipPath:
    'path("M0,40 C40,0 80,0 120,20 C160,40 200,60 240,40 C280,20 320,0 360,0 C400,0 440,20 480,40 C520,60 560,80 600,60 C640,40 680,0 720,0 C760,0 800,20 840,40 C880,60 920,80 960,60 C1000,40 1040,0 1080,0 C1120,0 1160,20 1200,40 L1200,60 L0,60 Z")',
  opacity: 0.1,
}));

const Footer = () => {
  const theme = useTheme();

  return (
    <GradientFooter sx={{ pt: 4, pb: 3 }}>
      <FooterWave />

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Marca */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <PsychologyAlt
            sx={{
              fontSize: 32,
              color: theme.palette.primary.main,
              animation: "pulse 3s infinite",
              opacity: 0.9,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              background:
                "linear-gradient(45deg, #FFB3C6 30%, #9AD4FF 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            MindCare
          </Typography>
        </Box>

        {/* Enlaces */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1.5, md: 3 },
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["Recursos", "Privacidad", "Contacto"].map((item) => (
            <Typography
              key={item}
              variant="body2"
              sx={{
                cursor: "pointer",
                color: theme.palette.text.secondary,
                fontSize: "0.8rem",
                "&:hover": {
                  color: theme.palette.primary.main,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        {/* Íconos sociales */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <IconButton
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                color: theme.palette.primary.light,
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <GitHub sx={{ fontSize: 22 }} />
          </IconButton>
          <IconButton
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                color: theme.palette.secondary.light,
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <Email sx={{ fontSize: 22 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Texto inferior */}
      <Box
        sx={{
          textAlign: "center",
          mt: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary, fontSize: "0.7rem" }}
        >
          Hecho con
        </Typography>
        <Favorite
          sx={{
            fontSize: 14,
            color: "#FFB3C6",
            animation: "heartbeat 1.5s infinite",
          }}
        />
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary, fontSize: "0.7rem" }}
        >
          © 2025 MindCare Labs
        </Typography>
      </Box>
    </GradientFooter>
  );
};

export default Footer;
