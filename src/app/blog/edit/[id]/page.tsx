'use client'
import { useEffect, useState } from 'react'
import { Button, Box, Modal, Typography, Link, Grid, TextField, CssBaseline, Container, DialogActions } from '@mui/material';
import Folder from '@mui/icons-material/Folder';
import NextImage from 'next/image'
import axios from "axios"
import VisuallyHiddenInput from '@/app/styles/visuallyHiddenInput';
import Style from '@/app/styles/style';

function Edit({ params }: any) {
    const id = params.id;
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [details, setDetails] = useState("");
    const [coverPath, setCoverPath] = useState("/upload-placeholder.jpg");
    const [file, setFile] = useState<File>()
    const [previewAvatar, setPreviewAvatar] = useState<Blob | MediaSource | null>();
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [active, setActive] = useState(true)

    const handleClose = () => {
        setOpenSuccessModal(false)
        window.location.href = `/`;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const api = process.env.NEXT_PUBLIC_API;
        const formData = new FormData();
        if (file) {
            formData.set('file', file);
        }
        formData.set('title', title);
        formData.set('slug', slug);
        formData.set('description', description);
        formData.set('details', details);

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
                    setOpenSuccessModal(true);
                    setActive(false);
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
                            setPreviewAvatar(file);
                            setFile(fileObject)
                        },
                        "image/jpeg",
                        0.8
                    );
                };
            };
        }
    };

    useEffect(() => {
        async function postInfo(): Promise<void> {
            const apiUser = process.env.NEXT_PUBLIC_API;
            await axios
                .get(`${apiUser}/blogs/${id}`)
                .then((response) => {
                    // console.log(response.data);
                    if (response.data) {
                        const data: Post = response.data;
                        setTitle(data.title);
                        setSlug(data.slug);
                        setDescription(data.description);
                        setDetails(data.details);
                        const src = data.cover_path ? `${process.env.NEXT_PUBLIC_API}/medias/${data.cover_path}` : '/upload-placeholder.jpg'
                        setCoverPath(src);
                    }
                })
                .catch((error) => {
                    console.log("error: ", error);
                    setTitle("");
                    setSlug("");
                    setDescription("");
                    setDetails("");
                    setCoverPath("/upload-placeholder.jpg");
                });
        }

        postInfo();
        return () => { };
    }, [id]);

    return (
        <Container maxWidth="lg" sx={{ p: 2 }}>
            <Box dir="rtl">
                <Link href="/">
                    <Button variant="contained">Post list</Button>
                </Link>
            </Box>
            <Box>
                <Typography variant="h6" gutterBottom component="div" align='center'>
                    Update post
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box sx={{ mb: 1 }} display="flex" flexDirection="column" alignItems="center">
                            <div className='preview-image'>
                                {previewAvatar ? (
                                    <NextImage
                                        src={URL.createObjectURL(previewAvatar)}
                                        fill
                                        style={{
                                            objectFit: 'cover',
                                        }}
                                        alt=""
                                    />
                                ) : (
                                    <NextImage
                                        src={coverPath}
                                        fill
                                        style={{
                                            objectFit: 'cover',
                                        }}
                                        alt=""
                                    />
                                )}
                            </div>

                            <Button sx={{ mt: 1 }} component="label" disabled={!active} variant="contained" startIcon={<Folder />} onChange={onSelectFile}>
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
                                    value={title}
                                    variant="outlined"
                                    disabled={!active}
                                    onChange={(e) => setTitle(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="slug"
                                    label="Slug"
                                    placeholder="Slug"
                                    value={slug}
                                    variant="outlined"
                                    disabled={!active}
                                    onChange={(e) => setSlug(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="description"
                                    label="Description"
                                    placeholder="Description"
                                    value={description}
                                    variant="outlined"
                                    disabled={!active}
                                    onChange={(e) => setDescription(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="details"
                                    label="Details"
                                    placeholder="Details"
                                    value={details}
                                    variant="outlined"
                                    disabled={!active}
                                    onChange={(e) => setDetails(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" disabled={!active} variant="contained" fullWidth>
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Box>

            <Modal
                open={openSuccessModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={Style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        The post has been updated.
                    </Typography>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Ok
                        </Button>
                    </DialogActions>
                </Box>
            </Modal>
        </Container>
    )
}

export default Edit;
