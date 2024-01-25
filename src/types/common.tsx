import axios from "axios"

export const defaultForm: Post = {
    id: 0,
    category_id: 1,
    title: "",
    slug: "",
    description: "",
    details: "",
};

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
            console.log("error: ", error);
        });
    return data;
}