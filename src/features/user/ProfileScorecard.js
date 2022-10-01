import { Card, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

import { fNumber } from "../../utils/numberFormat";
function ProfileScorecard({ profile }) {
  const { postCount, FriendCount } = profile;
  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4"> {fNumber(FriendCount)}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Friends
          </Typography>
        </Stack>
        <Stack width={1} textAlign="center">
          <Typography variant="h4"> {fNumber(postCount)}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Posts
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProfileScorecard;
