import { Link, Typography } from "@mui/material";
import React from "react";

const MainFooter = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" p={1}>
      {"Copyright "}
      <Link color="inherit" href="https:?">
        CoderSchool
      </Link>{" "}
      {""}
      {new Date().getFullYear()}
      {""}
    </Typography>
  );
};

export default MainFooter;
