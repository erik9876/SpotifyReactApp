# Spotify Playlist Creator 🎧

This project is a web application built with React and TypeScript that allows users to generate custom Spotify playlists based on their selected seed tracks. Using the Spotify API, the app provides an intuitive interface to search for tracks and create personalized playlists.

This project was created to explore and demonstrate the use of React and the Spotify API for playlist generation, with plans to extend its features.

## Features
- **Playlist Library**: Users can get an overview over their current playlists in Spotify.
- **Top Items**: Users can get insights into their short term most listened artists and tracks and can use them as seed tracks for playlist generation.
- **Search Tracks**: Users can search for items (albums, artists, tracks and playlists) via the Spotify API.
- **Generate Playlists**: Create custom playlists based on the seed tracks and artists and add them directly to your Spotify account.
- (Planned) **Currently Playing**: Allow users to see the currently playing track.
- (Planned) **Search for Seeds**: Enable users to use search results as seeds for playlist generation.
- (Planned) **Remove Tracks**: Quickly remove unwanted tracks from playlists.
- (Planned) **Modify Range for Top Items**: Have also insights into mid and long time top items.

## Installation

To run this project locally, follow these steps:

### Prerequisites
- **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).
- **Spotify Developer Account**: You'll need a Spotify Developer Account to get your client ID and secret. Create one [here](https://developer.spotify.com/dashboard/).

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/https://github.com/erik9876/SpotifyReactApp.git
2. Navigate to the project directory:
   ```bash
   cd SpotifyReactApp
3. Install the dependencies:
   ```bash
   npm install
4. Create a .env file in the root of the project and add your Spotify API credentials:
   ```bash
   VITE_CLIENT_ID=your-client-id
   VITE_CLIENT_SECRET=your-client-secret
5. Run the app
   ```bash
   npm start
6. Open http://localhost:5173 in your browser to view the app.