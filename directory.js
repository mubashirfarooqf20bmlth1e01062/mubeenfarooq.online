const list = document.getElementById("district-list");
const search = document.getElementById("district-search");
const stateFilter = document.getElementById("state-filter");
const count = document.getElementById("district-count");
const status = document.getElementById("directory-status");
let districts = [];

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function render() {
  const term = search.value.trim().toLowerCase();
  const state = stateFilter.value;
  const filtered = districts.filter(d => {
    const haystack = [d.name, d.county, d.state, d.districtType, ...(d.contacts || []).flatMap(c => [c.name, c.title])].join(" ").toLowerCase();
    return (!term || haystack.includes(term)) && (!state || d.state === state);
  });
  count.textContent = filtered.length + (filtered.length === 1 ? " verified district" : " verified districts");
  if (!filtered.length) {
    list.innerHTML = '<div class="directory-empty"><strong>No matching verified districts.</strong><p>Try another district name or clear the filters.</p></div>';
    return;
  }
  list.innerHTML = filtered.map(d => `
    <article class="district-card">
      <div class="district-card-head">
        <div><span class="verified-label">✓ VERIFIED PUBLIC DISTRICT</span><h2>${escapeHTML(d.name)}</h2><p class="district-location">${escapeHTML(d.county)} County, ${escapeHTML(d.state)} · ${escapeHTML(d.districtType)}</p></div>
        <a class="district-website" href="${escapeHTML(d.website)}" target="_blank" rel="noopener">Official website ↗</a>
      </div>
      <div class="district-facts"><span><b>Main office</b>${escapeHTML(d.mainPhone)}</span><span><b>District status</b>${escapeHTML(d.status)}</span><span><b>CA CDS code</b>${escapeHTML(d.cdsCode)}</span></div>
      <h3>Verified public professional contacts</h3>
      <div class="contact-list">
        ${(d.contacts || []).map(c => `
          <div class="directory-contact">
            <div><strong>${escapeHTML(c.name)}</strong><span>${escapeHTML(c.title)}</span></div>
            <div class="contact-details"><a href="mailto:${escapeHTML(c.email)}">${escapeHTML(c.email)}</a><span>${escapeHTML(c.phone)}</span><a class="source-link" href="${escapeHTML(c.source)}" target="_blank" rel="noopener">Official contact source ↗</a></div>
          </div>`).join("")}
      </div>
      <div class="district-foot"><span>District verification: <a href="${escapeHTML(d.districtSource)}" target="_blank" rel="noopener">California Department of Education ↗</a></span><span>Checked: ${escapeHTML(d.lastVerified)}</span></div>
    </article>`).join("");
}

async function loadDirectory() {
  try {
    const response = await fetch("data/districts.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Directory data could not be loaded.");
    districts = await response.json();
    status.textContent = "Only records confirmed against official district and government sources are shown.";
    render();
  } catch (error) {
    status.textContent = "The verified directory data could not be loaded. Please try again later.";
    list.innerHTML = '<div class="directory-empty">Directory temporarily unavailable.</div>';
  }
}

search.addEventListener("input", render);
stateFilter.addEventListener("change", render);
loadDirectory();