import React, { useState } from "react";
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Grid, 
  IconButton, 
  keyframes, 
  styled 
} from "@mui/material";
import {
  SentimentSatisfiedAlt,
  MoodBad,
  SentimentDissatisfied,
  EmojiEmotions,
  SelfImprovement,
  Bolt
} from '@mui/icons-material';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const EmotionCard = styled(Box)(({ selected, color }) => ({
  border: `2px solid ${selected ? color : '#e0e0e0'}`,
  borderRadius: '16px',
  padding: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  background: selected ? `${color}10` : 'white',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 8px 24px ${color}30`
  }
}));

const emotionConfig = {
  Feliz: { color: '#FFD700', icon: <EmojiEmotions fontSize="large" /> },
  Triste: { color: '#2196F3', icon: <SentimentDissatisfied fontSize="large" /> },
  Ansioso: { color: '#FF5722', icon: <MoodBad fontSize="large" /> },
  Enojado: { color: '#F44336', icon: <SentimentDissatisfied fontSize="large" /> },
  Calmo: { color: '#4CAF50', icon: <SelfImprovement fontSize="large" /> },
  Motivado: { color: '#9C27B0', icon: <Bolt fontSize="large" /> }
};

const EmotionEntryForm = ({ onAddEntry }) => {
  const [emotion, setEmotion] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!emotion) return;
    
    const entry = {
      date: new Date().toISOString().split("T")[0],
      emotion,
      note,
      color: emotionConfig[emotion].color
    };

    onAddEntry(entry);
    setEmotion("");
    setNote("");
  };

  return (
    <Box sx={{
      maxWidth: '800px',
      margin: 'auto',
      p: 4,
      borderRadius: '24px',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <Typography variant="h4" sx={{
        mb: 3,
        fontWeight: 700,
        background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Registro Emocional Diario
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {Object.keys(emotionConfig).map((emo) => (
          <Grid item xs={6} md={4} key={emo}>
            <EmotionCard
              selected={emotion === emo}
              color={emotionConfig[emo].color}
              onClick={() => setEmotion(emo)}
            >
              <Box sx={{ 
                color: emotion === emo ? emotionConfig[emo].color : 'text.secondary',
                textAlign: 'center'
              }}>
                {React.cloneElement(emotionConfig[emo].icon, {
                  sx: { fontSize: '2.5rem', mb: 1 }
                })}
                <Typography variant="subtitle1">{emo}</Typography>
              </Box>
            </EmotionCard>
          </Grid>
        ))}
      </Grid>

      <TextField
        label="📝 Cuéntame más sobre tu día..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        multiline
        rows={4}
        fullWidth
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            '&:hover fieldset': {
              borderColor: emotion ? emotionConfig[emotion].color : '#90caf9'
            }
          }
        }}
        InputProps={{
          endAdornment: (
            <Typography variant="caption" color="textSecondary">
              {note.length}/200
            </Typography>
          )
        }}
        inputProps={{ maxLength: 200 }}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!emotion}
        sx={{
          py: 1.5,
          px: 4,
          borderRadius: '12px',
          fontSize: '1.1rem',
          background: 'linear-gradient(45deg, #4ECDC4 30%, #45B7AF 90%)',
          '&:hover': {
            animation: `${pulse} 1s infinite`,
            background: 'linear-gradient(45deg, #45B7AF 30%, #3DA89F 90%)'
          }
        }}
      >
        Guardar Entrada
      </Button>
    </Box>
  );
};

export default EmotionEntryForm;
