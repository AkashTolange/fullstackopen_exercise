describe("blog-frontend", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3005/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3005/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("loginform is shown", function () {
    cy.contains("show login").click();
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
    cy.contains("cancel");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("show login").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
      cy.contains("mluukkai logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("show login").click();
      cy.get("#username").type("nabina14");
      cy.get("#password").type("nabina1");
      cy.get("#login-button").click();
      cy.contains("Wrong username or password");
    });

    describe("When logged in", function () {
      beforeEach(function () {
        cy.contains("show login").click();
        cy.get("#username").type("mluukkai");
        cy.get("#password").type("salainen");
        cy.get("#login-button").click();
      });

      it("A blog can be created", function () {
        cy.contains("new blog").click();
        cy.get("#title").type("title cypress");
        cy.get("#author").type("author cypress");
        cy.get("#url").type("url cypress");
        cy.get("#submit").click();
        cy.contains("title cypress");
        cy.contains("author cypress");
      });

      it("A blog can be liked", function () {
        cy.contains("new blog").click();
        const newBlog = {
          title: "New Blog",
          author: "Cypress tester",
          url: "www.example.com",
        };
        cy.wait(1000);
        cy.supportCreateBlog(newBlog);
        cy.wait(500);
        cy.get("#view").click();
        cy.contains("0");
        cy.get("#like-button").click();
        cy.contains("1");
      });

      it("A blog can be deleted", function () {
        cy.contains("new blog").click();
        const newBlog = {
          title: "New Blog",
          author: "Cypress tester",
          url: "www.example.com",
        };
        cy.supportCreateBlog(newBlog);
        cy.get("#view").click();
        cy.get("#remove").click();
      });
    });

    it("Remove button is visible only to the creator", function () {
      // Login as the first user
      cy.contains("show login").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
      cy.contains("mluukkai logged in");

      // Step 1: Create a blog with the first user
      cy.contains("new blog").click();
      cy.get("#title").type("New Blog");
      cy.get("#author").type("Cypress tester");
      cy.get("#url").type("www.example.com");
      cy.get("#submit").click();
      cy.get("#view").click();
      cy.contains("Remove");

      // Step 2: Log out the first user
      cy.get("#logout-button").click();

      // Step 3: Create a new user and log in
      const user2 = {
        name: "Another User",
        username: "anotheruser",
        password: "123456",
      };
      cy.request("POST", "http://localhost:3005/api/users/", user2);
      cy.contains("show login").click();
      cy.get("#username").type("anotheruser");
      cy.get("#password").type("123456");
      cy.get("#login-button").click();

      // Step 4: Ensure the second user cannot see the remove button
      cy.get("#view").click();
      cy.get("#remove").should("not.exist");
    });
  });

  describe("blogs are ordered according to likes with the blog", function () {
    beforeEach(function () {
      cy.contains("show login").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
      cy.contains("new blog").click();

      const blog1 = {
        title: "test for sorting acc to likes",
        author: "Nabina",
        url: "http://sort.com",
        likes: 1,
      };

      const blog2 = {
        title: "most likes must be at top",
        author: "nabina2",
        url: "http://likes.com",
      };

      const blog3 = {
        title: "last test of exercise",
        author: "nabina3",
        url: "http://logs.com",
      };

      cy.supportCreateBlog(blog1);
      cy.supportCreateBlog(blog2);
      cy.supportCreateBlog(blog3);
    });

    it("highest like blog at top", function () {
      cy.contains("most likes must be at top").parent().find("#view").click();
      cy.get("#like-button").click();
      cy.wait(400);
      cy.get("#like-button").click();
      cy.wait(400);
      cy.get("#like-button").click();
      cy.wait(400);

      cy.contains("Hide").click();
      cy.get(".blog-div")
        .first()
        .should("contain", "most likes must be at top");
    });
  });
});
