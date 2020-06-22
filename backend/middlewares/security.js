const {
    check,
    validationResult
} = require("../config/expressValidator.js");


const validatorRules = () => {
    return [
        check("name", "error my friend").matches(/^[a-zA-Z0-9.-\/@\s]+$/),
        check("password", "hello my dear").matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[#?!@$%^&*-]).{8,45}/
        ),
    ]
};
const validator = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({
        [err.param]: err.msg
    }))
    return res.render("contain/errors/validationErrors", {
        layout: "error",
        errors: extractedErrors,
    });

};


module.exports = {
    validatorRules,
    validator,
}