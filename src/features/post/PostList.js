import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { getPosts } from "./postSlice";

const PostList = ({ userId }) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { postsById, currentPagePosts, totalPosts, isLoading } = useSelector(
    (state) => state.post
  );
  const posts = currentPagePosts.map((postId) => postsById[postId]);

  useEffect(() => {
    if (userId) dispatch(getPosts(userId, page));
  }, [dispatch, userId, page]);
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post?._id} post={post} />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {totalPosts ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalPosts) && posts.length >= totalPosts}
          >
            Loadmore
          </LoadingButton>
        ) : (
          <Typography variant="h6">No post yet</Typography>
        )}
      </Box>
    </>
  );
};

export default PostList;
