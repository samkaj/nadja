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
  console.log(playlistName, accessToken, selectedTracks, energy, danceability);
  const res = await fetch(
    `https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=${selectedTracks
      .map((track) => track.id)
      .join(",")}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((res) => res.json());
  return res;
};
