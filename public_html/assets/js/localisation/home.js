const FIELDS_ENTRY = {
    name: document.getElementById("name"),
    password: document.getElementById("password"),
    confirmPassword: document.getElementById("confirm-password"),
    nameLog: document.getElementById("name-log"),
    passwordLog: document.getElementById("password-log"),
};
const FORMS = {
    accountNew: document.getElementById("create-account"),
    accountLogin: document.getElementById("log_in"),
};
const BUTTONS = {
    newFormAccount: document.getElementById("btn-create-account"),
    login: document.getElementById("btn-log-in"),
    submitAccount: document.getElementById("sub-create-account"),
    submitLog: document.getElementById("submit-log"),
};
const ELEMENTS_DIVERS = {
    eyeIconOpen: document.getElementById("eye-open"),
    eyeIconClose: document.getElementById("eye-close"),
    userNotHere: document.getElementsByClassName("error_mess")[0],
};
export {
    FIELDS_ENTRY,
    FORMS,
    BUTTONS,
    ELEMENTS_DIVERS
}