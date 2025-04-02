# Installation and Run Instructions

Follow these steps to set up and run the project:

## Prerequisites
- Node.js installed on your system
- MongoDB installed and running

## Installation
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd Product_Add
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Running the Application
1. Build the Application
    ```bash
    npm run build
    ```
1. Start the Application
    ```bash
    npm run start
    ```

## Environment Variables
Ensure you have a `.env` file in the root directory with the necessary configurations, such as:
```
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
```

Now, you can access the application at `http://localhost:3000`.