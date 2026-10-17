
/*
 * Speed Dial Club Portfolio
 * Campaigns ranked by total tracked views, highest first.
 * Reels ranked by views within each campaign.
 * Reel engagement rate = (Likes + Comments) / Views * 100
 */

const campaigns = [
  {
    name: "HUNKKAAR TL REELS",
    reelCount: 15,
    views: 85673,
    reels: [
      ["DdJogxsN_4O", 17344, 511, 24],
      ["DdJXjY9MwnT", 15474, 186, 13],
      ["DdWLhvkKsNl", 9757, 182, 8],
      ["DdJpYD-oPr3", 7023, 296, 14],
      ["DdJnIemCVfI", 6897, 372, 14]
    ]
  },
  {
    name: "THUMS UP",
    reelCount: 20,
    views: 284763,
    reels: [
      ["Dcdy3IOzd6f", 204199, 3314, 72],
      ["DcP0ynHIx-G", 18319, 353, 13],
      ["Dcd7GOaMDCP", 17855, 246, 1],
      ["DcONmHfuJMN", 3935, 266, 10],
      ["DcgWxA9I2ju", 3493, 3, 0]
    ]
  },
  {
    name: "NETFLIX | ALWAYS ON",
    reelCount: 17,
    views: 1848677,
    reels: [
      ["DbTM35XtiC-", 816466, 58653, 378],
      ["DbU6ThsNSNs", 447571, 50385, 514],
      ["DaLAnewyEnG", 166889, 5464, 39],
      ["Dbijv4cTIFw", 125250, 3381, 22],
      ["DcL9icKTDwE", 82189, 3, 12]
    ]
  },
  {
    name: "STAR PLUS | YFT",
    reelCount: 40,
    views: 322074,
    reels: [
      ["DbijCnQMIas", 24718, 3, 18],
      ["DbqQowdRrRd", 23118, 3, 14],
      ["DbsSYAQN_IY", 22455, 3, 3],
      ["DbnVaj4h7we", 22442, 1126, 15],
      ["DbqqYRfpm0t", 17373, 3, 16]
    ]
  },
  {
    name: "JH | CHIRAIYA, 5 PHASES",
    reelCount: 95,
    views: 14702202,
    reels: [
      ["DWbaCbgk_Ko", 6615202, 182263, 1274],
      ["DXZZRlDCQLh", 3699349, 82979, 806],
      ["DWWnd1OE1fU", 1315364, 113466, 1835],
      ["DXerAd2ET1i", 359090, 36966, 1142],
      ["DWRiEA5JM0N", 168936, 5758, 205]
    ]
  },
  {
    name: "JH | PRITAM & PEDRO",
    reelCount: 63,
    views: 2614349,
    reels: [
      ["DadHlJuhIan", 616416, 24987, 211],
      ["Dak2JIYNCq0", 438164, 13687, 84],
      ["DaznEtsSwdA", 265873, 3, 76],
      ["DadG8HAvCuF", 188270, 10863, 64],
      ["Daf2JCThyuM", 125000, 0, 0]
    ]
  },
  {
    name: "JH | HUNKKAAR REELS",
    reelCount: 9,
    views: 79868,
    reels: [
      ["Dd6gTAeTrqG", 28678, 1654, 33],
      ["Dd9JupWtpc1", 18582, 734, 15],
      ["DeEjki4im4C", 9186, 669, 9],
      ["DeElshTIurU", 6506, 128, 9],
      ["Dd5xBbTz02T", 5687, 3, 7]
    ]
  },
  {
    name: "PVR | STREET FIGHTER",
    reelCount: 21,
    views: 510428,
    reels: [
      ["DeJ3ROTBu7f", 287464, 7161, 38],
      ["DeKASd3IruZ", 84925, 198, 32],
      ["DeHX1tcz6-F", 75216, 7676, 48],
      ["DeKB4GoNmqm", 17420, 892, 47],
      ["DeJztZ_tvvR", 13624, 3, 30]
    ]
  },
  {
    name: "NYKD BY NYKAA",
    reelCount: 10,
    views: 4304024,
    reels: [
      ["DaKmkObIRNU", 3076979, 5322, 981],
      ["DYR6wsZS34t", 300000, 0, 0],
      ["DauTlwNJBZT", 287763, 3, 33],
      ["DZDMVncyMvt", 229894, 6614, 824],
      ["DcD_zDWTXmr", 137383, 3, 136]
    ]
  },
  {
    name: "PAPERBOAT NATA",
    reelCount: 14,
    views: 4230879,
    reels: [
      ["DYevIskT2CC", 2128082, 100405, 518],
      ["DYCmX45JroC", 1924710, 62060, 2337],
      ["DYWoL9ITwq4", 71160, 1174, 212],
      ["DYjzIdwStI7", 33063, 381, 30],
      ["DYO46-DM5y4", 15236, 347, 15]
    ]
  },
  {
    name: "NECESERA",
    reelCount: 1,
    views: 34150,
    reels: [
      ["DXKAfuCj46U", 34150, 3, 9]
    ]
  },
  {
    name: "ZEPTO X SPOTIFY",
    reelCount: 1,
    views: 50000,
    reels: [
      ["DY_9p-jTngc", 50000, 0, 0]
    ]
  },
  {
    name: "NETFLIX | MAA BEHEN",
    reelCount: 1,
    views: 27971,
    reels: [
      ["DZm_qMzpkC1", 27971, 1514, 15]
    ]
  },
  {
    name: "DOT & KEY",
    reelCount: 2,
    views: 223161,
    reels: [
      ["DW6lcVriM2f", 117005, 4147, 33],
      ["DW33xZ0iYAp", 106156, 562, 68]
    ]
  },
  {
    name: "PHILIPS | OBI / OB / HSB",
    reelCount: 23,
    views: 783519,
    reels: [
      ["DJmAOlioKO9", 99985, 2357, 93],
      ["DJjzxfJI2dw", 93752, 1953, 67],
      ["DJotM9qTrwJ", 75719, 2691, 63],
      ["DTN0Xe8D05M", 65729, 993, 10],
      ["DN6DOwHgcqr", 53704, 1784, 52]
    ]
  },
  {
    name: "SHEMAROO | 2 SONGS",
    reelCount: 15,
    views: 1088979,
    reels: [
      ["DK9eCoAPQ5o", 376484, 1278, 171],
      ["DHtUi2oMFpd", 201987, 2004, 188],
      ["DHuu1kcSx13", 88769, 2032, 20],
      ["DHxjCddJUry", 80106, 1220, 27],
      ["DHtSmDNClH_", 50000, 0, 0]
    ]
  },
  {
    name: "ALIENKIND",
    reelCount: 16,
    views: 469828,
    reels: [
      ["DLSRDUXxnvo", 132201, 2687, 36],
      ["DLXJG_ZPbcj", 57053, 1855, 44],
      ["DLVAagHvmRx", 45680, 2216, 69],
      ["DMNbdQET4H1", 39452, 328, 30],
      ["DJcGExUzt0_", 32657, 786, 4]
    ]
  },
  {
    name: "AJIO | 3 PHASES",
    reelCount: 34,
    views: 1080259,
    reels: [
      ["DQACjnmkxbk", 199522, 4668, 89],
      ["DKkJcKzIpU1", 124017, 3284, 86],
      ["DKo5dJHzz6Y", 65104, 1019, 26],
      ["DPG6D4nkxWg", 63328, 1529, 22],
      ["DKo0IZ3KGdC", 46844, 831, 31]
    ]
  },
  {
    name: "GUD GUM",
    reelCount: 5,
    views: 148474,
    reels: [
      ["DMDi_2fTe-0", 36461, 1308, 8],
      ["DK9g7SVPYtG", 33853, 848, 39],
      ["DL91dtuyfRr", 32275, 417, 30],
      ["DLXzRVqzFl3", 26645, 990, 36],
      ["DLFk90hJWmU", 19240, 353, 11]
    ]
  },
  {
    name: "FARMLEY",
    reelCount: 11,
    views: 309198,
    reels: [
      ["DPWhrkOiFfY", 75000, 0, 0],
      ["DPBQAWNDDjZ", 66477, 3, 25],
      ["DO6HzqAE86p", 44283, 3, 14],
      ["DN7aXa8iAV2", 34615, 418, 7],
      ["DO6Du1tE9L1", 20000, 0, 0]
    ]
  },
  {
    name: "UNDERNEAT | 2 PHASES",
    reelCount: 23,
    views: 4850541,
    reels: [
      ["DMc7BbaTEhb", 1927427, 20063, 1046],
      ["DMLMFAWpKJy", 418940, 5215, 345],
      ["DMDFgpZPeyO", 400000, 0, 0],
      ["DO1G7TDk7sM", 320683, 3, 115],
      ["DMDQn0dsCRn", 276692, 2184, 220]
    ]
  },
  {
    name: "AMAZON | HOME / VALENTINE'S DAY",
    reelCount: 6,
    views: 289987,
    reels: [
      ["DUlBSCiE1uT", 71852, 2753, 59],
      ["DM-fTkuS-SA", 68464, 1019, 79],
      ["DPESzrpErRu", 50000, 0, 0],
      ["DPeIfn1E5qD", 36348, 3, 14],
      ["DPMO3MJk3Ap", 31940, 929, 5]
    ]
  },
  {
    name: "SPOTIFY | WRAPPED 2025",
    reelCount: 13,
    views: 711881,
    reels: [
      ["DR4dymSkzV-", 199551, 3, 78],
      ["DR4yUZTjDe4", 83195, 1876, 69],
      ["DR4P_puCRiU", 76571, 2499, 18],
      ["DR4ufofkkk0", 73235, 3253, 48],
      ["DR4wNLxDGSd", 50000, 0, 0]
    ]
  },
  {
    name: "AVATAR 3",
    reelCount: 1,
    views: 173227,
    reels: [
      ["DSfqU4QEya4", 173227, 2959, 10]
    ]
  },
  {
    name: "SOTBELLA",
    reelCount: 3,
    views: 1549710,
    reels: [
      ["DYW4aNfPvva", 1342529, 96146, 629],
      ["DYchewnPk68", 140656, 4633, 121],
      ["DYMY-gCPeD-", 66525, 2193, 559]
    ]
  },
  {
    name: "WHIPMANTRA",
    reelCount: 1,
    views: 21010,
    reels: [
      ["DXgnoAyjz6W", 21010, 657, 11]
    ]
  },
  {
    name: "DOVE",
    reelCount: 1,
    views: 17211,
    reels: [
      ["DUfXyJ_jxNC", 17211, 284, 9]
    ]
  },
  {
    name: "AQUALOGICA",
    reelCount: 1,
    views: 400978,
    reels: [
      ["DWTwVQvD36k", 400978, 925, 27]
    ]
  },
  {
    name: "SAMSUNG",
    reelCount: 1,
    views: 20291,
    reels: [
      ["DUbFRRdj_xA", 20291, 382, 13]
    ]
  },
  {
    name: "GLAM21",
    reelCount: 1,
    views: 14800,
    reels: [
      ["DUanvzvD0r1", 14800, 206, 27]
    ]
  }
];

