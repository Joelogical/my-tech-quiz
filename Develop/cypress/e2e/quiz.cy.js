describe("Quiz Flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the start page", () => {
    cy.get('[data-testid="start-button"]').should("be.visible");
  });

  it("should handle server errors gracefully", () => {
    cy.intercept("GET", "/api/questions/random", {
      statusCode: 500,
      body: { message: "Error fetching questions" },
    }).as("getQuestions");

    cy.get('[data-testid="start-button"]').click();
    cy.wait("@getQuestions");
    cy.get('[data-testid="error-message"]').should("be.visible");
  });

  it("should start the quiz when clicking the start button", () => {
    cy.intercept("GET", "/api/questions/random").as("getQuestions");
    cy.get('[data-testid="start-button"]').click();
    cy.wait("@getQuestions");
    cy.get('[data-testid="question"]').should("be.visible");
    cy.get('[data-testid="answers"]').should("be.visible");
  });

  it("should display the score after completing the quiz", () => {
    cy.intercept("GET", "/api/questions/random").as("getQuestions");
    cy.get('[data-testid="start-button"]').click();
    cy.wait("@getQuestions");

    // Answer all questions
    for (let i = 0; i < 10; i++) {
      cy.get('[data-testid="answer"]').first().click();
      cy.wait(500); // Wait for next question to load
    }

    cy.get('[data-testid="score"]').should("be.visible");
  });

  it("should start a new quiz when clicking the new quiz button", () => {
    cy.intercept("GET", "/api/questions/random").as("getQuestions");

    // Complete first quiz
    cy.get('[data-testid="start-button"]').click();
    cy.wait("@getQuestions");

    // Answer all questions
    for (let i = 0; i < 10; i++) {
      cy.get('[data-testid="answer"]').first().click();
      cy.wait(500);
    }

    cy.get('[data-testid="score"]').should("be.visible");
    cy.get('[data-testid="new-quiz-button"]').click();
    cy.wait("@getQuestions");

    // Check for new quiz questions
    cy.get('[data-testid="question"]').should("be.visible");
    cy.get('[data-testid="answers"]').should("be.visible");
  });
});
