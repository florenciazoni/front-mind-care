import { Container, Typography, Paper, Box, keyframes, styled } from '@mui/material';
import Chatbot from '../components/Chatbot';

const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const GlassContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
  padding: theme.spacing(4)
}));

const GradientTitle = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${floating} 4s ease-in-out infinite`,
  fontWeight: 900,
  letterSpacing: '-1.5px'
}));

const ChatGlass = styled(Paper)(({ theme }) => ({
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(32, 32, 32, 0.7)' 
    : 'rgba(255, 255, 255, 0.8)',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '2rem',
  boxShadow: `0 8px 32px 0 ${theme.palette.mode === 'dark' 
    ? 'rgba(0, 0, 0, 0.3)' 
    : 'rgba(0, 0, 0, 0.1)'}`,
  overflow: 'hidden',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)'
  }
}));

const Chat = () => (
  <GlassContainer maxWidth="lg">
    <Box textAlign="center" mb={4}>
      <GradientTitle variant="h2" gutterBottom>
        Asistente Emocional
      </GradientTitle>
      <Typography variant="subtitle1" color="textSecondary">
        Conversación con IA especializada en apoyo emocional
      </Typography>
    </Box>
    
    <ChatGlass elevation={0}>
      <Box sx={{ p: { xs: 1, md: 2 } }}>
        <Chatbot />
      </Box>
    </ChatGlass>
  </GlassContainer>
);

export default Chat;