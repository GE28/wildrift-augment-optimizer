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
      "Stinging Storm": {
        type: "combo_series",
        required: 3,
        category: "Damage",
        bonus:
          "Mark enemies with abilities, deal more damage with attacks, then trigger the magic array to set off an explosive chain!",
        augments: ["Soulhunter's chain", "Blade Array", "Mystic Punch"],
        color: "#E74C3C",
      },
      "Berserker's Domain": {
        type: "combo_series",
        required: 4,
        category: "Damage",
        bonus:
          "With the lion's soul by your side, grow stronger the longer you fight. Weave attacks into your abilities to become an all-round berserker!",
        augments: [
          "Health Marker",
          "Soulhunter's chain",
          "Dual Strike",
          "Lion's Spellblade",
        ],
        color: "#FF6B35",
      },
      "Since You're Here": {
        type: "control_series",
        required: 3,
        category: "Tank",
        bonus:
          "An unbroken crowd control chain that evolves into a mobile gravity field, trapping enemies with no escape!",
        augments: ["Heart of Steel", "Imprisoning Chain", "Thief's Circle"],
        color: "#4A90E2",
      },
      "Torment Engine": {
        type: "defense_series",
        required: 3,
        category: "Tank",
        bonus:
          "The harder they hit you, the harder you hit back! It's too late for them to run!",
        augments: ["Spiny Counter", "Charged Shield", "Vengeful Counter"],
        color: "#2C3E50",
      },
      "Kitty Missile": {
        type: "projectile_series",
        required: 3,
        category: "ADC",
        bonus:
          "Projectiles fly faster, deal increased damage, have shorter cooldowns, and ricochet to other targets on hit. Bounce your heart out!",
        augments: ["Speed up, Meow!", "Cool down, meow!", "Bounce, meow!"],
        color: "#F39C12",
      },
      "Power of Arrays": {
        type: "aoe_series",
        required: 5,
        category: "Damage",
        bonus:
          "Arrays automatically track and burn enemies, and trigger a meteor shower with a large area of effect, creating a cycle of bombardment.",
        augments: [
          "Nowhere to run, meow!",
          "Burn, meow!",
          "Kaboom, Meow!",
          "Blade Array",
          "Thief's Circle",
        ],
        color: "#8E44AD",
      },
      "Stack 'em Attacks": {
        type: "damage_series",
        required: 4,
        category: "Damage",
        bonus:
          "Attacks stack true damage, and combined with splashing feathers and bouncing crossblades, they overwhelm enemies. Let them feel the full force of the barrage storm!",
        augments: [
          "Plaguebrand",
          "Splintered Chakrams",
          "Stack Assault",
          "Moonlit Falcon Strike",
        ],
        color: "#D32F2F",
      },
      "Lupine Stance": {
        type: "mobility_series",
        required: 3,
        category: "Assassin",
        bonus:
          "Dash to summon a lupine soul that assists your attacks and steal infinitely stacking movement speed to dominate the battlefield.",
        augments: ["Lupine Soul", "Tectonic Rift", "Combo Strike"],
        color: "#9B59B6",
      },
      "Lupine Spellblade": {
        type: "spellblade_series",
        required: 4,
        category: "Assassin",
        bonus:
          "Trigger multiple Spellblade effects, leaving your enemies dazzled and defeated!",
        augments: [
          "Lupine Soul",
          "Piercing Spellblade",
          "Lupine Miasma",
          "Spellblade Combo",
        ],
        color: "#673AB7",
      },
      "Healing Heartsong": {
        type: "support_series",
        required: 3,
        category: "Support",
        bonus:
          "Chain heals, shields, and abilities to become the most lovable sustain machine on the battlefield!",
        augments: [
          "Heartsong Conversion",
          "Heartsong Restoration",
          "Heartsong Speed",
        ],
        color: "#2ECC71",
      },
      "Burning Heartsong": {
        type: "damage_series",
        required: 3,
        category: "Damage",
        bonus:
          "What's sweet to one is bitter to another. Who knew healing could deal so much damage too!",
        augments: ["Heartsong Blade", "Heartsong Bolt", "Heartsong Corrosion"],
        color: "#E91E63",
      },
      "Forbidden Series": {
        type: "special_series",
        required: 4,
        category: "Utility",
        bonus:
          "Combine Omnivamp with a slow effect in an area to endlessly harvest resources, achieving continuous stat growth.",
        augments: [
          "Forbidden Bliss",
          "Cursed Blight",
          "Forbidden Rage",
          "Forbidden Evil",
        ],
        color: "#424242",
      },
      "Spellblade Chain": {
        type: "spellblade_series",
        required: 5,
        category: "Damage",
        bonus:
          "Chain multiple Spellblade effects to buff yourself and weaken the enemy, allowing you to control the flow of battle",
        augments: [
          "Lion's Spellblade",
          "Unstoppable Surge",
          "Piercing Spellblade",
          "Spellblade Combo",
          "Lord of Spellblade",
        ],
        color: "#FF5722",
      },
      "Super Dodgy": {
        type: "utility_series",
        required: 4,
        category: "Tank",
        bonus:
          "Steal stats to grow in size and Resistances, growing stronger over time through damage taken and crowd control effects.",
        augments: [
          "Master Thief",
          "Nebula Rift",
          "Tectonic Rift",
          "Thief's Circle",
        ],
        color: "#795548",
      },
      "Stance Specialist": {
        type: "mobility_series",
        required: 3,
        category: "Assassin",
        bonus:
          "Combines your movement abilities with invisibility and shields. Taking damage reduces cooldowns, becoming as mobile as a phantom on the battlefield.",
        augments: ["Master of Mobility", "Mind to Matter", "Stack 'em Mana"],
        color: "#607D8B",
      },
      "Mana Control": {
        type: "utility_series",
        required: 2,
        category: "Utility",
        bonus:
          "Converts Mana into damage and Health, and allows you to stack multiple items, giving you an overwhelming stat advantage.",
        augments: ["Stack 'em Mana", "Mind to Matter"],
        color: "#3F51B5",
      },
      "Moonlight Resonance": {
        type: "damage_series",
        required: 5,
        category: "Damage",
        bonus:
          "Attack Speed increases vamp efficiency, and synergy with Ultimate Spellbook abilities deals massive amounts of damage. The higher your Attack Speed, the higher your sustain.",
        augments: [
          "Lunar Eclipse",
          "Fury",
          "Heavyweight Fighter",
          "Bigger and Bigger",
          "Leviathan",
        ],
        color: "#FFEB3B",
      },
      "Monstrous Might": {
        type: "tank_series",
        required: 3,
        category: "Tank",
        bonus:
          "Grow in size while stealing Health and Movement Speed. Combined with increasing true damage and Resistances, you'll turn into a behemoth on the battlefield.",
        augments: ["Bigger and Bigger", "Giant's Adversary", "Leviathan"],
        color: "#4CAF50",
      },
      "Mini Might": {
        type: "assassin_series",
        required: 3,
        category: "Assassin",
        bonus:
          "Shrink in size and gain Movement Speed and Armor Pen. Additionally, deal bonus damage against larger enemies, punching above your weight",
        augments: ["Smaller and Smaller", "Mad Scientist", "Giant's Adversary"],
        color: "#00BCD4",
      },
      "Salvation Link": {
        type: "support_series",
        required: 3,
        category: "Support",
        bonus:
          "Your heals and shields spread to allies and reduce cooldowns, forming a continuous support system for your team.",
        augments: ["Healing Force", "Transmissible Agents", "Virtuous Cycle"],
        color: "#8BC34A",
      },
      "Echoing Shields": {
        type: "defense_series",
        required: 3,
        category: "Tank",
        bonus:
          "While shielded, gain immunity to crowd control and bonus Movement Speed, and reflect incoming damage. Become a walking fortress on the battlefield!",
        augments: ["Starfall Shield", "Twice Thrice", "Typhoon"],
        color: "#009688",
      },
      "Shooter Expertise": {
        type: "adc_series",
        required: 4,
        category: "ADC",
        bonus:
          "Unleash a dazzling barrage of attacks, clearing enemies with overwhelming force.",
        augments: [
          "Proximal Storm",
          "Dashing",
          "Dangerous Footwork",
          "Hi-Precision Sharpshooter",
        ],
        color: "#FF9800",
      },
      Windrider: {
        type: "speed_series",
        required: 5,
        category: "Utility",
        bonus:
          "Movement Speed increases your damage and Heal Power, applies slow, and reduces cooldowns, making it the core of your battle prowess",
        augments: [
          "Movement Speed Enhancement",
          "Critical Strike Enhancement",
          "Ascension",
          "Pinnacle of Perfection",
          "Stroke of Luck",
        ],
        color: "#CDDC39",
      },
      "Rampant Flaws": {
        type: "crit_series",
        required: 3,
        category: "Damage",
        bonus:
          "Empowers all aspects of Critical Strikes for burst damage that dominates the battlefield.",
        augments: [
          "Critical Strike Enhancement",
          "Pinnacle of Perfection",
          "Stroke of Luck",
        ],
        color: "#FFC107",
      },
      "Control Expert": {
        type: "control_series",
        required: 3,
        category: "Support",
        bonus:
          "A dual-loop strategy where crowd control and survivability fuel each other.",
        augments: ["Supressive Vambrace", "Resolve", "Accelerated Control"],
        color: "#9C27B0",
      },
    };

    // Individual augment effects
    this.individualAugments = {
      "Soulhunter's chain": {
        series: "damage",
        effect: "Marks enemies for enhanced damage tracking and chain combos",
        category: "Damage",
        addedIn: "August 2025",
      },
      "Blade Array": {
        series: "damage_aoe",
        effect:
          "Creates magical arrays that automatically track and damage enemies",
        category: "Damage",
        addedIn: "August 2025",
      },
      "Mystic Punch": {
        series: "damage",
        effect: "Enhances basic attacks with explosive chain reactions",
        category: "Damage",
        addedIn: "August 2025",
      },
      "Health Marker": {
        series: "sustain",
        effect: "Marks targets for health-based damage and sustain effects",
        category: "Tank",
        addedIn: "August 2025",
      },
      "Dual Strike": {
        series: "combo",
        effect: "Enables dual-strike combos that weave attacks with abilities",
        category: "Damage",
        addedIn: "August 2025",
      },
      "Lion's Spellblade": {
        series: "spellblade",
        effect:
          "Empowers abilities with spellblade effects for sustained combat",
        category: "Damage",
        addedIn: "August 2025",
      },
      "Heart of Steel": {
        series: "tank",
        effect: "Provides defensive bonuses and crowd control resistance",
        category: "Tank",
        addedIn: "August 2025",
      },
      "Imprisoning Chain": {
        series: "control",
        effect: "Creates unbreakable crowd control chains between enemies",
        category: "Tank",
        addedIn: "August 2025",
      },
      "Thief's Circle": {
        series: "utility",
        effect:
          "Creates mobile gravity fields that trap and steal from enemies",
        category: "Utility",
        addedIn: "August 2025",
      },
      "Heartsong Bolt": {
        series: "support",
        effect: "Converts healing power into damage output",
        category: "Support",
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
    };

    this.presets = {
      tank: ["Heart of Steel", "Starfall Shield", "Spiny Counter"],
      damage: ["Soulhunter's chain", "Lion's Spellblade", "Blade Array"],
      support: [
        "Heartsong Conversion",
        "Healing Force",
        "Transmissible Agents",
      ],
      assassin: ["Lupine Soul", "Shadow Strike", "Master of Mobility"],
      marksman: [
        "Hi-Precision Sharpshooter",
        "Speed up, Meow!",
        "Proximal Storm",
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
