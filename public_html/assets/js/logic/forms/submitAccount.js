import {
  TESTS
} from "../../functions/test/test.js";
import {
  clearErrorNotif,
  invalidInput,
} from "../../functions/error/invalid.js";
//We check if the form pass all the checks before submiting.
const accountNew = {
  result: true,
  display: null,
  inputs: [],
  initResult: () => (accountNew.result = true),
  initCheck: (inputs) => {
    accountNew.inputs = inputs;
    //We call our first check if it's invalid we return otherwise the second check will be called etc.
    accountNew.isNameTaken();
    return accountNew.result;
  },
  isNameTaken: () => {
    //We are going to check if there is an error displayed. If yes it means the user name is not free.
    //Reminder: Once, the user type a name in the input, the value is directly checked (onBlur) and an error message is displayed if not free.
    accountNew.result = accountNew.inputs[0].nextElementSibling.textContent.trim().length ?
      true :
      false;
    if (accountNew.result) return true;
    accountNew.initResult();
    accountNew.anyEmptyField();
  },
  anyEmptyField: () => {
    let inputFilled;
    accountNew.inputs = accountNew.inputs.map((input) => {
      inputFilled = TESTS.isFieldFilled(input.value);
      if (!inputFilled) {
        input.setAttribute("data-state", "invalid");
        accountNew.result = false;
      }
      return input;
    });
    if (!accountNew.result) return false;
    accountNew.allRespectRegex();
  },
  allRespectRegex: () => {
    let resultRegex;
    let inputsMatchRegex = [];
    inputsMatchRegex = accountNew.inputs.map((input) => {
      resultRegex = TESTS.isEntryValid(input.value, input.name);
      accountNew.display = resultRegex ?
        clearErrorNotif(input) :
        invalidInput(input, input.name);
      return resultRegex;
    });
    // accountNew.inputs are now an array of Boolean after
    accountNew.result = inputsMatchRegex.every((input) => input);
    return accountNew.result;
  },
};
export {
  accountNew
};