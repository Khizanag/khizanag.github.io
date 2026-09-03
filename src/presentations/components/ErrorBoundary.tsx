import { Component, type ErrorInfo, type ReactNode } from "react";
import { CalloutBox } from "./cards.tsx";
import { SectionHeading, SectionLabel } from "./typography.tsx";
import { C } from "../tokens.ts";

interface ErrorBoundaryProps {
  children: ReactNode;
  onReset: () => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Presentation failed to render:", error, errorInfo.componentStack);
  }

  handleReset = () => {
    this.setState({ error: null });
    this.props.onReset();
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div style={{
        background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'DM Sans', sans-serif",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "96px 32px",
      }}>
        <div style={{ maxWidth: 520 }}>
          <SectionLabel color={C.red}>SOMETHING BROKE</SectionLabel>
          <SectionHeading sub="This presentation stopped rendering. The rest of the collection is unaffected.">
            This presentation crashed
          </SectionHeading>
          <CalloutBox color={C.red} label="ERROR">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.text }}>
              {error.message || String(error)}
            </span>
          </CalloutBox>
          <button
            onClick={this.handleReset}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              marginTop: 32, padding: "10px 20px",
              background: C.accentDim, color: C.accent,
              border: `1px solid ${C.accent}40`,
              borderRadius: 50, cursor: "pointer",
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.01em",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M3 7l4-4M3 7l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to all presentations
          </button>
        </div>
      </div>
    );
  }
}
