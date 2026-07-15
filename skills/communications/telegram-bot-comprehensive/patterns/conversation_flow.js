/**
 * Telegram Bot with Conversation Flow
 * 
 * This bot implements a multi-step conversation for user registration.
 * It asks for name, age, and email in sequence.
 * 
 * Setup:
 * 1. npm install node-telegram-bot-api dotenv
 * 2. Create .env with BOT_TOKEN=your_token
 * 3. node conversation_flow.js
 */

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('❌ BOT_TOKEN not found in .env');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

// Store conversation state per user
const userState = new Map();

console.log('✅ Bot started. Use /register to start conversation.');

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome! Use /register to create a profile.');
});

// Register command
bot.onText(/\/register/, (msg) => {
  const chatId = msg.chat.id;
  
  // Initialize state
  userState.set(chatId, {
    step: 'ask_name',
    data: {}
  });
  
  bot.sendMessage(chatId, '📝 Let\'s create your profile!\n\nWhat is your name?');
});

// Handle all messages
bot.on('message', async (msg) => {
  // Skip commands
  if (msg.text && msg.text.startsWith('/')) {
    return;
  }
  
  const chatId = msg.chat.id;
  const userInput = msg.text;
  
  // Check if user has active conversation
  if (!userState.has(chatId)) {
    bot.sendMessage(chatId, 'Use /register to start a conversation.');
    return;
  }
  
  const state = userState.get(chatId);
  
  switch (state.step) {
    case 'ask_name':
      // Validate name
      if (userInput.length < 2) {
        bot.sendMessage(chatId, '❌ Name must be at least 2 characters. Try again:');
        return;
      }
      
      state.data.name = userInput;
      state.step = 'ask_age';
      bot.sendMessage(chatId, `✅ Nice to meet you, ${userInput}!\n\nHow old are you?`);
      break;
    
    case 'ask_age':
      // Validate age
      const age = parseInt(userInput);
      if (isNaN(age) || age < 1 || age > 150) {
        bot.sendMessage(chatId, '❌ Please enter a valid age (1-150):');
        return;
      }
      
      state.data.age = age;
      state.step = 'ask_email';
      bot.sendMessage(chatId, `✅ You are ${age} years old.\n\nWhat is your email?`);
      break;
    
    case 'ask_email':
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userInput)) {
        bot.sendMessage(chatId, '❌ Please enter a valid email:');
        return;
      }
      
      state.data.email = userInput;
      state.step = 'complete';
      
      // Summary
      const summary = 
        `<b>✅ Profile Complete!</b>\n\n` +
        `<b>Name:</b> ${state.data.name}\n` +
        `<b>Age:</b> ${state.data.age}\n` +
        `<b>Email:</b> ${state.data.email}\n\n` +
        `Use /register to create another profile.`;
      
      bot.sendMessage(chatId, summary, { parse_mode: 'HTML' });
      
      // Clear state
      userState.delete(chatId);
      break;
  }
  
  // Save state
  userState.set(chatId, state);
});

// Error handling
bot.on('polling_error', (error) => {
  console.error('❌ Polling error:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n✋ Shutting down...');
  bot.stopPolling();
  process.exit(0);
});
