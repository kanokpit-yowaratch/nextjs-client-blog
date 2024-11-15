import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostData } from '@/types/common';

export function getAllPosts(): Omit<PostData, 'content'>[] {
  const postsDirectory = path.join(process.cwd(), 'src/components/blog-list');
  const fileNames = fs.readdirSync(postsDirectory); // just file in directory, not allow subdirectory
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
    }
  })
}

export function getPostById(id: string): PostData {
  const postsDirectory = path.join(process.cwd(), 'src/components/blog-list');
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
  };
}

export function getContentById(id: string): string {
  const postsDirectory = path.join(process.cwd(), 'src/components/blog-content');
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  return matterResult?.content || '';
}
