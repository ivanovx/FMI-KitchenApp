const jwt = require("jsonwebtoken");

const JWT_SECRET = "oCZNQ18+utnogtmOtDo8XhF48TDKZ+Wn4rUOLUSKZD7dUJ+HTtKwfDJRNlGalIq7BqULvnsIBdMdv8/4qmbFvi5LqRPiMEFomZPHxkmQp4PZoRptL49VDFK6TZZNp/4uRkesPAOopQovMPzW7FdJTS+H+xnioYuKu7RCvN9u4JOMkWYhRohvsrzEF48eetDFmpCqxqnYjZuJXx33tJVQl9tqpgKxaHJSaog1dC2El9sGt6DGgHmxn90SsDqcWVW9yftXjFJgUuZwuBYyR2Bf8ZfDWgA/eHQ3zXZSOHzMAZRdSoNKW/212OP/tWH51KH1fQf6obfu6wham1kmtLfvGw==";

const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        console.log(err);

        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;

        next();
    });
}

module.exports = {
    JWT_SECRET,
    authenticate,
};