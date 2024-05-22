import React, { useState, useEffect, useRef } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import {
  IconButton,
  Badge,
  Popper,
  Paper,
  Menu,
  MenuItem,
  Grow,
  ClickAwayListener,
  Button,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../auth/AuthProvider";

interface Recommendation {
  id: string;
  name: string;
  uri: string;
}

const CartIcon = () => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const { items } = useCart();
  const { userToken } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const createRecommendationPlaylist = async () => {
    await fetchRecommendations();
  };

  useEffect(() => {
    if (recommendations.length === 0) return;
    console.log(recommendations);
    const createPlaylist = async () => {
      try {
        const currentUserResponse = await fetch(
          "https://api.spotify.com/v1/me",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        const currentUserData = await currentUserResponse.json();
        if (!currentUserResponse.ok) {
          throw new Error(
            `Failed to fetch user data: ${currentUserData.error}`
          );
        }

        const playlistResponse = await fetch(
          `https://api.spotify.com/v1/users/${currentUserData.id}/playlists`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              name: "Recommendations",
              description: `Based on the following seeds: ${items
                .map((track) => `${track.id} - ${track.name} - ${track.type}`)
                .join(",")}`,
              public: false,
            }),
          }
        );

        const playlistData = await playlistResponse.json();
        if (!playlistResponse.ok) {
          const playlistErrorData = await playlistResponse.json();
          throw new Error(
            `Failed to create playlist: ${playlistErrorData.error}`
          );
        }

        const addTracksResponse = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              uris: recommendations.map((track) => track.uri),
            }),
          }
        );

        if (!addTracksResponse.ok) {
          const addTracksErrorData = await addTracksResponse.json();
          throw new Error(
            `Failed to add tracks to playlist: ${addTracksErrorData.error}`
          );
        }

        console.log("Playlist created successfully.");
      } catch (error) {
        console.error("Error creating recommendation playlist:", error);
      }
    };

    if (userToken && recommendations) {
      // Ensure there is a token and recommendations before attempting API calls
      createPlaylist();
    }
  }, [recommendations]);

  const fetchRecommendations = async () => {
    if (!userToken) {
      console.error("No token available");
      return;
    }
    const recommendationEndpoint = `https://api.spotify.com/v1/recommendations?seed_artists=${items
      .filter((item) => item.type === "artist")
      .map((artist) => artist.id)
      .join(",")}&seed_tracks=${items
      .filter((item) => item.type === "track")
      .map((track) => track.id)
      .join(",")}&limit=30`;
    try {
      const response = await fetch(recommendationEndpoint, {
        method: "GET",
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const data = await response.json();
      setRecommendations(data.tracks);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const handleMouseEnter = () => {
    setHover(true);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
    setTimeout(() => {
      if (!hover) setOpen(false);
    }, 150);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current?.contains(event.target as HTMLElement)) return;
    setOpen(false);
  };

  useEffect(() => {
    const focusOnClose = () => {
      if (open) anchorRef.current?.focus();
    };

    focusOnClose();

    return () => {
      if (!open) anchorRef.current?.blur();
    };
  }, [open]);

  const renderMenu = () => (
    <Grow
      in={open}
      style={{
        transformOrigin: "left top",
      }}
    >
      <Paper>
        <ClickAwayListener onClickAway={handleClose}>
          <Menu
            id="composition-menu"
            anchorEl={anchorRef.current}
            open={open}
            onClose={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
          >
            {items.map((item) => (
              <MenuItem key={item.id}>
                {item.type} - {item.name}
              </MenuItem>
            ))}
            <div>
              <Button onClick={createRecommendationPlaylist}>Checkout</Button>
            </div>
          </Menu>
        </ClickAwayListener>
      </Paper>
    </Grow>
  );

  return (
    <Badge
      badgeContent={items.length}
      color="success"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      overlap="circular"
    >
      <div>
        <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-haspopup="true"
          onMouseOver={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <MusicNoteIcon />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {renderMenu()}
        </Popper>
      </div>
    </Badge>
  );
};

export default CartIcon;
