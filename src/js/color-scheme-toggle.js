(function () {
  document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.remove("js-disabled");
    initColorSchemeToggle();
  });
})();

function initColorSchemeToggle() {
  const storedColorScheme = window.localStorage.getItem("active-color-scheme");
  if (storedColorScheme !== null) {
    document.body.setAttribute("data-color-scheme", storedColorScheme);
  }

  const toggle = document.querySelector("[data-color-scheme-toggle]");
  toggle.addEventListener("click", toggleColorScheme);
}

function toggleColorScheme() {
  const activeColorScheme = getActiveColorScheme();
  setActiveColorScheme(activeColorScheme === "light" ? "dark" : "light");
}

function getActiveColorScheme() {
  const activeColorScheme = document.body.getAttribute("data-color-scheme");
  if (activeColorScheme !== null) {
    return activeColorScheme;
  }

  const colorSchemePreference = getColorSchemePreference();
  if (colorSchemePreference !== null) {
    return colorSchemePreference;
  }

  return "light";
}

function setActiveColorScheme(colorScheme) {
  document.body.setAttribute("data-color-scheme", colorScheme);
  window.localStorage.setItem("active-color-scheme", colorScheme);
}

function getColorSchemePreference() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }

  return null;
}
