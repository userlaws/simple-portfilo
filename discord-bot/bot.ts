import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ApplicationCommandOptionType,
} from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

// Environment variables
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!;
const CLIENT_ID = process.env.CLIENT_ID!;
const BLOG_API_SECRET = process.env.BLOG_API_SECRET!;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

if (!DISCORD_BOT_TOKEN || !CLIENT_ID || !BLOG_API_SECRET || !SITE_URL) {
  console.error('Missing required environment variables');
  console.error('Required: DISCORD_BOT_TOKEN, CLIENT_ID, BLOG_API_SECRET, NEXT_PUBLIC_SITE_URL');
  process.exit(1);
}

// Blog categories
const CATEGORIES = [
  { name: 'Backend & Data', value: 'Backend & Data' },
  { name: 'Infrastructure', value: 'Infrastructure' },
  { name: 'Security', value: 'Security' },
  { name: 'Engineering', value: 'Engineering' },
  { name: 'APIs & Integrations', value: 'APIs & Integrations' },
  { name: 'Tutorials', value: 'Tutorials' },
];

// Define the slash command
const commands = [
  new SlashCommandBuilder()
    .setName('blog')
    .setDescription('Manage blog posts')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('new')
        .setDescription('Create a new blog post')
        .addStringOption((option) =>
          option
            .setName('title')
            .setDescription('The title of the blog post')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('category')
            .setDescription('The category of the blog post')
            .setRequired(true)
            .addChoices(...CATEGORIES)
        )
        .addStringOption((option) =>
          option
            .setName('description')
            .setDescription('A short description of the blog post')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('content')
            .setDescription('The full content of the blog post (markdown supported)')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('delete')
        .setDescription('Delete a blog post')
        .addStringOption((option) =>
          option
            .setName('slug')
            .setDescription('The slug of the blog post to delete')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('edit')
        .setDescription('Edit an existing blog post')
        .addStringOption((option) =>
          option
            .setName('slug')
            .setDescription('The slug of the blog post to edit')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('title')
            .setDescription('Update the title of the blog post')
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName('category')
            .setDescription('Update the category of the blog post')
            .setRequired(false)
            .addChoices(...CATEGORIES)
        )
        .addStringOption((option) =>
          option
            .setName('description')
            .setDescription('Update the description of the blog post')
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName('content')
            .setDescription('Update the content of the blog post (markdown supported)')
            .setRequired(false)
        )
    )
    .toJSON(),
];

// Create Discord client
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Register slash commands
const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);

async function registerCommands() {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
}

// Handle slash command interactions
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'blog') {
    const subcommand = options.getSubcommand();

    if (subcommand === 'new') {
      await handleBlogNew(interaction);
    } else if (subcommand === 'delete') {
      await handleBlogDelete(interaction);
    } else if (subcommand === 'edit') {
      await handleBlogEdit(interaction);
    }
  }
});