const formatNumber = value =>
  new Intl.NumberFormat("en-IN").format(value);

const getEngagementRate = (likes, comments, views) => {
  if (!views) return 0;
  return ((likes + comments) / views) * 100;
};

const getReelUrl = id =>
  `https://www.instagram.com/reel/${id}/`;

const campaignList = document.getElementById("campaignList");

/*
 * Sort campaigns by total tracked views.
 * The original campaign data remains unchanged.
 */
const rankedCampaigns = [...campaigns].sort(
  (a, b) => b.views - a.views
);

campaignList.innerHTML = rankedCampaigns.map((campaign, index) => {
  const sortedReels = [...campaign.reels]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const reelCards = sortedReels.map((reel, reelIndex) => {
    const [id, views, likes, comments] = reel;
    const er = getEngagementRate(likes, comments, views);

    return `
      <a
        class="reel-card"
        href="${getReelUrl(id)}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Reel ${reelIndex + 1}, ${formatNumber(views)} views"
      >
        <div class="reel-flip">
          <div class="reel-flip-inner">

            <div class="reel-face reel-front">
              <span class="rank">#${reelIndex + 1}</span>
              <span class="play" aria-hidden="true">▶</span>
              <span class="flip-hint">FLIP FOR STATS ↻</span>
            </div>

            <div class="reel-face reel-back">
              <span class="back-rank">REEL / ${String(reelIndex + 1).padStart(2, "0")}</span>

              <div class="back-stat">
                <span>VIEWS</span>
                <strong>${formatNumber(views)}</strong>
              </div>

              <div class="back-stat">
                <span>LIKES</span>
                <strong>${formatNumber(likes)}</strong>
              </div>

              <div class="back-stat">
                <span>COMMENTS</span>
                <strong>${formatNumber(comments)}</strong>
              </div>

              <div class="back-stat back-er">
                <span>ENGAGEMENT RATE</span>
                <strong>${er.toFixed(2)}%</strong>
              </div>

              <span class="back-cta">WATCH REEL ↗</span>
            </div>

          </div>
        </div>

        <strong class="views">${formatNumber(views)}</strong>
        <span class="reel-label">Views · Reel ${reelIndex + 1}</span>
        <span class="reel-er">ER ${er.toFixed(2)}%</span>
      </a>
    `;
  }).join("");

  return `
    <section class="campaign" id="campaign-${index + 1}">
      <div class="campaign-info">
        <span class="campaign-number">
          CAMPAIGN / ${String(index + 1).padStart(2, "0")}
        </span>

        <h3>${campaign.name}</h3>

        <p class="campaign-meta">
          ${formatNumber(campaign.reelCount)} tracked Reels<br>
          ${formatNumber(campaign.views)} total tracked views<br>
          Top ${sortedReels.length} Reels by views
        </p>
      </div>

      <div class="reel-grid">
        ${reelCards}
      </div>
    </section>
  `;
}).join("");




