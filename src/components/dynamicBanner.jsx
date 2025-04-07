// src/components/DynamicBanner.jsx
import React, { useState } from "react";

const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

React.useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

const DynamicBanner = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [bgColor, setBgColor] = useState("#blue");
  const [borderStyle, setBorderStyle] = useState("solid");
  const [borderWidth, setBorderWidth] = useState(4); // NEW: border width

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: "40px", alignItems: "center" ,margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", }}>
      {/* Banner Display */}
      <section
        style={{
            width: "100%",
            maxWidth: "1000px",
            minHeight: "200px",
            backgroundColor: bgColor,
            border: `${borderWidth}px ${borderStyle} #000`,
            borderRadius: "20px",
            
            gap: "20px",
            padding: "40px",
            alignItems: "center",
            justifyContent: "center",
        }}
      >
        {/* Text Area */}
        <div style={{ color: "#fff", padding: "10px" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{title}</h1>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>{description}</p>
        </div>

        {/* Image Area */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
         {image ? (
        <img
        src={image}
         alt="Banner"
            style={{
                width: "100%",
                maxWidth: "100%",
                maxHeight: "300px",
                objectFit: "contain",
                borderRadius: "12px",
            }}
        />
        ) : (
          <p style={{ color: "#666" }}>No image selected</p>
    )}
    </div>
      </section>

      {/* Customization Panel */}
      <section
        style={{
          
          backgroundColor: "green",
          
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "600px",
          gap: "20px",
        padding: "40px",
        alignItems: "center",
        justifyContent: "center",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "1.8rem" }}>Customize Your Banner</h2>

        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
          </label>

          <label>
            Description (max 20 words):
            <textarea
              value={description}
              onChange={(e) => {
                const words = e.target.value.trim().split(/\s+/).slice(0, 20).join(" ");
                setDescription(words);
              }}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", minHeight: "80px" }}
            />
            <p style={{ fontSize: "12px", textAlign: "right" }}>{description.split(" ").filter(Boolean).length}/20</p>
          </label>

          <label>
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              style={{ width: "100%", padding: "10px", border: "1px dashed #999", borderRadius: "8px" }}
            />
          </label>

          <label>
            Background Color:
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{ width: "50px", height: "40px", border: "none" }}
              />
              <span>{bgColor}</span>
            </div>
          </label>

          {/* Border Style Selector */}
          <label>
            Border Style:
            <select
              value={borderStyle}
              onChange={(e) => setBorderStyle(e.target.value)}
              style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
              <option value="groove">Groove</option>
              <option value="ridge">Ridge</option>
              <option value="inset">Inset</option>
              <option value="outset">Outset</option>
              <option value="none">None</option>
            </select>
          </label>

         {/* Border Width Controls (Slider + Number Input) */}
        <label>
        Border Width:
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
    <input
      type="range"
      min="0"
      max="20"
      value={borderWidth}
      onChange={(e) => setBorderWidth(Number(e.target.value))}
      style={{ flex: 1 }}
    />
    <input
      type="number"
      min="0"
      max="20"
      value={borderWidth}
      onChange={(e) => {
        const value = Math.min(20, Math.max(0, Number(e.target.value)));
        setBorderWidth(value);
      }}
      style={{ width: "60px", padding: "5px", borderRadius: "6px", border: "1px solid #ccc" }}
    />
    <span>px</span>
  </div>
</label>
        </div>
      </section>
    </div>
  );
};

export default DynamicBanner;
