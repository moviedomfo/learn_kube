import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Express API member-rapi-api",
            version: "2.0.0",
            description: "",
        },
        servers: [
            {
                url: "http://localhost:3026", // Change this to your application's base URL
            },
        ],
    },

    apis: ["./src/infra/router/*", "./src/domain/Entities/**/*", './src/app/DTOs/Socios/*'], // Path to the API docs
    //apis: [`${path.join(__dirname, './src/infra/router/*')}`]
    // apis: [`${path.join(__dirname, './infra/router/*')}`]
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
