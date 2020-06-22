const ERROR_MESSAGE = {
    defaultFormat: "Oups, something was wrong. Try to use only characters such letters.",
    password: "It must be between 8 to 45 characters including at least: one capital letter and one number.",
    passwordNotConfirmed: "Oups, it seems you have not retype your password correctly.",
    alreadyTaken: "The name is already taken. Please, try an other one.",
    noSuchUser: "This user is not registered.",
};
const throwErrorMessage = (message, location) => {
    location.textContent = message;
    location.style.display = "block";
};
const invalidInput = (input, type) => {
    input.setAttribute("data-state", "invalid");
    switch (type) {
        case "text":
            throwErrorMessage(ERROR_MESSAGE.defaultFormat, input.nextElementSibling);
            return;
        case "password":
            throwErrorMessage(ERROR_MESSAGE.password, input.nextElementSibling);
            return;
        case "confirmPassword":
            throwErrorMessage(
                ERROR_MESSAGE.passwordNotConfirmed,
                input.nextElementSibling
            );
            return;
        default:
            return;
    }
};
let clearErrorNotif = (input) => {
    input.previousElementSibling.style.color = "white";
    input.setAttribute("data-state", "");
    if (input.nextElementSibling) input.nextElementSibling.textContent = "";
};

export {
    ERROR_MESSAGE,
    throwErrorMessage,
    clearErrorNotif,
    invalidInput
}