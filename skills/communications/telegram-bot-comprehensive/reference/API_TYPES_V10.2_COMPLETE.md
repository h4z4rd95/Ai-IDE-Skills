# Telegram Bot API v10.2 - Complete Types Reference

**Base Version**: Bot API 10.2 (July 2026)  
**Last Updated**: July 15, 2026  
**Status**: ✅ Complete

---

## 📦 Update & Core Types

### Update

Root object for incoming updates. Contains `update_id` and exactly ONE of:

| Field | Type | Description |
|-------|------|-------------|
| `update_id` | Integer | Unique update ID |
| `message` | Message | New message |
| `edited_message` | Message | Edited message |
| `channel_post` | Message | Channel post |
| `edited_channel_post` | Message | Edited channel post |
| `business_connection` | BusinessConnection | Bot connected/disconnected from business |
| `business_message` | Message | Business message |
| `edited_business_message` | Message | Edited business message |
| `deleted_business_messages` | BusinessMessagesDeleted | Deleted business messages |
| `message_reaction` | MessageReactionUpdated | Reaction changed ⭐ NEW |
| `message_reaction_count` | MessageReactionCountUpdated | Reaction count changed ⭐ NEW |
| `inline_query` | InlineQuery | Inline query received |
| `chosen_inline_result` | ChosenInlineResult | Inline result chosen |
| `callback_query` | CallbackQuery | Button pressed |
| `shipping_query` | ShippingQuery | Shipping requested |
| `pre_checkout_query` | PreCheckoutQuery | Pre-checkout requested |
| `purchased_paid_media` | PaidMediaPurchased | Paid media purchased |
| `poll` | Poll | Poll updated |
| `poll_answer` | PollAnswer | Poll vote changed |
| `my_chat_member` | ChatMemberUpdated | Bot status changed |
| `chat_member` | ChatMemberUpdated | Member status changed |
| `chat_join_request` | ChatJoinRequest | Join request received |
| `chat_boost` | ChatBoostUpdated | Boost added |
| `removed_chat_boost` | ChatBoostRemoved | Boost removed |

---

## 👤 User Type

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Unique identifier |
| `is_bot` | Boolean | True if user is a bot |
| `first_name` | String | First name |
| `last_name` | String | Optional. Last name |
| `username` | String | Optional. Username |
| `language_code` | String | Optional. IETF language tag |
| `is_premium` | Boolean | Optional. Telegram Premium |
| `added_to_attachment_menu` | Boolean | Optional. Added to attachment menu |
| `can_join_groups` | Boolean | Optional. Can be added to groups |
| `can_read_all_group_messages` | Boolean | Optional. Privacy mode disabled |
| `supports_inline_queries` | Boolean | Optional. Inline queries supported |
| `can_connect_to_business` | Boolean | Optional. Can connect to business |
| `has_main_web_app` | Boolean | Optional. Has main Web App |

---

## 💬 Chat Type

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Unique ID (negative for groups) |
| `type` | String | "private", "group", "supergroup", "channel" |
| `title` | String | Optional. Title (groups/supergroups/channels) |
| `username` | String | Optional. Username |
| `first_name` | String | Optional. First name (private chats) |
| `last_name` | String | Optional. Last name (private chats) |
| `is_forum` | Boolean | Optional. True if forum (topic support) |
| `is_community` | Boolean | Optional. True if community ⭐ NEW |

### ChatFullInfo

Extended info from `getChat()`. Includes all Chat fields plus:

