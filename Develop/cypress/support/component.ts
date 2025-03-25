import { mount } from "cypress/react";
import "./commands";

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);

// Example of adding a custom command for component testing
Cypress.Commands.add("getBySel", (selector: string) => {
  return cy.get(`[data-test=${selector}]`);
});
