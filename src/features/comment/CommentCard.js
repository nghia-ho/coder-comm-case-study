import React from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";
import { LoadingButton } from "@mui/lab";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function CommentCard({ comment, postId }) {
  const { user } = useAuth();
  const currentUserId = user?._id;
  const authorComment = comment?.author?._id;

  const dispatch = useDispatch();
  const handleDeleteComment = (commentId, postId) => {
    if (currentUserId !== authorComment) {
      return null;
    }
    if (currentUserId === authorComment) {
      dispatch(deleteComment({ commentId, postId }));
    }
    // console.log(commentId, postId);
  };

  const [openModifyPost, setOpenModifyPost] = React.useState(false);
  const handleOpenModifyPost = () => setOpenModifyPost(true);
  const handleCloseModifyPost = () => setOpenModifyPost(false);

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

  return (
    <Stack direction="row" spacing={2}>
      <Modal
        open={openModifyPost}
        onClose={handleCloseModifyPost}
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
            <Typography variant="h5">Delete Comment?</Typography>
          </Stack>

          <Divider />
          <Stack spacing={3} sx={{ mt: 3 }} alignItems="center">
            <Typography variant="subtitle2  ">
              Are you sure you want to delete this comment?
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
              onClick={() => setOpenModifyPost(false)}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              onClick={() => handleDeleteComment(comment._id, postId)}
              onClose={handleCloseModifyPost}
            >
              Delete
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>

          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
            {currentUserId === authorComment && (
              <IconButton onClick={handleOpenModifyPost}>
                <HighlightOffIcon />
              </IconButton>
            )}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
