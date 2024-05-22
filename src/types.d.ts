interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

interface Artist {
    id: string;
    name: string;
    popularity: number;
    followers: {
        total: number;
    };
    genres: string[];
    images: { url: string }[];
}