'use client';

import OpenAI from 'openai';

export class OpenAIEmbeddings {
  private openai: OpenAI;
  
  constructor() {
    // This would normally come from environment variables
    const OPENAI_API_KEY = 'your-openai-api-key';
    
    this.openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });
  }
  
  async embedQuery(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text,
      });
      
      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embeddings:', error);
      // Return a mock embedding vector (1536 dimensions with random values)
      return Array(1536).fill(0).map(() => Math.random() * 2 - 1);
    }
  }
  
  async embedDocuments(documents: string[]): Promise<number[][]> {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: documents,
      });
      
      return response.data.map(item => item.embedding);
    } catch (error) {
      console.error('Error generating document embeddings:', error);
      // Return mock embedding vectors
      return documents.map(() => 
        Array(1536).fill(0).map(() => Math.random() * 2 - 1)
      );
    }
  }
}
