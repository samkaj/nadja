import { Album } from "./spotify-objects/Album";
import { Artist } from "./spotify-objects/Artist";
import { Track } from "./spotify-objects/Track";

export const SpotifyObjectFactory = {
  /**
   * Creates a track from a Spotify track object.
   * Do not download or edit the visual content.
   * @param track The Spotify track object.
   * @returns The track.
   * @see https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full
   */
  fromSpotifyTrack: (track: any): Track => ({
    id: track.id,
    name: track.name,
    artists: track.artists.map((artist: any) => artist.name),
    album: track.album.name,
    genres: track.genres,
    albumArtUrl: track.album.images[0]?.url ?? "",
  }),

  /**
   * Creates an album from a Spotify album object.
   * Do not download or edit the visual content.
   * @param album The Spotify album object.
   * @returns The album.
   * @see https://developer.spotify.com/documentation/web-api/reference/object-model/#album-object-full
   */
  fromSpotifyAlbum: (album: any): Album => ({
    id: album.id,
    name: album.name,
    artists: album.artists.map((artist: any) => artist.name),
    genres: album.genres,
    albumArtUrl: album.images[0]?.url ?? "",
  }),

  /**
   * Creates an artist from a Spotify artist object.
   * Do not download or edit the visual content.
   * @param artist The Spotify artist object.
   * @returns The artist.
   * @see https://developer.spotify.com/documentation/web-api/reference/get-an-artist
   */
  fromSpotifyArtist: (artist: any): Artist => ({
    id: artist.id,
    name: artist.name,
    genres: artist.genres,
    imageUrl: artist.images[0]?.url ?? "",
  }),
};
