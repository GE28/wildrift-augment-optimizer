const toggleDarkModeBtn = document.getElementById("toggleDarkMode");
const darkModeIcon = document.getElementById("darkModeIcon");

function setColorScheme(scheme) {
  document.documentElement.setAttribute("data-color-scheme", scheme);
  localStorage.setItem("colorScheme", scheme);
  darkModeIcon.textContent = scheme === "dark" ? "light_mode" : "dark_mode";
}

function toggleColorScheme() {
  const currentScheme =
    document.documentElement.getAttribute("data-color-scheme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  const newScheme = currentScheme === "dark" ? "light" : "dark";
  setColorScheme(newScheme);
}

if (toggleDarkModeBtn) {
  toggleDarkModeBtn.addEventListener("click", toggleColorScheme);
  const savedScheme = localStorage.getItem("colorScheme");
  if (savedScheme) {
    setColorScheme(savedScheme);
  } else {
    setColorScheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }
}
