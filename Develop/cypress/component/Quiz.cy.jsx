import React from "react";
import Quiz from "../../client/src/components/Quiz";

describe("Quiz Component", () => {
  beforeEach(() => {
    cy.mount(<Quiz />);
  });

  it("should show start button initially", () => {
    cy.get("button").contains("Start Quiz").should("be.visible");
  });

  it("should start quiz when clicking start button", () => {
    cy.get("button").contains("Start Quiz").click();
    cy.get(".spinner-border").should("be.visible");
  });

  it("should display questions and handle answers", () => {
    cy.intercept("GET", "/api/questions", {
      statusCode: 200,
      body: [
        {
          question: "Test Question",
          answers: [
            { text: "Answer 1", isCorrect: true },
            { text: "Answer 2", isCorrect: false },
          ],
        },
      ],
    }).as("getQuestions");

    cy.get("button").contains("Start Quiz").click();
    cy.wait("@getQuestions");

    cy.get("h2").contains("Test Question").should("be.visible");
    cy.get(".alert-secondary").should("have.length", 2);
  });

  it("should show final score when quiz is completed", () => {
    cy.intercept("GET", "/api/questions", {
      statusCode: 200,
      body: [
        {
          question: "Test Question",
          answers: [
            { text: "Answer 1", isCorrect: true },
            { text: "Answer 2", isCorrect: false },
          ],
        },
      ],
    }).as("getQuestions");

    cy.get("button").contains("Start Quiz").click();
    cy.wait("@getQuestions");
    cy.get("button").first().click(); // Click first answer
    cy.get(".alert-success").should("be.visible");
    cy.get("button").contains("Take New Quiz").should("be.visible");
  });
});
