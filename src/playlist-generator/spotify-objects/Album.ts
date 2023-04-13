/**
 * An album object.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-album
 */
export type Album = {
  id: string;
  name: string;
  artists: string[];
  genres: string[];
  albumArtUrl: string;
};