| Field | Type | Description |
|-------|------|-------------|
| `photo` | ChatPhoto | Optional. Chat photo |
| `active_usernames` | String[] | Optional. Active usernames |
| `emoji_status_custom_emoji_id` | String | Optional. Custom emoji status |
| `emoji_status_expiration_date` | Integer | Optional. Status expiration date ⭐ NEW |
| `bio` | String | Optional. Bio (private chats) |
| `description` | String | Optional. Description |
| `invite_link` | String | Optional. Primary invite link |
| `pinned_message` | Message | Optional. Pinned message |
| `permissions` | ChatPermissions | Optional. Default permissions |
| `accent_color_id` | Integer | Optional. Accent color ID |
| `profile_accent_color_id` | Integer | Optional. Profile accent color ⭐ NEW |
| `profile_background_custom_emoji_id` | String | Optional. Background emoji ⭐ NEW |
| `background_custom_emoji_id` | String | Optional. Chat background emoji |
| `slow_mode_delay` | Integer | Optional. Slow mode delay (seconds) |
| `linked_chat_id` | Integer | Optional. Linked channel/discussion group |
| `location` | ChatLocation | Optional. Location (location-based groups) |
| `available_reactions` | ReactionType[] | Optional. Allowed reaction types |
| `max_reaction_count` | Integer | Optional. Max reactions per message |
| `business_start_page` | BusinessStartPage | Optional. Business start page ⭐ NEW |
| `business_phone_number_info` | BusinessPhoneNumberInfo | Optional. Business phone ⭐ NEW |
| `business_opening_hours` | BusinessOpeningHours | Optional. Operating hours ⭐ NEW |
| `business_description` | String | Optional. Business description ⭐ NEW |
| `business_intro_message` | BusinessIntroMessage | Optional. Intro message ⭐ NEW |
| `business_location` | BusinessLocation | Optional. Business location ⭐ NEW |

---

## 📨 Message Type

Central type with extensive fields.

### Identification & Metadata

| Field | Type | Description |
|-------|------|-------------|
| `message_id` | Integer | Unique ID within chat |
| `message_thread_id` | Integer | Optional. Forum topic ID |
| `from` | User | Optional. Sender |
| `sender_chat` | Chat | Optional. Sender chat (channels, anonymous admins) |
| `sender_boost_count` | Integer | Optional. Sender's boost count ⭐ NEW |
| `date` | Integer | Unix timestamp |
| `chat` | Chat | Chat the message belongs to |
| `is_topic_message` | Boolean | Optional. Sent in forum topic |
| `is_automatic_forward` | Boolean | Optional. Auto-forwarded to linked group |
| `business_connection_id` | String | Optional. Business connection ID |

### Content

| Field | Type | Description |
|-------|------|-------------|
| `text` | String | Text (0-4096 chars) |
| `entities` | MessageEntity[] | Special entities (bold, links, etc.) |
| `caption` | String | Media caption (0-1024 chars) |
| `caption_entities` | MessageEntity[] | Special entities in caption |

### Reply & Forward

| Field | Type | Description |
|-------|------|-------------|
| `reply_to_message` | Message | Optional. Original message replied to |
| `external_reply` | ExternalReplyInfo | Optional. Reply to message in different chat |
| `quote` | TextQuote | Optional. Quoted part of reply |
| `forward_origin` | MessageOrigin | Optional. Original message for forwarded |
| `link_preview_options` | LinkPreviewOptions | Optional. Link preview settings |

### Media Fields

| Field | Type | Description |
|-------|------|-------------|
| `photo` | PhotoSize[] | Optional. Available photo sizes |
| `video` | Video | Optional. Video |
| `animation` | Animation | Optional. Animation/GIF |
| `audio` | Audio | Optional. Audio file |
| `document` | Document | Optional. General file |
| `voice` | Voice | Optional. Voice message |
| `video_note` | VideoNote | Optional. Video note (circular) |
| `sticker` | Sticker | Optional. Sticker |
| `contact` | Contact | Optional. Shared contact |
| `location` | Location | Optional. Shared location |
| `venue` | Venue | Optional. Venue info |
| `poll` | Poll | Optional. Native poll |
| `dice` | Dice | Optional. Dice animation |
| `game` | Game | Optional. Game |
| `invoice` | Invoice | Optional. Payment invoice |
| `successful_payment` | SuccessfulPayment | Optional. Successful payment |
| `paid_media` | PaidMediaInfo | Optional. Paid media |
| `story` | Story | Optional. Forwarded story |
| `checklist` | Checklist | Optional. Checklist ⭐ NEW |

### Keyboard/Reactions