// Handle /blog new command
async function handleBlogNew(interaction: ChatInputCommandInteraction) {
  try {
    // Defer reply since API call might take time
    await interaction.deferReply({ ephemeral: true });

    // Get command options
    const title = interaction.options.getString('title', true);
    const category = interaction.options.getString('category', true);
    const description = interaction.options.getString('description', true);
    const content = interaction.options.getString('content', true);

    // Call the Next.js API
    const response = await fetch(`${SITE_URL}/api/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BLOG_API_SECRET}`,
      },
      body: JSON.stringify({
        title,
        category,
        description,
        content,
      }),
    });

    const data = (await response.json()) as
      | { error?: string; message?: string }
      | { success: boolean; post: { title: string; slug: string; url: string } };

    if (!response.ok) {
      // Error response
      const errorData = data as { error?: string; message?: string };
      await interaction.editReply({
        content: `❌ Failed to create blog post: ${errorData.error || errorData.message || 'Unknown error'}`,
      });
      return;
    }

    // Success response
    const successData = data as { success: boolean; post: { title: string; slug: string; url: string } };
    const postUrl = `${SITE_URL}${successData.post.url}`;
    await interaction.editReply({
      content: `✅ Blog post created successfully!\n\n**Title:** ${successData.post.title}\n**Slug:** ${successData.post.slug}\n**URL:** ${postUrl}`,
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    await interaction.editReply({
      content: `❌ An error occurred while creating the blog post: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    });
  }
}

// Handle /blog delete command
async function handleBlogDelete(interaction: ChatInputCommandInteraction) {
  try {
    // Defer reply since API call might take time
    await interaction.deferReply({ ephemeral: true });

    // Get command options
    const slug = interaction.options.getString('slug', true);

    // First, fetch the post to show confirmation
    const getResponse = await fetch(`${SITE_URL}/api/blog?slug=${encodeURIComponent(slug)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const getData = (await getResponse.json()) as
      | { error?: string; message?: string }
      | { post: { title: string; slug: string } };

    if (!getResponse.ok) {
      const errorData = getData as { error?: string; message?: string };
      await interaction.editReply({
        content: `❌ Failed to fetch blog post: ${errorData.error || errorData.message || 'Unknown error'}`,
      });
      return;
    }

    const postData = getData as { post: { title: string; slug: string } };
    const postTitle = postData.post.title;

    // Call the DELETE API
    const response = await fetch(`${SITE_URL}/api/blog?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BLOG_API_SECRET}`,
      },
    });

    const data = (await response.json()) as
      | { error?: string; message?: string }
      | { success: boolean; post: { title: string; slug: string } };

    if (!response.ok) {
      const errorData = data as { error?: string; message?: string };
      await interaction.editReply({
        content: `❌ Failed to delete blog post: ${errorData.error || errorData.message || 'Unknown error'}`,
      });
      return;
    }

    // Success response
    const successData = data as { success: boolean; post: { title: string; slug: string } };
    await interaction.editReply({
      content: `✅ Blog post deleted successfully!\n\n**Title:** ${successData.post.title}\n**Slug:** ${successData.post.slug}`,
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    await interaction.editReply({
      content: `❌ An error occurred while deleting the blog post: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    });
  }
}

// Handle /blog edit command
async function handleBlogEdit(interaction: ChatInputCommandInteraction) {
  try {
    // Defer reply since API call might take time
    await interaction.deferReply({ ephemeral: true });

    // Get command options
    const slug = interaction.options.getString('slug', true);
    const title = interaction.options.getString('title', false);
    const category = interaction.options.getString('category', false);
    const description = interaction.options.getString('description', false);
    const content = interaction.options.getString('content', false);

    // Check if at least one field is provided
    if (!title && !category && !description && !content) {
      await interaction.editReply({
        content: `❌ Please provide at least one field to update (title, category, description, or content)`,
      });
      return;
    }

    // Build update payload with only provided fields
    const updatePayload: {
      slug: string;
      title?: string;
      category?: string;
      description?: string;
      content?: string;
    } = { slug };

    if (title) updatePayload.title = title;
    if (category) updatePayload.category = category;
    if (description) updatePayload.description = description;
    if (content) updatePayload.content = content;

    // Call the PATCH API
    const response = await fetch(`${SITE_URL}/api/blog`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BLOG_API_SECRET}`,
      },
      body: JSON.stringify(updatePayload),
    });

    const data = (await response.json()) as
      | { error?: string; message?: string }
      | { success: boolean; post: { title: string; slug: string; url: string } };

    if (!response.ok) {
      const errorData = data as { error?: string; message?: string };
      await interaction.editReply({
        content: `❌ Failed to update blog post: ${errorData.error || errorData.message || 'Unknown error'}`,
      });
      return;
    }

    // Success response
    const successData = data as { success: boolean; post: { title: string; slug: string; url: string } };
    const postUrl = `${SITE_URL}${successData.post.url}`;
    await interaction.editReply({
      content: `✅ Blog post updated successfully!\n\n**Title:** ${successData.post.title}\n**Slug:** ${successData.post.slug}\n**URL:** ${postUrl}`,
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    await interaction.editReply({
      content: `❌ An error occurred while updating the blog post: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    });
  }
}

// Bot ready event
client.once('ready', () => {
  console.log(`✅ Bot logged in as ${client.user?.tag}`);
});

// Start the bot
async function start() {
  await registerCommands();
  await client.login(DISCORD_BOT_TOKEN);
}

start().catch(console.error);

