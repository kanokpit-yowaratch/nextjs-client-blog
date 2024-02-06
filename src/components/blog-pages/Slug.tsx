import * as React from 'react';
import Grid from '@mui/material/Grid';
import Markdown from './Markdown';
import post from '../../components/blog-pages/blog-post.1.md';

interface MainProps {
  slug: string;
}

function Slug(props: MainProps) {
  const [posts, setPosts] = React.useState([post])
  const { slug } = props;

  // useEffect => get content by slug

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 0,
        },
      }}
    >
      <h4>(Slug: {slug})</h4>
      {posts.map((post) => (
        <Markdown className="markdown" key={post.substring(0, 40)}>
          {post}
        </Markdown>
      ))}
    </Grid>
  );
}

export default Slug