import React from "react";
import { Box, Typography, keyframes, styled } from "@mui/material";
import { 
  FiberManualRecord,
  SentimentSatisfiedAlt, 
  MoodBad, 
  EmojiEmotions,
  SelfImprovement,
  Bolt
} from '@mui/icons-material';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const EmotionTimeline = styled(Box)({
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    left: 24,
    top: 0,
    height: '100%',
    width: '2px',
    background: 'linear-gradient(to bottom, #FFB3C6, #9AD4FF)',
    zIndex: 0,
    opacity: 0.4
  }
});

const TimelineDot = styled(FiberManualRecord)(({ color }) => ({
  fontSize: '1.5rem',
  color: color,
  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
  zIndex: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '50%',
  padding: '4px'
}));

const EmotionCard = styled(Box)(({ color }) => ({
  background: `rgba(255, 255, 255, 0.85)`,
  borderLeft: `4px solid ${color}`,
  borderRadius: '16px',
  padding: '16px',
  margin: '16px 0',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 20px rgba(147, 112, 219, 0.1)',
  '&:hover': {
    transform: 'translateX(8px)',
    boxShadow: `0 6px 24px ${color}20`
  }
}));

const emotionIcons = {
  Feliz: <EmojiEmotions />,
  Triste: <SentimentSatisfiedAlt />,
  Ansioso: <MoodBad />,
  Enojado: <MoodBad />,
  Calmo: <SelfImprovement />,
  Motivado: <Bolt />
};

const emotionColors = {
  Feliz: '#FFF3B0',
  Triste: '#A8D0E6',
  Ansioso: '#FFB3BA',
  Enojado: '#FFAEAE',
  Calmo: '#C1E1C1',
  Motivado: '#D4A3E9'
};

const EmotionSummary = ({ entries }) => {
  const last7Days = entries.slice(-7);
  
  const getEmotionStats = () => {
    const count = {};
    last7Days.forEach(entry => {
      count[entry.emotion] = (count[entry.emotion] || 0) + 1;
    });
    return Object.entries(count).sort((a, b) => b[1] - a[1]);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography variant="h5" sx={{
        mb: 4,
        fontWeight: 700,
        background: 'linear-gradient(45deg, #FFB3C6 30%, #9AD4FF 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontFamily: "'Playfair Display', serif",
        fontSize: '2.2rem'
      }}>
        Evolución Emocional
      </Typography>

      <EmotionTimeline>
        {last7Days.map((entry, index) => {
          const color = emotionColors[entry.emotion];
          const Icon = emotionIcons[entry.emotion];
          
          return (
            <Box 
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                ml: 3,
                animation: `${fadeIn} 0.5s ease-out`
              }}
            >
              <TimelineDot color={color} />
              
              <EmotionCard color={color}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                  {React.cloneElement(Icon, { sx: { 
                    color, 
                    fontSize: 28,
                    backgroundColor: `${color}30`,
                    borderRadius: '8px',
                    padding: '6px'
                  } })}
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 600,
                    color: '#6D6875'
                  }}>
                    {entry.date}
                  </Typography>
                </Box>
                
                <Typography variant="body2" sx={{ 
                  color: '#6D6875',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {entry.note || "Sin comentarios"}
                </Typography>
              </EmotionCard>
            </Box>
          );
        })}
      </EmotionTimeline>

      {last7Days.length > 0 && (
        <Box sx={{
          mt: 6,
          p: 3,
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 24px rgba(147, 112, 219, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <Typography variant="h6" gutterBottom sx={{ 
            fontWeight: 600,
            color: '#6D6875'
          }}>
            Estadísticas (últimos 7 días)
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {getEmotionStats().map(([emotion, count]) => (
              <Box key={emotion} sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                backgroundColor: `${emotionColors[emotion]}30`,
                borderRadius: '8px',
                px: 2,
                py: 1
              }}>
                <FiberManualRecord sx={{ 
                  color: emotionColors[emotion],
                  fontSize: '14px'
                }} />
                <Typography variant="body1" sx={{ color: '#6D6875' }}>
                  {emotion}: {count}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EmotionSummary;