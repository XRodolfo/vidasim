// src/needs/needSystem.js

// Simple need system that tracks hunger, sleep, hygiene, social, ambition
// Needs are values 0-100. They decrease over time and can be refilled via actions.

export const defaultNeeds = {
  hunger: 100,
  sleep: 100,
  hygiene: 100,
  social: 100,
  ambition: 100,
};

export function createNeedSystem(initial = {}) {
  const needs = { ...defaultNeeds, ...initial };
  return {
    getNeeds() {
      return { ...needs };
    },

    // Decay each need by deltaHours — skipped entirely in godMode
    decay(deltaHours, godMode = false) {
      if (godMode) return; // GodMode: needs never fall
      const decayRates = {
        hunger:   5,
        sleep:    4,
        hygiene:  3,
        social:   2,
        ambition: 1,
      };
      Object.keys(decayRates).forEach((key) => {
        needs[key] = Math.max(0, needs[key] - decayRates[key] * deltaHours);
      });
    },

    // Refill a specific need by adding delta (positive = restore, negative = drain)
    // Returns the new value for that need.
    addNeed(name, delta) {
      if (Object.prototype.hasOwnProperty.call(needs, name)) {
        needs[name] = Math.min(100, Math.max(0, needs[name] + delta));
        return needs[name];
      }
      return null;
    },

    // Hard-set a need to a specific value (0-100)
    setNeed(name, value) {
      if (Object.prototype.hasOwnProperty.call(needs, name)) {
        needs[name] = Math.min(100, Math.max(0, value));
      }
    },

    // Apply a full needs effect object { hunger: +30, hygiene: +50, ... }
    applyEffects(effectObj = {}) {
      Object.entries(effectObj).forEach(([key, delta]) => {
        if (Object.prototype.hasOwnProperty.call(needs, key)) {
          needs[key] = Math.min(100, Math.max(0, needs[key] + delta));
        }
      });
    },

    // Restore all needs to 100 (godMode regen)
    fillAll() {
      Object.keys(needs).forEach((k) => { needs[k] = 100; });
    },
  };
}
