# FinTarget

**FinTarget** is a Node.js application designed to handle certain tasks with rate limiting and logging functionality. This README provides instructions on how to set up, run, and test the application.

## Project Overview

- **Name**: FinTarget
- **Version**: 1.0.0
- **Description**: A Node.js application for managing tasks with rate limiting and logging capabilities.
- **Dependencies**:
  - `express`: A minimal and flexible Node.js web application framework.
  - `ioredis`: A robust Redis client for Node.js.

## Prerequisites

Before running the application, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.x or later)
- [Redis](https://redis.io/download) server

## Installation

1. **Clone the repository** (or download the project files):

    ```bash
    git clone https://github.com/dkrpandit/FinTarget.git
    cd Fintarget
    ```

2. **Install the dependencies**:

    ```bash
    npm install
    ```

   This command installs the required packages listed in the `package.json` file.

## Configuration

Make sure you have a Redis server running, as the application uses Redis for rate limiting. If Redis is not installed, follow the [Redis installation instructions](https://redis.io/download).

## Running the Application

To start the application, use the following command:

```bash
npm start
