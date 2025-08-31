/**
 * This file defines a guided tour of the application's main features.
 * To use it, you'll need to include Shepherd.js and its CSS in your project,
 * then instantiate and start this tour.
 *
 * Example Usage in your main app file:
 * const tour = setupTour();
 * document.querySelector('#start-tour-button').addEventListener('click', () => {
 *   tour.start();
 * });
 *
 */

function setupTour() {
  // Initialize a new Shepherd tour
  const tour = new Shepherd.Tour({
    useModalOverlay: true, // This darkens the background
    defaultStepOptions: {
      classes: "shepherd-theme-dark", // Or any other theme you prefer
      scrollTo: true,
      cancelIcon: {
        enabled: true,
      },
      buttons: [
        {
          action() {
            return this.back();
          },
          classes: "shepherd-button-secondary",
          text: "Back",
        },
        {
          action() {
            return this.next();
          },
          text: "Next",
        },
      ],
    },
  });

  // --- Step 1: Welcome Message ---
  tour.addStep({
    id: "welcome",
    text: "Welcome to the Wild Rift ARAM Augment Optimizer! This tool helps you discover the best augments and complete your augment chains faster.",
    attachTo: {
      element: ".header__title", // Selector for the main title: "Wild Rift AAA ARAM Augment Optimizer"
      on: "bottom",
    },
    buttons: [
      {
        action() {
          return this.next();
        },
        text: "Start Tour",
      },
    ],
  });

  // --- Step 2: Playstyle Filter ---
  tour.addStep({
    id: "playstyle-filter",
    text: "Start by selecting your champion's role(s) here. This filters the recommendations to match your playstyle. You can select one or multiple roles.",
    attachTo: {
      element: ".playstyle-filter-container", // Selector for the container of the role checkboxes
      on: "right",
    },
  });

  // --- Step 3: Search for Current Augments ---
  tour.addStep({
    id: "search-augments",
    text: "If you've already picked an augment in-game, use this search bar to find it and toggle it on. The recommendations will update based on what you already have.",
    attachTo: {
      element: "#augmentSearch", // Selector for the search input field
      on: "bottom",
    },
  });

  // --- Step 4: Recommended Augments List ---
  tour.addStep({
    id: "recommended-list",
    text: "This list shows the recommended augments based on your filters and current build. Click an augment to see its details and add it.",
    attachTo: {
      element: "#recommendations", // Selector for the recommendations container
      on: "left",
    },
  });

  // --- Step 5: Track Chain Progress ---
  tour.addStep({
    id: "chain-progress",
    text: "When you add an augment, you can track your progress towards completing its chain here. The progress bars update automatically.",
    attachTo: {
      element: "#chainProgress", // Selector for the chain progress container
      on: "right",
    },
  });

  // --- Step 6: Toggle Chains ---
  tour.addStep({
    id: "toggle-chains",
    text: "Some augments work with multiple chains. You can click these chain badges to toggle which chain you want to prioritize for that recommendation.",
    attachTo: {
      // This targets the chain badges on the first recommended augment that has them.
      element: ".chain-count-badge",
      on: "left",
    },
  });

  // --- Step 7: Reset Button ---
  tour.addStep({
    id: "reset-build",
    text: "Finally, you can click this button to reset all selected augments and filters to start a new plan.",
    attachTo: {
      element: "#resetBtn", // Selector for the reset button
      on: "bottom",
    },
    buttons: [
      {
        action() {
          return this.back();
        },
        classes: "shepherd-button-secondary",
        text: "Back",
      },
      {
        action() {
          return this.complete();
        },
        text: "Finish",
      },
    ],
  });

  return tour;
}

// Initialize and bind the tour to the button
window.addEventListener("DOMContentLoaded", function () {
  const tour = setupTour();
  const btn = document.getElementById("start-tour-button");
  if (btn) {
    btn.addEventListener("click", function () {
      tour.start();
    });
  }
});
