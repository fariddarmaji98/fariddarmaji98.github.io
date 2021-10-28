const loginPageDOM = document.querySelector('#loginPage');
const loginFormDOM = document.querySelector('#loginForm');
const registerPageDOM = document.querySelector('#registerPage');
const registerFormDOM = document.querySelector('#registerForm');
const btnLoginDOM = document.querySelector('#btnLogin');
const btnRegisterDOM = document.querySelector('#btnRegister');

function showRegisterPage() {
  // console.log(document.cookie);
  registerPageDOM.style.display = "block";
  loginPageDOM.style.display = "none";
}

function showLoginPage() {
  // console.log(document.cookie);
  loginPageDOM.style.display = "block";
  registerPageDOM.style.display = "none";
}

// const handleLogin = () => {
//   const { elements } = loginFormDOM;

//   const dataInput = {
//       "username": elements[0].value,
//       "password": elements[1].value.toLowerCase()
//   };

//   POST_API_V2(LOGIN_ACTION_API, dataInput)
//   .then(ress => ress?.ok ? ress?.json() : swalNotification(`Server error ${ress?.status}`, 'error'))
//   .then(ressJson => {
//     const { data, login, token, message } = ressJson;

//     if (login && data?.status === 'customer') {
//       document.cookie = '';
//       document.cookie = `isLogin=${login}|||username=${data.username}|||status=${data.status}|||token=${token}`;
//       swalNotification(
//         `Akses sebagai ${data.username}`,
//         'success',
//         () => window.location = `./home?page=${token}`
//       );
//     }
//     else {
//       swalNotification(`Login gagal, ${message}`, 'error');
//     }
//   });
// }

const handleLogin = () => {
  const { elements } = loginFormDOM;

  const dataInput = {
      "username": elements[0].value,
      "password": elements[1].value.toLowerCase()
  };
  console.log('===> dataInput', dataInput);

  POST_API_V2(LOGIN_ACTION_API, dataInput)
    .then(ress => ress?.ok ? ress?.json() : swalNotification(`Server error ${ress?.status}`, 'error'))
    .then(ressJson => {
      console.log('===> ressJson', ressJson)
      if (ressJson !== undefined) {
        const { data, login, message, token } = ressJson;
        
        if (login && data?.status === 'customer') {
          document.cookie = '';
          document.cookie = `isLogin=${login}|||username=${data.username}|||status=${data.status}|||token=${token}`;

          // console.log('===> document.cookie', document.cookie)
          swalNotification(
            `Akses sebagai ${data.username}`,
            'success',
            () => window.location = `${linkMap?.HOME}?page=${token}`
          );
          // console.log('data.status', data.status);
        }
        else { swalNotification(`Login gagal, ${message}`, 'error') }
      }
    });
}

const handleRegister = () => {
  const { elements } = registerFormDOM;
  
  const dataInput = {
      "name": elements[0].value,
      "password": elements[1].value.toLowerCase(),
      "email": elements[2].value,
      "ttl": elements[3].value,
      "no_telp": elements[4].value,
      "jenis_kelamin": elements[5].value
  };

  POST_API(REGISTER_ACTION_API, dataInput).then(ress => {
    const { status, message } = ress;

    if (status) {
      alert(message);
      window.location = BASE_API + VIEW_LOGIN_DASHBOARD;
    }
    else {
      alert(message);
      window.location = BASE_API + VIEW_REGISTER_DASHBOARD;
    }
  });
}

// window.onload = () => (PAGE !== undefined && PAGE == 0) ? showLoginPage() : showRegisterPage();
btnLoginDOM.addEventListener('click', handleLogin);
btnRegisterDOM.addEventListener('click', handleRegister);

$(function () {
  $.validator.setDefaults({
    submitHandler: () => {}
  });
  $('#loginForm').validate({
    rules: {
      email: {
        required: true,
      },
      password: {
        required: true,
        minlength: 5
      }
    },
    messages: {
      email: {
        required: "Please enter a email address",
        email: "Please enter a vaild email address"
      },  
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      }
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    }
  });
});
