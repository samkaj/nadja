// React component for showing a playlist

/*
 * Playlist contains a list of tracks.
 * A track is:
 * {
 *  id: string;
 *  name: string;
 *  artists: [{ name: string }];
 *  album: { name: string, images: [{ url: string }], external_urls: { spotify: string } };
 *  preview_url: string;
 *
 * }
 */
const Playlist = (playlist: any) => {
  return (
    <div className="playlist">
      <h1>Playlist</h1>
      <div className="tracks">
        {playlist.playlist.tracks.map((track: any) => (
          <div className="track">
            <img src={track.album.images[0].url} alt="album cover" />
            <div className="track-info">
              <a href={track.album.external_urls.spotify}>
                <h2>{track.name}</h2>
              </a>
              <h3>{track.artists[0].name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
