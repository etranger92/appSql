/**
 * @jest-environment jsdom
 */
const { accountNew } = require('../../js/logic/forms/submitAccount.js')

describe('Could we send the form to our server ?', () => {
  it('prevents us of sending the form as name is already taken', () => {
    document.body.innerHTML = `
        <label for="name"> Name </label>
        <input name="name" type="text" id="name" data-state=""
        class="input_account" value="" required>
        <p id="error-message"> </p>
        `
    let inputs = new Array(document.getElementById('name'))
    let doWeSendTheForm = accountNew.initCheck(inputs)
    expect(doWeSendTheForm).toBe(false)
    //Would like to check the css as well. But without peppeteer I don't know yet.
  })
  it('prevents us of sending the form as there is an empty value (confirmPassword)', () => {
    document.body.innerHTML = `
     <div> 
        <label for="name"> Name </label>
        <input name="name" type="text" id="name" data-state=""
        class="input_account" value="Hello" required>
        <p id="error-message"> </p>

        <label for="password"> Name </label>
        <input name="password" type="password" id="password" data-state=""
        class="input_account" value="Hi" required>
        <p id="error-message"> </p>

        <label for="confirmPassword"> Name </label>
        <input name="confirmPassword" type="password" id="confirm-password" data-state=""
        class="input_account" value="" required>
        <p id="error-message"> </p>
        </div> 
        `
    let inputs = [...document.getElementsByClassName('input_account')]
    let doWeSendTheForm = accountNew.initCheck(inputs)
    expect(doWeSendTheForm).toBe(false)
  })
  it('prevents us of sending the form as there is a syntax error (password)', () => {
    document.body.innerHTML = `
     <div> 
        <label for="name"> Name </label>
        <input name="name" type="text" id="name" data-state=""
        class="input_account" value="Hello" required>
        <p id="error-message"></p>

        <label for="password"> Name </label>
        <input name="password" type="password" id="password" data-state=""
        class="input_account" value="wrongpass" required>
        <p id="error-message"></p>

        <label for="confirmPassword"> Name </label>
        <input name="confirmPassword" type="password" id="confirm-password" data-state=""
        class="input_account" value="" required>
        <p id="error-message"></p>
        </div> 
        `
    let inputs = [...document.getElementsByClassName('input_account')]
    let doWeSendTheForm = accountNew.initCheck(inputs)
    expect(doWeSendTheForm).toBe(false)
  })
  it('prevents us of sending the form as confirmPassword does not match password', () => {
    document.body.innerHTML = `
     <div> 
        <label for="name"> Name </label>
        <input name="name" type="text" id="name" data-state=""
        class="input_account" value="Hello" required>
        <p id="error-message"></p>

        <label for="password"> Name </label>
        <input name="password" type="password" id="password" data-state=""
        class="input_account" value="Jonathan3" required>
        <p id="error-message"></p>

        <label for="confirmPassword"> Name </label>
        <input name="confirmPassword" type="password" id="confirm-password" data-state=""
        class="input_account" value="Jonatha" required>
        <p id="error-message"></p>
        </div> 
        `
    let inputs = [...document.getElementsByClassName('input_account')]
    let doWeSendTheForm = accountNew.initCheck(inputs)
    expect(doWeSendTheForm).toBe(false)
  })
  it('All checks are fine we can send the form', () => {
    document.body.innerHTML = `
     <div> 
        <label for="name"> Name </label>
        <input name="name" type="text" id="name" data-state=""
        class="input_account" value="new User" required>
        <p id="error-message"></p>

        <label for="password"> Name </label>
        <input name="password" type="password" id="password" data-state=""
        class="input_account" value="Jonathan3" required>
        <p id="error-message"></p>

        <label for="confirmPassword"> Name </label>
        <input name="confirmPassword" type="password" id="confirm-password" data-state=""
        class="input_account" value="Jonathan3" required>
        <p id="error-message"></p>
        </div> 
        `
    let inputs = [...document.getElementsByClassName('input_account')]
    let doWeSendTheForm = accountNew.initCheck(inputs)
    expect(doWeSendTheForm).toBe(true)
  })
})
