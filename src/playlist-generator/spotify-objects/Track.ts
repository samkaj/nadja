/**
 * A track on Spotify. The `id` is used to use the song as a seed for recommendations.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-track
 */
export type Track = {
  id: string;
  name: string;
  artists: string[];
  album: string;
  genres: string[];
  albumArtUrl: string;
  uri: string;
};
