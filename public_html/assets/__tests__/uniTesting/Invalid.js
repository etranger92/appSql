/**
 * @jest-environment jsdom
 */

const {
    ERROR_MESSAGE,
    throwErrorMessage,
    invalidInput,
    clearErrorNotif
} = require("../../js/functions/error/invalid.js")

describe("Do we display an error to the user and is it in accordance with the issue ?", () => {
    it("Function 'throwErrorMessage' should render an error message at the location given", () => {
        document.body.innerHTML = `
    <p id="error-message"> </p> `;
        let errorMessageLocation = document.getElementById("error-message");
        throwErrorMessage("some error message", errorMessageLocation);
        let valueDisplayError = errorMessageLocation.textContent;
        expect(valueDisplayError).toBe("some error message");
        //Would like to check the css as well. But without peppeteer I don't know yet.
    })

    it("should display the ERROR_MESSAGE.defaultFormat error for input:name", () => {
        document.body.innerHTML = ` 
        <div> 
        <input name="name" type="text" id="name" data-state=""
        class="input_account" value="" required>
        <p id="error-message"> </p>
        </div>`;
        let inputName = document.getElementById("name");
        let errorMessageLocation = document.getElementById("error-message");
        invalidInput(inputName, "text");
        let valueDisplayError = errorMessageLocation.textContent;
        expect(valueDisplayError).toBe(ERROR_MESSAGE.defaultFormat)
        //Would like to check the css as well. But without peppeteer I don't know yet.
    })
    it("should display the ERROR_MESSAGE.password error for input:password", () => {
        document.body.innerHTML = ` 
        <div> 
        <input name="password" type="password" id="password" data-state=""
        class="input_account" value="" required>
        <p id="error-message"> </p>
        </div>`;
        let inputPassword = document.getElementById("password");
        let errorMessageLocation = document.getElementById("error-message");
        invalidInput(inputPassword, "password");
        let valueDisplayError = errorMessageLocation.textContent;
        expect(valueDisplayError).toBe(ERROR_MESSAGE.password)
        //Would like to check the css as well. But without peppeteer I don't know yet.
    })
    it("should display the ERROR_MESSAGE.confirmPassword error for input:confirmPassword", () => {
        document.body.innerHTML = ` 
        <div> 
        <input name="confirmPassword" type="password" id="confirm-password" data-state=""
        class="input_account" value="" required>
        <p id="error-message"> </p>
        </div>`;
        let inputConfirmPassword = document.getElementById("confirm-password");
        let errorMessageLocation = document.getElementById("error-message");
        invalidInput(inputConfirmPassword, "confirmPassword");
        let valueDisplayError = errorMessageLocation.textContent;
        expect(valueDisplayError).toBe(ERROR_MESSAGE.passwordNotConfirmed)
        //Would like to check the css as well. But without peppeteer I don't know yet.
    })
});