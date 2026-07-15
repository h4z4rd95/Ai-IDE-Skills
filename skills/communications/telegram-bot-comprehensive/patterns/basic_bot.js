/**
 * Basic Telegram Bot
 * 
 * This is the simplest possible Telegram bot.
 * It responds to /start and /help commands, and echoes any message.
 * 
 * Setup:
 * 1. npm install node-telegram-bot-api dotenv
 * 2. Create .env with BOT_TOKEN=your_token
 * 3. node basic_bot.js
 */

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('❌ BOT_TOKEN not found in .env');
  process.exit(1);
}

// Create bot instance
const bot = new TelegramBot(token, { polling: true });

console.log('✅ Bot started. Waiting for messages...');

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;
  
  bot.sendMessage(chatId, 
    `👋 Hello ${firstName}!\n\nI'm a simple bot. Send me anything and I'll echo it back!\n\nUse /help for more info.`,
    { parse_mode: 'HTML' }
  );
});

// /help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId,
    '<b>Available Commands:</b>\n' +
    '/start - Start the bot\n' +
    '/help - Show this help\n\n' +
    '<b>Just send me any message and I\'ll echo it back!</b>',
    { parse_mode: 'HTML' }
  );
});

// Echo all other messages
bot.on('message', (msg) => {
  // Skip if it's a command
  if (msg.text && msg.text.startsWith('/')) {
    return;
  }
  
  const chatId = msg.chat.id;
  const userMessage = msg.text || '(no text)';
  
  bot.sendMessage(chatId, `You said: <b>${userMessage}</b>`, { parse_mode: 'HTML' });
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
