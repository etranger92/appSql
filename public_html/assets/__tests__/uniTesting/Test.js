/**
 * @jest-environment jsdom
 */
//const puppeteer = require("puppeteer");
jest.setTimeout(50000);
const {
    TESTS,
    TEST_NAME
} = require("../../js/functions/test/test.js");


it('should be true as user name "nabil" is already registered in the database', async () => {
    let result = await TEST_NAME("nabil");
    expect(result).toBe(true)
});

describe("Check TESTS.isNameAvailable whether there is an error message displayed", () => {
    it("should return true as there is an error message", () => {
        document.body.innerHTML = ` 
    <input name="name" type="text" id="name" data-state=""
    class="input_account" value="Jonathan" required>
    <p class="error_message"> Name already Taken </p>`;
        let input = document.getElementById("name");
        expect(TESTS.isNameAvailable(input)).toBe(true);
    })
    it("should return false as there is no error message", () => {
        document.body.innerHTML = ` 
    <input name="name" type="text" id="name" data-state=""
    class="input_account" value="Jonathan" required>
    <p class="error_message"></p>
  `;
        let input = document.getElementById("name");
        expect(TESTS.isNameAvailable(input)).toBe(false);
    })
});

describe("Check TESTS.isFieldFilled: if is there empty field or not", () => {
    it("should return false as one of inputs is empty; name", () => {
        document.body.innerHTML = ` 
    <input name="name" type="text" id="name" data-state=""
    class="input_account" value="" required>
    <input name="password" type="password" id="password" data-state=""
    class="input_account password_view" value="Jonathan" required>
    <input name="password" type="password" id="passwordConfirm" data-state=""
    class="input_account password_view" value="Jonathan" required>
  `;
        let inputs = [...document.querySelectorAll("input")];
        let inputsValue = inputs.every(input =>
            TESTS.isFieldFilled(
                input.value)
        );

        expect(inputsValue).toBe(false);
    })
    it("should return true none of inputs are empty", () => {
        document.body.innerHTML = ` 
    <input name="name" type="text" id="name" data-state=""
    class="input_account" value="Jonathan" required>
    <input name="password" type="password" id="password" data-state=""
    class="input_account password_view" value="Jonathan" required>
    <input name="password" type="password" id="passwordConfirm" data-state=""
    class="input_account password_view" value="Jonathan" required>
  `;
        let inputs = [...document.querySelectorAll("input")];
        let inputsValue = inputs.every(input =>
            TESTS.isFieldFilled(
                input.value)
        );

        expect(inputsValue).toBe(true);
    })
});

describe("Check TESTS.isEntryValide: all regex tests before submiting", () => {
    it(" (name=£ $$$)should be false", () => {
        expect(TESTS.isEntryValid("£ $$$", "name")).toBe(false);
    });
    it(" (name=Jonathan)should be true", () => {
        expect(TESTS.isEntryValid("Jonathan", "name")).toBe(true);
    });
    it(" (password=jona£$$)should be false", () => {
        expect(TESTS.isEntryValid("jona£$$", "password")).toBe(false);
    });
    it(" (password=Jona3)should be false as length < 8", () => {
        expect(TESTS.isEntryValid("Jona3", "password")).toBe(false);
    });
    it(" (password=Jonathan)should be false as no number", () => {
        expect(TESTS.isEntryValid("Jonathan", "password")).toBe(false);
    });
    it("(password=Jonathan)should be true", () => {
        expect(TESTS.isEntryValid("Jonathan4", "password")).toBe(true);
    });
    it("(password=Jonathan9 & confirmPassword = jonathan9) should be true", () => {
        document.body.innerHTML = ` <input name="password" type="password" id="password" data-state=""
                       class="input_account password_view" value="Jonathan9" required>
                     `;

        expect(TESTS.isEntryValid("Jonathan9", "confirmPassword")).toBe(true);
    });
    it("(password=Jonathan9 & confirmPassword = jonathan9) should be true", () => {
        document.body.innerHTML = ` <input name="password" type="password" id="password" data-state=""
                       class="input_account password_view" value="Jonatha" required>
                     `;
        expect(TESTS.isEntryValid("Brandon", "confirmPassword")).toBe(false);
    });
});