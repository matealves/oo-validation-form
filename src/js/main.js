import { Validator } from "../js/Validator.js";

let form = document.querySelector("#register-form");
let submit = document.querySelector("#btn-submit");

let validator = new Validator();

submit.addEventListener("click", function (e) {
  e.preventDefault();

  validator.validate(form); // true ou false

  if (validator.validate(form)) {
    form.submit();
  }
});
