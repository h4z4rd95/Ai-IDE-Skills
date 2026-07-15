# Telegram Bot API 10.2 Changelog

**Release Date**: July 14, 2026

## Major Updates

### 1. Rich Text Messages

**Added**: New rich text classes for highly formatted messages with tables, structured layouts, and advanced formatting.

#### New Classes
- `RichTextBold` - Bold text formatting
- `RichTextItalic` - Italic text formatting
- `RichTextUnderline` - Underlined text
- `RichTextStrikethrough` - Strikethrough text
- `RichTextCode` - Monospace code
- `RichTextPre` - Code block
- `RichTextLink` - Clickable links
- `RichBlockTable` - Table blocks
- `RichBlockTableCell` - Table cells with content

#### Usage Example
```javascript
const richMessage = {
  type: 'RichTextBold',
  text: 'Bold heading'
};

bot.sendMessage(chatId, 'Message with rich formatting', {
  parse_mode: 'HTML',
  text_entities: [richMessage]
});
```

### 2. Ephemeral Messages

**Added**: Send messages visible only to a specific user in group chats and topics.

#### New Parameter
- `ephemeral_message_id` - Makes message visible only to the specified user

#### Usage Example
```javascript
bot.sendMessage(chatId, 'This message is only for you!', {
  message_thread_id: topicId,
  ephemeral: true,
  ephemeral_user_id: userId
});
```

#### Use Cases
- Admin notifications to specific mods
- Private hints in public groups
- Personalized error messages
- Secret Easter eggs

### 3. Communities Support

**Added**: Full support for Telegram Communities (linked supergroups/channels around shared topics).

#### New Fields on Chat
- `is_community` - True if chat is a community
- `accent_color_id` - Community accent color
- `profile_accent_color_id` - Profile accent color
- `profile_background_custom_emoji_id` - Background emoji
- `business_start_page` - Business account start page

#### Community-Specific Methods
```javascript
// Get community structure
const community = await bot.getChat(communityId);
console.log(community.is_community); // true

// Get linked chats
const linkedChats = await bot.getLinkedChats(communityId);

// Send to community
await bot.sendMessage(communityId, 'Community announcement');
```

### 4. Business Account Enhancements

**Added**: Expanded business connectivity and webhook support.

#### New Fields
- `business_phone_number_info` - Business phone details
- `business_opening_hours` - Operating hours
- `business_description` - Business info
- `business_intro_message` - Intro message for new chats
- `business_location` - Location information

#### New Methods
```javascript
// Connect to business account
await bot.setBotBusinessCourseLink({
  business_connection_id: connId,
  link: 'https://example.com/course'
});

// Get business connection
const conn = await bot.getBusinessConnection(connId);
```

### 5. Enhanced Message Reactions

**Added**: More granular control over message reactions and emoji.

#### New Fields
- `emoji_status_custom_emoji_id` - Custom emoji status
- `emoji_status_expiration_date` - Status expiration
- `available_reactions` - Available reaction list
- `allow_user_chats` - Allow reactions in user chats

#### Usage Example
```javascript
// Set reaction on message
await bot.setMessageReaction(chatId, messageId, {
  reaction: '👍',
  is_big: true
});

// Get reaction list
const reactions = await bot.getAvailableReactions();
```

---

## Breaking Changes

### None in 10.2
No breaking changes from Bot API 10.1. All existing bots remain compatible.

---

## Deprecations

### None in 10.2
No deprecated methods or fields.

---

## New Methods (Summary)

| Method | Purpose |
|--------|----------|
| `setMessageReaction` | React to a message |
| `getAvailableReactions` | Get available reaction list |
| `getLinkedChats` | Get chats linked to a community |
| `getBotBusinessConnection` | Get business connection details |
| `setBotBusinessCourseLink` | Set course/business link |

---

## New Objects (Summary)

| Object | Purpose |
|--------|----------|
| `RichText*` classes | Rich text formatting |
| `RichBlock*` classes | Rich block elements (tables) |
| `BusinessConnection` | Business account connection |
| `EphemeralMessage` | Group-private messages |
| `MessageReaction` | Message reaction info |

---

## Migration Guide from 10.1

### Step 1: Update Libraries
```bash
npm update telegraf grammy node-telegram-bot-api
pip install --upgrade python-telegram-bot aiogram
```

### Step 2: Add New Features Gradually

Start with rich messages:
```javascript
// Before (still works)
bot.sendMessage(chatId, '<b>Bold</b> text', { parse_mode: 'HTML' });

// After (new rich API)
bot.sendMessage(chatId, 'Message', {
  text_entities: [{ type: 'bold', offset: 0, length: 4 }]
});
```

### Step 3: Test Thoroughly
Ephemeral messages and communities may have unexpected behavior if not tested properly.

### Step 4: Update Documentation
Update your bot's help text to mention new features.

---

## Performance Notes

- **Rich messages** may be slower to render on older Telegram clients
- **Ephemeral messages** add small overhead (per-user rendering)
- **Community chats** may have higher latency for large linked groups

---

## Known Issues & Workarounds

### Issue: Ephemeral messages not showing on Web
**Status**: Known, being fixed by Telegram  
**Workaround**: Use regular messages for web users, ephemeral for mobile

### Issue: Rich text rendering inconsistent across clients
**Status**: Known  
**Workaround**: Test on desktop, mobile, and web clients

---

## Official Resources

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [Bot API Changelog](https://core.telegram.org/bots/api-changelog)
- [Community Forums](https://t.me/botnewsgroup)

---

**Version**: 10.2  
**Last Updated**: July 15, 2026
