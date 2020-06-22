/**
 * @jest-environment jsdom
 */
const {
    accountLogin
} = require("../../js/logic/forms/submitLogin.js");

describe("Could we send the form to our server ?", () => {
    it("prevents us of sending the form as there is an empty value (confirmPassword)", () => {
        document.body.innerHTML = `
   
        <label for="name"> Name </label>
        <input name="name" type="text" id="name" data-state=""
        class="input_account" value="Hello" required>
        <p id="error-message"> </p>

        <label for="password"> Name </label>
        <input name="password" type="password" id="password" data-state=""
        class="input_account" value="Hi" required>
        <p id="error-message"> </p>
        `;
        let inputs = [...document.getElementsByClassName("input_account")];
        let doWeSendTheForm = accountLogin.initCheck(inputs);
        expect(doWeSendTheForm).toBe(false);

    });

});