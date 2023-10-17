import "../playlist-generator/generator.scss";
import TrackContainer from "../playlist-generator/TrackContainer";
import { SpotifyObjectFactory } from "../../playlist-generator/SpotifyObjectFactory";

const Playlist = (playlist: any) => {
  return (
    <div className="playlist">
      <h1>Playlist: {playlist.playlist.name}</h1>
      <div className="tracks">
        {playlist.playlist.tracks.map((track: any) => (
          <TrackContainer onClick={()=>{}} track={SpotifyObjectFactory.fromSpotifyTrack(track)} />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
