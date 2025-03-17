# AI Quiz Game

AI Quiz Game is an interactive app where users answer trivia questions generated using OpenAI's GPT model. This project includes a React front-end and a Node.js/Express back-end, creating a fun and dynamic quiz experience.

---

## Features
- Dynamically generated questions using the OpenAI GPT API.
- Multiple-choice answers with one correct option.
- Score-tracking system that increases with each correct answer.
- Responsive and interactive UI with animations.
- Designed for Desktop and Mobile devices.

---

## Technologies
### Front-end:
- React: Modern JavaScript framework for building UI.
- Bootstrap: CSS library for responsive design.
- Framer Motion: For smooth animations.
- Axios: HTTP client for making API requests.

### Back-end:
- Node.js: JavaScript runtime for building the server.
- Express.js: Framework for routing and API management.
- OpenAI API: Generates dynamic quiz questions.
- dotenv: Manages environment variables, such as OpenAI API keys.
- CORS: Handles cross-origin requests.

---

## How to Run the Project

Here’s how you can set up and run the front-end and back-end on your local machine:

### 1. Clone the Repository
git clone https://github.com/<your-username>/ai-quiz-game.git

cd ai-quiz-game


---

### 2. Set Up the Back-End
1. Navigate to the /server directory:
      cd server
   
2. Install the required dependencies:
      npm install
   
3. Create a .env file:
   Inside the /server directory, create a .env file and add your OpenAI API key:
      OPENAIAPIKEY=<youropenaiapi_key>
   

4. Start the back-end server:
      node server.js
   
   - Server will run on http://localhost:3000.

---

### 3. Set Up the Front-End
1. Open a new terminal and navigate to the /client directory:
      cd ../client
   
2. Install the React dependencies:
      npm install
   
3. Start the React application:
      npm start
   
   - The front-end will be accessible at http://localhost:3001.

---

### 4. Interact with the App
- Once both the back-end and front-end servers are running:
  - Open http://localhost:3001 in the browser.
  - Answer questions, track your score, and enjoy the quiz!

---

## Examples

### Question and Answers Example
Example request and response interaction with OpenAI:

#### Request
{
  "message": "Create a multiple-choice question with 4 answers in JSON format."
}


#### Response
{
  "question": "What is the capital of France?",
  "answers": ["London", "Paris", "Rome", "Berlin"],
  "correct": "Paris"
}


---

## Available Scripts
### From the Client Directory:
- npm start: Runs the front-end React app.
- npm build: Builds the app for production.

### From the Server Directory:
- node server.js: Runs the Express server (back-end).
