# Telegram Stars - Complete Payment Guide

**Status**: ⭐ Official Telegram Native Currency (Bot API 10.2)  
**Recommended**: Yes - Preferred over traditional payments  
**Setup Time**: 5 minutes  
**Commission**: Telegram takes 30%

---

## 🌟 What are Telegram Stars?

Telegram Stars (XTR) is Telegram's **native in-app currency**:
- Users buy Stars with real money via their Telegram payment method
- Bots receive Stars for goods/services
- Stars can be withdrawn or used in Telegram ecosystem
- No payment processor integration needed
- Works in 200+ countries
- Anonymous - no payment card data exposure

---

## 💰 Key Advantages

✅ **Easy Setup** - No provider token needed  
✅ **Global Coverage** - Works everywhere Telegram works  
✅ **Safe** - No card data exposure to bots  
✅ **Native UI** - Feels like part of Telegram  
✅ **Fast** - Instant confirmation  
✅ **Refundable** - Refund API available  
✅ **Viral** - Users already have Stars  
✅ **Bot Friendly** - Perfect for bots  

---

## 🚀 Implementation

### Step 1: Send Invoice (Node.js)

```javascript
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Send invoice for 100 Stars
bot.sendInvoice(chatId, {
  title: 'Premium Access',
  description: 'Unlock all premium features for 30 days',
  payload: 'premium_monthly_123', // Unique ID for tracking
  currency: 'XTR', // ⭐ Telegram Stars
  prices: [
    { label: 'Premium 30 days', amount: 100 } // 100 Stars
  ],
  provider_token: '', // ⭐ EMPTY for Stars - important!
  send_phone_number_to_provider: false,
  send_email_to_provider: false
});
```

### Step 2: Handle Pre-Checkout (Optional Verification)

```javascript
// This is called when user clicks "Pay"
// You can validate the payment here
bot.on('pre_checkout_query', async (query) => {
  const chatId = query.from.id;
  const invoicePayload = query.invoice_payload;
  
  // Optional: Validate order
  const isValid = await validateOrder(invoicePayload);
  
  if (isValid) {
    // Confirm payment can proceed
    await bot.answerPreCheckoutQuery(query.id, true);
  } else {
    // Reject payment
    await bot.answerPreCheckoutQuery(query.id, false, {
      error_message: 'Order no longer available'
    });
  }
});
```

### Step 3: Handle Successful Payment

```javascript
bot.on('successful_payment', async (msg) => {
  const payment = msg.successful_payment;
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  console.log('✅ Payment received!');
  console.log(`User: ${userId}`);
  console.log(`Stars: ${payment.total_amount}`);
  console.log(`Telegram ID: ${payment.telegram_payment_charge_id}`);
  
  // Save to database
  await savePayment({
    userId,
    amount: payment.total_amount,
    currency: payment.currency, // 'XTR'
    payload: payment.invoice_payload,
    telegramChargeId: payment.telegram_payment_charge_id
  });
  
  // Activate premium
  await activatePremium(userId, 30); // 30 days
  
  // Confirm to user
  await bot.sendMessage(chatId, 
    '🎉 <b>Payment Successful!</b>\n\n' +
    `You've purchased 100 Stars!\n` +
    `Premium activated for 30 days.`,
    { parse_mode: 'HTML' }
  );
});
```

### Step 4: Refund Payment (If Needed)

```javascript
// Refund is simple with Stars
async function refundStars(userId, telegramChargeId) {
  try {
    const result = await bot.refundStarPayment(
      userId,
      telegramChargeId
    );
    
    if (result === true) {
      console.log('✅ Refund successful');
      await removeUserPremium(userId);
      return true;
    }
  } catch (error) {
    console.error('❌ Refund failed:', error.message);
    return false;
  }
}

// Usage
bot.onText(/\/refund/, async (msg) => {
  const userId = msg.from.id;
  
  // Get last payment
  const payment = await getLastPayment(userId);
  
  if (!payment) {
    await bot.sendMessage(msg.chat.id, 'No payment found to refund');
    return;
  }
  
  const success = await refundStars(userId, payment.telegramChargeId);
  
  if (success) {
    await bot.sendMessage(msg.chat.id, '✅ Refund processed!');
  } else {
    await bot.sendMessage(msg.chat.id, '❌ Refund failed');
  }
});
```

---

## 🐍 Implementation (Python)

```python
from telegram import Update, LabeledPrice
from telegram.ext import Application, CommandHandler, PreCheckoutQueryHandler, MessageHandler, filters, ContextTypes

