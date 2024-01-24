'use client'
import { useState } from 'react'
import { styled } from '@mui/material/styles';
import { Button, Box, Modal, Typography, Link, Grid, TextField, CssBaseline, Container } from '@mui/material';
import Folder from '@mui/icons-material/Folder';
import NextImage from 'next/image'
import axios from "axios"
import VisuallyHiddenInput from '@/app/styles/visuallyHiddenInput';
import Style from '@/app/styles/style';

function Create() {
  const [file, setFile] = useState<File>()
  const [previewAvatar, setPreviewAvatar] = useState<Blob | MediaSource | null>();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");

  const handleOpen = () => setOpenSuccessModal(true);
  const handleClose = () => {
    setOpenSuccessModal(false)
    setPreviewAvatar(null);
  };

  // const onUpload = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (!file) return
  // }

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
        .post(`${api}/blogs`, formData)
        .then((response) => {
          if (response.data.id) {
            handleOpen();
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
                    src="/upload-placeholder.jpg"
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                    alt=""
                  />
                )}
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
                  variant="outlined"
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="slug"
                  label="Slug"
                  variant="outlined"
                  onChange={(e) => setSlug(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  label="Description"
                  variant="outlined"
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="details"
                  label="Details"
                  variant="outlined"
                  onChange={(e) => setDetails(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Create
                </Button>
              </Grid>
            </Grid>

            {/* <Box>
            <Button
              type="submit"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </Box> */}
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
            Create post successfully.
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your file in [root]/public/uploads directory.
          </Typography> */}
        </Box>
      </Modal>
    </Container>
  )
}

export default Create;
