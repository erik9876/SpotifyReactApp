import { Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        textAlign: "center",
        gap: 5,
      }}
    >
      <img src="/spotify_logo.png" alt="Spotify Logo" style={{ height: 200 }} />
      <Typography variant="h3">
        Welcome to a Spotify application
      </Typography>
    </Box>
  );
};

export default Home;
