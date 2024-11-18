import axios from 'axios';

export interface PostParams {
	params: {
		id: number;
	};
}

export interface HeaderProps {
	title: string;
}

export interface MainProps {
	slug: string;
}

export interface PostData {
  id: string;
  title: string;
  date: string;
  content_file?: string;
}

export interface PostProps {
  post: Omit<PostData, 'content'> & { contentHtml: string };
}

export interface FooterProps {
	description: string;
	title: string;
}

export const defaultForm: Post = {
	id: 0,
	category_id: 1,
	title: '',
	slug: '',
	description: '',
	details: '',
	cover_path: '',
	active_status: 1,
};

export interface HomeProps {
  posts: Omit<PostData, 'content'>[];
}

export async function blogInfo(id: string): Promise<Post> {
	const apiUser = process.env.NEXT_PUBLIC_API;
	let data: Post = defaultForm;
	await axios
		.get(`${apiUser}/blogs/${id}`)
		.then((response: any) => {
			if (response.data) {
				data = response.data;
			}
		})
		.catch((error) => {
			console.log('error: ', error);
		});
	return data;
}
