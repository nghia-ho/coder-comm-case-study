import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Card, Grid, Pagination, Tab, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../components/SearchInput";
import { getFriendsRequest, getFriendsSentRequest } from "./friendSlice";
import UserCard from "./UserCard";

function FriendRequests() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { currentPageUser, usersById, totalPages, totalUsers } = useSelector(
    (state) => state.friend
  );
  const users = currentPageUser.map((userId) => usersById[userId]);
  // console.log(users);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(value);
    if (value === "1") {
      dispatch(getFriendsRequest({ filterName, page }));
    }
    if (value === "2") {
      dispatch(getFriendsSentRequest({ filterName, page }));
    }
  }, [dispatch, filterName, page, value]);
  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  const userCard = (
    <Grid container spacing={3} my={1}>
      {users.map((user) => (
        <Grid key={user._id} item xs={12} md={4}>
          <UserCard profile={user} />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friends Requests
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />

            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 1
                ? `${totalUsers} requests found`
                : totalUsers === 1
                ? `${totalUsers} request found`
                : "No request found"}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Stack>
        </Stack>
        <Grid container spacing={3} my={1}>
          <Box sx={{ width: "100%", typography: "body1", mx: 3 }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Friend Request" value="1" />
                  <Tab label="Request Sent" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">{userCard}</TabPanel>
              <TabPanel value="2">{userCard}</TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Card>
    </Container>
  );
}

export default FriendRequests;
