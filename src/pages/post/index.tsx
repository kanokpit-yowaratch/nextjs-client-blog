import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getAllPosts } from '../../utils/contents';
import { HomeProps } from '@/types/common';

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = getAllPosts();
  return {
    props: { posts },
    revalidate: 60 // 60s
  };
};

const Home = ({ posts }: HomeProps) => (
  <div>
    <h1>Blog</h1>
    <ul>
      {posts.map((post) => (
        <li key={`li-${post.id}`}>
          <Link href={`/post/${post.id}`}>
            {post.title} | {post.date}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default Home;