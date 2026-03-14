import {
  Thermometer,
  CloudRain,
  Droplets,
  TrendingUp,
  ShieldCheck,
  Sprout,
  Leaf,
  Timer,
  IndianRupee,
  BarChart3,
  AlertTriangle,
} from "lucide-react";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <CloudRain size={20} />
        <h3>Live Weather Data</h3>
        <span className="weather-location">
          {weather.location?.district}, {weather.location?.state}
        </span>
      </div>
      <div className="weather-metrics">
        <div className="weather-metric">
          <Thermometer size={18} className="weather-icon temp" />
          <div>
            <span className="weather-value">{weather.temperature}°C</span>
            <span className="weather-label">Temperature</span>
          </div>
        </div>
        <div className="weather-metric">
          <CloudRain size={18} className="weather-icon rain" />
          <div>
            <span className="weather-value">{weather.precipitation} mm</span>
            <span className="weather-label">Precipitation (24h)</span>
          </div>
        </div>
        <div className="weather-metric">
          <Droplets size={18} className="weather-icon humidity" />
          <div>
            <span className="weather-value">{weather.humidity}%</span>
            <span className="weather-label">Humidity</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreBreakdown({ details }) {
  if (!details) return null;

  const factors = [
    { label: "Weather Fit", value: details.weather_score, weight: "30%", color: "#10b981" },
    { label: "Budget Match", value: details.budget_score, weight: "20%", color: "#f59e0b" },
    { label: "Labour Match", value: details.labour_score, weight: "15%", color: "#6366f1" },
    { label: "Water Match", value: details.water_score, weight: "15%", color: "#3b82f6" },
    { label: "Crop Rotation", value: details.rotation_score, weight: "10%", color: "#ec4899" },
    { label: "Profitability", value: details.profitability_score, weight: "10%", color: "#8b5cf6" },
  ];

  return (
    <div className="score-breakdown">
      {factors.map((factor) => (
        <div className="score-factor" key={factor.label}>
          <div className="score-factor-header">
            <span>{factor.label}</span>
            <span className="score-weight">({factor.weight})</span>
            <strong>{factor.value}%</strong>
          </div>
          <div className="score-bar-bg">
            <div
              className="score-bar-fill"
              style={{
                width: `${factor.value}%`,
                background: factor.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CropCard({ crop, rank }) {
  const riskClass =
    crop.risk_level === "Low"
      ? "risk-low"
      : crop.risk_level === "High"
        ? "risk-high"
        : "risk-medium";

  const medalEmoji = rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉";

  return (
    <article className={`crop-card ${rank === 1 ? "crop-card-top" : ""}`} id={`crop-card-${rank}`}>
      <div className="crop-card-header">
        <div className="crop-rank">
          <span className="medal">{medalEmoji}</span>
          <div>
            <h3>{crop.crop}</h3>
            <span className="crop-season">
              <Timer size={14} /> {crop.crop_info?.season} · {crop.crop_info?.growing_days} days
            </span>
          </div>
        </div>
        <div className="crop-score-badge">
          <span className="score-number">{crop.suitability_score}</span>
          <span className="score-label">/ 100</span>
        </div>
      </div>

      <div className="crop-card-stats">
        <div className="stat-item">
          <IndianRupee size={16} />
          <div>
            <span className="stat-label">Est. Cost</span>
            <strong>{crop.estimated_cost}</strong>
          </div>
        </div>
        <div className="stat-item">
          <TrendingUp size={16} />
          <div>
            <span className="stat-label">Expected Yield</span>
            <strong>{crop.expected_yield}</strong>
          </div>
        </div>
        <div className="stat-item">
          <ShieldCheck size={16} />
          <div>
            <span className="stat-label">Risk Level</span>
            <strong className={`risk-badge ${riskClass}`}>{crop.risk_level}</strong>
          </div>
        </div>
        <div className="stat-item">
          <BarChart3 size={16} />
          <div>
            <span className="stat-label">Market Price</span>
            <strong>{formatCurrency(crop.crop_info?.market_price)}/ton</strong>
          </div>
        </div>
      </div>

      <div className="crop-card-info">
        <div className="info-pills">
          <span className="info-pill">
            <Thermometer size={13} /> {crop.crop_info?.ideal_temp}
          </span>
          <span className="info-pill">
            <CloudRain size={13} /> {crop.crop_info?.rainfall_range}
          </span>
          <span className="info-pill">
            <Droplets size={13} /> Water: {crop.crop_info?.water_requirement}
          </span>
          <span className="info-pill">
            <Sprout size={13} /> Labour: {crop.crop_info?.labour_need}
          </span>
        </div>
      </div>

      <ScoreBreakdown details={crop.details} />
    </article>
  );
}

function RecommendationCards({ result }) {
  if (!result) {
    return (
      <section className="results-shell empty-state" id="results-placeholder">
        <Leaf size={48} className="empty-icon" />
        <h2>Your recommendations will appear here</h2>
        <p>
          Fill in your farm details and click <strong>"Analyze & Recommend"</strong> to get
          AI-powered crop suggestions based on live weather data, budget
          analysis, and market trends.
        </p>
      </section>
    );
  }

  const { top_crops, weather_data, farmer_profile } = result;

  return (
    <section className="results-shell" id="results-section">
      <div className="results-header">
        <div>
          <span className="eyebrow">AgriMind AI Recommendation</span>
          <h2>Top 3 Crops for Your Farm</h2>
          <p className="results-subtitle">
            Based on live weather in{" "}
            <strong>
              {farmer_profile?.district}, {farmer_profile?.state}
            </strong>{" "}
            · ₹{Number(farmer_profile?.budget || 0).toLocaleString("en-IN")} budget ·{" "}
            {farmer_profile?.land_area} acres
          </p>
        </div>
      </div>

      <WeatherCard weather={weather_data} />

      <div className="crops-grid">
        {top_crops?.map((crop, index) => (
          <CropCard key={crop.crop} crop={crop} rank={index + 1} />
        ))}
      </div>
    </section>
  );
}

export default RecommendationCards;
