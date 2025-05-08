import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, CircularProgress, keyframes, styled } from '@mui/material';
import { PlayArrow, Pause, VolumeUp, VolumeOff } from '@mui/icons-material';

const breathe = keyframes`
  0% { transform: scale(0.9); }
  50% { transform: scale(1.1); }
  100% { transform: scale(0.9); }
`;

const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const GradientCircle = styled(Box)(({ phase }) => ({
  position: 'relative',
  borderRadius: '50%',
  background: `linear-gradient(45deg, 
    ${phase === 'Inhala' ? '#A8E6CF' : phase === 'Sostén' ? '#FFD3B6' : '#BBDEFB'}, 
    ${phase === 'Inhala' ? '#DCEDC8' : phase === 'Sostén' ? '#FFAAA5' : '#B3E5FC'})`,
  boxShadow: `0 0 50px ${phase === 'Inhala' ? 'rgba(168, 230, 207, 0.3)' : 
    phase === 'Sostén' ? 'rgba(255, 211, 182, 0.3)' : 'rgba(187, 222, 251, 0.3)'}`,
  animation: `${breathe} ${phase === 'Sostén' ? '2s' : '4s'} infinite ease-in-out`,
}));

const Particle = styled(Box)(({ phase }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `radial-gradient(circle, 
    ${phase === 'Inhala' ? '#A8E6CF' : phase === 'Sostén' ? '#FFD3B6' : '#BBDEFB'} 0%, 
    transparent 70%)`,
  animation: `${floating} 6s infinite ease-in-out`,
  opacity: 0.6,
  filter: 'blur(2px)'
}));

const breathingPhases = [
  { label: 'Inhala', duration: 4000 },
  { label: 'Sostén', duration: 2000 },
  { label: 'Exhala', duration: 4000 },
];

const Mindfulness = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(4);
  const currentPhase = breathingPhases[phaseIndex];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      if ('speechSynthesis' in window && !isMuted) {
        const utterance = new SpeechSynthesisUtterance(currentPhase.label);
        utterance.lang = 'es-ES'; // Configuración para voz en español
        window.speechSynthesis.speak(utterance);
      }
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : currentPhase.duration / 1000));
      }, 1000);
      
      const phaseTimer = setTimeout(() => {
        setPhaseIndex((prev) => (prev + 1) % breathingPhases.length);
      }, currentPhase.duration);

      return () => {
        clearTimeout(phaseTimer);
        clearInterval(timer);
      };
    }
  }, [phaseIndex, isPlaying]);

  const handleTogglePlay = () => setIsPlaying(!isPlaying);
  const handleToggleMute = () => setIsMuted(!isMuted);

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(45deg, #F0F4FF 0%, #E8F5E9 100%)',
      py: 6,
      px: 2
    }}>
      <Typography variant="h3" sx={{
        mb: 4,
        fontWeight: 900,
        background: 'linear-gradient(45deg, #FFB3C6 30%, #9AD4FF 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontFamily: "'Playfair Display', serif",
        fontSize: '3rem',
        textAlign: 'center'
      }}>
        Respiración Consciente
      </Typography>

      {/* Contenedor principal ampliado */}
      <Box sx={{ 
        position: 'relative', 
        width: '80%', 
        maxWidth: 600,
        height: 500, 
        mb: 6 
      }}>
        <GradientCircle phase={currentPhase.label} sx={{
          width: 300,
          height: 300,
          m: 'auto',
          position: 'relative',
          zIndex: 1
        }}>
          {[...Array(8)].map((_, i) => (
            <Particle key={i} phase={currentPhase.label} sx={{
              width: 60 + i * 15,
              height: 60 + i * 15,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: `${i * 0.5}s`
            }} />
          ))}
        </GradientCircle>

        <CircularProgress
          variant="determinate"
          value={(timeLeft / (currentPhase.duration / 1000)) * 100}
          size={360}
          thickness={2}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgba(255, 255, 255, 0.1)'
          }}
        />
      </Box>

      <Box sx={{ 
        width: '80%', 
        maxWidth: 600, 
        textAlign: 'center' 
      }}>
        <Typography variant="h2" sx={{
          fontSize: '4rem',
          fontWeight: 800,
          mb: 3,
          color: '#6D6875',
          fontFamily: "'Playfair Display', serif"
        }}>
          {currentPhase.label}
        </Typography>

        <Typography variant="h5" sx={{ 
          mb: 5, 
          color: '#8E8D92',
          fontSize: '1.5rem'
        }}>
          Tiempo restante: {timeLeft}s
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          justifyContent: 'center' 
        }}>
          <IconButton onClick={handleTogglePlay} sx={{
            width: 64,
            height: 64,
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 20px rgba(147, 112, 219, 0.1)',
            '&:hover': { background: 'rgba(255, 255, 255, 0.9)' }
          }}>
            {isPlaying ? 
              <Pause fontSize="large" sx={{ color: '#6D6875', fontSize: 40 }}/> : 
              <PlayArrow fontSize="large" sx={{ color: '#6D6875', fontSize: 40 }}/>}
          </IconButton>
          
          <IconButton onClick={handleToggleMute} sx={{
            width: 64,
            height: 64,
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 20px rgba(147, 112, 219, 0.1)',
            '&:hover': { background: 'rgba(255, 255, 255, 0.9)' }
          }}>
            {isMuted ? 
              <VolumeOff fontSize="large" sx={{ color: '#6D6875', fontSize: 40 }}/> : 
              <VolumeUp fontSize="large" sx={{ color: '#6D6875', fontSize: 40 }}/>}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Mindfulness;