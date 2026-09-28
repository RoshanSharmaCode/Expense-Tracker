BACKEND QUESTIONS:-

1. What is Node.js and why is it used for backend development?
   Answer: Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets us run JavaScript on the
   server and is commonly used for fast, scalable backend applications.

2. What is Express.js and why do we use it with Node.js?
   Answer: Express.js is a lightweight web framework for Node.js. It simplifies routing, middleware, request
   handling, and API development

3. What is middleware in Express?
   Answer: Middleware is a function that runs between the request and the response. It can modify req/res,
   perform checks, log requests, or handle other tasks.

4. What are req and res?
   Answer: req (request) contains information sent by the client, such as params, query, body, and headers.
   res (response) is used by the server to send data or a status back to the client.

5. What is authentication?
   Answer: Authentication is the process of verifying who a user is, usually using credentials such as email
   and password.

6. What is authorization?
   Answer: Authorization determines what an authenticated user is allowed to access or do.

7. What's the difference between authentication and authorization?
   Answer: Authentication answers "Who are you?" Authorization answers "What are you allowed to do?"

8. What is JWT and how does JWT authentication work?
   Answer: JWT (JSON Web Token) is a token used to securely represent user information. After login, the
   server creates a JWT and sends it to the client. The client sends the token with protected requests, and
   the backend verifies it before allowing access
