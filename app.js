// Wild Rift AAA ARAM Augment Chain Optimizer

// Application State
class AugmentOptimizer {
  constructor() {
    this.selectedAugments = new Set();
    this.suggestionCount = 12;
    this.playstyleFilter = [];
    this.searchQuery = "";

    // Augment data from the application data
    this.augmentChains = {
      "Stinging Storm": {
        type: "combo_series",
        required: 3,
        category: "Damage",
        bonus:
          "Mark enemies with abilities, deal more damage with attacks, then trigger the magic array to set off an explosive chain!",
        augments: ["Soulhunter's Chain", "Blade Array", "Mystic Punch"],
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
          "Soulhunter's Chain",
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
        category: "Adc",
        bonus:
          "Projectiles fly faster, deal increased damage, have shorter cooldowns, and ricochet to other targets on hit. Bounce your heart out!",
        augments: ["Speed up, Meow!", "Cool down, meow!", "Bounce, Meow!"],
        color: "#F39C12",
      },
      "Power of Arrays": {
        type: "aoe_series",
        required: 5,
        category: "Damage",
        bonus:
          "Arrays automatically track and burn enemies, and trigger a meteor shower with a large area of effect, creating a cycle of bombardment.",
        augments: [
          "Nowhere to Run, Meow!",
          "Burn, Meow!",
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
        category: "Adc",
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
        augments: ["Suppressive Vambrace", "Resolve", "Accelerated Control"],
        color: "#9C27B0",
      },
    };

    // this.individualAugments = {
    //   "Soulhunter's Chain": {
    //     series: "damage",
    //     effect: "Marks enemies for enhanced damage tracking and chain combos",
    //     category: "Damage",
    //     addedIn: "August 2025",
    // },

    // Individual augment effects
    this.individualAugments = {
      "Accelerated Control": {
        description:
          "Greatly reduces the cooldowns of crowd control abilities.",
        rarity: "Gold",
        roles: ["Tank", "Support"],
        types: ["Crowd Control"],
      },
      "Apex Inventor": {
        description: "Greatly reduces item cooldowns.",
        rarity: "Gold",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Solo Powerhouse"],
      },
      Ascension: {
        description:
          "Critical Strikes reduce your ultimate ability's cooldown.",
        rarity: "Silver",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Critical Strike"],
      },
      "Backup Battery": {
        description:
          "Reanimate temporarily to continue fighting after you die. You also revive faster.",
        rarity: "Prismatic",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Revival"],
      },
      "Be Magical": {
        description: "Converts bonus Attack Damage into Ability Power.",
        rarity: "Gold",
        roles: ["Mage"],
        types: ["Solo Powerhouse"],
      },
      "Be Physical": {
        description:
          "Converts Ability Power into Attack Damage and greatly increases Attack Damage.",
        rarity: "Prismatic",
        roles: ["Fighter", "Assassin", "Adc"],
        types: ["Solo Powerhouse"],
      },
      "Bigger and Bigger": {
        description:
          "When you get a kill, grow in size and permanently gain bonus Health.",
        rarity: "Prismatic",
        roles: ["Tank", "Fighter"],
        types: ["Size"],
      },
      "Black Hole": {
        description:
          "For a period of time, pull in nearby enemies. The more enemy champions nearby, the more Armor and Magic Resist you gain.",
        rarity: "Prismatic",
        roles: ["Tank", "Fighter"],
        types: ["Solo Powerhouse"],
      },
      "Blade Array": {
        description:
          "Summon a blade array when your ability hits an enemy, dealing your attack's damage and restoring Health.",
        rarity: "Gold",
        roles: ["Fighter"],
        types: ["Roaring Lion"],
      },
      "Bounce, Meow!": {
        description:
          "Projectiles have a chance to ricochet to nearby enemy champions on hit.",
        rarity: "Prismatic",
        roles: ["Mage"],
        types: ["Agile Cat"],
      },
      "Burn, Meow!": {
        description:
          "Enemies affected by the magic circles take damage over time.",
        rarity: "Silver",
        roles: ["Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Agile Cat"],
      },
      "Charged Shield": {
        description:
          "Taking damage build energy. At full energy, gain a shield, deal damage, and reset basic ability cooldowns.",
        rarity: "Prismatic",
        roles: ["Tank"],
        types: ["Wild Bear"],
      },
      "Combo Strike": {
        description:
          "After using a movement ability, your next attack strikes twice.",
        rarity: "Gold",
        roles: ["Assassin"],
        types: ["Shadow Wolf"],
      },
      "Cool down, meow!": {
        description: "Reduces the cooldowns of all projectile abilities.",
        rarity: "Silver",
        roles: ["Mage"],
        types: ["Agile Cat"],
      },
      "Critical Strike Enhancement": {
        description:
          "The higher your Critical Rate, the higher your Critical Strike Damage. Gain Movement Speed When you Critically Strike.",
        rarity: "Silver",
        roles: ["Adc"],
        types: ["Critical Strike"],
      },
      "Cursed Blight": {
        description:
          "On hit, your attacks and abilities slow the target and reduce Attack Speed. After collecting 4 Forbidden Augments, you'll be credited for all enemy champion kills.",
        rarity: "Silver",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Forbidden"],
      },
      "Dangerous Footwork": {
        description:
          "Your attacks fire missiles at nearby enemies. Missiles apply on-hit effects.",
        rarity: "Prismatic",
        roles: ["Adc"],
        types: ["Attack"],
      },
      Dashing: {
        description: "Reduces the cooldowns of movement abilities.",
        rarity: "Prismatic",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Movement"],
      },
      "Dive Bomber": {
        description:
          "Deal high damage to nearby enemies upon death. You also revive faster.",
        rarity: "Gold",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Revival"],
      },
      "Dual Wield": {
        description:
          "Reduces Attack Damage and Ability Power in exchange for a great Attack Speed boost.",
        rarity: "Gold",
        roles: ["Fighter", "Adc"],
        types: ["Solo Powerhouse"],
      },
      "Dual Strike": {
        description:
          "Hitting a target with an ability empowers your next attack, and hitting a target with an attack empowers your next ability. Both deal bonus true damage.",
        rarity: "Silver",
        roles: ["Fighter"],
        types: ["Roaring Lion"],
      },
      "Escape Artist": {
        description:
          "Taking damage reduces the cooldowns of your movement abilities.",
        rarity: "Silver",
        roles: ["Tank", "Fighter"],
        types: ["Movement"],
      },
      "Ethereal Weapon": {
        description: "[Item] Abilities apply on-hit effects.",
        rarity: "Gold",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Solo Powerhouse"],
      },
      Eureka: {
        description:
          "Gain Ability Haste based on your Attack Damage and Ability Power.",
        rarity: "Prismatic",
        roles: ["Mage", "Support"],
        types: ["Solo Powerhouse"],
      },
      Executioner: {
        description: "Refreshes basic ability cooldowns when you get a kill.",
        rarity: "Silver",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Solo Powerhouse"],
      },
      "Forbidden Bliss": {
        description:
          "Gain Omnivamp. After collecting 4 Forbidden Augments, you'll be credited for all enemy champion kills.",
        rarity: "Gold",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Forbidden"],
      },
      "Forbidden Evil": {
        description:
          "Your abilities grant permanent Adaptive Force on hit. After collecting 4 Forbidden Augments, you'll be credited for all enemy champion kills.",
        rarity: "Gold",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Forbidden"],
      },
      "Forbidden Rage": {
        description:
          "Greatly increases Critical Damage, true damage, and damage over time. After collecting 4 Forbidden Augments, you'll be credited for all enemy champion kills.",
        rarity: "Prismatic",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Forbidden"],
      },
      Fury: {
        description:
          "Grow in size and gain Armor and Resist after taking damage.",
        rarity: "Gold",
        roles: ["Tank", "Fighter"],
        types: ["Size"],
      },
      "Giant's Adversary": {
        description:
          "The smaller your size, the higher your damage. Enlargement effects gained make you shrink instead.",
        rarity: "Prismatic",
        roles: ["Assassin", "Mage", "Adc"],
        types: ["Size"],
      },
      "Healing Force": {
        description:
          "When you heal a target with an ability, reduce your basic ability cooldown.",
        rarity: "Silver",
        roles: ["Support"],
        types: ["Recovery"],
      },
      "Health Marker": {
        description:
          "Your abilities mark enemies on hit. Attacking marked enemies restores Health.",
        rarity: "Gold",
        roles: ["Adc"],
        types: ["Roaring Lion"],
      },
      "Heart of Steel": {
        description:
          "Mark nearby enemies. Triggering a mark pulls the enemy toward you and permanently increases your Armor and Magic Resist.",
        rarity: "Prismatic",
        roles: ["Tank"],
        types: ["Wild Bear"],
      },
      "Heartsong Blade": {
        description:
          "Spellblade: After granting allies a bonus, your next attack deals additional damage.",
        rarity: "Silver",
        roles: ["Support"],
        types: ["Sacred Doe", "Spellblade"],
      },
      "Heartsong Bolt": {
        description:
          "Gain an orb that builds up energy through heals and shields. The orb fires magic bolts and permanently increases your Heal and Shield Power.",
        rarity: "Prismatic",
        roles: ["Support"],
        types: ["Sacred Doe"],
      },
      "Heartsong Conversion": {
        description:
          "The higher your Heal and Shield Power, the higher your Ability Haste.",
        rarity: "Gold",
        roles: ["Support"],
        types: ["Sacred Doe"],
      },
      "Heartsong Corrosion": {
        description:
          "Your heals deal damage over time to enemies and steal their Heal and Shield Power.",
        rarity: "Silver",
        roles: ["Support"],
        types: ["Sacred Doe"],
      },
      "Heartsong Restoration": {
        description:
          "Greatly increases Heal and Shield Power and reduces ability cost.",
        rarity: "Silver",
        roles: ["Support"],
        types: ["Sacred Doe"],
      },
      "Heartsong Speed": {
        description:
          "Increases Heal and Shield Power. The higher your Heal and Shield Power, the faster you are.",
        rarity: "Silver",
        roles: ["Support"],
        types: ["Sacred Doe"],
      },
      "Heavyweight Fighter": {
        description:
          "The higher your Health, the larger your size and the more damage your attack deals.",
        rarity: "Gold",
        roles: ["Tank"],
        types: ["Size"],
      },
      "Hi-Precision Sharpshooter": {
        description:
          "Hitting an enemy with an ability at long range reduces the cooldowns of this ability and your ultimate ability.",
        rarity: "Gold",
        roles: ["Mage"],
        types: ["Solo Powerhouse"],
      },
      "Imprisoning Chain": {
        description:
          "When you crowd control an enemy, fire a chain that deals damage over time. If they break free, pull them back to you.",
        rarity: "Prismatic",
        roles: ["Tank"],
        types: ["Wild Bear"],
      },
      "Kaboom, Meow!": {
        description:
          "Build up Energy stacks when dealing damage. At full stacks, summon a magic circle that rains down bombs.",
        rarity: "Prismatic",
        roles: ["Mage"],
        types: ["Agile Cat"],
      },
      "Kinetic Cooldown": {
        description: "Moving reduces your basic ability cooldowns.",
        rarity: "Silver",
        roles: ["Support"],
        types: ["Movement", "Speed"],
      },
      "Late-Game Carry": {
        description:
          "Earn gold continuously. The more gold you have, the higher your damage.",
        rarity: "Prismatic",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Solo Powerhouse"],
      },
      Leviathan: {
        description:
          "The larger your size, the higher your damage. Shrinkage effects gained make you big instead.",
        rarity: "Prismatic",
        roles: ["Fighter"],
        types: ["Size"],
      },
      "Lightning Equipment": {
        description:
          "Dealing damage with items calls down lightning that slows enemies.",
        rarity: "Silver",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Movement", "Speed"],
      },
      "Lion's Spellblade": {
        description:
          "After hitting a target with an ability, your next attack summons a clone that attacks.",
        rarity: "Prismatic",
        roles: ["Fighter"],
        types: ["Roaring Lion", "Spellblade"],
      },
      "Lord of Spellblade": {
        description:
          "Attacks have a 75% chance to reduce all of Spellblade's effect cooldowns.",
        rarity: "Silver",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Spellblade"],
      },
      "Lunar Eclipse": {
        description:
          "The higher your Attack Speed, the higher your Physical Vamp.",
        rarity: "Gold",
        roles: ["Adc"],
        types: ["Vamp"],
      },
      "Lupine Miasma": {
        description:
          "Spellblade: After using an ability, your next attack creates a Lupine Miasma domain that grants you invisibility while you're within it.",
        rarity: "Prismatic",
        roles: ["Assassin"],
        types: ["Shadow Wolf", "Spellblade"],
      },
      "Lupine Soul": {
        description:
          "Summon a Lupine Soul when dashing. Lupine Soul triggers the effects of Shadow Wolf Augments.",
        rarity: "Prismatic",
        roles: ["Assassin"],
        types: ["Shadow Wolf"],
      },
      "Mad Scientist": {
        description:
          "Reduces your size and greatly increases your Movement Speed and Ability Haste.",
        rarity: "Prismatic",
        roles: ["Mage", "Support"],
        types: ["Size"],
      },
      "Master of Duality": {
        description:
          "Gain Ability Power when you hit an enemy with an attack and Attack Damage when you hit them with an ability.",
        rarity: "Prismatic",
        roles: ["Mage", "Adc"],
        types: ["Solo Powerhouse"],
      },
      "Master of Mobility": {
        description:
          "Gain a large amount of Ability Haste for movement abilities. Basic abilities are treated as movement abilities.",
        rarity: "Prismatic",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Movement"],
      },
      "Master Thief": {
        description: "Enhances all stealing effects and grants Omnivamp.",
        rarity: "Gold",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Thief"],
      },
      "Melee Shield": {
        description:
          "Gain a shield when you hit an enemy at close range. (10s cooldown per enemy)",
        rarity: "Silver",
        roles: ["Fighter"],
        types: ["Shield"],
      },
      "Mighty Shield": {
        description:
          "Become immune to crowd control and gain Movement speed while shielded.",
        rarity: "Silver",
        roles: ["Fighter"],
        types: ["Shield"],
      },
      "Mind to Matter": {
        description: "The higher your Mana, the higher your Health.",
        rarity: "Silver",
        roles: ["Mage"],
        types: ["Mana"],
      },
      "Moonlit Falcon Strike": {
        description:
          "Fire a missile that deals attack damage when you hit an enemy with an ability.",
        rarity: "Gold",
        roles: ["Adc"],
        types: ["Hunting Eagle"],
      },
      "Movement Speed Enhancement": {
        description:
          "The higher your Movement Speed, the higher your damage and Heal and Shield Power.",
        rarity: "Silver",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Movement", "Speed"],
      },
      "Mystic Punch": {
        description: "Attacks reduce all ability cooldowns.",
        rarity: "Prismatic",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Roaring Lion"],
      },
      "Nebula Rift": {
        description:
          "Grow in size. When taking damage, you have a chance to steal Health and Movement Speed from nearby enemies.",
        rarity: "Silver",
        roles: ["Tank", "Fighter"],
        types: ["Size"],
      },
      "Nowhere to Run, Meow!": {
        description: "Your magic circles and traps will shift over time.",
        rarity: "Prismatic",
        roles: ["Mage"],
        types: ["Agile Cat"],
      },
      "Piercing Feathers": {
        description: "Your Critical Strikes fire missiles at the target.",
        rarity: "Silver",
        roles: ["Adc"],
        types: ["Hunting Eagle"],
      },
      "Piercing Spellblade": {
        description:
          "Spellblade: After using an ability, your next attack deals damage over time to enemies in an area and reduces their Armor and Magic Resist.",
        rarity: "Gold",
        roles: ["Assassin"],
        types: ["Shadow Wolf", "Spellblade"],
      },
      "Pinnacle of Perfection": {
        description:
          "Critical Rate is capped at 25%. Excess Critical Rate is converted into high Critical Strike Damage.",
        rarity: "Gold",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Critical Strike"],
      },
      Plaguebrand: {
        description:
          "Your attacks mark enemies. At 5 stacks, deal damage in an area, slow enemies, and spread the mark.",
        rarity: "Prismatic",
        roles: ["Adc"],
        types: ["Hunting Eagle"],
      },
      "Plume Barrage": {
        description:
          "Your attacks splash damage. Critical Strikes empower the splash effect.",
        rarity: "Prismatic",
        roles: ["Adc"],
        types: ["Hunting Eagle"],
      },
      "Proximal Storm": {
        description:
          "Your ability damage and heals can Critically Strike. Gain 15% Critical Rate.",
        rarity: "Prismatic",
        roles: ["Mage", "Adc", "Support"],
        types: ["Critical Strike"],
      },
      Resolve: {
        description:
          "Quickly restore a large amount of Health when your Health is low. (Cooldown is reduced whenever you apply a crowd control effect.)",
        rarity: "Gold",
        roles: ["Tank", "Support"],
        types: ["Crowd Control"],
      },
      "Restless Restoration": {
        description: "Moving restores Health over time.",
        rarity: "Gold",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Recovery"],
      },
      "Scoped Weapons": {
        description: "Increases Attack Range.",
        rarity: "Gold",
        roles: ["Fighter", "Adc"],
        types: ["Solo Powerhouse"],
      },
      "Slow Detonation": {
        description: "When slowing an enemy, deal damage to enemies nearby.",
        rarity: "Gold",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Movement", "Speed"],
      },
      "Smaller and Smaller": {
        description:
          "When you get a kill, shrink in size and permanently gain Movement Speed.",
        rarity: "Prismatic",
        roles: ["Assassin", "Mage", "Adc"],
        types: ["Size"],
      },
      "Soulhunter's Chain": {
        description:
          "Your abilities mark enemies on hit. Your attacks damage marked enemies.",
        rarity: "Gold",
        roles: ["Fighter"],
        types: ["Roaring Lion"],
      },
      "Speed Thief": {
        description: "Gain Movement Speed when you slow enemies.",
        rarity: "Silver",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Movement", "Speed"],
      },
      "Speed up, Meow!": {
        description: "Greatly increases the speed and damage of projectiles.",
        rarity: "Prismatic",
        roles: ["Mage"],
        types: ["Agile Cat"],
      },
      "Spellblade Combo": {
        description:
          "Spellblade: After using an ability, your next attack strikes twice.",
        rarity: "Gold",
        roles: ["Assassin"],
        types: ["Shadow Wolf", "Spellblade"],
      },
      "Spiny Counter": {
        description:
          "When hit by an enemy champion's attack or when an enemy champion nearby casts an ability, deal magic damage to the attack or caster",
        rarity: "Silver",
        roles: ["Tank"],
        types: ["Solo Powerhouse"],
      },
      "Splintered Chakrams": {
        description:
          "Your attacks store Wing Blades. Hitting an enemy with an ability fires them. At max stacks, attacks also fire Wing Blades.",
        rarity: "Prismatic",
        roles: ["Adc"],
        types: ["Hunting Eagle"],
      },
      "Stack 'em Mana": {
        description:
          "You can have more than one item from the Tear of the Goddess series in your inventory.",
        rarity: "Silver",
        roles: ["Mage", "Adc"],
        types: ["Mana"],
      },
      "Stack Assault": {
        description:
          "The more attacks you hit an enemy champion with, the higher the damage of your attacks against them.",
        rarity: "Prismatic",
        roles: ["Adc"],
        types: ["Hunting Eagle"],
      },
      "Stackosaurus Rex": {
        description: "Effects stack much faster.",
        rarity: "Prismatic",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Solo Powerhouse"],
      },
      "Starfall Shield": {
        description: "Upon gaining a shield, deal damage in an area.",
        rarity: "Silver",
        roles: ["Tank"],
        types: ["Shield"],
      },
      "Starlight Cross": {
        description:
          "On hit, your attacks and abilities deal damage in an area. The higher your Mana, the higher the damage.",
        rarity: "Prismatic",
        roles: ["Mage"],
        types: ["Mana"],
      },
      "Stealth Mode": {
        description: "Become invisible after using a movement ability.",
        rarity: "Gold",
        roles: ["Assassin"],
        types: ["Movement"],
      },
      "Stroke of Luck": {
        description:
          "Increases Critical Rate by 50% and greatly increases your luck.",
        rarity: "Gold",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Solo Powerhouse"],
      },
      "Suppressive Vambrace": {
        description:
          "Applying crowd control effects grants stacking Armor and Magic Resist.",
        rarity: "Gold",
        roles: ["Tank", "Fighter"],
        types: ["Crowd Control"],
      },
      "Swift and Safe": {
        description: "Gain a shield after using a movement ability.",
        rarity: "Silver",
        roles: ["Fighter", "Assassin", "Adc"],
        types: ["Movement"],
      },
      "Tectonic Rift": {
        description:
          "Using movement abilities summons an explosive crack along your path, stealing the enemy's Movement Speed.",
        rarity: "Prismatic",
        roles: ["Assassin"],
        types: ["Shadow Wolf", "Thief"],
      },
      "Thief's Circle": {
        description:
          "Applying crowd control steals the affected enemy's size, Armor, and Magic Resist, and deals damage.",
        rarity: "Prismatic",
        roles: ["Tank", "Fighter"],
        types: ["Wild Bear", "Thief"],
      },
      "Transmissible Agents": {
        description:
          "Your heals and shields are also granted to another teammate.",
        rarity: "Prismatic",
        roles: ["Support"],
        types: ["Recovery"],
      },
      "Truce Shield": {
        description:
          "Gain a shield upon leaving combat. The higher your Adaptive Force, the more damage the shield absorbs.",
        rarity: "Gold",
        roles: ["Tank"],
        types: ["Shield"],
      },
      "Twice Thrice": {
        description: "Your attacks have a chance of striking twice.",
        rarity: "Gold",
        roles: ["Adc"],
        types: ["Attack"],
      },
      Typhoon: {
        description:
          "Your attacks call down lightning bolts and apply on-hits.",
        rarity: "Silver",
        roles: ["Adc"],
        types: ["Attack"],
      },
      "Unstoppable Surge": {
        description:
          "Spellblade: After using an ability, your next attack deals damage in an area and grants Armor and Magic Resist.",
        rarity: "Silver",
        roles: ["Tank"],
        types: ["Wild Bear", "Spellblade"],
      },
      "Vengeful Counter": {
        description: "After taking damage 4 times, attack the attacker.",
        rarity: "Gold",
        roles: ["Tank"],
        types: ["Wild Bear"],
      },
      "Virtuous Cycle": {
        description: "Healing grants a shield, and a shield grants healing.",
        rarity: "Silver",
        roles: ["Support"],
        types: ["Recovery"],
      },
      Vulnerability: {
        description:
          "[Critical Strike] Your item damage and your abilities' damage over time effects can Critically Strike. Gain 25% Critical Rate.",
        rarity: "Silver",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Critical Strike"],
      },
      Whale: {
        description:
          "You can buy items anytime and gain access to unique items.",
        rarity: "Prismatic",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Solo Powerhouse"],
      },
      Windwalk: {
        description: "Gain Movement Speed when you heal or shield a target.",
        rarity: "Gold",
        roles: ["Tank", "Fighter", "Assassin", "Mage", "Adc", "Support"],
        types: ["Movement", "Speed"],
      },
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.renderAugmentCategories();
    this.updateChainProgress();
    this.updateRecommendations();
    this.updateAugmentCount(); // <-- Add this line to update augment count on load
  }

  updateAugmentCount() {
    const allAugments = this.getAllAugments();
    const count = Object.keys(allAugments).length;
    const countEls = document.querySelectorAll(".augment-count");
    countEls.forEach((el) => {
      el.textContent = count;
    });
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
        if (e.target.type === "checkbox") {
          const value = e.target.value;
          if (e.target.checked) {
            if (!this.playstyleFilter.includes(value)) {
              this.playstyleFilter.push(value);
            }
          } else {
            this.playstyleFilter = this.playstyleFilter.filter(
              (filter) => filter !== value
            );
          }
          this.renderAugmentCategories();
          this.updateRecommendations();
        }
      });

    document.getElementById("augmentSearch").addEventListener("input", (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderAugmentCategories();
      this.updateRecommendations();
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
      this.selectedAugments.clear();
      this.playstyleFilter = [];

      // Clear all playstyle checkboxes
      const checkboxes = document.querySelectorAll(
        '#playstyleFilter input[type="checkbox"]'
      );
      checkboxes.forEach((checkbox) => (checkbox.checked = false));

      this.renderAugmentCategories();
      this.updateChainProgress();
      this.updateRecommendations();
    });

    // Modal
    document.getElementById("modalClose").addEventListener("click", () => {
      this.closeModal();
    });

    document.querySelector(".modal__backdrop").addEventListener("click", () => {
      this.closeModal();
    });
  }

