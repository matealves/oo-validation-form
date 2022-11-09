class Validator {
  constructor() {
    this.validations = [
      "data-required",
      "data-only-letters",
      "data-min-length",
      "data-max-length",
      "data-email-validate",
      "data-password-validate",
      "data-equal",
      "data-required-check",
    ];
  }

  // iniciar a validação de todos os campos
  validate(form) {
    // resgata todas as validações
    let currentValidations = document.querySelectorAll(
      "form .error-validation"
    );

    if (currentValidations.length > 0) {
      this.cleanValidations(currentValidations);
    }

    let inputs = form.querySelectorAll("input");

    // HTMLCollection -> array
    let inputsArray = [...inputs];

    inputsArray.forEach((input) => {
      // loop em todas as validações existentes
      for (let i = 0; this.validations.length > i; i++) {
        if (input.getAttribute(this.validations[i]) != null) {
          let method = this.validations[i]
            .replace("data-", "")
            .replace("-", "");

          let value = input.getAttribute(this.validations[i]);

          //invocar o método
          this[method](input, value);
        }
      }
    }, this);

    if (currentValidations.length == 0) {
      return true;
    }

    return false;
  }

  // qtd min caracteres
  minlength(input, minValue) {
    let inputLength = input.value.length;
    let errorMessage = `Insira no mínimo ${minValue} caracteres.`;

    if (inputLength < minValue) {
      this.showMessage(input, errorMessage);
    }
  }

  // qtd máx caracteres
  maxlength(input, maxValue) {
    let inputLength = input.value.length;
    let errorMessage = `Insira no máximo ${maxValue} caracteres.`;

    if (inputLength > maxValue) {
      this.showMessage(input, errorMessage);
    }
  }

  // verifica se o input é requerido
  required(input) {
    let inputValue = input.value;

    if (inputValue === "") {
      let errorMessage = "Campo obrigatório.";

      this.showMessage(input, errorMessage);
    }
  }

  // verifica se o checkbox é requerido
  requiredcheck(input) {
    let checkboxValue = input.checked;

    if (!checkboxValue) {
      let errorMessage = "Campo obrigatório.";

      this.showMessage(input, errorMessage);
    }
  }

  // valida emails
  emailvalidate(input) {
    let regex = /\S+@\S+\.\S+/;
    let email = input.value;
    let errorMessage = "E-mail inválido.";

    if (!regex.test(email)) {
      this.showMessage(input, errorMessage);
    }
  }

  // valida se o campo tem apenas letras
  onlyletters(input) {
    let regex = /^[A-Za-z]+$/;
    let inputValue = input.value;
    let errorMessage = "Insira apenas letras.";

    if (!regex.test(inputValue)) {
      this.showMessage(input, errorMessage);
    }
  }

  // valida campo de senha
  passwordvalidate(input) {
    let charArr = input.value.split("");

    let uppercases = 0;
    let numbers = 0;

    for (let i = 0; charArr.length > i; i++) {
      if (
        charArr[i] === charArr[i].toUpperCase() &&
        isNaN(parseInt(charArr[i]))
      ) {
        uppercases++;
      } else if (!isNaN(parseInt(charArr[i]))) {
        numbers++;
      }
    }

    if (uppercases === 0 || numbers === 0) {
      let errorMessage =
        "A senha deve conter um caractere maíusculo e um número.";

      this.showMessage(input, errorMessage);
    }
  }

  // confirmar senha
  equal(input, inputName) {
    let inputToCompare = document.getElementsByName(inputName)[0];
    let errorMessage = `As senhas devem ser iguais.`;

    if (input.value != inputToCompare.value) {
      this.showMessage(input, errorMessage);
    }
  }

  // exibir msg de erro na tela
  showMessage(input, message) {
    // quantidade de erros
    let errorsQty = input.parentNode.querySelector(".error-validation");

    if (errorsQty === null) {
      let template = document
        .querySelector(".error-validation")
        .cloneNode(true);
      let inputParent = input.parentNode;

      template.textContent = message;
      template.classList.remove("template");
      inputParent.appendChild(template);
    }
  }

  // limpar validações da tela
  cleanValidations(validations) {
    validations.forEach((el) => el.remove());
  }
}

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
