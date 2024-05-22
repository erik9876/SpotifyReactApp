import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const Login = () => {
  const handleLogin = () => {
    const CLIENT_ID = "***REMOVED***";
    const REDIRECT_URI = "http://localhost:5173/callback";
    const SCOPES =
      "playlist-read-private playlist-read-collaborative user-top-read playlist-modify-public playlist-modify-private";
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;

    window.location.href = authUrl;
  };

  const SpotifyLoginButton = styled(Button)({
    color: "white",
    borderColor: "rgba(255, 255, 255, 0.4)",
    "&:hover": {
      backgroundColor: "rgba(29, 185, 84, 0.4)",
      borderColor: "transparent",
    },
  });

  return (
    <SpotifyLoginButton variant="outlined" onClick={handleLogin}>
      Login with Spotify
    </SpotifyLoginButton>
  );
};

export default Login;
