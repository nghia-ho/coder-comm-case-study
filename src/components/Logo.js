import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import logoImg from "../logo1.png";

import React from "react";

const Logo = ({ disable = false, sx }) => {
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );
  if (disable) {
    return <>{logo}</>;
  }
  return <RouterLink to="/">{logo}</RouterLink>;
};

export default Logo;
