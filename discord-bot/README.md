# Blog Discord Bot

A Discord bot that allows you to create blog posts via slash commands. Posts are automatically published to your Next.js blog.

## Features

- `/blog new` - Create a new blog post with title, category, description, and content
- Markdown support for post content
- Real-time feedback on post creation
- Automatic slug generation

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Discord bot token and application ID
- Access to the Next.js blog API

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and fill in:
   - `DISCORD_BOT_TOKEN`: Your Discord bot token
   - `CLIENT_ID`: Your Discord application/client ID
   - `BLOG_API_SECRET`: Secret token for API authentication (must match Next.js)
   - `NEXT_PUBLIC_SITE_URL`: Your deployed Next.js site URL

3. **Invite the bot to your Discord server:**
   - Go to Discord Developer Portal > Your Application > OAuth2 > URL Generator
   - Select scopes: `bot`, `applications.commands`
   - Select bot permissions: `Send Messages`, `Use Slash Commands`
   - Copy the generated URL and open it in your browser
   - Select your server and authorize the bot

### Running the Bot

**Development mode (auto-restart on changes):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm run serve
```

**Or with ts-node:**
```bash
npm start
```

### Running on Your Home Server

1. **Transfer files to your home server:**
   ```bash
   scp -r discord-bot/ user@your-server:/path/to/bot
   ```

2. **SSH into your server and install dependencies:**
   ```bash
   ssh user@your-server
   cd /path/to/bot
   npm install
   ```

3. **Set up as a systemd service (optional but recommended):**
   
   Create `/etc/systemd/system/blog-bot.service`:
   ```ini
   [Unit]
   Description=Blog Discord Bot
   After=network.target

   [Service]
   Type=simple
   User=your-user
   WorkingDirectory=/path/to/bot
   ExecStart=/usr/bin/npm start
   Restart=on-failure
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```

   Then enable and start:
   ```bash
   sudo systemctl enable blog-bot
   sudo systemctl start blog-bot
   sudo systemctl status blog-bot
   ```

4. **View logs:**
   ```bash
   sudo journalctl -u blog-bot -f
   ```

## Usage

In Discord, use the `/blog new` command:

```
/blog new
  title: My Awesome Blog Post
  category: Backend & Data
  description: A short description of the post
  content: ## Heading\n\nYour markdown content here...
```

### Available Categories

- Backend & Data
- Home Lab & Hosting
- Security & Systems
- Product & Process
- Integrations & Platform
- Learning Journal

### Content Formatting

The `content` field supports full Markdown syntax:
- Headers: `# H1`, `## H2`, etc.
- Code blocks: \`\`\`language\ncode\n\`\`\`
- Lists, links, bold, italic, etc.

## Troubleshooting

### Bot not responding
- Check that the bot is online in your server
- Verify the bot token is correct
- Check logs for errors

### Commands not showing up
- Wait a few minutes for Discord to sync commands
- Try kicking and re-inviting the bot
- Check bot permissions

### API errors
- Verify `BLOG_API_SECRET` matches in both bot and Next.js
- Check `NEXT_PUBLIC_SITE_URL` is correct
- Ensure the Next.js API route is accessible

### Database errors
- Verify Neon database is running
- Check database connection string in Next.js
- Run the SQL migration script if not done yet

## Security Notes

- Keep your `.env` file secure and never commit it
- Use a strong random string for `BLOG_API_SECRET`
- Only invite the bot to trusted Discord servers
- Consider implementing rate limiting for the API endpoint

## License

MIT