/* ===== WORKING SPLIT-FLAP ANIMATION ===== */

(() => {
  const values = document.querySelectorAll(
    "#campaign-metrics .flap-value"
  );

  if (!values.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  values.forEach((value, metricIndex) => {
    const target = value.dataset.value || "";
    value.replaceChildren();

    [...target].forEach((char, index) => {
      if (!/\d/.test(char)) {
        const symbol = document.createElement("span");
        symbol.className = "flap-symbol";
        symbol.textContent = char === " " ? "\u00a0" : char;
        symbol.setAttribute("aria-hidden", "true");
        value.appendChild(symbol);
        return;
      }

      const tile = document.createElement("span");
      tile.className = "flap-digit";
      tile.setAttribute("aria-hidden", "true");

      const current = document.createElement("span");
      current.className = "digit-static";
      current.textContent = reduceMotion ? char : "0";

      const top = document.createElement("span");
      top.className = "digit-top";
      top.textContent = reduceMotion ? char : "0";

      const bottom = document.createElement("span");
      bottom.className = "digit-bottom";
      bottom.textContent = char;

      const flap = document.createElement("span");
      flap.className = "digit-flip";
      flap.textContent = char;

      const seam = document.createElement("span");
      seam.className = "digit-seam";

      tile.append(current, top, bottom, flap, seam);
      value.appendChild(tile);

      if (!reduceMotion) {
        const delay = metricIndex * 180 + index * 75;

        setTimeout(() => {
          tile.classList.add("is-flipping");

          flap.addEventListener("animationend", () => {
            current.textContent = char;
            top.textContent = char;
            bottom.textContent = char;
            flap.textContent = char;
            tile.classList.remove("is-flipping");
          }, { once: true });
        }, delay);
      }
    });

    value.setAttribute("role", "img");
    value.setAttribute("aria-label", target);
  });
})();
