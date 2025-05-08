import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Avatar, 
  Typography, 
  keyframes,
  styled,
  Chip,
  Slide,
  Fade
} from '@mui/material';
import { Send, SmartToy, Mood, SentimentNeutral, MoodBad } from '@mui/icons-material';
import { sendMessage } from '../api/chat';

const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const ChatContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  height: '70vh',
  margin: 'auto',
  borderRadius: '24px',
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[10],
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
}));

const MessageBubble = styled(Box)(({ theme, sender }) => ({
  maxWidth: '70%',
  padding: '12px 16px',
  borderRadius: sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
  background: sender === 'user' 
    ? theme.palette.primary.main 
    : theme.palette.secondary.light,
  color: sender === 'user' ? '#fff' : theme.palette.text.primary,
  alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
  margin: '8px 16px',
  wordBreak: 'break-word',
  position: 'relative',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)'
  }
}));

const SentimentIcon = ({ sentiment }) => {
  const icons = {
    positive: <Mood color="success" sx={{ fontSize: 18 }} />,
    neutral: <SentimentNeutral color="warning" sx={{ fontSize: 18 }} />,
    negative: <MoodBad color="error" sx={{ fontSize: 18 }} />
  };
  return icons[sentiment] || null;
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsBotTyping(true);

    try {
      const response = await sendMessage(input);
      const botMessage = { 
        text: response.text, 
        sender: "bot", 
        sentiment: response.sentiment 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "Lo siento, estoy teniendo problemas para responder ahora", 
        sender: "bot" 
      }]);
    }
    setIsBotTyping(false);
  };

  return (
    <ChatContainer>
      <Box bgcolor="primary.main" p={2} display="flex" alignItems="center">
        <Avatar sx={{ 
          bgcolor: 'white', 
          mr: 2, 
          animation: `${floating} 4s infinite` 
        }}>
          <SmartToy color="primary" />
        </Avatar>
        <Typography variant="h6" color="white">
          Asistente Emocional
        </Typography>
      </Box>

      <Box flex={1} overflow="auto" p={2}>
        {messages.map((msg, index) => (
          <Fade in key={index} timeout={500}>
            <MessageBubble sender={msg.sender}>
              {msg.text}
              {msg.sentiment && (
                <Chip
                  size="small"
                  icon={<SentimentIcon sentiment={msg.sentiment} />}
                  label={msg.sentiment}
                  sx={{ 
                    mt: 1,
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'inherit'
                  }}
                />
              )}
            </MessageBubble>
          </Fade>
        ))}
        {isBotTyping && (
          <MessageBubble sender="bot">
            <Box display="flex">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Box>
          </MessageBubble>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box p={2} display="flex" gap={1} bgcolor="background.default">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              background: 'white'
            }
          }}
        />
        <IconButton 
          color="primary" 
          onClick={handleSend}
          sx={{ 
            alignSelf: 'center',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'rotate(-30deg) scale(1.1)'
            }
          }}
        >
          <Send fontSize="large" />
        </IconButton>
      </Box>
    </ChatContainer>
  );
};

export default Chatbot;
