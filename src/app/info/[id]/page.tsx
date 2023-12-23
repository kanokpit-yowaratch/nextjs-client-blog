interface PostParams {
  params: {
    id: number
  }
}

async function getPost(id: number) {
  // axios
  return [];
}

export default async function Page({ params }: PostParams) {
  const data = await getPost(params.id);
  return (
    <h1>Info post: {params.id}</h1>
  )
}