  getCategoriesFromRoles(roles) {
    // Map roles to categories for individual augments - return array of all applicable categories
    const categories = [];
    if (roles.includes("Adc")) categories.push("Adc");
    if (roles.includes("Assassin")) categories.push("Assassin");
    if (roles.includes("Fighter")) categories.push("Fighter");
    if (roles.includes("Mage")) categories.push("Mage");
    if (roles.includes("Support")) categories.push("Support");
    if (roles.includes("Tank")) categories.push("Tank");
    return categories.length > 0 ? categories : ["Other"];
  }

  getAllAugments() {
    const mappedIndividualAugments = {};
    Object.entries(this.individualAugments).forEach(([name, augment]) => {
      mappedIndividualAugments[name] = {
        ...augment,
        effect: augment.description,
        categories: this.getCategoriesFromRoles(augment.roles || []),
      };
    });

    Object.entries(this.augmentChains).forEach(([chainName, chain]) => {
      chain.augments.forEach((augment) => {
        if (mappedIndividualAugments[augment]) {
          mappedIndividualAugments[augment] = {
            ...mappedIndividualAugments[augment],
            chain: chainName,
            chainBonus: chain.bonus,
            color: chain.color,
          };
        } else {
          console.warn(
            `Chain augment "${augment}" not found in individual augments`
          );
        }
      });
    });

    return mappedIndividualAugments;
  }

