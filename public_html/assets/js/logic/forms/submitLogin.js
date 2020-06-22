import {
    TESTS
} from "../../functions/test/test.js";
import {
    clearErrorNotif,
    invalidInput
} from "../../logic/forms/submitAccount.js";

const accountLogin = {
    result: true,
    inputs: [],
    initResult: () => (accountLogin.result = true),
    initCheck: (inputs) => {
        accountLogin.inputs = inputs;
        accountLogin.anyEmptyField();
        return accountLogin.result;
    },
    anyEmptyField: () => {
        accountLogin.initResult();
        let inputFilled;
        accountLogin.inputs = accountLogin.inputs.map((input) => {
            inputFilled = TESTS.isFieldFilled(input.value);
            if (!inputFilled) {
                input.setAttribute("data-state", "invalid");
                accountLogin.result = false;
            }
            return input;
        });
        if (!accountLogin.result) return false;
        accountLogin.allRespectRegex();
    },
    allRespectRegex: () => {
        accountLogin.initResult();
        let resultRegex;
        let inputsMatchRegex = [];
        inputsMatchRegex = accountLogin.inputs.map((input) => {
            resultRegex = TESTS.isEntryValid(input.value, input.name);
            return resultRegex;
        });
        // accountLogin.inputs are now an array of Boolean after
        accountLogin.result = inputsMatchRegex.every((input) => input);

        return accountLogin.result;
    },
};

export {
    accountLogin
};