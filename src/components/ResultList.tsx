import { useSearch } from "../contexts/SearchContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const ResultList = () => {
  const { results } = useSearch() ?? { results: null };

  if (!results) return <Typography variant="h6">No results found</Typography>;

  return (
    <div>
      <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
        Search Results:
      </Typography>

      {/* Display Albums */}
      {results?.albums && results.albums.items[0] !== null && (
        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Albums
            </Typography>
          </Grid>
          {results.albums.items.map((album) => (
            <Grid item xs={12} md={6} key={album.id}>
              <Card sx={{ display: "flex", height: 150 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={album.images[0]?.url}
                  alt={album.name}
                />
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="h6">{album.name}</Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {album.release_date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Display Artists */}
      {results?.artists && results.artists.items[0] !== null && (
        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Artists
            </Typography>
          </Grid>
          {results.artists.items.map((artist) => (
            <Grid item xs={12} md={6} key={artist.id}>
              <Card sx={{ display: "flex", height: 150 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={artist.images[0]?.url}
                  alt={artist.name}
                />
                <CardContent sx={{ flex: "1 0 auto" }}>
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
      {results?.tracks && results.tracks.items[0] !== null && (
        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Tracks
            </Typography>
          </Grid>
          {results.tracks.items.map((track) => (
            <Grid item xs={12} md={6} key={track.id}>
              <Card sx={{ display: "flex", height: 150 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={track.album.images[0]?.url}
                  alt={track.name}
                />
                <CardContent sx={{ flex: "1 0 auto" }}>
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

      {/* Display Playlists */}
      {results?.playlists && results.playlists.items[0] !== null && (
        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Playlists
            </Typography>
          </Grid>
          {results.playlists.items.map((playlist) => (
            <Grid item xs={12} md={6} key={playlist.id}>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Owner: {playlist.owner.display_name}
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

export default ResultList;
