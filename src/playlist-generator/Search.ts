import { SpotifyObjectFactory } from "./SpotifyObjectFactory";
import { Album } from "./spotify-objects/Album";
import { Artist } from "./spotify-objects/Artist";
import { Track } from "./spotify-objects/Track";

export type SpotifyObjects = {
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
};

/**
 * Searches for tracks, albums, and artists on Spotify.
 * @param searchTerm The search term.
 * @returns The search results.
 * @see https://developer.spotify.com/documentation/web-api/reference/search
 */
export const search = async (
  searchTerm: string,
  accessToken: string
): Promise<Track[]> => {
  searchTerm = encodeURIComponent(searchTerm);
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  return data.tracks?.items.map(SpotifyObjectFactory.fromSpotifyTrack) ?? [];
};
