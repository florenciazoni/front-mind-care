import { Container, Typography, Box, keyframes, styled } from '@mui/material';
import EmotionDiary from '../components/EmotionDiary';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const Particle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `radial-gradient(circle, 
    ${theme.palette.secondary.light} 0%, 
    transparent 70%)`,
  filter: 'blur(3px)',
  animation: `${float} 6s infinite ease-in-out`,
  opacity: 0.7,
}));

const GlassPanel = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(16px)',
  borderRadius: '32px',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(147, 112, 219, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '70vh',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.4), rgba(255,255,255,0.2))'
}));

const DiarioEmocional = () => (
  <Box sx={{
    minHeight: '100vh',
    background: `linear-gradient(135deg, #F8F6F4 0%, #F0EDFF 100%)`,
    position: 'relative',
    overflow: 'hidden',
    py: 8
  }}>
    {/* Partículas flotantes */}
    {[...Array(8)].map((_, i) => (
      <Particle key={i} sx={{
        width: 60 + i * 15,
        height: 60 + i * 15,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${i * 0.5}s`,
        background: `radial-gradient(circle, 
          ${i % 2 === 0 ? '#FFD6E8' : '#C1E3FF'} 0%, 
          transparent 70%)`
      }} />
    ))}

    <Container maxWidth="lg">
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" sx={{
          fontWeight: 800,
          letterSpacing: '-1.2px',
          background: 'linear-gradient(45deg, #FFB3C6 30%, #9AD4FF 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block',
          animation: `${float} 6s ease-in-out infinite`,
          mb: 2,
          fontFamily: "'Playfair Display', serif",
          fontSize: '3.5rem'
        }}>
          Tu Universo Emocional
        </Typography>
        <Typography variant="h6" sx={{
          maxWidth: '600px',
          margin: 'auto',
          color: '#6D6875',
          fontWeight: 400,
          letterSpacing: '0.5px'
        }}>
          Explora y navega por tu constelación de emociones
        </Typography>
      </Box>

      <GlassPanel>
        <EmotionDiary />
      </GlassPanel>

      {/* Decoración inferior */}
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '120px',
        background: 'linear-gradient(to top, rgba(255, 214, 232, 0.3), transparent)',
        zIndex: 0
      }} />
    </Container>
  </Box>
);

export default DiarioEmocional;