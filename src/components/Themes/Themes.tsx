import React, { useState } from "react";

export const Themes = () => {
  const themes = [
    "light",
    "dark",
    "cupcake",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ] as const;

  const [theme, setTheme] = useState("light");

  const handleChangeTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value;

    setTheme(newTheme);

    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <select
      className="select select-accent w-50 cursor-pointer"
      value={theme}
      onChange={handleChangeTheme}
    >
      <option disabled={true}>Color scheme</option>
      {themes.map((theme) => (
        <option key={theme}>{theme}</option>
      ))}
    </select>
  );
};
