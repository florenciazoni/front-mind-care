import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { 
  Box, 
  Typography, 
  keyframes, 
  styled, 
  LinearProgress,
  useTheme
} from "@mui/material";
import "chart.js/auto";
import { Mood, SentimentDissatisfied, EmojiEmotions } from '@mui/icons-material';

const getTempUserId = () => localStorage.getItem("tempUserId");

const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const GlassChartContainer = styled(Box)(({ theme }) => ({
  background: `rgba(255, 255, 255, 0.85)`,
  backdropFilter: 'blur(12px)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  position: 'relative',
  overflow: 'hidden'
}));

const EmotionIconWrapper = styled(Box)(() => ({
  position: 'absolute',
  animation: `${floating} 6s infinite ease-in-out`,
  opacity: 0.1,
  zIndex: 0
}));

const emotionGradients = {
  positive: ['#4ECDC4', '#45B7AF'],
  neutral: ['#FFD700', '#FFC400'],
  negative: ['#FF6B6B', '#FF5757']
};

const EmotionChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getTempUserId();
        const response = await axios.get(`https://backend-mind-care.onrender.com/api/sentiments/${userId}`);
        
        // Debug: Verificar datos crudos
        console.log("Datos de API:", response.data);
  
        const emotions = response.data.reduce((acc, item) => {
          const type = item._id.toLowerCase();
          acc[type] = (acc[type] || 0) + item.count;
          return acc;
        }, {});
  
        // Validar y estructurar emociones
        const validatedEmotions = {
          positive: emotions.positive || 0,
          neutral: emotions.neutral || 0,
          negative: emotions.negative || 0
        };
  
        const labels = Object.keys(validatedEmotions);
        const values = Object.values(validatedEmotions);
  
        // Debug: Verificar estructura procesada
        console.log("Emociones procesadas:", validatedEmotions);
  
        setChartData({
          labels,
          datasets: [{
            label: "Intensidad Emocional",
            data: values,
            backgroundColor: labels.map(label => {
              const gradient = emotionGradients[label] || ['#CCCCCC', '#999999'];
              return `linear-gradient(45deg, ${gradient[0]}, ${gradient[1]})`;
            }),
            borderWidth: 0,
            borderRadius: 12,
            barThickness: 40,
            hoverBackgroundColor: labels.map(label => {
              const gradient = emotionGradients[label] || ['#999999', '#666666'];
              return `linear-gradient(45deg, ${gradient[1]}, ${gradient[0]})`;
            }),
          }]
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setChartData({ labels: [], datasets: [] });
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const getIconForEmotion = (emotion) => {
    const icons = {
      positive: <EmojiEmotions sx={{ fontSize: 60 }} />,
      neutral: <SentimentDissatisfied sx={{ fontSize: 60 }} />,
      negative: <Mood sx={{ fontSize: 60 }} />
    };
    return icons[emotion.toLowerCase()] || <EmojiEmotions />;
  };

  return (
    <GlassChartContainer>
      {/* Iconos decorativos */}
      <EmotionIconWrapper sx={{ top: 20, left: 20 }}>
        {getIconForEmotion('positive')}
      </EmotionIconWrapper>
      <EmotionIconWrapper sx={{ top: 20, right: 20 }}>
        {getIconForEmotion('neutral')}
      </EmotionIconWrapper>
      <EmotionIconWrapper sx={{ bottom: 20, left: '50%' }}>
        {getIconForEmotion('negative')}
      </EmotionIconWrapper>

      <Typography variant="h4" sx={{
        mb: 4,
        fontWeight: 700,
        background: 'linear-gradient(45deg, #4ECDC4 30%, #FF6B6B 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        Panorama Emocional
      </Typography>

      {loading ? (
        <LinearProgress sx={{ height: 8, borderRadius: 4 }} />
      ) : (
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  bodyColor: theme.palette.text.primary,
                  titleColor: theme.palette.primary.main,
                  boxPadding: 10,
                  bodyFont: { weight: 'bold' },
                  callbacks: {
                    label: (context) => `${context.raw} registros`
                  }
                }
              },
              scales: {
                y: {
                  grid: { color: 'rgba(0, 0, 0, 0.05)' },
                  ticks: { color: theme.palette.text.secondary }
                },
                x: {
                  grid: { display: false },
                  ticks: { 
                    color: theme.palette.text.primary,
                    font: { weight: 'bold' }
                  }
                }
              },
              animation: {
                duration: 2000,
                easing: 'easeOutQuart'
              }
            }}
            height={400}
          />
        </Box>
      )}

      <Box sx={{ 
        mt: 4,
        display: 'flex',
        justifyContent: 'center',
        gap: 4,
        flexWrap: 'wrap'
      }}>
        {Object.entries(emotionGradients).map(([emotion, [color1, color2]]) => (
          <Box key={emotion} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${color1}, ${color2})`
            }} />
            <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
              {emotion}
            </Typography>
          </Box>
        ))}
      </Box>
    </GlassChartContainer>
  );
};

export default EmotionChart;