async def buy_premium(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send payment invoice for premium"""
    
    await context.bot.send_invoice(
        chat_id=update.effective_chat.id,
        title='Premium Access',
        description='Unlock all premium features for 30 days',
        payload='premium_monthly_123',
        currency='XTR',  # Telegram Stars
        prices=[LabeledPrice(label='Premium 30 days', amount=100)],
        # provider_token is NOT needed for Stars!
    )

async def precheckout_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Answer pre-checkout query"""
    query = update.pre_checkout_query
    
    # Optional: Validate
    is_valid = await validate_order(query.invoice_payload)
    
    if is_valid:
        await query.answer(ok=True)
    else:
        await query.answer(ok=False, error_message='Order invalid')

async def successful_payment_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Successful payment callback"""
    payment = update.message.successful_payment
    user_id = update.effective_user.id
    chat_id = update.effective_chat.id
    
    print(f'✅ Payment received: {payment.total_amount} XTR from {user_id}')
    
    # Save payment
    await save_payment({
        'user_id': user_id,
        'amount': payment.total_amount,
        'currency': payment.currency,
        'charge_id': payment.telegram_payment_charge_id
    })
    
    # Activate premium
    await activate_premium(user_id, 30)
    
    # Notify user
    await context.bot.send_message(
        chat_id,
        '🎉 <b>Payment Successful!</b>\n\nPremium activated for 30 days.',
        parse_mode='HTML'
    )

# Refund
async def refund_stars(context: ContextTypes.DEFAULT_TYPE, user_id: int, charge_id: str):
    """Refund Stars payment"""
    try:
        result = await context.bot.refund_star_payment(user_id, charge_id)
        print(f'✅ Refund successful')
        return True
    except Exception as e:
        print(f'❌ Refund failed: {e}')
        return False

# Setup handlers
app = Application.builder().token('BOT_TOKEN').build()
app.add_handler(CommandHandler('buy', buy_premium))
app.add_handler(PreCheckoutQueryHandler(precheckout_callback))
app.add_handler(MessageHandler(filters.SUCCESSFUL_PAYMENT, successful_payment_callback))
```

---

## 📊 Payment Models with Stars

### Model 1: Simple One-Time Purchase

```javascript
// Buy feature once
bot.command('buy_feature', (msg) => {
  bot.sendInvoice(msg.chat.id, {
    title: 'Feature: Advanced Analytics',
    description: 'Get detailed analytics for your account',
    payload: 'feature_analytics',
    currency: 'XTR',
    prices: [{ label: 'Analytics', amount: 50 }],
    provider_token: ''
  });
});
```

### Model 2: Subscription

```javascript
// Monthly subscription
bot.command('subscribe', (msg) => {
  bot.sendInvoice(msg.chat.id, {
    title: 'Premium Monthly',
    description: 'Unlimited access for 30 days',
    payload: `subscription_monthly_${Date.now()}`,
    currency: 'XTR',
    prices: [{ label: 'Premium', amount: 100 }],
    provider_token: '',
    send_phone_number_to_provider: false
  });
});

// Auto-renew logic
bot.on('successful_payment', async (msg) => {
  const payload = msg.successful_payment.invoice_payload;
  
  if (payload.includes('subscription')) {
    // Set auto-renew timer
    setTimeout(() => {
      // Notify user about renewal
      bot.sendMessage(msg.chat.id, 
        '💳 Your premium will renew in 3 days. Use /cancel_renewal to stop.'
      );
    }, 27 * 24 * 60 * 60 * 1000); // 27 days
  }
});
```

### Model 3: Tiered Pricing

```javascript
bot.command('premium', (msg) => {
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Basic (50⭐)', callback_data: 'buy_basic' }],
        [{ text: 'Pro (100⭐)', callback_data: 'buy_pro' }],
        [{ text: 'Max (200⭐)', callback_data: 'buy_max' }]
      ]
    }
  };
  
  bot.sendMessage(msg.chat.id, '📦 Choose your plan:', keyboard);
});

bot.on('callback_query', async (query) => {
  const plans = {
    'buy_basic': { amount: 50, days: 7, name: 'Basic' },
    'buy_pro': { amount: 100, days: 30, name: 'Pro' },
    'buy_max': { amount: 200, days: 90, name: 'Max' }
  };
  
  const plan = plans[query.data];
  if (!plan) return;
  
  await bot.answerCallbackQuery(query.id);
  
  await bot.sendInvoice(query.from.id, {
    title: `${plan.name} Plan`,
    description: `Unlock ${plan.name} features for ${plan.days} days`,
    payload: `${query.data}_${Date.now()}`,
    currency: 'XTR',
    prices: [{ label: plan.name, amount: plan.amount }],
    provider_token: ''
  });
});
```

### Model 4: Donation/Tip

```javascript
bot.command('donate', (msg) => {
  const amounts = [10, 50, 100, 500];
  const buttons = amounts.map(amount => 
    [{ text: `${amount}⭐`, callback_data: `donate_${amount}` }]
  );
  
  bot.sendMessage(msg.chat.id, 
    '💖 Support us with a tip!\n\nAny amount helps!',
    { reply_markup: { inline_keyboard: buttons } }
  );
});

bot.on('callback_query', async (query) => {
  if (!query.data.startsWith('donate_')) return;
  
  const amount = parseInt(query.data.split('_')[1]);
  await bot.answerCallbackQuery(query.id);
  
  await bot.sendInvoice(query.from.id, {
    title: '💖 Donation',
    description: 'Thank you for supporting us!',
    payload: `donation_${amount}_${Date.now()}`,
    currency: 'XTR',
    prices: [{ label: 'Donation', amount }],
    provider_token: ''
  });
});
```

---

## 📈 Star Pricing Guide

| Amount | Use Case | Good For |
|--------|----------|----------|
| **10-50⭐** | Tips, small features | Quick purchases |
| **50-100⭐** | Monthly premium | Subscriptions |
| **100-500⭐** | Annual plans | Serious commitment |
| **500-1000⭐** | Lifetime access | Major features |
| **1000+⭐** | High-value items | Exclusive content |

---

## 🔍 Monitoring Payments

### Get Star Transactions

```javascript
// Get bot's transaction history
bot.command('transactions', async (msg) => {
  try {
    const transactions = await bot.getStarTransactions(
      offset = 0,
      limit = 10
    );
    
    console.log(`Bot has received ${transactions.transactions.length} recent transactions`);
    
    transactions.transactions.forEach(tx => {
      console.log(`✅ ${tx.amount}⭐ from user ${tx.user.id}`);
      console.log(`   Date: ${new Date(tx.date * 1000).toISOString()}`);
    });
    
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
  }
});
```

### Track Lifetime Revenue

```javascript
// Calculate lifetime earnings
async function getLifetimeRevenue(bot) {
  let totalStars = 0;
  let offset = 0;
  const limit = 100;
  
  while (true) {
    const result = await bot.getStarTransactions(offset, limit);
    
    if (!result.transactions || result.transactions.length === 0) break;
    
    totalStars += result.transactions.reduce((sum, tx) => sum + tx.amount, 0);
    
    if (result.transactions.length < limit) break;
    offset += limit;
  }
  
  return totalStars;
}

// Usage
const revenue = await getLifetimeRevenue(bot);
console.log(`💰 Total revenue: ${revenue}⭐ (≈ $${(revenue * 0.00002).toFixed(2)})`);
```

---

## ⚠️ Important Notes

### Provider Token

```javascript
// ❌ WRONG - Don't include provider_token for Stars
bot.sendInvoice(chatId, {
  provider_token: 'YOUR_STRIPE_KEY',  // ❌ Wrong
  currency: 'XTR'
});

// ✅ CORRECT - Leave provider_token empty
bot.sendInvoice(chatId, {
  provider_token: '',  // ✅ Correct
  currency: 'XTR'
});
```

### One Price Item Only

```javascript
// ❌ WRONG - Multiple prices not allowed for Stars
prices: [
  { label: 'Item 1', amount: 50 },
  { label: 'Item 2', amount: 50 }
]

// ✅ CORRECT - Single price
prices: [
  { label: 'Total', amount: 100 }
]
```

### Minimum Amount

```javascript
// ❌ Too small - minimum is ~1 Star
prices: [{ label: 'Item', amount: 0 }]

// ✅ Proper minimum
prices: [{ label: 'Item', amount: 1 }]
```

---

## 🔐 Security

```javascript
// Always verify the charge ID
bot.on('successful_payment', async (msg) => {
  const payment = msg.successful_payment;
  
  // Verify it's a real charge
  if (!payment.telegram_payment_charge_id) {
    console.error('⚠️ Invalid payment: missing charge ID');
    return;
  }
  
  // Idempotency: Check if already processed
  const existing = await getPaymentByChargeId(
    payment.telegram_payment_charge_id
  );
  
  if (existing) {
    console.log('⚠️ Duplicate payment detected, skipping');
    return;
  }
  
  // Process payment
  await processPayment(msg.from.id, payment);
});
```

---

## 📊 Best Practices

✅ **Use invoice payload** for tracking orders  
✅ **Verify before processing** - Check charge IDs  
✅ **Store charge IDs** - For refunds/support  
✅ **Notify users** - Confirm payment with receipt  
✅ **Handle failures** - Gracefully manage errors  
✅ **Monitor revenue** - Track earnings  
✅ **Refund quickly** - Process refunds promptly  
✅ **Try different prices** - A/B test amounts  
✅ **Combine models** - Mix purchases & subscriptions  
✅ **Add value** - Make premiums worth it  

---

## 💬 Testing

```javascript
// Test mode (development)
if (process.env.NODE_ENV === 'development') {
  // Use test amounts
  const testAmount = 1; // Minimum for testing
  
  console.log(`🧪 Sending test invoice for ${testAmount}⭐`);
  // Don't actually charge in dev mode
}

// In real bot
if (process.env.NODE_ENV === 'production') {
  // Real amounts
  const realAmount = 100;
  // Actually charge
}
```

---

## 📞 Support

For issues:
1. Check [Telegram Bot API docs](https://core.telegram.org/bots/api#sendInvoice)
2. Verify `provider_token` is empty
3. Check `currency` is 'XTR'
4. Ensure `prices` array has exactly 1 item
5. Contact [@BotSupport](https://t.me/BotSupport)

---

**Status**: ⭐ Full Bot API 10.2 Support  
**Last Updated**: July 15, 2026  
**Testing**: Recommended before production
