import { useState, useEffect } from "react";

const countries = [
  { name: "Pakistan", emoji: "🇵🇰", region: "Asia" },
  { name: "Finland", emoji: "🇫🇮", region: "Europe" },
  { name: "Australia", emoji: "🇦🇺", region: "Oceania" },
  { name: "Malaysia", emoji: "🇲🇾", region: "Asia" },
  { name: "England", emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", region: "Europe" },
  { name: "Qatar", emoji: "🇶🇦", region: "Middle East" },
];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Mono:wght@300;400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0a0a;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Mono', monospace;
  }

  .picker {
    position: relative;
    width: 380px;
    padding: 56px 48px;
    background: #111;
    border: 1px solid #222;
    overflow: hidden;
  }

  .picker::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #c9a96e, #f0d9a8, #c9a96e);
  }

  .label {
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 32px;
  }

  .display {
    position: relative;
    margin-bottom: 48px;
    min-height: 100px;
  }

  .flag {
    font-size: 52px;
    line-height: 1;
    margin-bottom: 16px;
    display: block;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .flag.animating {
    opacity: 0;
    transform: translateY(-8px);
  }

  .country-name {
    font-family: 'Playfair Display', serif;
    font-size: 38px;
    font-weight: 700;
    color: #f5f0e8;
    line-height: 1.1;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .country-name.animating {
    opacity: 0;
    transform: translateY(8px);
  }

  .region {
    display: inline-block;
    margin-top: 10px;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #c9a96e;
    transition: opacity 0.3s ease;
  }

  .region.animating { opacity: 0; }

  .btn {
    width: 100%;
    padding: 14px 24px;
    background: transparent;
    border: 1px solid #333;
    color: #888;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }

  .btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: #c9a96e;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 0;
  }

  .btn:hover::after { transform: translateX(0); }

  .btn:hover {
    border-color: #c9a96e;
    color: #0a0a0a;
  }

  .btn span { position: relative; z-index: 1; }

  .counter {
    position: absolute;
    bottom: 56px;
    right: 48px;
    font-size: 10px;
    letter-spacing: 0.1em;
    color: #333;
  }

  .dots {
    display: flex;
    gap: 6px;
    margin-bottom: 32px;
  }

  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #222;
    transition: background 0.3s ease;
  }

  .dot.active { background: #c9a96e; }
`;

export default function CountryPicker() {
  const [selected, setSelected] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [draws, setDraws] = useState(0);

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      const indices = countries.map((_, i) => i).filter((i) => i !== selected);
      setSelected(indices[Math.floor(Math.random() * indices.length)]);
      setDraws((d) => d + 1);
      setAnimating(false);
    }, 300);
  };

  const current = countries[selected];

  return (
    <>
      <style>{style}</style>
      <div className="picker">
        <p className="label">Country Selector</p>

        <div className="dots">
          {countries.map((_, i) => (
            <div key={i} className={`dot ${i === selected ? "active" : ""}`} />
          ))}
        </div>

        <div className="display">
          <span className={`flag ${animating ? "animating" : ""}`}>
            {current.emoji}
          </span>
          <div className={`country-name ${animating ? "animating" : ""}`}>
            {current.name}
          </div>
          <span className={`region ${animating ? "animating" : ""}`}>
            {current.region}
          </span>
        </div>

        <button className="btn" onClick={handleNext}>
          <span>Draw New Country</span>
        </button>

        {draws > 0 && <span className="counter">×{draws}</span>}
      </div>
    </>
  );
}
