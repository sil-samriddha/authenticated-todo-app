# Todo App with Auth System

This is a simple todo app that allows users to create, edit, delete and mark tasks as done. It also has an authentication system that lets users sign up, log in and log out. The app is built with the MERN stack (MongoDB, Express, React and Node.js).

## ✨Features

- Create, edit, delete and mark tasks as done
- Sign up, log in and log out with email and password
- Persist data in MongoDB database
- Validate user input and handle errors
- Use JWT (JSON Web Token) for authentication
- Use bcrypt for password hashing
- Use Bootstrap for styling

## ✨Installation

To run the app locally, you need to have Node.js, npm and MongoDB installed on your machine. Then follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project folder and run `npm install` to install the dependencies.

```bash
> cd backend
> npm install
```
```bash
> cd client
> npm install
```
3. Create a `.env` file in the root\backend folder and add the following variables:

    - `PORT`: the port number for the server (e.g. 5000)
    - `DBLINK`: the connection string for MongoDB (e.g. mongodb://localhost:27017/todo-app)
    - `SALT`: a secret key for JWT (e.g. a random string)

4. create a `.env` file in the root\client folder and add the following variables:
    - `VITE_API_URL` : `https://localhost:{BACKEND_PORT}`
5. Run `npm run dev` to start the server and the client concurrently.

```bash
> cd backend
> npm start
```

```bash
> cd client
> npm run dev
```
6. Open your browser and go to `http://localhost:5173/` to see the app.

## ✨Usage

To use the app, you need to sign up with an email and a password. Then you can log in with your credentials and start creating tasks. You can edit or delete a task by clicking on the corresponding buttons. You can also mark a task as done by checking the checkbox. To log out, click on the logout button on the navbar.


https://github.com/sil-samriddha/authenticated-todo-app/assets/95685662/39b8af0c-5ca4-49fa-8b3f-de27a5b8875d


## ✨License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
