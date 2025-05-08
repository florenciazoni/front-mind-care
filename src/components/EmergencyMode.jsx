import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
  keyframes,
  styled
} from "@mui/material";
import { Favorite, Refresh, Spa, MusicNote, CheckCircle } from "@mui/icons-material";
import music from "../assets/music.mp3";

const calmingPhrases = [
  "Respirá. Estás a salvo en este momento.",
  "Todo pasa. Incluso esto.",
  "No estás solo/a. Merecés estar bien.",
  "Estás haciendo lo mejor que podés.",
  "Sos fuerte. Podés con esto.",
];

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PulseButton = styled(Button)({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)'
  }
});

const EmergencyMode = ({ open, onClose }) => {
  const [phrase, setPhrase] = useState(calmingPhrases[0]);

  const getNewPhrase = () => {
    const newPhrase = calmingPhrases[Math.floor(Math.random() * calmingPhrases.length)];
    setPhrase(newPhrase);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{
      sx: {
        borderRadius: '24px',
        background: 'linear-gradient(145deg, #FFF9FB 0%, #F5F9FF 100%)',
        boxShadow: '0 8px 32px rgba(147, 112, 219, 0.1)'
      }
    }}>
      <DialogTitle sx={{ 
        textAlign: "center",
        background: 'linear-gradient(45deg, #FFB3C6 30%, #9AD4FF 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.8rem',
        py: 3
      }}>
        <Favorite sx={{ 
          fontSize: 32, 
          color: '#FFB3C6', 
          verticalAlign: 'middle', 
          mr: 1 
        }}/>
        Modo de Calma
      </DialogTitle>
      
      <DialogContent sx={{ px: 4, py: 3 }}>
        {/* Sección Frases */}
        <Box textAlign="center" mb={4} sx={{ animation: `${fadeIn} 0.5s ease` }}>
          <Typography variant="h6" gutterBottom sx={{
            color: '#6D6875',
            fontSize: '1.4rem',
            minHeight: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontStyle: 'italic'
          }}>
            {phrase}
          </Typography>
          <PulseButton 
            variant="outlined" 
            onClick={getNewPhrase}
            sx={{
              borderColor: '#FFB3C6',
              color: '#6D6875',
              borderRadius: '12px',
              '&:hover': {
                borderColor: '#9AD4FF',
                backgroundColor: 'rgba(154, 212, 255, 0.1)'
              }
            }}
          >
            <Refresh sx={{ color: '#9AD4FF', mr: 1 }} />
            Nueva frase
          </PulseButton>
        </Box>

        {/* Sección Respiración */}
        <Box textAlign="center" mb={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Spa sx={{ color: '#A8E6CF', mr: 1, fontSize: 28 }} />
            <Typography variant="subtitle1" sx={{ 
              color: '#6D6875',
              fontWeight: 500
            }}>
              Respirá conmigo
            </Typography>
          </Box>
          <Box sx={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(147, 112, 219, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <iframe
              width="100%"
              height="250"
              src="https://www.youtube.com/embed/phRZKH1tQsQ"
              title="Ejercicio de respiración guiada"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: '16px' }}
            ></iframe>
          </Box>
        </Box>

        {/* Sección Música */}
        <Box textAlign="center" mb={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <MusicNote sx={{ color: '#D4A3E9', mr: 1, fontSize: 28 }} />
            <Typography variant="subtitle1" sx={{ 
              color: '#6D6875',
              fontWeight: 500
            }}>
              Música relajante
            </Typography>
          </Box>
          <Box sx={{
            borderRadius: '12px',
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <audio 
              controls 
              loop 
              style={{ 
                width: '100%',
                '&::-webkit-media-controls-panel': {
                  background: 'rgba(255, 255, 255, 0.5)'
                }
              }}
            >
              <source src={music} type="audio/mp3" />
              Tu navegador no soporta el audio.
            </audio>
          </Box>
        </Box>

        {/* Botón Cerrar */}
        <Box textAlign="center" mt={2}>
          <PulseButton 
            variant="contained" 
            onClick={onClose}
            sx={{
              background: 'linear-gradient(45deg, #FFB3C6 30%, #9AD4FF 90%)',
              color: 'white',
              borderRadius: '12px',
              px: 4,
              '&:hover': {
                opacity: 0.9
              }
            }}
          >
            <CheckCircle sx={{ mr: 1 }} />
            Listo, gracias
          </PulseButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyMode;