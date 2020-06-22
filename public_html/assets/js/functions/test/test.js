import {
    ERROR_MESSAGE,
    throwErrorMessage,
    clearErrorNotif,
    invalidInput,
} from "../error/invalid.js";
import {
    FIELDS_ENTRY
} from "../../localisation/home.js";
import {
    serverGet
} from "../sql/requestServer.js";

const REGEX = {
    defaultFormat: /^[a-zA-Z.-\/@\s]+$/,
    password: /^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,45}/,
    confirmPassword: document.getElementById("confirm-password"),
};
const TESTS = {
    result: true,
    init: () => (TESTS.result = true),
    //If there is an error message displayed it means the name is taken (check if the error mess is due to regex)
    isNameAvailable: (name) => {
        TESTS.init();
        TESTS.result = name.nextElementSibling.textContent.trim().length ? true : false;
        return TESTS.result;
    },
    isFieldFilled: (input) => {
        TESTS.init();
        TESTS.result = input.trim().length ? true : false;
        return TESTS.result;
    },
    isEntryValid: (value, name) => {
        TESTS.init();
        switch (name) {
            case "name":
                TESTS.result = REGEX.defaultFormat.test(value);
                return TESTS.result;
            case "password":
                TESTS.result = REGEX.password.test(value);
                return TESTS.result;
            case "confirmPassword":
                // I Added to comment the line bellow because it causes me an issue with my __test__ (I tried to use puppeteer, jest dom but both of them were returning "null")
                //let passwordValue = FIELDS_ENTRY.password.value;
                let passwordValue = document.getElementById("password").value;
                TESTS.result = value === passwordValue ? true : false;
                return TESTS.result;
            default:
                return TESTS.result;
        }
    },
};
const TEST_NAME = async (entry) => {
    try {
        let result;
        let params = {
            name: entry,
        };
        let nameInMySQL = await serverGet("/checkName", params);
        result = nameInMySQL.data ? true : false;
        return result;
    } catch (err) {
        console.log(err);
    }
};
const TEST_LOGIN = async (name, password) => {
    try {
        let result;
        let params = {
            name,
            password,
        };
        let nameInMySQL = await serverGet("/checkAccount", params);
        result = nameInMySQL.data ? true : false;
        return result;
    } catch (err) {
        console.log(err);
    }
};
export {
    TESTS,
    TEST_NAME,
    TEST_LOGIN
};