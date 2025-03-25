describe("Quiz End-to-End Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should complete full quiz flow", () => {
    // Start the quiz
    cy.get("button").contains("Start Quiz").should("be.visible").click();

    // Wait for questions to load
    cy.get(".spinner-border").should("be.visible");
    cy.get(".spinner-border").should("not.exist", { timeout: 10000 });

    // Answer all questions
    for (let i = 0; i < 10; i++) {
      cy.get("h2").should("be.visible"); // Wait for question to be visible
      cy.get(".btn.btn-primary").first().click(); // Click first answer for each question
    }

    // Verify quiz completion
    cy.get(".alert-success").should("be.visible");
    cy.get("button").contains("Take New Quiz").should("be.visible");

    // Start new quiz
    cy.get("button").contains("Take New Quiz").click();
    cy.get("h2").should("be.visible"); // Verify new quiz started
  });

  it("should handle server errors gracefully", () => {
    cy.intercept("GET", "/api/questions", {
      statusCode: 500,
      body: "Server error",
    }).as("getQuestionsError");

    cy.get("button").contains("Start Quiz").click();
    cy.get(".spinner-border").should("be.visible");
  });

  it("should display correct score", () => {
    cy.intercept("GET", "/api/questions", {
      statusCode: 200,
      body: [
        {
          question: "Test Question 1",
          answers: [
            { text: "Correct Answer", isCorrect: true },
            { text: "Wrong Answer", isCorrect: false },
          ],
        },
      ],
    }).as("getQuestions");

    cy.get("button").contains("Start Quiz").click();
    cy.wait("@getQuestions");

    // Answer correctly
    cy.get(".btn.btn-primary").first().click();

    // Verify score
    cy.get(".alert-success").contains("1/1").should("be.visible");
  });
});
