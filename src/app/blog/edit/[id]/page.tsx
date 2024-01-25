'use client'
import { Button, Box, Modal, Typography, Link, Grid, TextField, CssBaseline, Container } from '@mui/material';
import Folder from '@mui/icons-material/Folder';
import NextImage from 'next/image'
import axios from "axios"
import Style from '@/app/styles/style';
import VisuallyHiddenInput from '@/app/styles/visuallyHiddenInput';
import { blogInfo } from '@/types/common';

async function page({ params }: any) {
    const id = params.id;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const api = process.env.NEXT_PUBLIC_API;
        const formData = new FormData();
        // if (file) {
        //     formData.set('file', file);
        // }
        // formData.set('title', title);
        // formData.set('slug', slug);
        // formData.set('description', description);
        // formData.set('details', details);

        // manual, review later
        formData.set('category_id', '1');
        formData.set('count_view', '0');
        formData.set('related', '');
        formData.set('seo_title', '');
        formData.set('seo_keywords', '');
        formData.set('seo_description', '');
        formData.set('active_status', '0');
        formData.set('article_status', '0');

        try {
            await axios
                .patch(`${api}/blogs/${id}`, formData)
                .then((response) => {
                    if (response.data.id) {
                        // handleOpen();
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 3000)
                    }
                })
                .catch((error) => {
                    console.log("error: ", error);
                });
        } catch (e) {
            console.error(e)
        }
    };

    const onSelectFile = (event: any) => {
        const fileObject = event.target.files?.[0] || null;
        // console.log(fileObject);
        if (fileObject) {
            const imgName = fileObject.name;

            const reader = new FileReader();
            reader.readAsDataURL(fileObject);
            reader.onloadend = () => {
                const img: any = new Image();

                img.src = reader.result;
                // console.log(reader.result);

                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const maxSize = Math.max(img.width, img.height);
                    canvas.width = maxSize;
                    canvas.height = maxSize;
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(
                        img,
                        (maxSize - img.width) / 2,
                        (maxSize - img.height) / 2
                    );
                    canvas.toBlob(
                        (blob: any) => {
                            const file = new File([blob], imgName, {
                                type: "image/png",
                                lastModified: Date.now(),
                            });
                            // console.log(file);
                            // setPreviewAvatar(file);
                            // setFile(fileObject)
                        },
                        "image/jpeg",
                        0.8
                    );
                };
            };
        }
    };

    const blog: Post = await blogInfo(id);
    // setBlogData(blog);
    // console.log(blog.title);

    return (
        <Container maxWidth="lg" sx={{ p: 2 }}>
            <Box dir="rtl">
                <Link href="/">
                    <Button variant="contained">Post list</Button>
                </Link>
            </Box>
            <Box>
                <Typography variant="h6" gutterBottom component="div" align='center'>
                    Create post
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box sx={{ mb: 1 }} display="flex" flexDirection="column" alignItems="center">
                            <div className='preview-image'>
                                {/* {previewAvatar ? (
                                    <NextImage
                                        src={URL.createObjectURL(previewAvatar)}
                                        fill
                                        style={{
                                            objectFit: 'cover',
                                        }}
                                        alt=""
                                    />
                                ) : ( */}
                                <NextImage
                                    src="/upload-placeholder.jpg"
                                    fill
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                    alt=""
                                />
                                {/* )} */}
                            </div>

                            <Button sx={{ mt: 1 }} component="label" variant="contained" startIcon={<Folder />} onChange={onSelectFile}>
                                Browse file
                                <VisuallyHiddenInput type="file" />
                            </Button>
                        </Box>

                        <Grid container spacing={2} className='form-input'>
                            <Grid item xs={12}>
                                <TextField
                                    id="title"
                                    label="Title"
                                    placeholder="Title"
                                    value={blog.title}
                                    hidden={!blog.title}
                                    variant="outlined"
                                    onChange={(e) => ({})}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="slug"
                                    label="Slug"
                                    placeholder="Slug"
                                    value={blog.slug}
                                    variant="outlined"
                                    onChange={(e) => ({})}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="description"
                                    label="Description"
                                    placeholder="Description"
                                    value={blog.description}
                                    variant="outlined"
                                    onChange={(e) => ({})}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="details"
                                    label="Details"
                                    placeholder="Details"
                                    value={blog.details}
                                    variant="outlined"
                                    onChange={(e) => ({})}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth>
                                    Update
                                </Button>
                            </Grid> */}
                        </Grid>
                    </Box>
                </form>
            </Box>
        </Container>
    )
}

export default page;
