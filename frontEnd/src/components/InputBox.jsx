import { previousCropOptions } from "../data/options";

function InputBox({ formState, districts, onFieldChange }) {
  return (
    <div className="workspace-grid">
      <section className="hero-card">
        <span className="eyebrow">AgriMind AI — Smart Crop Advisor</span>
        <h1>Grow smarter, harvest better</h1>
        <p>
          Enter your farm details below. AgriMind AI will analyse real-time
          weather conditions and calculate the best crops for your specific
          location, budget, and resources.
        </p>
      </section>

      {/* Location Section */}
      <section className="form-card" id="section-location">
        <div className="section-header">
          <span>📍 1. Farm Location</span>
        </div>
        <div className="field-grid">
          <label>
            <span>State</span>
            <select
              id="input-state"
              value={formState.state}
              onChange={(e) => onFieldChange("state", e.target.value)}
            >
              <option value="">Select state</option>
              {Object.keys(districts).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>District</span>
            <select
              id="input-district"
              value={formState.district}
              onChange={(e) => onFieldChange("district", e.target.value)}
              disabled={!formState.state}
            >
              <option value="">Select district</option>
              {(districts[formState.state] || []).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {/* Land & Budget Section */}
      <section className="form-card" id="section-farm">
        <div className="section-header">
          <span>🌾 2. Land & Budget</span>
        </div>
        <div className="field-grid">
          <label>
            <span>Land Area (acres)</span>
            <input
              id="input-land-area"
              type="number"
              min="1"
              max="500"
              value={formState.landArea}
              onChange={(e) =>
                onFieldChange("landArea", Number(e.target.value) || 1)
              }
              placeholder="e.g. 5"
            />
          </label>
          <label>
            <span>Budget (₹)</span>
            <input
              id="input-budget"
              type="number"
              min="1000"
              step="1000"
              value={formState.budget}
              onChange={(e) =>
                onFieldChange("budget", Number(e.target.value) || 10000)
              }
              placeholder="e.g. 50000"
            />
          </label>
        </div>
      </section>

      {/* Labour & Crop History */}
      <section className="form-card" id="section-labour">
        <div className="section-header">
          <span>👨‍🌾 3. Labour & History</span>
        </div>
        <div className="field-grid">
          <label>
            <span>Labour Availability</span>
            <select
              id="input-labour"
              value={formState.labour}
              onChange={(e) => onFieldChange("labour", e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label>
            <span>Previous Crop</span>
            <select
              id="input-previous-crop"
              value={formState.previousCrop}
              onChange={(e) => onFieldChange("previousCrop", e.target.value)}
            >
              <option value="">None / Skip</option>
              {previousCropOptions.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>
    </div>
  );
}

export default InputBox;
