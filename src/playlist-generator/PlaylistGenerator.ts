import { Track } from "./spotify-objects/Track";

type PlaylistRequest = {
  playlistName: string;
  accessToken: string;
  selectedTracks: Track[];
  energy: number;
  danceability: number;
  description: string;
};

export const getRecommendations = async (request: PlaylistRequest) => {
  const { playlistName, accessToken, selectedTracks, energy, danceability } =
    request;
  const playlist = await fetch(
    `https://api.spotify.com/v1/recommendations?limit=60&target_energy=${energy}&target_danceability=${danceability}&seed_tracks=${selectedTracks
      .map((track) => track.id)
      .join(",")}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((res) => res.json());
  playlist.name = playlistName;
  return playlist;
};
