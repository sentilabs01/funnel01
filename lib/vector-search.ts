'use client';

import { createClient } from '@supabase/supabase-js';
import { OpenAIEmbeddings } from './openai-embeddings';

// This would normally come from environment variables
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: string;
  similarity: number;
}

export async function vectorSearch(query: string, limit = 5): Promise<SearchResult[]> {
  try {
    // Generate embedding for the search query
    const embeddings = new OpenAIEmbeddings();
    const embedding = await embeddings.embedQuery(query);
    
    // Perform vector similarity search
    const { data, error } = await supabase.rpc('match_content_vectors', {
      query_embedding: embedding,
      match_threshold: 0.5,
      match_count: limit
    });
    
    if (error) {
      console.error('Error performing vector search:', error);
      return getMockResults(); // Fallback to mock results if search fails
    }
    
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      type: item.content_type,
      similarity: item.similarity
    }));
  } catch (error) {
    console.error('Error in vector search:', error);
    return getMockResults(); // Fallback to mock results if search fails
  }
}

// Mock results for development and fallback
function getMockResults(): SearchResult[] {
  return [
    {
      id: '1',
      title: 'Website Design',
      content: 'Custom website design with responsive layouts, modern UI/UX, and seamless functionality.',
      type: 'service',
      similarity: 0.92
    },
    {
      id: '2',
      title: 'Automation & Bots',
      content: 'Custom automation solutions and chatbots to streamline your business processes.',
      type: 'service',
      similarity: 0.85
    },
    {
      id: '3',
      title: 'Graphics & Media',
      content: 'Custom graphics, animations, and media content to enhance your digital presence.',
      type: 'service',
      similarity: 0.78
    },
    {
      id: '4',
      title: 'Custom Development',
      content: 'Tailored development solutions for unique business requirements and challenges.',
      type: 'service',
      similarity: 0.72
    },
    {
      id: '5',
      title: 'Maintenance & Support',
      content: 'Ongoing maintenance, updates, backups, and technical support for your digital assets.',
      type: 'service',
      similarity: 0.65
    }
  ];
}
