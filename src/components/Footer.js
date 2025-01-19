import React from 'react';
import { Box, Typography, Link, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import JavascriptIcon from '@mui/icons-material/Javascript';
import WebIcon from '@mui/icons-material/Web';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'primary.main',
        color: 'white',
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Typography
          variant="body2"
          align="center"
          sx={{ color: 'white' }}
        >
          Designed by{' '}
          <Link
            href="https://www.instagram.com/pedro_egr"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'white',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              }
            }}
          >
            @pedro_egr
          </Link>
        </Typography>
        
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            '& svg': {
              fontSize: 20,
              opacity: 0.9,
              transition: 'opacity 0.2s',
              '&:hover': {
                opacity: 1
              }
            }
          }}
        >
          <Link
            href="https://github.com/geek2geeks/scheduler-app"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'white' }}
          >
            <GitHubIcon titleAccess="View on GitHub" />
          </Link>
          <JavascriptIcon titleAccess="Built with React.js" />
          <WebIcon titleAccess="Styled with Material-UI" />
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;