import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// interface for the spotify playlist object
interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: { url: string }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: { spotify: string };
    id: string;
  };
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: { href: string; total: number };
  type: string;
  uri: string;
}

interface Playlists {
  items: Playlist[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

const PlaylistList = () => {
  const { userToken } = useAuth();
  const [playlists, setPlaylists] = useState<Playlists | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userToken) {
      console.error("No token available");
      setLoading(false);
      return;
    }

    const fetchPlaylists = async () => {
      const playlistEndpoint = `https://api.spotify.com/v1/me/playlists`;
      try {
        const response = await fetch(playlistEndpoint, {
          method: "GET",
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
      setLoading(false);
    };

    fetchPlaylists();
  }, [userToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userToken ? (
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
            Your Playlist Library
          </Typography>
          {playlists && playlists.items[0] !== null ? (
            <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
              {playlists.items.map((playlist) => (
                <Grid item xs={12} md={6} key={playlist.name}>
                  <Card sx={{ display: "flex", height: 150 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image={playlist.images[0]?.url}
                      alt={playlist.name}
                    />
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography variant="h6">{playlist.name}</Typography>
                      <Typography variant="body2">
                        Owner: {playlist.owner.display_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {playlist.href}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" gutterBottom>
              No playlists found or unable to fetch.
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          Please log in to view your playlists
        </Typography>
      )}
    </>
  );
};

export default PlaylistList;
