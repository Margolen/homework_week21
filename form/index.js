// let form = document.querySelector('.js-form'),
//     formInputs = document.querySelectorAll('.form-control'),
//     inputNames = document.querySelectorAll('.real-name'),
//     inputPhone = document.querySelector('.input-phone'),
//     inputEmail = document.querySelector('.input-email'),
//     inputCheckbox = document.querySelector('.check-box');

// function validateName(realname) {
//     let re = /^[A-Za-z]+$/;
//     return re.test(String(realname));
// }

// function validatePhone(phone) {
//     let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
//     return re.test(String(phone));
// }

// function validateEmail(email) {
//     let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

// form.onsubmit = (event) => {
//     event.preventDefault();

//     let phoneVal = inputPhone.value,
//         emailVal = inputEmail.value;

//     formInputs.forEach((input) => {
//         if (input.value === '') {
//             input.classList.add('error');
//             console.log('input not filled');
//         } else {
//             input.classList.remove('error');
//         }
//     });

//     inputNames.forEach((input) => {
//         if (!validateName(input.value)) {
//             console.log('phone not valid');
//             input.classList.add('error');
//         } else {
//             input.classList.remove('error');
//         }
//     });

//     if (!validatePhone(phoneVal)) {
//         console.log('phone not valid');
//         inputPhone.classList.add('error');
//     } else {
//         inputPhone.classList.remove('error');
//     }

//     if (!validateEmail(emailVal)) {
//         console.log('email not valid');
//         inputEmail.classList.add('error');
//     } else {
//         inputEmail.classList.remove('error');
//     }

//     if (inputCheckbox.selectedIndex == 0) {
//         console.log('checkbox not checked');
//         inputCheckbox.classList.add('error');
//     } else {
//         inputCheckbox.classList.remove('error')
//     }
// }

let form = document.querySelector(".js-form");

form.onsubmit = function (event) {
  event.preventDefault();
  checkAll();
};

function checkAll() {
  let errors = [];
  let inputs = document.querySelectorAll("input");

  for (let input of inputs) {
    checkValidity(input, errors);
  }

  let phoneField = document.getElementById("phone");
  validatePhone(phoneField, errors);

  let emailField = document.getElementById("email");
  validateEmail(emailField, errors);

  let passwordField = document.getElementById("password");
  validatePassword(passwordField, errors);

  let errorDiv = document.querySelector("#errorsInfo");
  console.log(errors);

  errorDiv.innerHTML = errors.join("<br>");
}

function checkValidity(input, errors) {
  let validity = input.validity;
  console.log(validity);
  if (validity.valueMissing) {
    errors.push("Поле " + input.placeholder + " не заполнено");
  }
  if (validity.typeMismatch) {
    errors.push("Неверный формат заполнения в поле " + input.placeholder);
  }
}

function validatePhone(phoneField, errors) {
  let phoneFormat =
    /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
  if (!phoneField.value.match(phoneFormat)) {
    errors.push(
      "Ваш номер телефона введен неверно, введите в формате +х ххх-ххх-хххх"
    );
  }
}

function validateEmail(emailField, errors) {
  let mailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  if (!emailField.value.match(mailFormat)) {
    errors.push("Ваш адрес электронной почты введен неверно");
  }
}

function validatePassword(passwordField, errors) {
  let passwordFormat =
    /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
  if (!passwordField.value.match(passwordFormat)) {
    errors.push("Ваш пароль не надежен");
  }
}

//НЕДЕЛЯ 21. Задание 2. Написать POST-запрос, который будет срабатывать при нажатии на кнопку "Отправить" из нашей уже готовой формы регистрации (задание 2 недели 18). Реализовать через JSON.

postButton.onClick = function (event) {
  event.preventDefault();
  let form = {
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  fetch("https://httpbin.org/post", {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((response) => response.json())
    .then((form) => {
      console.log(form);
    })
    .catch((error) => console.log(error));
};
