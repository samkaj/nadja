import { useContext, useState } from "react";
import { UserContext } from "../../context/User";
import { search } from "../../playlist-generator/Search";
import "./generator.scss";
import "../../shared/shadow.scss";
import { FaSearch } from "react-icons/fa";
import { Track } from "../../playlist-generator/spotify-objects/Track";
import { PrimaryButton } from "../../components/buttons/Button";
import { getRecommendations } from "../../playlist-generator/PlaylistGenerator";
import TrackContainer from "./TrackContainer";

const Generator = () => {
  const { user } = useContext(UserContext);
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [playlistName, setPlaylistName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [energy, setEnergy] = useState<number>(0.5);
  const [danceability, setDanceability] = useState<number>(0.5);

  const handlePlaylistNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleEnergyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnergy(parseFloat(e.target.value) / 100);
  };

  const handleDanceabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDanceability(parseFloat(e.target.value) / 100);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const query = input.value;
    const results = await search(query, user?.accessToken ?? "");
    setSearchResults(results);
  };

  const handlePlaylistSubmit = async () => {
    const playlist = await getRecommendations({
      playlistName: playlistName,
      description,
      energy,
      danceability,
      selectedTracks,
      accessToken: user?.accessToken ?? "",
    });
    console.log(playlist);
  };

  type SearchResultProps = {
    track: Track;
  };

  const onSelect = (track: Track) => {
    if (selectedTracks.length >= 5) {
      return;
    }

    if (selectedTracks.some((t) => t.id === track.id)) {
      setSelectedTracks((prev) => prev.filter((t) => t.id !== track.id));
      setSearchResults((prev) => [...prev, track]);
    } else {
      setSelectedTracks((prev) => [...prev, track]);
      setSearchResults((prev) => prev.filter((t) => t.id !== track.id));
    }
  };

  return (
    <main>
      <div className="full-width generator-wrapper">
        <h1 className="large">Playlist Generator</h1>
        <p>
          Search -{">"} Select 5 tracks -{">"} Select mood -{">"} Choose name -
          {">"} Generate.
        </p>
        <form onSubmit={handleSearch} className="search shadow ">
          <FaSearch />
          <input className="medium" placeholder="Search..." type="text" />
        </form>
      </div>
      <section className="results shadow">
        <div className="left">
          <h1 className="shadow">Search Results</h1>
          <ul>
            {searchResults.map((track) => {
              return (
                <TrackContainer track={track} onClick={() => onSelect(track)} />
              );
            })}
          </ul>
        </div>

        <aside className="right">
          <h1>Details</h1>
          <label htmlFor="name">Name</label>
          <input
            onInput={handlePlaylistNameChange}
            type="text"
            name="Name"
            id="name"
            maxLength={100}
            placeholder="Playlist name..."
          />
          <label htmlFor="description">Description</label>
          <textarea
            onInput={handleDescriptionChange}
            name="Description"
            id="description"
            rows={4}
            maxLength={300}
            placeholder="Optional description..."
          />
          <h1>Mood</h1>
          <div className="mood-sliders">
            <div className="slider">
              <label htmlFor="energy">Energy</label>
              <input
                onInput={handleEnergyChange}
                type="range"
                name="Energy"
                id="energy"
                min={0}
                max={100}
              />
            </div>
            <div className="slider">
              <label htmlFor="danceability">Danceability</label>
              <input
                onInput={handleDanceabilityChange}
                type="range"
                name="Danceability"
                id="danceability"
                min={0}
                max={100}
              />
            </div>
          </div>
          <div className="selected-tracks">
            <h1>Selected Tracks [{selectedTracks.length}/5]</h1>
            <ul>
              {selectedTracks.map((track) => {
                return (
                  <TrackContainer
                    track={track}
                    onClick={() => onSelect(track)}
                  />
                );
              })}
            </ul>
          </div>
          {selectedTracks.length === 5 && (
            <PrimaryButton
              onClick={handlePlaylistSubmit}
              className="bottom medium"
            >
              Generate
            </PrimaryButton>
          )}
          {selectedTracks.length < 5 && (
            <PrimaryButton className="bottom medium disabled">
              Generate
            </PrimaryButton>
          )}
        </aside>
      </section>
    </main>
  );
};

export default Generator;
