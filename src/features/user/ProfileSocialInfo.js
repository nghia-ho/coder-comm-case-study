import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import { Card, CardHeader, Link } from "@mui/material";
import { Instagram, LinkedIn, Twitter, Facebook } from "@mui/icons-material";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));
function ProfileSocialInfo({ profile }) {
  const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;
  const SOCIALS = [
    {
      name: "Linkedin",
      icon: (
        <IconStyle color="#006097">
          <LinkedIn />
        </IconStyle>
      ),
      href: linkedinLink,
    },
    {
      name: "Twitter",
      icon: (
        <IconStyle color="#006098">
          <Twitter />
        </IconStyle>
      ),
      href: twitterLink,
    },
    {
      name: "Facebook",
      icon: (
        <IconStyle color="#006097">
          <Facebook />
        </IconStyle>
      ),
      href: facebookLink,
    },
    {
      name: "Instagram",
      icon: (
        <IconStyle color="#006097">
          <Instagram />
        </IconStyle>
      ),
      href: instagramLink,
    },
  ];
  return (
    <Card>
      <CardHeader title="Social" />
      <Stack spacing={2} sx={{ p: 3 }}>
        {SOCIALS.map((link) => (
          <Stack direction="row" alignItems="center" key={link.name}>
            {link.icon}

            <Link component="span" variant="body2" color="text.primary" noWrap>
              {link.href}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

export default ProfileSocialInfo;
