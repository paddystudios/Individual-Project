import { Component } from "react";

export default class RowErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || "Row failed to render." };
  }
  componentDidCatch(error, info) {
    // Optional: log somewhere
    console.error("Playlists row crashed:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ marginBottom: "0.75rem", fontWeight: 300 }}>{this.props.title || "Section"}</h2>
          <div style={{ padding: "1rem", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12 }}>
            Couldn’t load this section.
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}