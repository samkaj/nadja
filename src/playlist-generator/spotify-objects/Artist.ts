/**
 * An artist.
 * @see https://developer.spotify.com/documentation/web-api/reference/get-an-artist
 */
export type Artist = {
  id: string;
  name: string;
  genres: string[];
  imageUrl: string;
};
