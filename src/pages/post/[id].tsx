import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPosts, getContentById, getPostById } from '../../utils/contents';
import { remark } from 'remark';
import html from 'remark-html';
import { PostProps } from '@/types/common';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { id: post.id }
  }));
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const post = getPostById(`${params?.id}` as string);
  const content = getContentById(`${params?.id}` as string);

  let contentHtml = '';
  if (content) {
    const processedContent = await remark().use(html).process(content);
    contentHtml = processedContent?.toString();
  }

  return {
    props: {
      post: {
        ...post,
        contentHtml,
      }
    }
  };
}

const Post = ({ post }: PostProps) => (
  <div>
    <h1>{post.title}</h1>
    <div>{post.date}</div>
    <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
  </div>
);

export default Post;