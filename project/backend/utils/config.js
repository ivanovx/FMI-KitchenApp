const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "mongodb://0.0.0.0:27017/kitchen";
const JWT_SECRET = process.env.JWT_SECRET || "oCZNQ18+utnogtmOtDo8XhF48TDKZ+Wn4rUOLUSKZD7dUJ+HTtKwfDJRNlGalIq7BqULvnsIBdMdv8/4qmbFvi5LqRPiMEFomZPHxkmQp4PZoRptL49VDFK6TZZNp/4uRkesPAOopQovMPzW7FdJTS+H+xnioYuKu7RCvN9u4JOMkWYhRohvsrzEF48eetDFmpCqxqnYjZuJXx33tJVQl9tqpgKxaHJSaog1dC2El9sGt6DGgHmxn90SsDqcWVW9yftXjFJgUuZwuBYyR2Bf8ZfDWgA/eHQ3zXZSOHzMAZRdSoNKW/212OP/tWH51KH1fQf6obfu6wham1kmtLfvGw==";

const CORS_OPTIONS = {
    origin: "http://localhost:3000"
};

module.exports = {
    PORT,
    DB_URL,
    JWT_SECRET,
    CORS_OPTIONS,
};