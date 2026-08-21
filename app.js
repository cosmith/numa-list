const state = {
  startups: [],
  query: "",
  status: "all",
  season: "all",
};

const list = document.querySelector("#startup-list");
const template = document.querySelector("#startup-template");
const search = document.querySelector("#search");
const summary = document.querySelector("#results-summary");
const emptyState = document.querySelector("#empty-state");

const normalize = (value = "") => value
  .toLocaleLowerCase("fr")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const detailItem = (label, value, className = "") => {
  if (!value) return "";
  return `<div class="detail-item ${className}"><span class="detail-label">${escapeHtml(label)}</span><p class="detail-value">${value}</p></div>`;
};

const sourceLink = (url, label) => {
  if (!url) return "";
  return `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
};

const makeActivity = (startup) => {
  const description = startup.activityDescription
    || (startup.status === "active" ? startup.statusDetails : "");

  return description
    ? detailItem("Activité", escapeHtml(description), "detail-wide activity-item")
    : "";
};

const makeStatusEvent = (startup) => {
  const labels = { exit: "Acquisition", stopped: "Stoppé" };
  if (!labels[startup.status]) return "";

  const source = sourceLink(startup.sources?.foundersOrStatus, "Source");
  const sourceSuffix = source ? `<span class="detail-source">${source}</span>` : "";
  const description = escapeHtml(startup.statusDetails || "Information non documentée.");

  return detailItem(
    labels[startup.status],
    `<span>${description}</span>${sourceSuffix}`,
    "detail-wide status-event",
  );
};

const makeFounderProfileLinks = (startup) => startup.founderProfiles
  ?.map(({ name, linkedin }) => sourceLink(linkedin, name))
  .filter(Boolean)
  .join(" · ") || "";

const makeDetails = (startup) => {
  const pivots = startup.formerNamesOrPivots?.length
    ? startup.formerNamesOrPivots.map(escapeHtml).join(", ")
    : "—";
  const website = startup.website
    ? sourceLink(startup.website, startup.website.replace(/^https?:\/\//, "").replace(/\/$/, ""))
    : "—";
  const selectionSource = sourceLink(startup.sources?.cohort, "Source de la sélection");
  const founderProfiles = makeFounderProfileLinks(startup);

  return `<div class="detail-grid">
    ${selectionSource ? `<div class="selection-source">${selectionSource}</div>` : ""}
    ${makeActivity(startup)}
    ${makeStatusEvent(startup)}
    ${detailItem("Ancien nom / pivot", pivots)}
    ${detailItem("Site web", website)}
    ${detailItem("LinkedIn des fondateurs", founderProfiles)}
    ${detailItem("Niveau de confiance", escapeHtml(startup.confidenceLabel || "Non renseigné"))}
  </div>`;
};

const matches = (startup) => {
  const queryHaystack = normalize([
    startup.name,
    ...(startup.founders || []),
    ...(startup.formerNamesOrPivots || []),
    startup.activityDescription,
    startup.statusDetails,
  ].filter(Boolean).join(" "));

  const matchesQuery = !state.query || queryHaystack.includes(normalize(state.query));
  const matchesStatus = state.status === "all" || startup.status === state.status;
  const matchesSeason = state.season === "all" || startup.season === Number(state.season);
  return matchesQuery && matchesStatus && matchesSeason;
};

const render = () => {
  const filtered = state.startups.filter(matches);
  list.replaceChildren();

  filtered.forEach((startup) => {
    const fragment = template.content.cloneNode(true);
    const article = fragment.querySelector(".startup-entry");
    const row = fragment.querySelector(".startup-row");
    const founderProfileRow = fragment.querySelector(".startup-founder-profiles");
    const details = fragment.querySelector(".startup-details");
    const index = state.startups.indexOf(startup) + 1;
    const founders = startup.founders?.length ? startup.founders.join(", ") : "Non identifiés";

    article.dataset.id = startup.id;
    row.setAttribute("aria-controls", `details-${startup.id}`);
    details.id = `details-${startup.id}`;
    fragment.querySelector(".startup-index").textContent = String(index).padStart(3, "0");
    fragment.querySelector(".startup-name").textContent = startup.name;
    fragment.querySelector(".startup-season").textContent = `Saison ${String(startup.season).padStart(2, "0")}`;
    fragment.querySelector(".startup-founders").textContent = founders;
    fragment.querySelector(".startup-status").textContent = startup.statusLabel;
    fragment.querySelector(".startup-mobile-meta").textContent = `Saison ${String(startup.season).padStart(2, "0")} · ${founders}`;
    const founderProfileLinks = makeFounderProfileLinks(startup);
    if (founderProfileLinks) {
      founderProfileRow.innerHTML = `<span class="founder-profile-label">LinkedIn</span><span class="founder-profile-links">${founderProfileLinks}</span>`;
      founderProfileRow.hidden = false;
    }
    details.innerHTML = makeDetails(startup);

    row.addEventListener("click", () => {
      const isOpen = row.getAttribute("aria-expanded") === "true";
      row.setAttribute("aria-expanded", String(!isOpen));
      row.querySelector(".details-label").textContent = isOpen ? "Voir" : "Fermer";
      details.hidden = isOpen;
    });

    list.append(fragment);
  });

  const suffix = filtered.length > 1 ? "startups affichées" : "startup affichée";
  summary.textContent = `${filtered.length} ${suffix} sur ${state.startups.length}`;
  emptyState.hidden = filtered.length !== 0;
};

const setPressed = (selector, active) => {
  document.querySelectorAll(selector).forEach((button) => {
    const selected = button === active;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
};

search.addEventListener("input", (event) => {
  state.query = event.target.value.trim();
  render();
});

document.querySelectorAll("[data-status]").forEach((button) => {
  button.addEventListener("click", () => {
    state.status = button.dataset.status;
    setPressed("[data-status]", button);
    render();
  });
});

document.querySelectorAll("[data-season]").forEach((button) => {
  button.addEventListener("click", () => {
    state.season = button.dataset.season;
    setPressed("[data-season]", button);
    render();
  });
});

document.querySelector("#reset-filters").addEventListener("click", () => {
  state.query = "";
  state.status = "all";
  state.season = "all";
  search.value = "";
  setPressed("[data-status]", document.querySelector('[data-status="all"]'));
  setPressed("[data-season]", document.querySelector('[data-season="all"]'));
  render();
  search.focus();
});

fetch("data.json")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then((data) => {
    state.startups = data.startups;
    const counts = {
      all: data.summary.startupCount,
      active: data.summary.statusCounts.active,
      exit: data.summary.statusCounts.exit,
      stopped: data.summary.statusCounts.stopped,
    };
    document.querySelectorAll("[data-count]").forEach((element) => {
      element.textContent = counts[element.dataset.count];
    });
    document.querySelector("#data-date").dateTime = data.dataset.statusAsOf;
    render();
  })
  .catch((error) => {
    console.error("Impossible de charger les données", error);
    summary.textContent = "Impossible de charger les archives.";
  });
