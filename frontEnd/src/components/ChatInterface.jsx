import { Bot, LoaderCircle, Sprout } from "lucide-react";
import InputBox from "./InputBox";
import RecommendationCards from "./RecommendationCards";

function ChatInterface({
  formState,
  districts,
  onFieldChange,
  onSubmit,
  loading,
  errorMessage,
  result,
}) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Sprout size={28} />
          </div>
          <h2>AgriMind AI</h2>
          <p className="sidebar-tagline">
            Intelligent Crop Decision Engine
          </p>
        </div>

        <div className="sidebar-features">
          <div className="feature-item">
            <span className="feature-icon">🌤️</span>
            <div>
              <strong>Live Weather</strong>
              <p>Real-time data from Open-Meteo API</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🧮</span>
            <div>
              <strong>Smart Scoring</strong>
              <p>6-factor weighted algorithm</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🌾</span>
            <div>
              <strong>25 Crop Database</strong>
              <p>Comprehensive crop profiles</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <div>
              <strong>Cost & Yield</strong>
              <p>Budget-aware recommendations</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔄</span>
            <div>
              <strong>Crop Rotation</strong>
              <p>Smart rotation compatibility</p>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <p>Built for Indian Farmers</p>
          <small>Powered by Open-Meteo Weather API</small>
        </div>
      </aside>

      <main className="main-panel">
        <div className="panel-topbar">
          <div className="brand">
            <div className="brand-mark">
              <Sprout size={18} />
            </div>
            <div>
              <strong>AgriMind AI</strong>
              <p>Precision crop recommendations powered by live weather</p>
            </div>
          </div>
          <button
            type="button"
            className="primary-action"
            id="btn-recommend"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle size={16} className="spin" />
            ) : (
              <Bot size={16} />
            )}
            <span>{loading ? "Analyzing weather & crops..." : "Analyze & Recommend"}</span>
          </button>
        </div>

        <InputBox
          formState={formState}
          districts={districts}
          onFieldChange={onFieldChange}
        />

        {errorMessage ? (
          <div className="error-banner" id="error-message">{errorMessage}</div>
        ) : null}

        <RecommendationCards result={result} />
      </main>
    </div>
  );
}

export default ChatInterface;
