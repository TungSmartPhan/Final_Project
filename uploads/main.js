const button = document.querySelector(".navbar__ham");
const menu = document.querySelector(".navbar__links");
// first we target to the overlay
const overlay = document.querySelector("#overlay");

button.addEventListener("click", () => {
  button.classList.toggle("open");  
  //.open .navbar__icon bên css (không viết liền)
  // Lý do viết .open trước navbar__icon , navbar__icon:before và navbar_icon:after là gì , bấm vào nó , và tự nó animation

  menu.classList.toggle("navbar__open");
  //.navbar__links.navbar__open bên css
  // Lý do viết .navbar__links.navbar__open , vì khi bấm vào navbar__links 
  overlay.classList.toggle("show");  
});

overlay.addEventListener("click", () => {
  overlay.classList.toggle("show");  
  button.classList.toggle("open");  
  menu.classList.toggle("navbar__open");
})


