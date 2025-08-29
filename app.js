// Wild Rift AAA ARAM Augment Chain Optimizer

// Application State
class AugmentOptimizer {
  constructor() {
    this.selectedAugments = new Set();
    this.suggestionCount = 3;
    this.playstyleFilter = "";
    this.searchQuery = "";

    // Augment data from the application data
    this.augmentChains = {
      "Wild Bear": {
        type: "role_series",
        required: 3,
        category: "Tank",
        bonus: "Enhanced defensive abilities and team support",
        augments: ["Bear's Resilience", "Ursine Strength", "Wild Endurance"],
        color: "#4A90E2",
      },
      "Roaring Lion": {
        type: "role_series",
        required: 3,
        category: "Damage",
        bonus: "Increased combat prowess and sustain",
        augments: ["Lion's Courage", "Predator's Instinct", "Royal Dominance"],
        color: "#E74C3C",
      },
      "Sacred Doe": {
        type: "role_series",
        required: 3,
        category: "Support",
        bonus: "Enhanced healing and protection abilities",
        augments: ["Doe's Grace", "Sacred Blessing", "Nature's Sanctuary"],
        color: "#2ECC71",
      },
      "Shadow Wolf": {
        type: "role_series",
        required: 3,
        category: "Assassin",
        bonus: "Improved stealth and burst damage",
        augments: ["Wolf's Stealth", "Shadow Strike", "Pack Hunter"],
        color: "#9B59B6",
      },
      "Agile Cat": {
        type: "role_series",
        required: 3,
        category: "ADC",
        bonus: "Enhanced mobility and attack speed",
        augments: ["Cat's Agility", "Feline Reflexes", "Nine Lives"],
        color: "#F39C12",
      },
      "Hunting Eagle": {
        type: "role_series",
        required: 3,
        category: "ADC",
        bonus: "Increased range and precision",
        augments: ["Eagle's Vision", "Sky Hunter", "Aerial Supremacy"],
        color: "#34495E",
      },
      "Fate Series": {
        type: "special_chain",
        required: 3,
        category: "Utility",
        bonus_3: "Increase level cap to 18",
        bonus_4: "Upgrade additional augment to Starlight",
        augments: ["Wealth", "Wisdom", "Adventure", "Supremacy"],
        color: "#FFD700",
      },
      "Unknown Series": {
        type: "special_chain",
        required: 3,
        category: "Utility",
        bonus_3: "Draw additional augment",
        bonus_4: "Upgrade additional augment to Starlight",
        augments: [
          "Unknown Damage",
          "Unknown Defense",
          "Unknown Reset",
          "Stroke of Luck",
        ],
        color: "#8E44AD",
      },
      "Marksman Specialist": {
        type: "special_chain",
        required: 3,
        category: "ADC",
        bonus: "Enhanced marksman abilities and area attacks",
        augments: ["Precision Shot", "Rapid Fire", "Artillery Master"],
        color: "#E67E22",
      },
      "Sync-Up": {
        type: "team_series",
        required: 3,
        category: "Team Synergy",
        bonus: "Enhanced team coordination",
        augments: ["Team Bond", "Synchronized Strike", "Unity Power"],
        color: "#1ABC9C",
      },
      Champion: {
        type: "champion_series",
        required: 3,
        category: "Utility",
        bonus: "Champion-specific enhancements",
        augments: ["Champion's Mark", "Signature Move", "Legendary Power"],
        color: "#95A5A6",
      },
      "Blood Pact": {
        type: "sacrifice_series",
        required: 3,
        category: "Damage",
        bonus: "High risk, high reward abilities",
        augments: ["Blood Price", "Dark Bargain", "Soul Bond"],
        color: "#C0392B",
      },
    };

    // Individual augment effects
    this.individualAugments = {
      Firebrand: {
        series: "damage_dot",
        effect:
          "Basic Attacks deal 2% of target's Maximum Health as Magic Damage over 5s. Can stack infinitely.",
        category: "Damage",
        addedIn: "August 2025",
      },
      "Infernal Conduit": {
        series: "damage_dot",
        effect:
          "Abilities deal Physical Damage based on AD and AP scaling of target's Maximum Health over 5s. Can stack infinitely.",
        category: "Damage",
        addedIn: "August 2025",
      },
      "Dive Bomber": {
        series: "utility",
        effect: "Respawn Timer Reduction: 30%",
        category: "Utility",
      },
      "Heartsong Bolt": {
        series: "utility",
        effect: "Bonus Health Damage: 1%",
        category: "Damage",
      },
      "Starfall Shield": {
        series: "defense",
        effect: "True Damage Ratio when Shield is in effect: 30%",
        category: "Tank",
      },
      "Hi-Precision Sharpshooter": {
        series: "marksman",
        effect:
          "Hitting enemy with ability at long range reduces cooldown. Empowered: Reduces ultimate cooldown.",
        category: "ADC",
      },
      "Blade Waltz": {
        series: "melee",
        effect:
          "Gain Blade Waltz spell. Empowered: Reveals Vitals, striking deals true damage and restores Health.",
        category: "Assassin",
      },
    };

    this.presets = {
      tank: ["Bear's Resilience", "Starfall Shield", "Ursine Strength"],
      damage: ["Lion's Courage", "Firebrand", "Infernal Conduit"],
      support: ["Doe's Grace", "Sacred Blessing", "Team Bond"],
      assassin: ["Wolf's Stealth", "Shadow Strike", "Blade Waltz"],
      marksman: [
        "Eagle's Vision",
        "Hi-Precision Sharpshooter",
        "Precision Shot",
      ],
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.renderAugmentCategories();
    this.updateChainProgress();
    this.updateRecommendations();
  }

  bindEvents() {
    // Controls
    document
      .getElementById("suggestionSlider")
      .addEventListener("input", (e) => {
        this.suggestionCount = parseInt(e.target.value);
        document.getElementById("suggestionCount").textContent =
          this.suggestionCount;
        this.updateRecommendations();
      });

    document
      .getElementById("playstyleFilter")
      .addEventListener("change", (e) => {
        this.playstyleFilter = e.target.value;
        this.renderAugmentCategories();
        this.updateRecommendations();
      });

    document.getElementById("augmentSearch").addEventListener("input", (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderAugmentCategories();
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
      this.selectedAugments.clear();
      this.renderAugmentCategories();
      this.updateChainProgress();
      this.updateRecommendations();
    });

    // Presets
    document.querySelectorAll(".preset-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const preset = e.target.dataset.preset;
        this.loadPreset(preset);
      });
    });

    // Modal
    document.getElementById("modalClose").addEventListener("click", () => {
      this.closeModal();
    });

    document.querySelector(".modal__backdrop").addEventListener("click", () => {
      this.closeModal();
    });
  }

  getAllAugments() {
    const chainAugments = {};
    Object.entries(this.augmentChains).forEach(([chainName, chain]) => {
      chain.augments.forEach((augment) => {
        chainAugments[augment] = {
          chain: chainName,
          category: chain.category,
          effect: `Part of ${chainName} chain - ${chain.bonus}`,
          color: chain.color,
        };
      });
    });

    return { ...chainAugments, ...this.individualAugments };
  }

  renderAugmentCategories() {
    const container = document.getElementById("augmentCategories");
    const allAugments = this.getAllAugments();

    // Group augments by category
    const categories = {};
    Object.entries(allAugments).forEach(([name, augment]) => {
      const category = augment.category || "Other";
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push({ name, ...augment });
    });

    // Filter categories by playstyle
    const filteredCategories = {};
    Object.entries(categories).forEach(([category, augments]) => {
      if (!this.playstyleFilter || category.includes(this.playstyleFilter)) {
        // Filter augments by search query
        const filteredAugments = augments.filter(
          (augment) =>
            !this.searchQuery ||
            augment.name.toLowerCase().includes(this.searchQuery) ||
            augment.effect.toLowerCase().includes(this.searchQuery)
        );

        if (filteredAugments.length > 0) {
          filteredCategories[category] = filteredAugments;
        }
      }
    });

    container.innerHTML = "";

    Object.entries(filteredCategories).forEach(([category, augments]) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "augment-category";

      categoryDiv.innerHTML = `
                <div class="category-header">
                    <h3 class="category-title">${category}</h3>
                    <span class="category-badge">${augments.length}</span>
                </div>
                <div class="augment-list">
                    ${augments
                      .map(
                        (augment) => `
                        <div class="augment-item ${
                          this.selectedAugments.has(augment.name)
                            ? "selected"
                            : ""
                        }" 
                             data-augment="${augment.name}">
                            <input type="checkbox" class="augment-checkbox" 
                                   ${
                                     this.selectedAugments.has(augment.name)
                                       ? "checked"
                                       : ""
                                   }>
                            <div>
                                <div class="augment-name">${augment.name}</div>
                                <div class="augment-effect">${
                                  augment.effect
                                }</div>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `;

      container.appendChild(categoryDiv);
    });

    // Bind augment selection events
    container.querySelectorAll(".augment-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const augmentName = item.dataset.augment;
        this.toggleAugment(augmentName);
      });

      item.addEventListener("dblclick", (e) => {
        const augmentName = item.dataset.augment;
        this.showAugmentDetails(augmentName);
      });
    });
  }

  toggleAugment(augmentName) {
    if (this.selectedAugments.has(augmentName)) {
      this.selectedAugments.delete(augmentName);
    } else {
      this.selectedAugments.add(augmentName);
    }

    this.renderAugmentCategories();
    this.updateChainProgress();
    this.updateRecommendations();
  }

  updateChainProgress() {
    const container = document.getElementById("chainProgress");
    container.innerHTML = "";

    Object.entries(this.augmentChains).forEach(([chainName, chain]) => {
      const selectedInChain = chain.augments.filter((augment) =>
        this.selectedAugments.has(augment)
      ).length;

      const progress = (selectedInChain / chain.required) * 100;
      const isComplete = selectedInChain >= chain.required;
      const isNearComplete = selectedInChain === chain.required - 1;

      const chainDiv = document.createElement("div");
      chainDiv.className = `chain-item ${
        isComplete
          ? "chain-complete"
          : isNearComplete
          ? "chain-near-complete"
          : ""
      }`;

      chainDiv.innerHTML = `
                <div class="chain-header">
                    <h3 class="chain-name">${chainName}</h3>
                    <span class="chain-category">${chain.category}</span>
                </div>
                <div class="chain-progress-bar">
                    <div class="chain-progress-fill" style="width: ${progress}%; background-color: ${
        chain.color
      };"></div>
                </div>
                <div class="chain-status">
                    <span class="chain-count">${selectedInChain}/${
        chain.required
      }</span>
                    <span class="status ${
                      isComplete
                        ? "status--success"
                        : isNearComplete
                        ? "status--warning"
                        : "status--info"
                    }">
                        ${
                          isComplete
                            ? "Complete"
                            : isNearComplete
                            ? "Almost Complete"
                            : "In Progress"
                        }
                    </span>
                </div>
                <div class="chain-bonus">${chain.bonus || chain.bonus_3}</div>
            `;

      container.appendChild(chainDiv);
    });
  }

  updateRecommendations() {
    const container = document.getElementById("recommendations");
    const recommendations = this.generateRecommendations();

    if (recommendations.length === 0) {
      container.innerHTML =
        '<div class="empty-state"><p>Select some augments to see recommendations!</p></div>';
      return;
    }

    container.innerHTML = recommendations
      .slice(0, this.suggestionCount)
      .map(
        (rec) => `
            <div class="recommendation-item" data-augment="${rec.augment}">
                <div class="recommendation-header">
                    <h4 class="recommendation-name">${rec.augment}</h4>
                    <span class="recommendation-priority">Priority ${rec.priority}</span>
                </div>
                <div class="recommendation-reason">${rec.reason}</div>
                <div class="recommendation-effect">${rec.effect}</div>
            </div>
        `
      )
      .join("");

    // Bind recommendation click events
    container.querySelectorAll(".recommendation-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const augmentName = item.dataset.augment;
        this.showAugmentDetails(augmentName);
      });
    });
  }

  generateRecommendations() {
    const recommendations = [];
    const allAugments = this.getAllAugments();

    // Find chains that are close to completion
    Object.entries(this.augmentChains).forEach(([chainName, chain]) => {
      const selectedInChain = chain.augments.filter((augment) =>
        this.selectedAugments.has(augment)
      );

      const missingAugments = chain.augments.filter(
        (augment) => !this.selectedAugments.has(augment)
      );

      missingAugments.forEach((augment) => {
        let priority = 1;
        let reason = `Part of ${chainName} chain`;

        // Higher priority for chains closer to completion
        if (selectedInChain.length === chain.required - 1) {
          priority = 5;
          reason = `Complete ${chainName} chain (${selectedInChain.length}/${chain.required})`;
        } else if (selectedInChain.length >= chain.required / 2) {
          priority = 3;
          reason = `Continue ${chainName} chain (${selectedInChain.length}/${chain.required})`;
        }

        // Boost priority based on playstyle filter
        if (
          this.playstyleFilter &&
          chain.category.includes(this.playstyleFilter)
        ) {
          priority += 1;
        }

        recommendations.push({
          augment,
          priority,
          reason,
          effect: allAugments[augment]?.effect || chain.bonus,
          chain: chainName,
        });
      });
    });

    // Add individual augments that match playstyle
    Object.entries(this.individualAugments).forEach(([name, augment]) => {
      if (!this.selectedAugments.has(name)) {
        let priority = 2;
        let reason = `Standalone augment - ${augment.category}`;

        if (
          this.playstyleFilter &&
          augment.category.includes(this.playstyleFilter)
        ) {
          priority = 3;
          reason = `Matches your ${this.playstyleFilter} playstyle`;
        }

        if (augment.addedIn === "August 2025") {
          priority += 1;
          reason += " (New!)";
        }

        recommendations.push({
          augment: name,
          priority,
          reason,
          effect: augment.effect,
          chain: null,
        });
      }
    });

    // Sort by priority (highest first)
    return recommendations.sort((a, b) => b.priority - a.priority);
  }

  loadPreset(presetName) {
    this.selectedAugments.clear();
    if (this.presets[presetName]) {
      this.presets[presetName].forEach((augment) => {
        this.selectedAugments.add(augment);
      });
    }

    this.renderAugmentCategories();
    this.updateChainProgress();
    this.updateRecommendations();
  }

  showAugmentDetails(augmentName) {
    const allAugments = this.getAllAugments();
    const augment = allAugments[augmentName];

    if (!augment) return;

    const modal = document.getElementById("augmentModal");
    const title = document.getElementById("modalTitle");
    const content = document.getElementById("modalContent");

    title.textContent = augmentName;

    let chainInfo = "";
    if (augment.chain) {
      const chain = this.augmentChains[augment.chain];
      const selectedInChain = chain.augments.filter((a) =>
        this.selectedAugments.has(a)
      ).length;
      chainInfo = `
                <div class="form-group">
                    <strong>Chain:</strong> ${
                      augment.chain
                    } (${selectedInChain}/${chain.required})
                    <br><strong>Chain Bonus:</strong> ${
                      chain.bonus || chain.bonus_3
                    }
                </div>
            `;
    }

    content.innerHTML = `
            <div class="form-group">
                <strong>Category:</strong> ${augment.category}
            </div>
            <div class="form-group">
                <strong>Effect:</strong> ${augment.effect}
            </div>
            ${chainInfo}
            ${
              augment.addedIn
                ? `<div class="form-group"><strong>Added:</strong> ${augment.addedIn}</div>`
                : ""
            }
            <div class="form-group">
                <button class="btn btn--primary btn--full-width" onclick="app.toggleAugment('${augmentName}'); app.closeModal();">
                    ${
                      this.selectedAugments.has(augmentName) ? "Remove" : "Add"
                    } Augment
                </button>
            </div>
        `;

    modal.classList.remove("hidden");
  }

  closeModal() {
    document.getElementById("augmentModal").classList.add("hidden");
  }
}

// Initialize the application
const app = new AugmentOptimizer();

// Make app globally accessible for inline event handlers
window.app = app;
