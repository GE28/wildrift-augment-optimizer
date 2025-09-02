# Wild Rift AAA ARAM Augment Optimizer

An interactive web application to help League of Legends: Wild Rift players choose augments in AAA ARAM mode. Input your current augments and get recommendations to complete augment chains.

## What this tool does

- **Track your progress**: Mark the augments you have to see your chain completion status.
- **Get recommendations**: Receive prioritized suggestions for which augments to pick next.
- **Optimize for chains**: The tool focuses on completing augment combinations for better synergy.
- **Analyze in real-time**: Recommendations update as you select or deselect augments.
- **Support for multi-chain augments**: Handles augments that are part of multiple chains.

## Key features

### Interactive augment management
- Click to select the augments you currently have.
- View chain progress bars to see completion status.
- Get real-time updates to recommendations.
- Double-click an augment for detailed information.

### Recommendation logic
- **Priority system**: Chains needing only 1-2 more augments are given a higher priority.
- **Versatility bonus**: Augments that contribute to multiple chains are favored.
- **Efficiency scoring**: Considers rarity cost versus the benefit of completing a chain.
- **Chain switching**: For multi-chain augments, click the badge to cycle its chain focus.

### Filtering and search
- **Role filtering**: Tank, Fighter, Assassin, Mage, Marksman, Support.
- **Search bar**: Find augments by name or description.
- **Adjustable results**: Use the slider to show 1-12 recommendations.
- **Reset function**: Clear all selections and start over.

### User experience
- **Guided tutorial**: An interactive tour explains all features.
- **Dark/Light themes**: Toggle for comfortable viewing.
- **Tooltips**: Hover over elements for more information.

### To-do
- **Save state**: Remember user selections between sessions using local storage.
- **Mobile optimization**: Improve the layout for smaller screen sizes.

## Quick start

1. **Clone the repository**: You can download the ZIP or use `git clone`.
2. **Open the app**: Open `index.html` in a modern web browser.
3. **Optional tutorial**: Click the tutorial button (left of the theme toggle) for a guided tour.
4. **Filter by role**: Select your champion's role(s) to narrow the recommendations.
5. **Input current augments**: Click on the augments you have in-game.
6. **Follow recommendations**: The suggestions will help you complete augment chains.
7. **Switch chain focus**: For versatile augments, click the chain badge to cycle its focus.

## Project Files

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

Note: The data in `augment_data.json` may be outdated compared to the hardcoded data in `app.js`.

## Disclaimer

This is an independent project created for educational and informational purposes. It may reference names, mechanics, and other elements from **League of Legends: Wild Rift**, which are the intellectual property of Riot Games, Inc. The author does not claim any ownership of or affiliation with Riot Games.

All information is based on publicly available data and community insights at the time of the last update. The author assumes no responsibility for any inaccuracies or changes in game mechanics. Please refer to official Riot Games sources for the most current information.

By using this tool, you acknowledge that it is unofficial, fan-created content. If you are affiliated with Riot Games and believe this content infringes on your rights, please contact the author.

## Author

Made with ❤️ by [GE28](https://github.com/GE28)

**Optimize your augment choices and dominate the Howling Abyss!** 🎮✨