| Field | Type | Description |
|-------|------|-------------|
| `reply_markup` | InlineKeyboardMarkup | Optional. Inline keyboard |
| `message_reactions` | MessageReactions | Optional. Reactions ⭐ NEW |

---

## 🏷️ MessageEntity (Special Formatting)

| Type | Description | Extra Fields |
|------|-------------|---------------|
| `mention` | @username mention | |
| `hashtag` | #hashtag | |
| `cashtag` | $USD cashtag | |
| `bot_command` | /command | |
| `url` | URL | |
| `email` | Email address | |
| `phone_number` | Phone number | |
| `bold` | **bold** | |
| `italic` | *italic* | |
| `underline` | underlined | |
| `strikethrough` | ~~strikethrough~~ | |
| `spoiler` | spoiler text | |
| `blockquote` | blockquote | |
| `expandable_blockquote` | Expandable blockquote | |
| `code` | `code` | |
| `pre` | code block | `language` (optional) |
| `text_link` | clickable link | `url` |
| `text_mention` | mention without username | `user` |
| `custom_emoji` | custom emoji | `custom_emoji_id` |

**All entities have**: `offset` (Integer), `length` (Integer), `type` (String)

---

## ⌨️ Keyboard Types

### InlineKeyboardMarkup

Grid of buttons on message.

```json
{
  "inline_keyboard": [
    [
      { "text": "Button 1", "callback_data": "btn1" },
      { "text": "Button 2", "callback_data": "btn2" }
    ],
    [
      { "text": "Visit", "url": "https://example.com" }
    ]
  ]
}
```

**Button Types**:
- `callback_data` - Callback button (64 bytes max)
- `url` - HTTP/HTTPS URL
- `web_app` - Web App (Mini App)
- `login_url` - Login button
- `switch_inline_query` - Inline search
- `switch_inline_query_current_chat` - Search in current chat
- `callback_game` - Game button
- `pay` - Payment button

### ReplyKeyboardMarkup

Custom keyboard below input.

```json
{
  "keyboard": [
    [{ "text": "Button 1" }, { "text": "Button 2" }],
    [{ "text": "Button 3" }]
  ],
  "resize_keyboard": true,
  "one_time_keyboard": true,
  "is_persistent": false
}
```

**Button Types**:
- `text` - Simple text
- `request_contact` - Share contact
- `request_location` - Share location
- `request_poll` - Create poll
- `web_app` - Web App

---

## 💳 Payment Types

### Invoice

| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Product name |
| `description` | String | Product description |
| `start_parameter` | String | Unique parameter (deep link) |
| `currency` | String | 3-letter ISO code (USD, XTR, EUR) |
| `total_amount` | Integer | Total in smallest units (cents for USD, 1 for XTR) |

### SuccessfulPayment

| Field | Type | Description |
|-------|------|-------------|
| `currency` | String | Currency code |
| `total_amount` | Integer | Total amount |
| `invoice_payload` | String | Bot payload |
| `telegram_payment_charge_id` | String | Telegram payment ID |
| `provider_payment_charge_id` | String | Optional. Provider payment ID |
| `subscription_expiration_date` | Integer | Optional. Subscription expiration |
| `is_recurring` | Boolean | Optional. Recurring payment |
| `is_first_recurring` | Boolean | Optional. First of recurring |

### PaidMediaInfo

| Field | Type | Description |
|-------|------|-------------|
| `star_count` | Integer | Stars paid |
| `paid_media` | PaidMedia[] | Media purchased |

---

## 🎁 Rich Text Types (Bot API 10.2) ⭐

### RichText Classes

| Class | Description |
|-------|-------------|
| `RichTextBold` | Bold text |
| `RichTextItalic` | Italic text |
| `RichTextUnderline` | Underlined text |
| `RichTextStrikethrough` | Strikethrough text |
| `RichTextCode` | Inline code |
| `RichTextPre` | Code block |
| `RichTextLink` | Clickable link |
| `RichTextEmail` | Email link |
| `RichTextPhone` | Phone link |
| `RichTextMention` | User mention |
| `RichTextHashtag` | Hashtag |
| `RichTextCashtag` | Cashtag |
| `RichTextBotCommand` | Bot command |
| `RichTextFixedWidthCode` | Fixed-width code |
| `RichTextFixedWidthPre` | Fixed-width block |
| `RichTextCustomEmoji` | Custom emoji |
| `RichBlockTable` | Table block ⭐ NEW |
| `RichBlockTableCell` | Table cell ⭐ NEW |
| `RichBlockQuote` | Block quote ⭐ NEW |

