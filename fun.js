function change() {
  const addClass = document.querySelector(".btn");
  if (addClass.innerHTML === "Sign In") {
    const element = document.querySelector(".overlay");
    const info = document.querySelector(".para");
    const info2 = document.querySelector(".para2");
    element.classList.remove("overlay");
    info.classList.add("para-U");
    info2.classList.add("para-U");
    element.classList.add("overlay-2");
    addClass.innerHTML = "Sign Up";
    addClass.classList.add("btn-U");
    info.innerHTML = "Welcome to the family";
    info2.innerHTML =
      "Join the coolest family and have fun with us, click Sign Up and get ready to be fascinated!!!";
  } else {
    const element = document.querySelector(".overlay-2");
    const info = document.querySelector(".para");
    const info2 = document.querySelector(".para2");
    element.classList.add("overlay");
    info.classList.remove("para-U");
    info2.classList.remove("para-U");
    element.classList.remove("overlay-2");
    addClass.innerHTML = "Sign In";
    addClass.classList.remove("btn-U");
    info.innerHTML = "Welcome Back!!!";
    info2.innerHTML =
      "Have you entered your details yet? if not please click sign in and be ready to be amazed";
  }
}
