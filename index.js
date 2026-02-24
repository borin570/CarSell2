// Toggle password visibility
function togglePassword() {
  const pass = document.getElementById("password");
  const createpass = document.getElementById("createpassword");
  const eye = document.getElementById("eyelg");
  const eyecre = document.getElementById("eyecre");
  //valid for both login and register password fields
  if (pass.type === "password") {
    pass.type = "text";
    eye.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    pass.type = "password";
    eye.classList.replace("fa-eye", "fa-eye-slash");
  }
  if (createpass.type === "password") {
    createpass.type = "text";
    eyecre.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    createpass.type = "password";
    eye.classList.replace("fa-eye-slash", "fa-eye");
  }
}
function togglePasswordcf() {
  const cfpass = document.getElementById("cfpass");
  const eye = document.getElementById("eyecf");

  if (cfpass.type === "password") {
    cfpass.type = "text";
    eyecf.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    cfpass.type = "password";
    eyecf.classList.replace("fa-eye", "fa-eye-slash");
  }
}

// Toggle login/register form
function toggleForm() {
  event.preventDefault();
  const logForm = document.getElementById("logform");
  const regForm = document.getElementById("regisform");
  logForm.classList.toggle("log");
  regForm.classList.toggle("regis");
}

// REGISTER
function register(event) {
  event.preventDefault();

  let user = document.getElementById("createusername").value;
  let pass = document.getElementById("createpassword").value;
  let cfpass = document.getElementById("cfpass").value;
  let emailInput = document.getElementById("email");
  let email = emailInput.value;
  let phone = document.getElementById("phonenum").value;

  // auto add gmail
  if (!email.includes("@") && email.length > 6) {
    email += "@gmail.com";
    emailInput.value = email;
  } else {
    document.getElementById("email").borderBottom = "1.75px solid red";
  }

  // validation
  let isValid = true;
  const inputs = [
    { id: "createusername", value: user, min: 6 },
    { id: "createpassword", value: pass, min: 6 },
    { id: "cfpass", value: cfpass, min: 6 },
    { id: "phonenum", value: phone, min: 8 },
    { id: "email", value: email, min: 6 },
  ];

  inputs.forEach((input) => {
    if (input.value.length < input.min) {
        alert("invailid input")
      document.getElementById(input.id).style.borderBottom = "1.75px solid red";
      isValid = false;
    } else {
      document.getElementById(input.id).style.borderBottom =
        "1.75px solid blue";
    }
  });

  if (cfpass !== pass) {
    alert("password not match");
    document.getElementById("cfpass").style.borderBottom = "1.75px solid red";
    isValid = false;
  }

  if (!isValid) return;

  // Multi-account storage
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  // duplicate username check
  if (accounts.some((acc) => acc.username === user)) {
    alert("Username already exists");
    document.getElementById("createusername").style.borderBottom =
      "1.75px solid red";
    return;
  }

  let newAccount = {
    username: user,
    password: pass,
    email: email,
    phone: phone,
  };
  accounts.push(newAccount);
  localStorage.setItem("accounts", JSON.stringify(accounts));

  alert("Account created successfully!");
  window.location.href = "main/index.html";
}

// LOGIN
function login() {
  event.preventDefault();

  let user = document.getElementById("useroremail").value;
  let pass = document.getElementById("password").value;

  if (user.length < 6) {
    alert("Username must be at least 6 characters long");
    document.getElementById("useroremail").style.borderBottom =
      "1.75px solid red";
    return;
  }
  if (pass.length < 6) {
    alert("Password must be at least 6 characters long");
    document.getElementById("password").style.borderBottom = "1.75px solid red";
    return;
  }
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  let found = accounts.find(
    (acc) =>
      (acc.username === user && acc.password === pass) ||
      (acc.email === user && acc.password === pass)
  );

  if (found) {
    alert("Login successful!");
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "main/index.html";
  } else {
    alert("Wrong username or password");
    document.getElementById("useroremail").style.borderBottom =
      "1.75px solid red";
    document.getElementById("password").style.borderBottom = "1.75px solid red";
  }
}
function logout() {
  var click = document.getElementById("logout-btn");
  window.location.href = "../form.html";
}
function popup() {
  var popup = document.getElementById("both");
  popup.classList.toggle("popup");
}
