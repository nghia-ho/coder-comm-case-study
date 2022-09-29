import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Card,
  Box,
  TablePagination,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./friendSlice";
import SearchInput from "../../components/SearchInput";
import UserTable from "./UserTable";
function AddFriend() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const { currentPageUser, usersById, totalUsers } = useSelector(
    (state) => state.friend
  );
  const users = currentPageUser.map((userId) => usersById[userId]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers({ filterName, page: page + 1, limit: rowPerPage }));
  }, [dispatch, filterName, page, rowPerPage]);

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Add Friends
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
                ? `${totalUsers} users found`
                : totalUsers === 1
                ? `${totalUsers} user found`
                : "No user found"}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <TablePagination
              sx={{
                "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon":
                  {
                    display: { xs: "none", md: "block" },
                  },
              }}
              component="div"
              count={totalUsers ? totalUsers : 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
          <UserTable users={users} />
        </Stack>
      </Card>
    </Container>
  );
}

export default AddFriend;
