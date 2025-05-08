import { useState, useEffect } from "react";
import { Box, Typography, keyframes, styled } from "@mui/material";
import EmotionEntryForm from "../components/EmotionEntryForm";
import EmotionSummary from "../components/EmotionSummary";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
  padding: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8)
  }
}));

const GlassPanel = styled(Box)(({ theme }) => ({
  background: `rgba(255, 255, 255, 0.85)`,
  backdropFilter: 'blur(12px)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(4),
  animation: `${fadeIn} 0.6s ease-out`
}));

const EmotionalTimeline = styled(Box)({
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    left: '24px',
    top: 0,
    height: '100%',
    width: '2px',
    background: 'linear-gradient(to bottom, #4ECDC4, #FF6B6B)'
  }
});

const EmotionDiary = () => {
  const [entries, setEntries] = useState([]);

  const addEntry = (newEntry) => {
    setEntries((prev) => [...prev, newEntry]);
  };

  useEffect(() => {
    const saved = localStorage.getItem("emotionDiary");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("emotionDiary", JSON.stringify(entries));
  }, [entries]);

  return (
    <DashboardContainer>
      <Typography variant="h3" sx={{
        mb: 4,
        fontWeight: 900,
        background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center'
      }}>
        Mi Evolución Emocional
      </Typography>

      <GlassPanel>
        <EmotionEntryForm onAddEntry={addEntry} />
      </GlassPanel>

      {entries.length > 0 && (
        <GlassPanel>
          <EmotionalTimeline>
            <EmotionSummary entries={entries} />
          </EmotionalTimeline>
          
          <Box sx={{
            mt: 4,
            padding: 3,
            borderRadius: '16px',
            background: 'rgba(245, 245, 245, 0.6)',
            textAlign: 'center'
          }}>
            <Typography variant="body1" color="textSecondary">
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              {entries.length} registro{entries.length > 1 ? 's' : ''} emocionales
            </Typography>
          </Box>
        </GlassPanel>
      )}

      {entries.length === 0 && (
        <GlassPanel sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h6" color="textSecondary">
            Comienza tu viaje emocional - tu primer registro creará un hermoso mapa mental
          </Typography>
        </GlassPanel>
      )}
    </DashboardContainer>
  );
};

export default EmotionDiary;