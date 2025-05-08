import { AppBar, Toolbar, Typography, IconButton, Box, keyframes, styled } from "@mui/material";
import { Brightness4, Brightness7, PsychologyAlt } from "@mui/icons-material";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0px); }
`;

const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: `rgba(${theme.palette.mode === 'dark' ? '0, 0, 0' : '255, 255, 255'}, 0.7)`,
  backdropFilter: 'blur(12px)',
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const FloatingTitle = styled(Typography)({
  animation: `${float} 4s ease-in-out infinite`,
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
});

const ThemeButton = styled(IconButton)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    background: theme.palette.mode === 'dark' ? 
      'rgba(255, 255, 255, 0.1)' : 
      'rgba(0, 0, 0, 0.1)'
  }
}));

const Navbar = ({ mode, toggleTheme }) => {
  return (
    <GlassAppBar position="sticky">
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        py: 1,
        px: { xs: 2, md: 4 }
      }}>
        <Box display="flex" alignItems="center" gap={2}>
          <PsychologyAlt sx={{ 
            fontSize: 32,
            color: mode === 'dark' ? '#21CBF3' : '#2196F3'
          }} />
          <FloatingTitle variant="h6">
            MindCare
          </FloatingTitle>
        </Box>
        
        <Box display="flex" alignItems="center" gap={1}>
          <ThemeButton color="inherit" onClick={toggleTheme}>
            {mode === "dark" ? 
              <Brightness7 sx={{ fontSize: 28 }} /> : 
              <Brightness4 sx={{ fontSize: 28 }} />}
          </ThemeButton>
        </Box>
      </Toolbar>
    </GlassAppBar>
  );
};

export default Navbar;

