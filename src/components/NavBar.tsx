import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Login from "../auth/Login";
import ProfileIcon from "../components/ProfileIcon";
import CartIcon from "../components/CartIcon";
import { useAuth } from "../auth/AuthProvider";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { search } = useSearch() ?? { search: async () => {} };
  const navigate = useNavigate();
  const { loggedIn } = useAuth();

  const handleSearch = (event: any) => {
    event.preventDefault();
    search(searchTerm);
    navigate("/search");
  };

  return (
    <AppBar position="static" sx={{ marginBottom: "10px" }}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setSearchTerm("")}
            >
              <img src="/spotify_logo.png" alt="Spotify Logo" height={50} />
              <Typography variant="h6" noWrap component="div" sx={{ ml: 2 }}>
                Spotify Search
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Link
                to="/playlists"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                My Playlists
              </Link>
              <Link
                to="/top"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Top Items
              </Link>
              <Link
                to="/search"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Search
              </Link>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                />
              </Search>
              {loggedIn && <CartIcon />}
              {loggedIn ? <ProfileIcon /> : <Login />}
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
