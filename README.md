# CORS MVP Demo

This project is a demonstration application that showcases the functionality of CORS (Cross-Origin Resource Sharing) in web applications. The application includes both a client and a server to test different cross-origin request scenarios.

## 🚀 Features

- Intuitive user interface for testing CORS requests
- Server configured with customizable CORS policies
- Detailed API documentation
- Cloud deployment with Terraform (optional)
- Swagger API documentation

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm (included with Node.js)
- Modern web browser
- (Optional) Terraform for cloud deployment

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone [REPOSITORY_URL]
   cd cors-mvp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   Or for development with auto-reload:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:

   ```text
   http://localhost:3000
   ```

## 🏗️ Project Structure

```text
cors-mvp/
├── app.js           # Client-side logic (MVP)
├── server.js        # Server configuration
├── swagger.js       # API documentation with Swagger
├── index.html       # User interface
├── style.css        # CSS styles
├── terraform/       # Infrastructure configuration
│   ├── main.tf
│   ├── outputs.tf
│   └── variables.tf
└── package.json     # Dependencies and scripts
```

## 🌐 Usage

1. **Local Test**:

   - Click on "Test Local Call" to test a same-origin request.

2. **Remote Test**:

   - Click on "Test Remote Call" to test a cross-origin request.
   - Observe how the server responds with the appropriate CORS headers.

3. **API Documentation**:

   - Access the interactive API documentation at:

     ```text
     http://localhost:3000/api-docs
     ```

## 🔧 CORS Configuration

The server is configured with the following CORS options:

```javascript
app.use(cors({
  origin: '*', // Allows all origins (adjust in production)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## 🚀 Deployment with Terraform

To deploy the application to the cloud:

1. Navigate to the Terraform directory:

   ```bash
   cd terraform
   ```

2. Initialize Terraform:

   ```bash
   terraform init
   ```

3. Review the planned changes:

   ```bash
   terraform plan
   ```

4. Apply the changes:

   ```bash
   terraform apply
   ```

## 📚 Additional Documentation

- [Express Documentation](https://expressjs.com/)
- [CORS Documentation](https://github.com/expressjs/cors)
- [CORS Specification](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Swagger Documentation](https://swagger.io/docs/)

## 🤝 Contributing

Contributions are welcome. Please read our contribution guidelines before submitting changes.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## ✉️ Contact

If you have any questions or comments, feel free to open an issue in the repository.

---

Built with ❤️ by [Your Name] | [2025]
