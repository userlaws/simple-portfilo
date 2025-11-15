import { neon } from '@neondatabase/serverless';

// Lazy initialization - only create connection when needed
let sqlInstance: ReturnType<typeof neon> | null = null;

const getSql = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  if (!sqlInstance) {
    sqlInstance = neon(process.env.DATABASE_URL);
  }
  return sqlInstance;
};

// Export sql for backward compatibility, but it will only be created when used
export const sql = new Proxy({} as ReturnType<typeof neon>, {
  get(_target, prop) {
    return getSql()[prop as keyof ReturnType<typeof neon>];
  },
});

// Blog post type
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  content: string;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

// Database query helpers
export const db = {
  // Get all blog posts
  getAllPosts: async (): Promise<BlogPost[]> => {
    const result = await sql`
      SELECT * FROM blog_posts 
      ORDER BY created_at DESC
    `;
    return result as BlogPost[];
  },

  // Get post by slug
  getPostBySlug: async (slug: string): Promise<BlogPost | null> => {
    const result = await sql`
      SELECT * FROM blog_posts 
      WHERE slug = ${slug}
      LIMIT 1
    `;
    return result.length > 0 ? (result[0] as BlogPost) : null;
  },

  // Check if slug exists
  slugExists: async (slug: string): Promise<boolean> => {
    const result = await sql`
      SELECT EXISTS(SELECT 1 FROM blog_posts WHERE slug = ${slug})
    `;
    return result[0].exists as boolean;
  },

  // Create new blog post
  createPost: async (post: {
    title: string;
    description: string;
    slug: string;
    category: string;
    content: string;
  }): Promise<BlogPost> => {
    const result = await sql`
      INSERT INTO blog_posts (title, description, slug, category, content, created_at, updated_at)
      VALUES (
        ${post.title},
        ${post.description},
        ${post.slug},
        ${post.category},
        ${post.content},
        NOW(),
        NOW()
      )
      RETURNING *
    `;
    return result[0] as BlogPost;
  },

  // Get posts by category
  getPostsByCategory: async (category: string): Promise<BlogPost[]> => {
    const result = await sql`
      SELECT * FROM blog_posts 
      WHERE category = ${category}
      ORDER BY created_at DESC
    `;
    return result as BlogPost[];
  },

  // Get post by ID
  getPostById: async (id: string): Promise<BlogPost | null> => {
    const result = await sql`
      SELECT * FROM blog_posts 
      WHERE id = ${id}
      LIMIT 1
    `;
    return result.length > 0 ? (result[0] as BlogPost) : null;
  },

  // Update blog post
  updatePost: async (
    slug: string,
    updates: {
      title?: string;
      description?: string;
      category?: string;
      content?: string;
      slug?: string;
    }
  ): Promise<BlogPost | null> => {
    // Check if post exists
    const existingPost = await db.getPostBySlug(slug);
    if (!existingPost) {
      return null;
    }

    // If no updates provided, return existing post
    if (
      updates.title === undefined &&
      updates.description === undefined &&
      updates.category === undefined &&
      updates.content === undefined &&
      updates.slug === undefined
    ) {
      return existingPost;
    }

    // Build update query conditionally - only update provided fields
    let result;
    if (updates.title && updates.description && updates.category && updates.content && updates.slug) {
      // All fields provided
      result = await sql`
        UPDATE blog_posts 
        SET 
          title = ${updates.title},
          description = ${updates.description},
          category = ${updates.category},
          content = ${updates.content},
          slug = ${updates.slug},
          updated_at = NOW()
        WHERE slug = ${slug}
        RETURNING *
      `;
    } else {
      // Partial update - use existing values for fields not provided
      result = await sql`
        UPDATE blog_posts 
        SET 
          title = ${updates.title ?? existingPost.title},
          description = ${updates.description ?? existingPost.description},
          category = ${updates.category ?? existingPost.category},
          content = ${updates.content ?? existingPost.content},
          slug = ${updates.slug ?? existingPost.slug},
          updated_at = NOW()
        WHERE slug = ${slug}
        RETURNING *
      `;
    }

    return result.length > 0 ? (result[0] as BlogPost) : null;
  },

  // Delete blog post
  deletePost: async (slug: string): Promise<boolean> => {
    const result = await sql`
      DELETE FROM blog_posts 
      WHERE slug = ${slug}
      RETURNING id
    `;
    return result.length > 0;
  },
};

