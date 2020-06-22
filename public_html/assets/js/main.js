import {
  TEST_NAME,
} from './functions/test/test.js';
import {
  serverPost
} from './functions/sql/requestServer.js'
import {
  FORMS,
  BUTTONS,
  ELEMENTS_DIVERS,
} from './localisation/home.js';

import {
  ERROR_MESSAGE,
  throwErrorMessage,
  clearErrorNotif,
} from './functions/error/invalid.js';

import {
  accountNew
} from './logic/forms/submitAccount.js';

import {
  accountLogin
} from './logic/forms/submitLogin.js';

//FUNCTIONS
let arePasswordsViewed = (answer) => {
  let getInputPassword = [...document.getElementsByClassName('password_view')];
  if (answer) {
    getInputPassword.map((input) => {
      input.setAttribute('type', 'text');
      //I disable any further input as the type has changed. As on blur, the type will be considered as text (for the regex). I can encouter this issue by checking the name in the condition before I apply the regex match, but I want to keep it simple.
      input.disabled = true;
    });
  } else {
    getInputPassword.map((input) => {
      input.setAttribute('type', 'password');
      input.disabled = false;
    });
  }
};
const isNameAvailable = async (field) => {
  try {
    let result = await TEST_NAME(field.value);
    if (result) {
      let errorMessageLocation = field.nextElementSibling;
      field.setAttribute('data-state', 'invalid');
      throwErrorMessage(ERROR_MESSAGE.alreadyTaken, errorMessageLocation);
    } else {
      field.setAttribute('data-state', '');
      clearErrorNotif(field);
    }
  } catch (err) {
    console.log(err);
  }
};
let submitAccount = async (event) => {
  try {
    event.preventDefault();
    let inputs = [...FORMS.accountNew.querySelectorAll('input')];
    inputs.pop();
    let checksPassed = accountNew.initCheck(inputs);
    if (checksPassed) return FORMS.accountNew.submit();
  } catch (err) {
    console.log(err);
  }
};
const submitLog = async (event) => {
  try {
    event.preventDefault();
    let inputs = [...FORMS.accountLogin.querySelectorAll('input')];
    inputs.pop();
    let checksPassed = accountLogin.initCheck(inputs);
    if (!checksPassed) return (ELEMENTS_DIVERS.userNotHere.style.opacity = 1);
    let data = {
      name: inputs[0].value,
      password: inputs[1].value,
    };
    let ifUserExists = await serverPost('/checkUser', data);
    if (!ifUserExists) return (ELEMENTS_DIVERS.userNotHere.style.opacity = 1);
    FORMS.accountLogin.submit();
  } catch (err) {
    console.log(err);
  }
};
const apparenceHTML = {
  doWeHighLightLabel: (element, indice) => {
    element.previousElementSibling.style.color = indice ? 'white' : '#c7c8c7';
  },
  eyesSwitch: (id) => {
    if (id == 'eye-close') {
      ELEMENTS_DIVERS.eyeIconOpen.style.display = 'flex';
      ELEMENTS_DIVERS.eyeIconClose.style.display = 'none';
      arePasswordsViewed(true);
      return;
    } else {
      ELEMENTS_DIVERS.eyeIconClose.style.display = 'flex';
      ELEMENTS_DIVERS.eyeIconOpen.style.display = 'none';
      arePasswordsViewed(false);
    }
  },
};
//ADD EVENTS
const eventEntry = () => {
  FORMS.accountNew.addEventListener(
    'blur',
    (event) => {
      apparenceHTML.doWeHighLightLabel(event.target, false);
    },
    true
  );
  FORMS.accountNew.addEventListener(
    'focus',
    (event) => {
      apparenceHTML.doWeHighLightLabel(event.target, true);
    },
    true
  );
  FORMS.accountLogin.addEventListener(
    'focus',
    (event) => {
      apparenceHTML.doWeHighLightLabel(event.target, true);
      document.getElementsByClassName('error_mess')[0].style.opacity = 0;
      clearErrorNotif(event.target);
    },
    true
  );
  FORMS.accountLogin.addEventListener(
    'blur',
    (event) => {
      apparenceHTML.doWeHighLightLabel(event.target, false);
    },
    true
  );
  document
    .querySelector('#name')
    .addEventListener('blur', (event) => isNameAvailable(event.target));
};
const eventHTML = () => {
  ELEMENTS_DIVERS.eyeIconClose.addEventListener('click', (event) =>
    apparenceHTML.eyesSwitch(event.currentTarget.getAttribute('id'))
  );
  ELEMENTS_DIVERS.eyeIconOpen.addEventListener('click', (event) =>
    apparenceHTML.eyesSwitch(event.currentTarget.getAttribute('id'))
  );
};
const eventButton = () => {
  BUTTONS.newFormAccount.addEventListener('click', () => {
    FORMS.accountLogin.classList.remove('active2');
    FORMS.accountNew.classList.add('active1');
  });
  BUTTONS.login.addEventListener('click', () => {
    FORMS.accountNew.classList.remove('active1');
    FORMS.accountLogin.classList.add('active2');
  });
  BUTTONS.submitAccount.addEventListener('click', submitAccount);
  BUTTONS.submitLog.addEventListener('click', submitLog);
};
//SET UP
window.onload = () => {
  let loader = document.getElementById('loader_content');
  loader.classList.add('loader_hide');
};
document.addEventListener('DOMContentLoaded', () => {
  eventEntry();
  eventButton();
  eventHTML();
});

//For testing.
export {
  isNameAvailable
};