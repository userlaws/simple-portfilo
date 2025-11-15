import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateUniqueSlug } from '@/lib/slug-utils';
import { revalidatePath } from 'next/cache';

// Valid categories for blog posts
const VALID_CATEGORIES = [
  'Backend & Data',
  'Infrastructure',
  'Security',
  'Engineering',
  'APIs & Integrations',
  'Tutorials',
];

export async function POST(request: NextRequest) {
  try {
    // Validate API secret
    const authHeader = request.headers.get('authorization');
    const apiSecret = process.env.BLOG_API_SECRET;

    if (!apiSecret) {
      return NextResponse.json(
        { error: 'Server configuration error: BLOG_API_SECRET not set' },
        { status: 500 }
      );
    }

    // Check authorization header
    if (!authHeader || authHeader !== `Bearer ${apiSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid API secret' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { title, description, category, content, slug: providedSlug } = body;

    // Validate required fields
    if (!title || !description || !category || !content) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['title', 'description', 'category', 'content'],
        },
        { status: 400 }
      );
    }

    // Validate category
    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        {
          error: 'Invalid category',
          validCategories: VALID_CATEGORIES,
        },
        { status: 400 }
      );
    }

    // Generate or use provided slug
    const slug = providedSlug || (await generateUniqueSlug(title));

    // Check if provided slug already exists
    if (providedSlug && (await db.slugExists(providedSlug))) {
      return NextResponse.json(
        { error: 'Slug already exists', slug: providedSlug },
        { status: 409 }
      );
    }

    // Create blog post in database
    const newPost = await db.createPost({
      title,
      description,
      slug,
      category,
      content,
    });

    // Revalidate the blog pages to show new post
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Blog post created successfully',
        post: {
          id: newPost.id,
          title: newPost.title,
          slug: newPost.slug,
          url: `/blog/${newPost.slug}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    // If slug provided, return single post
    if (slug) {
      const post = await db.getPostBySlug(slug);
      if (!post) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ post }, { status: 200 });
    }

    // Otherwise return all posts
    const posts = await db.getAllPosts();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// DELETE endpoint to delete a blog post
export async function DELETE(request: NextRequest) {
  try {
    // Validate API secret
    const authHeader = request.headers.get('authorization');
    const apiSecret = process.env.BLOG_API_SECRET;

    if (!apiSecret) {
      return NextResponse.json(
        { error: 'Server configuration error: BLOG_API_SECRET not set' },
        { status: 500 }
      );
    }

    // Check authorization header
    if (!authHeader || authHeader !== `Bearer ${apiSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid API secret' },
        { status: 401 }
      );
    }

    // Get slug from query params or request body
    const { searchParams } = new URL(request.url);
    let slug = searchParams.get('slug');

    if (!slug) {
      const body = await request.json().catch(() => ({}));
      slug = body.slug;
    }

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing required field: slug' },
        { status: 400 }
      );
    }

    // Check if post exists
    const existingPost = await db.getPostBySlug(slug);
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found', slug },
        { status: 404 }
      );
    }

    // Delete the post
    const deleted = await db.deletePost(slug);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Failed to delete post' },
        { status: 500 }
      );
    }

    // Revalidate the blog pages
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Blog post deleted successfully',
        post: {
          title: existingPost.title,
          slug: existingPost.slug,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PATCH endpoint to update a blog post
export async function PATCH(request: NextRequest) {
  try {
    // Validate API secret
    const authHeader = request.headers.get('authorization');
    const apiSecret = process.env.BLOG_API_SECRET;

    if (!apiSecret) {
      return NextResponse.json(
        { error: 'Server configuration error: BLOG_API_SECRET not set' },
        { status: 500 }
      );
    }

    // Check authorization header
    if (!authHeader || authHeader !== `Bearer ${apiSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid API secret' },
        { status: 401 }
      );
    }

    // Get slug from query params or request body
    const { searchParams } = new URL(request.url);
    let slug = searchParams.get('slug');

    // Parse request body
    const body = await request.json();
    if (!slug) {
      slug = body.slug;
    }

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing required field: slug' },
        { status: 400 }
      );
    }

    // Check if post exists
    const existingPost = await db.getPostBySlug(slug);
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found', slug },
        { status: 404 }
      );
    }

    // Extract update fields
    const { title, description, category, content } = body;
    const updates: {
      title?: string;
      description?: string;
      category?: string;
      content?: string;
      slug?: string;
    } = {};

    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (category !== undefined) {
      // Validate category if provided
      if (!VALID_CATEGORIES.includes(category)) {
        return NextResponse.json(
          {
            error: 'Invalid category',
            validCategories: VALID_CATEGORIES,
          },
          { status: 400 }
        );
      }
      updates.category = category;
    }
    if (content !== undefined) updates.content = content;

    // If title changed, generate new slug
    if (title && title !== existingPost.title) {
      const newSlug = await generateUniqueSlug(title);
      // Check if new slug is different from current
      if (newSlug !== slug) {
        // Check if new slug already exists (and is not the current post)
        if (await db.slugExists(newSlug)) {
          return NextResponse.json(
            { error: 'Slug collision: generated slug already exists', slug: newSlug },
            { status: 409 }
          );
        }
        updates.slug = newSlug;
      }
    }

    // Check if any updates provided
    if (
      !updates.title &&
      !updates.description &&
      !updates.category &&
      !updates.content &&
      !updates.slug
    ) {
      return NextResponse.json(
        {
          error: 'No update fields provided',
          post: existingPost,
        },
        { status: 400 }
      );
    }

    // Update the post
    const updatedPost = await db.updatePost(slug, updates);
    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Failed to update post' },
        { status: 500 }
      );
    }

    // Revalidate the blog pages
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    if (updates.slug && updates.slug !== slug) {
      revalidatePath(`/blog/${updates.slug}`);
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Blog post updated successfully',
        post: {
          id: updatedPost.id,
          title: updatedPost.title,
          slug: updatedPost.slug,
          url: `/blog/${updatedPost.slug}`,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

