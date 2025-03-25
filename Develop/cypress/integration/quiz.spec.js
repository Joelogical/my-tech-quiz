describe("Tech Quiz Application", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the start page", () => {
    cy.get('[data-testid="start-button"]').should("be.visible");
    cy.get('[data-testid="start-button"]').should("contain", "Start Quiz");
  });

  it("should start the quiz when clicking the start button", () => {
    cy.get('[data-testid="start-button"]').click();
    cy.get('[data-testid="question"]').should("be.visible");
    cy.get('[data-testid="answers"]').should("be.visible");
  });

  it("should display the score after completing the quiz", () => {
    cy.get('[data-testid="start-button"]').click();

    // Answer all questions (we'll make 10 selections)
    for (let i = 0; i < 10; i++) {
      cy.get('[data-testid="answer"]').first().click();
      cy.wait(500); // Wait for next question to load
    }

    cy.get('[data-testid="score"]').should("be.visible");
    cy.get('[data-testid="new-quiz-button"]').should("be.visible");
  });

  it("should start a new quiz when clicking the new quiz button", () => {
    cy.get('[data-testid="start-button"]').click();

    // Complete the quiz
    for (let i = 0; i < 10; i++) {
      cy.get('[data-testid="answer"]').first().click();
      cy.wait(500);
    }

    cy.get('[data-testid="new-quiz-button"]').click();
    cy.get('[data-testid="start-button"]').should("be.visible");
  });

  it("should handle server errors gracefully", () => {
    // Intercept the questions API call and force an error
    cy.intercept("GET", "/api/questions", {
      statusCode: 500,
      body: { message: "Server error" },
    }).as("getQuestions");

    cy.get('[data-testid="start-button"]').click();
    cy.get('[data-testid="error-message"]').should("be.visible");
  });
});
