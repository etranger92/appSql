/**
 * @jest-environment jsdom
 */

const {
    isNameAvailable
} = require("../../js/main");
const {
    ERROR_MESSAGE
} = require("../../js/functions/error/invalid.js")
//I just test some of it
describe("is user updated if name already taken?", () => {
    it.only("sets data-set to'invalid' and display an error message for user already taken", async () => {
        document.body.innerHTML = `
        <label for="name"> Name </label>
        <input name="name" type="text" id="name" data-state=""
        class="input_account" value="Bryan" required>
        <p id="error-message"></p>
        `;
        let input = document.getElementById("name");
        await isNameAvailable(input);
        const isErrorDisplayed = document.getElementById("error-message").textContent;
        const checkDataSet = input.getAttribute("data-state");
        expect(isErrorDisplayed).toBe(ERROR_MESSAGE.alreadyTaken);
        expect(checkDataSet).toBe("invalid")

    });
    it("deletes the error message 'user already taken' and set data-state to empty ", async () => {
        //To test this we have to go to __mocks__/axios.js and choose get (false)
        document.body.innerHTML = `
        <label for="name"> Name </label>
        <input name="name" type="text" id="name" data-state="invalid"
        class="input_account" value="Bryan" required>
        <p id="error-message">The name is already taken. Please, try an other one.</p>
        `;
        let input = document.getElementById("name");
        await isNameAvailable(input)
        const isErrorClear = document.getElementById("error-message").textContent;
        const checkDataSet = input.getAttribute("data-state");
        expect(isErrorClear).toBeFalsy();
        expect(checkDataSet).toBeFalsy();

    });
});