import ReviewSearchBar from "../components/ReviewSearchBar";
import ReviewsList from "../components/ReviewList";

export default function Reviews() {
  return (
    <div className="page">
      <section
        style={{
          padding: "2rem 0",
        }}
      >
        <h2 style={{ marginBottom: "0.75rem" }}>REVIEWS</h2>

        {/* top tools (search + add review) */}
        <ReviewSearchBar />

        {/* the stacked feed of reviews */}
        <ReviewsList />
      </section>
    </div>
  );
}