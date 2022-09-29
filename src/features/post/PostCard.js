import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../ultils/formatTime";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import PostReaction from "./PostReaction";
const PostCard = ({ post }) => {
  return (
    <Card>
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
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <MoreVert sx={{ fontSize: 30 }} />
          </IconButton>
        }
      />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>
        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}
        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
};

export default PostCard;
