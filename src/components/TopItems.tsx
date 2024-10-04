import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useCart } from "../contexts/CartContext";

// please create a interface that matches the artists object which comes as a response from the spotify api
interface Artists {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Artist[];
}

interface Tracks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Track[];
}

// please create a interface that matches the artist object which comes as a response from the spotify api
interface Artist {
  id: string;
  name: string;
  href: string;
  external_urls: { spotify: string };
  images: { url: string }[];
  followers: { total: number };
  genres: string[];
  popularity: number;
  type: string;
  uri: string;
}

// please create a interface that matches the track object which comes as a response from the spotify api
interface Track {
  id: string;
  name: string;
  href: string;
  external_urls: { spotify: string };
  album: {
    images: { url: string }[];
    name: string;
  };
  artists: Artist[];
  popularity: number;
  type: string;
  uri: string;
}

interface SelectedIds {
  [key: string]: boolean;
}

const TopItems = () => {
  const { userToken, loggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [topArtists, setTopArtists] = useState<Artists | null>(null);
  const [topTracks, setTopTracks] = useState<Tracks | null>(null);
  const [hover, setHover] = useState(false);
  const [selectedIds, setSelectedIds] = useState<SelectedIds>({});
  const { addItem, removeItem } = useCart();

  useEffect(() => {
    if (!loggedIn) {
      console.error("User is not logged in!");
      setLoading(false);
      return;
    }

    const fetchTopArtists = async () => {
      const topArtistsEndpoint = `https://api.spotify.com/v1/me/top/artists?limit=8&time_range=short_term`;
      try {
        const response = await fetch(topArtistsEndpoint, {
          method: "GET",
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const data = await response.json();
        setTopArtists(data);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
      setLoading(false);
    };

    const fetchTopTracks = async () => {
      const topTracksEndpoint = `https://api.spotify.com/v1/me/top/tracks?limit=16&time_range=short_term`;
      try {
        const response = await fetch(topTracksEndpoint, {
          method: "GET",
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const data = await response.json();
        setTopTracks(data);
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
      setLoading(false);
    };

    fetchTopArtists();
    fetchTopTracks();
  }, [userToken]);

  const handleSelect = (id: string, name: string, type: "artist" | "track") => {
    if (
      Object.keys(selectedIds).filter((key) => selectedIds[key]).length === 5 &&
      !selectedIds[id]
    ) {
      alert("You can only select up to 5 items");
      return;
    }

    if (selectedIds[id]) {
      removeItem(id);
    } else {
      addItem({ id, name, type });
    }

    setSelectedIds((prev) => {
      const isSelected = !!prev[id]; // Ensure isSelected is a boolean
      return {
        ...prev,
        [id]: !isSelected,
      };
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div style={{paddingBottom: '60px'}}>
        {/* Display Artists */}
        {topArtists && topArtists.items[0] !== null && (
            <Grid container spacing={2} sx={{marginBottom: "20px"}}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  Artists
                </Typography>
              </Grid>
              {topArtists.items.map((artist) => (
                  <Grid item xs={12} md={6} key={artist.id}>
                    <Card
                        sx={{
                          display: "flex",
                          height: 150,
                          cursor: hover ? "pointer" : "default",
                          border: selectedIds[artist.id]
                              ? "2px solid rgba(29, 185, 84, 0.4)"
                              : "none",
                        }}
                        onClick={() => handleSelect(artist.id, artist.name, "artist")}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                      <CardMedia
                          component="img"
                          sx={{width: 151}}
                          image={artist.images[0]?.url}
                          alt={artist.name}
                      />
                      <CardContent sx={{flex: "1 0 auto"}}>
                        <Typography variant="h6">{artist.name}</Typography>
                        <Typography variant="body2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {artist.followers.total} followers
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
              ))}
            </Grid>
        )}

        {/* Display Tracks */}
        {topTracks && topTracks.items[0] !== null && (
            <Grid container spacing={2} sx={{marginBottom: "20px"}}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  Tracks
                </Typography>
              </Grid>
              {topTracks.items.map((track) => (
                  <Grid item xs={12} md={6} key={track.id}>
                    <Card
                        sx={{
                          display: "flex",
                          height: 150,
                          cursor: hover ? "pointer" : "default",
                          border: selectedIds[track.id]
                              ? "2px solid rgba(29, 185, 84, 0.4)"
                              : "none",
                        }}
                        onClick={() => handleSelect(track.id, track.name, "track")}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                      <CardMedia
                          component="img"
                          sx={{width: 151}}
                          image={track.album.images[0]?.url}
                          alt={track.name}
                      />
                      <CardContent sx={{flex: "1 0 auto"}}>
                        <Typography variant="h6">{track.name}</Typography>
                        <Typography variant="body2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Album: {track.album.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
              ))}
            </Grid>
        )}
      </div>
  );
};

export default TopItems;