  renderAugmentCategories() {
    const container = document.getElementById("augmentCategories");
    const allAugments = this.getAllAugments();

    const categories = {};
    Object.entries(allAugments).forEach(([name, augment]) => {
      const augmentCategories = augment.categories || [
        augment.category || "Other",
      ];

      // Add this augment to each of its applicable categories
      augmentCategories.forEach((category) => {
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push({ name, ...augment });
      });
    });

    // Filter categories by playstyle
    const filteredCategories = {};
    Object.entries(categories).forEach(([category, augments]) => {
      if (
        this.playstyleFilter.length === 0 ||
        this.playstyleFilter.some((filter) => category.includes(filter))
      ) {
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
                                <div class="augment-name">${augment.name}${
                          augment.chain
                            ? ` <span style="color: ${
                                augment.color || "#888"
                              }; font-size: 0.8em;">[${augment.chain}]</span>`
                            : ""
                        }</div>
                                <div class="augment-effect">${augment.effect}${
                          augment.chainBonus
                            ? ` <br><small style="color: #666;">Chain: ${augment.chainBonus}</small>`
                            : ""
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
    let recommendations = this.generateRecommendations();

    // Filter recommendations by playstyle if one is selected
    if (this.playstyleFilter.length > 0) {
      recommendations = recommendations.filter((rec) => {
        const allAugments = this.getAllAugments();
        const augment = allAugments[rec.augment];

        if (!augment) return false;

        // Check if augment's categories match any selected playstyle filter
        const augmentCategories = augment.categories || [
          augment.category || "Other",
        ];

        return this.playstyleFilter.some((filter) =>
          augmentCategories.some(
            (category) => category === filter || category.includes(filter)
          )
        );
      });
    }

    // Filter recommendations by search query if one is active
    if (this.searchQuery) {
      recommendations = recommendations.filter(
        (rec) =>
          rec.augment.toLowerCase().includes(this.searchQuery) ||
          rec.reason.toLowerCase().includes(this.searchQuery) ||
          rec.effect.toLowerCase().includes(this.searchQuery)
      );
    }

    if (recommendations.length === 0) {
      const message = this.searchQuery
        ? `<p>No recommendations found matching "${this.searchQuery}"</p>`
        : `<p>Select some augments to see recommendations!</p>`;
      container.innerHTML = `<div class="empty-state">${message}</div>`;
      return;
    }

    const getGradientClass = (rarity) => {
      switch ((rarity || "").toLowerCase()) {
        case "silver":
          return "gradient-silver";
        case "gold":
          return "gradient-gold";
        case "prismatic":
          return "gradient-prismatic";
        default:
          return "";
      }
    };

    const generateRemainingCircles = (remainingAugments) => {
      if (!remainingAugments || remainingAugments.length === 0) return "";

      const circles = remainingAugments
        .map((aug) => {
          const rarityColor = {
            Prismatic: "#e953b2",
            Gold: "#ffd700",
            Silver: "#c0c0c0",
          };
          const color = rarityColor[aug.rarity] || rarityColor["Silver"];
          return `<span class="remaining-circle" style="background-color: ${color}; border: 1px solid var(--color-background);" title="${aug.name} (${aug.rarity})"></span>`;
        })
        .join("");

      return `<div class="remaining-circles">${circles}</div>`;
    };

    const allAugments = this.getAllAugments();

    container.innerHTML = recommendations
      .slice(0, this.suggestionCount)
      .map((rec) => {
        const augmentData = allAugments[rec.augment] || {};
        const rarity = augmentData.rarity || "";
        const gradientClass = getGradientClass(rarity);
        return `
            <div class="recommendation-item" data-augment="${rec.augment}">
                <div class="recommendation-header">
                    <h4 class="recommendation-name ${gradientClass}">${
          rec.augment
        }</h4>
                    <div class="recommendation-badges">
                        <span class="recommendation-priority">Priority ${
                          rec.priority
                        }</span>
                        ${
                          rec.chainCount > 1
                            ? `<span class="chain-count-badge">${rec.chainCount} chains</span>`
                            : ""
                        }
                        ${generateRemainingCircles(rec.remainingAugments)}
                    </div>
                </div>
                <div class="recommendation-reason">${rec.reason}</div>
                <div class="recommendation-effect">${rec.effect}</div>
            </div>
        `;
      })
      .join("");

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

    const augmentChainCount = {};
    Object.entries(this.augmentChains).forEach(([chainName, chain]) => {
      chain.augments.forEach((augment) => {
        augmentChainCount[augment] = (augmentChainCount[augment] || 0) + 1;
      });
    });

    const processedAugments = new Set();

    Object.entries(this.augmentChains).forEach(([chainName, chain]) => {
      const selectedInChain = chain.augments.filter((augment) =>
        this.selectedAugments.has(augment)
      );

      const missingAugments = chain.augments.filter(
        (augment) => !this.selectedAugments.has(augment)
      );

      missingAugments.forEach((augment) => {
        // Skip if we've already processed this augment
        if (processedAugments.has(augment)) return;
        processedAugments.add(augment);

        let priority = 1;
        let reason = `Part of ${chainName} chain`;

        // Base priority boost for multi-chain augments (versatility bonus)
        const chainCount = augmentChainCount[augment] || 1;
        if (chainCount > 1) {
          priority += chainCount; // Each additional chain adds +1 priority
          reason = `Versatile augment (${chainCount} chains)`;
        }

        // Find the best completion status across all chains this augment belongs to
        let bestCompletionStatus = {
          priority: 0,
          reason: reason,
          efficiency: 0,
        };

        Object.entries(this.augmentChains).forEach(
          ([otherChainName, otherChain]) => {
            if (otherChain.augments.includes(augment)) {
              const selectedInOtherChain = otherChain.augments.filter((a) =>
                this.selectedAugments.has(a)
              ).length;

              const augmentsNeededToComplete =
                otherChain.required - selectedInOtherChain;
              const completionProgress =
                selectedInOtherChain / otherChain.required;

              let chainPriority = 0;
              let chainReason = reason;
              let efficiency = 0; // Lower is better - fewer augments needed

              // Granular priority based on augments needed to complete
              if (augmentsNeededToComplete === 1) {
                // Immediate completion - highest priority
                chainPriority = 10;
                efficiency = 1; // Only 1 augment needed
                chainReason = `Complete ${otherChainName} chain (${selectedInOtherChain}/${otherChain.required})`;
              } else if (augmentsNeededToComplete === 2) {
                // Near completion - very high priority
                chainPriority = 8;
                efficiency = 2; // 2 augments needed
                chainReason = `Near completion of ${otherChainName} (need ${augmentsNeededToComplete} more)`;
              } else if (augmentsNeededToComplete === 3) {
                // Close to completion - high priority, with progress-based adjustment
                chainPriority = 6 + completionProgress; // Add progress as decimal for tiebreaking
                efficiency = 3; // 3 augments needed
                chainReason = `Close to ${otherChainName} completion (need ${augmentsNeededToComplete} more)`;
              } else if (completionProgress >= 0.5) {
                // More than halfway - medium priority
                chainPriority = 4 + completionProgress; // Add progress for tiebreaking
                efficiency = augmentsNeededToComplete;
                chainReason = `Continue ${otherChainName} chain (${selectedInOtherChain}/${otherChain.required})`;
              } else {
                // Early stage - low priority
                chainPriority = 2 + completionProgress; // Add progress for tiebreaking
                efficiency = augmentsNeededToComplete;
                chainReason = `Start ${otherChainName} chain (${selectedInOtherChain}/${otherChain.required})`;
              }

              // Update if this chain offers better completion status
              // Primary: higher priority, Secondary: lower efficiency (fewer augments needed)
              const isBetter =
                chainPriority > bestCompletionStatus.priority ||
                (chainPriority === bestCompletionStatus.priority &&
                  efficiency < bestCompletionStatus.efficiency);

              if (isBetter) {
                bestCompletionStatus = {
                  priority: chainPriority,
                  reason: chainReason,
                  efficiency: efficiency,
                };
              }
            }
          }
        );

        // Apply the best completion bonus
        priority += bestCompletionStatus.priority;
        reason = bestCompletionStatus.reason;

        // If it's a versatile augment, mention all applicable chains
        if (chainCount > 1) {
          const applicableChains = Object.entries(this.augmentChains)
            .filter(([_, chain]) => chain.augments.includes(augment))
            .map(([name, _]) => name);
          reason += ` - Works with: ${applicableChains.join(", ")}`;
        }

        // Check if augment matches playstyle filter (for chain augments)
        const augmentData = allAugments[augment];
        const augmentCategories = augmentData?.categories || [chain.category];
        const playstyleMatch =
          this.playstyleFilter.length === 0 ||
          this.playstyleFilter.some((filter) =>
            augmentCategories.some(
              (category) => category === filter || category.includes(filter)
            )
          );

        // Add small boost to priority for playstyle match (for display purposes)
        if (playstyleMatch && this.playstyleFilter.length > 0) {
          priority += 1;
        }

        // Calculate remaining augments needed for completion after selecting this augment
        const remainingAugmentsSet = new Set();
        Object.entries(this.augmentChains).forEach(([chainName, chain]) => {
          if (chain.augments.includes(augment)) {
            const selectedInChain = chain.augments.filter((a) =>
              this.selectedAugments.has(a)
            ).length;
            const augmentsNeededAfterSelection =
              chain.required - selectedInChain - 1; // -1 because we're adding this augment

            if (augmentsNeededAfterSelection > 0) {
              const missingAugments = chain.augments.filter(
                (a) => !this.selectedAugments.has(a) && a !== augment
              );
              missingAugments.forEach((augName) =>
                remainingAugmentsSet.add(augName)
              );
            }
          }
        });

        const remainingAugments = Array.from(remainingAugmentsSet).map(
          (augName) => ({
            name: augName,
            rarity: allAugments[augName]?.rarity || "Silver",
          })
        );

        const rarityOrder = { Prismatic: 0, Gold: 1, Silver: 2 };
        remainingAugments.sort(
          (a, b) => (rarityOrder[a.rarity] || 2) - (rarityOrder[b.rarity] || 2)
        );

        recommendations.push({
          augment,
          priority,
          reason,
          effect: allAugments[augment]?.effect || chain.bonus,
          chain: chainName,
          chainCount: chainCount,
          efficiency: bestCompletionStatus.efficiency || 999, // Higher number = less efficient
          playstyleMatch: playstyleMatch && this.playstyleFilter.length > 0,
          remainingAugments: remainingAugments.slice(0, 5), // Limit to 5 to avoid clutter
        });
      });
    });

    // Add individual augments that match playstyle
    Object.entries(this.individualAugments).forEach(([name, augment]) => {
      if (!this.selectedAugments.has(name) && !processedAugments.has(name)) {
        let priority = 2;
        let reason = `Standalone augment - ${augment.category}`;

        const mappedAugment = allAugments[name];
        const augmentCategories = mappedAugment?.categories || [
          augment.category,
        ];

        const playstyleMatch =
          this.playstyleFilter.length === 0 ||
          this.playstyleFilter.some((filter) =>
            augmentCategories.some(
              (cat) => cat === filter || cat.includes(filter)
            )
          );

        if (playstyleMatch && this.playstyleFilter.length > 0) {
          priority = 3;
          const matchingFilters = this.playstyleFilter.filter((filter) =>
            augmentCategories.some(
              (cat) => cat === filter || cat.includes(filter)
            )
          );
          reason = `Matches your ${matchingFilters.join(", ")} playstyle${
            matchingFilters.length > 1 ? "s" : ""
          }`;
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
          chainCount: 0,
          efficiency: 999, // Standalone augments have lowest efficiency priority
          playstyleMatch: playstyleMatch && this.playstyleFilter.length > 0,
          remainingAugments: [], // Individual augments have no remaining chain augments
        });
      }
    });

    // Sort by playstyle match first (matching playstyle takes precedence),
    // then by priority (highest first), then by efficiency (lowest number = fewer augments needed), then by chain count (most versatile)
    return recommendations.sort((a, b) => {
      // Primary: playstyle match (true > false)
      if (a.playstyleMatch !== b.playstyleMatch) {
        return b.playstyleMatch - a.playstyleMatch;
      }
      // Secondary: priority (highest first)
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }
      // Tertiary: efficiency (fewer augments needed is better)
      if (a.efficiency !== b.efficiency) {
        return a.efficiency - b.efficiency;
      }
      // Quaternary: chain count (more versatile is better)
      return (b.chainCount || 0) - (a.chainCount || 0);
    });
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
                <strong>Category:</strong> ${(
                  augment.categories || [augment.category]
                ).join(", ")}
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
                <button class="btn btn--primary btn--full-width modal-toggle-btn" data-augment="${augmentName}">
                    ${
                      this.selectedAugments.has(augmentName) ? "Remove" : "Add"
                    } Augment
                </button>
            </div>
        `;

    modal.classList.remove("hidden");

    // Add event listener for the toggle button
    const toggleBtn = modal.querySelector(".modal-toggle-btn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        this.toggleAugment(augmentName);
        this.closeModal();
      });
    }
  }

  closeModal() {
    document.getElementById("augmentModal").classList.add("hidden");
  }
}

// Initialize the application
const app = new AugmentOptimizer();

// Make app globally accessible for inline event handlers
window.app = app;
