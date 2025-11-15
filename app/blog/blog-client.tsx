'use client';

import { useState, useRef, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { BlogCard } from '@/components/blog-card';
import { Confetti } from '@/components/confetti';
import { useLanguage } from '@/contexts/language-context';
import { useTheme } from '@/contexts/theme-context';
import { Filter, ChevronDown } from 'lucide-react';

interface BlogPost {
  title: string;
  description: string;
  slug: string;
  category: string;
}

const categories = [
  'All',
  'Backend & Data',
  'Infrastructure',
  'Security',
  'Engineering',
  'APIs & Integrations',
  'Tutorials',
];

// Custom Dropdown Component
function CategoryDropdown({
  categories,
  selectedCategory,
  onCategoryChange,
  posts,
  hideEmpty = true,
}: {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  posts: BlogPost[];
  hideEmpty?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calculate post counts for each category
  const getCategoryCount = (category: string) => {
    if (category === 'All') return posts.length;
    return posts.filter((post) => post.category === category).length;
  };

  // Filter categories based on hideEmpty setting
  const visibleCategories = hideEmpty
    ? categories.filter((category) => {
        // Always show "All" and the selected category
        if (category === 'All' || category === selectedCategory) return true;
        return getCategoryCount(category) > 0;
      })
    : categories;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  return (
    <div className='relative w-full sm:w-auto' ref={dropdownRef}>
      {/* Dropdown Trigger - Mobile-first: full width on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-4 py-3 w-full sm:min-w-[200px] sm:w-auto
          min-h-[44px] touch-manipulation
          bg-background border border-border rounded-lg
          hover:border-accent/50 hover:bg-accent/5 hover:shadow-md
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
          transition-all duration-200 ease-in-out
          ${
            isOpen
              ? 'border-accent bg-accent/5 shadow-lg ring-1 ring-accent/20'
              : ''
          }
        `}
        aria-label='Select category'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        <Filter className='h-4 w-4 text-muted-foreground flex-shrink-0' />
        <span className='flex-1 text-left text-sm font-medium'>
          {selectedCategory} (
          {getCategoryCount(selectedCategory)})
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu - Mobile-first: full width, better positioning */}
      <div
        className={`
          absolute top-full left-0 right-0 sm:right-auto sm:min-w-[200px] mt-2 z-50
          bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-xl
          overflow-hidden
          transition-all duration-300 ease-out
          ${
            isOpen
              ? 'opacity-100 translate-y-0 scale-100 shadow-2xl ring-1 ring-accent/10'
              : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
          }
        `}
        role='listbox'
        aria-label='Category options'
        style={{
          transformOrigin: 'top center',
        }}
      >
        <div className='py-1 max-h-[60vh] overflow-y-auto'>
          {visibleCategories.map((category, index) => {
            const count = getCategoryCount(category);
            const isSelected = category === selectedCategory;
            const isEmpty = count === 0 && category !== 'All';

            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                disabled={isEmpty && !isSelected}
                className={`
                  w-full flex items-center justify-between px-4 py-3 text-sm
                  min-h-[44px] touch-manipulation
                  transition-all duration-200 ease-out
                  ${
                    isEmpty && !isSelected
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-accent/10 hover:text-accent-foreground active:bg-accent/15'
                  }
                  ${
                    isSelected
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground'
                  }
                `}
                role='option'
                aria-selected={isSelected}
                style={{
                  animationDelay: `${index * 30}ms`,
                  transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
                  opacity: isOpen ? (isEmpty && !isSelected ? 0.5 : 1) : 0,
                  transition: `all 0.2s ease-out ${index * 30}ms`,
                }}
              >
                <span className='font-medium'>{category}</span>
                <span className='text-xs opacity-70'>({count})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function BlogPageClient({ posts }: { posts: BlogPost[] }) {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCancelParty = () => {
    setTheme('light');
  };

  // Get the full document height for the overlay
  const getDocumentHeight = () => {
    if (typeof window !== 'undefined') {
      return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
    }
    return '100vh';
  };

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <main className='min-h-screen'>
      {theme === 'party' && <Confetti />}
      {theme === 'party' && (
        <div
          onClick={handleCancelParty}
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: `${getDocumentHeight()}px`,
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              textAlign: 'center',
              pointerEvents: 'auto',
            }}
          >
            <button
              onClick={handleCancelParty}
              style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '30px 60px',
                border: '5px solid white',
                borderRadius: '15px',
                fontSize: '24px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 0 50px rgba(255, 0, 0, 0.8)',
                marginBottom: '20px',
              }}
            >
              🎉 CANCEL PARTY 🎉
            </button>
            <div
              style={{
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '10px 20px',
                borderRadius: '10px',
              }}
            >
              Or tap anywhere to cancel
            </div>
          </div>
        </div>
      )}
      <Navigation />
      <div className='container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 max-w-4xl'>
        <div className='space-y-6 sm:space-y-8'>
          <div className='text-center sm:text-left py-2'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight wrap-break-word min-h-[1.2em] overflow-visible pb-1'>
              {t('blogTitle')}
            </h1>
            <p className='text-lg sm:text-xl text-muted-foreground max-w-3xl wrap-break-word leading-relaxed'>
              {t('blogSubtitle')}
            </p>
          </div>

          {/* Beautiful Animated Dropdown - Mobile-first */}
          <div className='flex flex-col sm:flex-row justify-center sm:justify-start gap-4'>
            <CategoryDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              posts={posts}
              hideEmpty={true}
            />

            {/* Clear Filter Button */}
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className='px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 border border-border rounded-lg hover:border-accent/50 hover:bg-accent/5'
              >
                {t('clearFilter')}
              </button>
            )}
          </div>

          {/* Results Summary */}
          <div className='flex items-center gap-2 text-sm text-muted-foreground animate-in fade-in duration-300'>
            <span>
              {t('showingNotes')} {filteredPosts.length}{' '}
              {filteredPosts.length === 1 ? t('note') : t('notePlural')}
            </span>
            {selectedCategory !== 'All' && (
              <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20 animate-in slide-in-from-left-2 duration-300'>
                {selectedCategory}
              </span>
            )}
          </div>

          {/* Blog Posts Grid */}
          <div className='space-y-6 sm:space-y-8'>
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>

          {/* No results message */}
          {filteredPosts.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-muted-foreground'>{t('noNotesFound')}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

