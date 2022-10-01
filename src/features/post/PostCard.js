import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useCallback, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { fDate } from "../../utils/formatTime";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import PostReaction from "./PostReaction";
import { deletePost, modifyPost } from "./postSlice";
import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
const PostCard = ({ post }) => {
  const [openModifyPost, setOpenModifyPost] = useState(false);
  const [openComfirmDeletePost, setOpenComfirmDeletePost] = useState(false);
  const { user } = useAuth();
  const currentUserId = user?._id;
  const authorPost = post?.author?._id;
  const dispatch = useDispatch();
  const handleDeletePost = (postId) => {
    if (currentUserId !== authorPost) {
      return null;
    }
    if (currentUserId === authorPost) {
      dispatch(deletePost(postId));
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "15px",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const isLoading = useSelector((state) => state.post.isLoading);

  const defaultValues = {
    content: "",
    image: "",
  };

  const methods = useForm({
    defaultValues,
  });
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = (data) => {
    if (currentUserId !== authorPost) {
      return null;
    }
    if (currentUserId === authorPost) {
      const { image, content } = data;
      const postId = post._id;
      dispatch(modifyPost({ content, image, postId }));
    }
  };
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Card>
      <Modal
        open={openModifyPost}
        onClose={() => setOpenModifyPost(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack
              onClick={() => setOpenModifyPost(false)}
              spacing={3}
              alignItems="end"
              sx={{ mb: 2 }}
            >
              <IconButton>
                <ClearIcon />
              </IconButton>
            </Stack>
            <Card sx={{ p: 3 }}>
              <FTextField
                name="content"
                multiline
                fullWidth
                rows={4}
                placeholder="What's on your mind?..."
              />
              <FUploadImage
                name="image"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
              />

              <Stack spacing={3} alignItems="center" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting || isLoading}
                >
                  Save Changes
                </LoadingButton>
              </Stack>
            </Card>
          </FormProvider>
        </Box>
      </Modal>
      <Modal
        open={openComfirmDeletePost}
        onClose={() => setOpenComfirmDeletePost(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack onClick={() => setOpenModifyPost(false)} alignItems="end">
            <IconButton>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Stack spacing={1} sx={{ mb: 3 }} alignItems="center">
            <Typography variant="h5">Move to your trash?</Typography>
          </Stack>

          <Divider />
          <Stack spacing={3} sx={{ mt: 3 }} alignItems="center">
            <Typography variant="subtitle2  ">
              Items in your trash will be automatically deleted after 30 days.
              You can delete them earlier from your Trash by going to Activity
              Log in Settings.
            </Typography>
          </Stack>
          <Stack
            spacing={3}
            sx={{ mt: 3 }}
            direction="row"
            justifyContent="end"
          >
            <LoadingButton
              type="submit"
              variant="Outline"
              onClick={() => setOpenComfirmDeletePost(false)}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              onClick={() => handleDeletePost(post._id)}
              onClose={() => setOpenComfirmDeletePost(false)}
            >
              Move
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post?.author?._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {post?.createdAt && fDate(post?.createdAt)}
          </Typography>
        }
        action={
          <div>
            {currentUserId === authorPost && (
              <>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: "100%",
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <IconButton onClick={() => setOpenComfirmDeletePost(true)}>
                      <ClearIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                    <IconButton onClick={() => setOpenModifyPost(true)}>
                      <AutoFixHighIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        }
      />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post?.content}</Typography>
        {post?.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post?.image} alt="post" />
          </Box>
        )}
        <PostReaction post={post} />
        <CommentList postId={post?._id} />
        <CommentForm postId={post?._id} />
      </Stack>
    </Card>
  );
};

export default PostCard;
