import { useAuth } from "../auth/AuthProvider.tsx";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

interface PlayingTitleType {
    id: string;
    name: string;
    artist: string;
    album: string;
    image: string;
    duration_ms: number;
    progress_ms: number;
    is_playing: boolean;
}

const PlayingTitle = () => {
    const { userToken, loggedIn } = useAuth();
    const [playingTitle, setPlayingTitle] = useState<PlayingTitleType | null>(null);
    const [progressMs, setProgressMs] = useState<number>(0);

    useEffect(() => {
        if (!loggedIn) {
            console.log("User is not logged in!");
            return;
        }

        const fetchPlayingTitle = async () => {
            const playingTitleEndpoint = `https://api.spotify.com/v1/me/player/currently-playing`;
            try {
                const response = await fetch(playingTitleEndpoint, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${userToken}` },
                });

                if (response.status === 204) {
                    setPlayingTitle(null);
                    return;
                }

                const data = await response.json();
                if (!data || !data.item) {
                    setPlayingTitle(null);
                    return;
                }

                const titleData: PlayingTitleType = {
                    id: data.item.id,
                    name: data.item.name,
                    artist: data.item.artists.map((artist: any) => artist.name).join(", "),
                    album: data.item.album.name,
                    image: data.item.album.images[0]?.url || "",
                    duration_ms: data.item.duration_ms,
                    progress_ms: data.progress_ms,
                    is_playing: data.is_playing,
                };

                setPlayingTitle(titleData);
                setProgressMs(data.progress_ms); // Initiale Fortschrittsanzeige setzen
            } catch (error) {
                console.error("Error fetching currently playing title: ", error);
            }
        };

        // Initial fetch
        fetchPlayingTitle();

        // Dynamische Aktualisierung des Fortschritts alle Sekunde
        const intervalId = setInterval(() => {
            if (playingTitle?.is_playing) {
                setProgressMs((prevProgress) => Math.min(prevProgress + 1000, playingTitle.duration_ms));
            }
        }, 1000); // Erhöhe den Fortschritt jede Sekunde um 1000ms

        // API Call alle 10 Sekunden, um den Titel zu aktualisieren
        const apiIntervalId = setInterval(fetchPlayingTitle, 10000);

        // Cleanup Interval
        return () => {
            clearInterval(intervalId);
            clearInterval(apiIntervalId);
        };
    }, [userToken, loggedIn, playingTitle?.is_playing]);

    // Hilfsfunktion zur Formatierung der Zeit (Minuten:Sekunden)
    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div>
            {playingTitle ? (
                <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                    <Grid item xs={12} md={6} key={playingTitle.id}>
                        <Card
                            sx={{
                                display: "flex",
                                height: 150,
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={playingTitle.image}
                                alt={playingTitle.name}
                            />
                            <CardContent sx={{ flex: "1 0 auto" }}>
                                <Typography variant="h6">{playingTitle.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Artist: {playingTitle.artist}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Album: {playingTitle.album}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {/* Fortschritt und Dauer anzeigen */}
                                    {formatTime(progressMs)} / {formatTime(playingTitle.duration_ms)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            ) : (
                <Typography variant="body2">No song currently playing.</Typography>
            )}
        </div>
    );
};

export default PlayingTitle;
