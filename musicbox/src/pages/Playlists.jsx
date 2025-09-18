import RevealOnScroll from "../components/RevealOnScroll";
import RowErrorBoundary from "../components/RowErrorBoundary";
import NewMusicRow from "../components/NewMusicRow";
import FavoritesRow from "../components/FavoritesRow";
import YourPlaylistsRow from "../components/YourPlaylistsRow";
import SavedPlaylistsRow from "../components/SavedPlaylistsRow";

export default function Playlists() {
  return (
    <div style={{ padding: "2rem" }}>
      <RevealOnScroll from="up" distance={40}>
        <RowErrorBoundary title="New Music">
          <NewMusicRow />
        </RowErrorBoundary>
      </RevealOnScroll>

      <RevealOnScroll from="up" distance={40}>
        <RowErrorBoundary title="Favorites">
          <FavoritesRow />
        </RowErrorBoundary>
      </RevealOnScroll>

      <RevealOnScroll from="up" distance={40}>
        <RowErrorBoundary title="Your Playlists">
          <YourPlaylistsRow />
        </RowErrorBoundary>
      </RevealOnScroll>

      <RevealOnScroll from="up" distance={40}>
        <RowErrorBoundary title="Saved Playlists">
          <SavedPlaylistsRow />
        </RowErrorBoundary>
      </RevealOnScroll>
    </div>
  );
}