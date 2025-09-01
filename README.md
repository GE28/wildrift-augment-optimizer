# Wild Rift AAA ARAM Augment Optimizer

An interactive web application that helps League of Legends: Wild Rift players make optimal augment choices in AAA ARAM mode. Input your current augments and get intelligent recommendations for completing powerful augment chains.

## ✨ What This Tool Does

- **Track Your Progress**: Mark augments you already have and see your chain completion status
- **Smart Recommendations**: Get prioritized suggestions for which augments to pick next  
- **Chain Optimization**: Focuses on completing powerful augment combinations for maximum synergy
- **Real-time Analysis**: Updates recommendations as you select/deselect augments
- **Multi-chain Support**: Handles augments that work in multiple chains

## 🎯 Key Features

### Interactive Augment Management
- Click to select augments you currently have
- Visual chain progress bars showing completion status
- Real-time recommendation updates
- Double-click for detailed augment information

### Smart Recommendation Algorithm
- **Priority System**: Chains needing 1-2 more augments get highest priority
- **Versatility Bonus**: Augments that work in multiple chains are favored
- **Efficiency Scoring**: Considers rarity cost vs. chain completion benefit
- **Chain Switching**: For multi-chain augments, click to cycle through options

### Filtering & Search
- **Role Filtering**: Tank, Fighter, Assassin, Mage, Marksman, Support
- **Search Bar**: Find specific augments by name or effect
- **Adjustable Results**: Slider to show 1-12 recommendations
- **Reset Function**: Clear all selections to start fresh

### User Experience
- **Guided Tutorial**: Interactive tour explaining all features
- **Dark/Light Themes**: Toggle for comfortable viewing
- **Tooltips**: Hover for detailed information

### TO-DO
- **Save Previous State**: Remember last selections using local storage
- **Mobile Optimization**: Improve layout for smaller screens

## 🚀 Quick Start

1. **Open the App**: Just open `index.html` in any modern web browser
2. **Optional Tutorial**: Click the tutorial button (🎓) for a guided walkthrough  
3. **Filter by Role**: Select your champion's role(s) to focus recommendations
4. **Input Current Augments**: Click on augments you already have in-game
5. **Follow Recommendations**: Pick suggested augments to complete powerful chains
6. **Switch Chain Focus**: For versatile augments, click the chain badge to cycle options

## 🔧 How It Works

### Chain Completion Logic
The app tracks 25+ augment chains including:
- **Damage**: Stinging Storm, Berserker's Domain, Stack 'em Attacks, Power of Arrays
- **Tank**: Since You're Here, Torment Engine, Monstrous Might, Echoing Shields  
- **Utility**: Kitty Missile, Lupine Stance, Windrider, Salvation Link
- **Special**: Forbidden Series, Moonlight Resonance, Mini Might

### Recommendation Priority
1. **Near Completion** (8+ priority): Chains needing only 1-2 more augments
2. **Good Progress** (4-6 priority): Chains 50%+ complete
3. **Chain Starters** (2-3 priority): Beginning new beneficial chains
4. **Versatile Augments** (+1 per additional chain): Work in multiple chains

### Smart Features
- **Cost Awareness**: Considers augment rarity (Silver/Gold/Prismatic) 
- **Chain Conflicts**: Handles augments that appear in multiple chains
- **Dynamic Updates**: Recommendations change based on your selections
- **Visual Indicators**: Color-coded progress bars and completion status

## 📁 Project Files

```
wildrift-augment-optimizer/
├── index.html                   # Main application interface
├── app.js                       # Core application logic (~1900 lines)
├── style.css                    # Styling and responsive design  
├── tutorial.js                  # Code of the interactive guided tour 
├── theme.js                     # Dark/light mode switching
├── augment_chains.json          # Chain definitions (25+ chains)
├── augment_data.json            # Augment details (100+ augments)
├── disclaimer.html              # Legal information
├── assets/                      # GitHub icons and images
├── LICENSE                      # GNU GPL v3 license
└── GNU_v3_LICENSE               # Full license text
```

Caution: `augment_data.json` may be outdated compared to the hardcoded augment data in `app.js`. The app currently relies on `app.js` for accurate augment information.

## 💾 Data Coverage

- **100+ Individual Augments**: All current AAA ARAM augments
- **25+ Augment Chains**: From simple 2-augment chains to complex 5-augment combinations
- **Rarity System**: Silver, Gold, and Prismatic augments properly weighted
- **Role Classification**: Tank, Fighter, Assassin, Mage, ADC, Support categories
- **August 2025 Data**: Up-to-date with latest patch information

## 🎮 Usage Tips

- **Start with Role Filter**: Select your champion's role(s) first to see relevant augments
- **Focus on Near-Complete**: Prioritize chains showing "Almost Complete" status
- **Check Versatile Augments**: Look for "X chains" badges - these offer flexibility
- **Use Search**: Type augment names or keywords to find specific items quickly
- **Reset When Needed**: Use the Reset button to clear selections and try different strategies

## 🛠️ Technical Details

- **Pure Client-Side**: No server required, runs entirely in browser
- **Vanilla JavaScript**: No external dependencies except tutorial library
- **Responsive CSS**: Works on mobile devices and desktops
- **Local Storage**: Remembers your theme preference
- **Shepherd.js**: Powers the interactive tutorial system

## ⚖️ Disclaimer

This software is an independent project created for educational and informational purposes only. It may reference names, mechanics, champions and other elements from **League of Legends: Wild Rift**, which are the intellectual property of Riot Games, Inc. The author does not claim any ownership, rights, or affiliation with Riot Games, nor does this project represent official content or endorsements from Riot Games.

All information provided is based on publicly available data, community insights, and general knowledge as of August 31, 2025. The author assumes no responsibility for any inaccuracies, changes in game mechanics, or outcomes resulting from using this guide. Riot Games retains all rights to their trademarks, copyrights, and game content—users are encouraged to refer to official Riot Games sources for the most up-to-date and authoritative information.

By using this guide, you acknowledge that it is unofficial fan-created content and agree to hold the author harmless from any claims, damages, or liabilities arising from its use. If you're affiliated with Riot Games and believe this content infringes on your rights, please contact the author for prompt resolution.

## 👨‍💻 Author

Made with ❤️ by [GE28](https://github.com/GE28)

---

**Optimize your augment choices and dominate the Howling Abyss!** 🎮✨