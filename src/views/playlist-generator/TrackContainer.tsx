import { useState } from "react";
import { Track } from "../../playlist-generator/spotify-objects/Track";
import "./generator.scss";
import "../../shared/shadow.scss";

type TrackContainerProps = {
  track: Track;
  onClick: () => void;
};

const TrackContainer = ({ track, onClick }: TrackContainerProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected((prev) => !prev);
    onClick();
  };

  return (
    <li
      onClick={handleClick}
      key={track.id}
      className={`track ${isSelected ? "selected" : ""}`}
    >
      <img src={track.albumArtUrl} alt="" />
      <div className="track-info">
        <span className="track-name">{track.name}</span>
        <br />
        <span className="track-artist">
          {track.artists.map((artist) => artist).join(", ")}
        </span>
      </div>
    </li>
  );
};

export default TrackContainer;