---

## 🌐 Ephemeral Messages (Bot API 10.2) ⭐

| Field | Type | Description |
|-------|------|-------------|
| `ephemeral` | Boolean | Message visible only to specific user |
| `ephemeral_user_id` | Integer | User who sees the message |

---

## 🏘️ Communities (Bot API 10.2) ⭐

| Field | Type | Description |
|-------|------|-------------|
| `is_community` | Boolean | True if chat is community |
| `accent_color_id` | Integer | Community accent color |
| `profile_accent_color_id` | Integer | Profile accent color |
| `profile_background_custom_emoji_id` | String | Background emoji |

---

## 💬 Reactions (Bot API 10.2) ⭐

### MessageReactionUpdated

| Field | Type | Description |
|-------|------|-------------|
| `chat` | Chat | Chat where reaction changed |
| `message_id` | Integer | Message ID |
| `user` | User | Optional. User who changed reaction |
| `actor_chat` | Chat | Optional. Chat that changed reaction |
| `date` | Integer | Date of change |
| `old_reaction` | ReactionType[] | Previous reactions |
| `new_reaction` | ReactionType[] | New reactions |

### MessageReactionCountUpdated

| Field | Type | Description |
|-------|------|-------------|
| `chat` | Chat | Chat |
| `message_id` | Integer | Message ID |
| `date` | Integer | Date |
| `reactions` | ReactionCount[] | Reaction counts (anonymous) |

### ReactionType

- `emoji` - Emoji
- `custom_emoji` - Custom emoji
- `paid_center_emoji` - Paid emoji

---

## 🎮 Other Important Types

### Poll

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique poll ID |
| `question` | String | Poll question |
| `options` | PollOption[] | Poll options |
| `total_voter_count` | Integer | Total voters |
| `is_closed` | Boolean | Poll closed |
| `is_anonymous` | Boolean | Anonymous voting |
| `type` | String | "regular" or "quiz" |
| `allows_multiple_answers` | Boolean | Multiple answers allowed |
| `correct_option_id` | Integer | Optional. Correct option (quiz) |
| `explanation` | String | Optional. Quiz explanation |
| `explanation_entities` | MessageEntity[] | Optional. Entities in explanation |
| `open_period` | Integer | Optional. Open duration (seconds) |
| `close_date` | Integer | Optional. Close timestamp |

### Sticker

| Field | Type | Description |
|-------|------|-------------|
| `file_id` | String | Unique identifier |
| `file_unique_id` | String | Unique file ID |
| `type` | String | "regular", "animated", "video" |
| `width` | Integer | Width |
| `height` | Integer | Height |
| `is_animated` | Boolean | Animated sticker |
| `is_video` | Boolean | Video sticker |
| `thumbnail` | PhotoSize | Optional. Thumbnail |
| `emoji` | String | Optional. Associated emoji |
| `set_name` | String | Optional. Set name |
| `premium_animation` | File | Optional. Premium animation |
| `mask_position` | MaskPosition | Optional. Mask position |
| `custom_emoji_id` | String | Optional. Custom emoji ID |

---

## ✅ Summary

**Total Types**: 200+  
**Bot API Version**: 10.2 (July 2026)  
**New Features**:
- ⭐ Rich Text Classes (RichTextBold, RichBlockTable, etc.)
- ⭐ Ephemeral Messages
- ⭐ Communities
- ⭐ Message Reactions API
- ⭐ Gifts & Boosts
- ⭐ Checklists
- ⭐ Stories
- ⭐ Giveaways
- ⭐ Telegram Stars

**Status**: ✅ Production Ready
