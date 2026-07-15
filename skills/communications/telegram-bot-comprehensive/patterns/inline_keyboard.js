/**
 * Telegram Bot with Inline Keyboards
 * 
 * This bot demonstrates interactive buttons and callback queries.
 * Users can click buttons to trigger actions.
 * 
 * Setup:
 * 1. npm install node-telegram-bot-api dotenv
 * 2. Create .env with BOT_TOKEN=your_token
 * 3. node inline_keyboard.js
 */

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('❌ BOT_TOKEN not found in .env');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

console.log('✅ Bot started. Use /menu to see buttons.');

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome! Use /menu to see interactive buttons.');
});

// Menu command with inline buttons
bot.onText(/\/menu/, (msg) => {
  const chatId = msg.chat.id;
  
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '✅ Yes', callback_data: 'yes' },
          { text: '❌ No', callback_data: 'no' }
        ],
        [
          { text: '🌐 Visit Website', url: 'https://example.com' },
          { text: '📱 Open App', web_app: { url: 'https://app.example.com' } }
        ],
        [
          { text: '📊 Stats', callback_data: 'stats' },
          { text: '⚙️ Settings', callback_data: 'settings' }
        ],
        [
          { text: '🔙 Back', callback_data: 'back' }
        ]
      ]
    }
  };
  
  bot.sendMessage(chatId, '🎯 <b>Choose an option:</b>', {
    parse_mode: 'HTML',
    reply_markup: options.reply_markup
  });
});

// Handle button clicks
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const data = query.data;
  
  try {
    // Always answer the callback query to remove loading state
    await bot.answerCallbackQuery(query.id);
    
    switch (data) {
      case 'yes':
        await bot.editMessageText('You chose: <b>Yes</b> ✅', {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'HTML'
        });
        break;
      
      case 'no':
        await bot.editMessageText('You chose: <b>No</b> ❌', {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'HTML'
        });
        break;
      
      case 'stats':
        await bot.editMessageText(
          '<b>📊 Your Statistics:</b>\n' +
          'Messages sent: 42\n' +
          'Commands used: 15\n' +
          'Days active: 7',
          {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'HTML'
          }
        );
        break;
      
      case 'settings':
        await bot.editMessageText(
          '<b>⚙️ Settings:</b>\n' +
          '• Notifications: <code>ON</code>\n' +
          '• Language: <code>EN</code>\n' +
          '• Theme: <code>Dark</code>',
          {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'HTML'
          }
        );
        break;
      
      case 'back':
        // Show menu again
        const options = {
          reply_markup: {
            inline_keyboard: [
              [
                { text: '✅ Yes', callback_data: 'yes' },
                { text: '❌ No', callback_data: 'no' }
              ],
              [
                { text: '📊 Stats', callback_data: 'stats' },
                { text: '⚙️ Settings', callback_data: 'settings' }
              ]
            ]
          }
        };
        
        await bot.editMessageText('🎯 <b>Choose an option:</b>', {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'HTML',
          reply_markup: options.reply_markup
        });
        break;
    }
  } catch (error) {
    console.error('❌ Error handling callback:', error);
    await bot.answerCallbackQuery(query.id, { 
      text: 'An error occurred', 
      show_alert: true 
    });
  }
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
