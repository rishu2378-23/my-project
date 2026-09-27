import React, { useState } from "react";
import "./BmiCalculator.css";

export default function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);
  const [category, setCategory] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  const calculateBmi = (e) => {
    e.preventDefault();
    setError("");

    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      setError("Please enter valid positive numbers for height and weight.");
      return;
    }

    const heightInMeters = h / 100;
    const bmi = w / (heightInMeters * heightInMeters);
    const roundedBmi = parseFloat(bmi.toFixed(1));

    setBmiResult(roundedBmi);

    let cat = "";
    let recs = [];

    if (roundedBmi < 18.5) {
      cat = "Underweight";
      recs = [
        "Restorative Yoga: Nourish body and mind with gentle, supported postures.",
        "Gentle Hatha: Build foundational strength at a comfortable pace.",
        "Yin Yoga: Focus on deep connective tissue health and mindful relaxation."
      ];
    } else if (roundedBmi >= 18.5 && roundedBmi <= 24.9) {
      cat = "Healthy Weight";
      recs = [
        "Vinyasa Flow: Maintain cardiovascular health and fluid movement.",
        "Hatha Yoga: Perfect for balancing alignment, flexibility, and core stability.",
        "Ashtanga Yoga: Build stamina and deepen mindfulness."
      ];
    } else if (roundedBmi >= 25 && roundedBmi <= 29.9) {
      cat = "Overweight";
      recs = [
        "Power Yoga: High-energy flows to boost metabolism and calorie burn.",
        "Dynamic Vinyasa: Strengthen muscles while increasing aerobic capacity.",
        "Core-Focused Yoga: Tone abdominal muscles and support spinal health."
      ];
    } else {
      cat = "Obese";
      recs = [
        "Gentle Flow & Chair Yoga: Low-impact movements friendly to joints.",
        "Restorative & Therapeutic Yoga: Safe, accessible stretches for mobility.",
        "Pranayama & Meditation: Focus on breathwork, stress reduction, and gradual conditioning."
      ];
    }

    setCategory(cat);
    setRecommendations(recs);
  };

  const handleReset = () => {
    setHeight("");
    setWeight("");
    setBmiResult(null);
    setCategory("");
    setRecommendations([]);
    setError("");
  };

  return (
    <div className="bmi-calculator-container">
      <div className="bmi-card">
        <h2>Yoga BMI & Routine Calculator</h2>
        <p className="bmi-subtitle">Discover your Body Mass Index and personalized yoga regimen.</p>

        {error && <div className="bmi-error">{error}</div>}

        <form onSubmit={calculateBmi} className="bmi-form">
          <div className="input-group">
            <label htmlFor="height">Height (cm)</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 170"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 65"
              required
            />
          </div>

          <div className="bmi-buttons">
            <button type="submit" className="btn-calculate">Calculate BMI</button>
            <button type="button" className="btn-reset" onClick={handleReset}>Reset</button>
          </div>
        </form>

        {bmiResult !== null && (
          <div className="bmi-results fade-in">
            <div className="bmi-score-box">
              <h3>Your BMI Score: <span className="score-value">{bmiResult}</span></h3>
              <p className={`category-tag ${category.toLowerCase().replace(" ", "-")}`}>
                Category: <strong>{category}</strong>
              </p>
            </div>

            <div className="recommendations-box">
              <h4>🧘 Recommended Yoga Routines:</h4>
              <ul>
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
