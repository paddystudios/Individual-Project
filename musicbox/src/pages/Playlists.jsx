import RowErrorBoundary from "../components/RowErrorBoundary";
import NewMusicRow from "../components/NewMusicRow";
import FavoritesRow from "../components/FavoritesRow";
import YourPlaylistsRow from "../components/YourPlaylistsRow";
import SavedPlaylistsRow from "../components/SavedPlaylistsRow";

export default function Playlists() {
  return (
    <div style={{ padding: "2rem" }}>
      <RowErrorBoundary title="New Music">
        <NewMusicRow />
      </RowErrorBoundary>

      <RowErrorBoundary title="Favorites">
        <FavoritesRow />
      </RowErrorBoundary>

      <RowErrorBoundary title="Your Playlists">
        <YourPlaylistsRow />
      </RowErrorBoundary>

      <RowErrorBoundary title="Saved Playlists">
        <SavedPlaylistsRow />
      </RowErrorBoundary>
    </div>
  );
}