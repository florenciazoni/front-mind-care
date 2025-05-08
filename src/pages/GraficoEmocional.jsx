import { Container, Typography, Paper, Box } from '@mui/material';
import EmotionChart from '../components/EmotionChart';

const GraficoEmocional = () => (
  <Container>
    <Box textAlign="center" mt={4}>
      <Typography variant="h4" gutterBottom>Grafico Emocional de los últimos 7 dias de la semana </Typography>
      <Paper elevation={3} sx={{ p: 2, mt: 2, borderRadius: 2 }}>
       <EmotionChart/>
      </Paper>
    </Box>
  </Container>
);

export default GraficoEmocional;
