document.addEventListener("DOMContentLoaded", function() {
    var currentPage = window.location.pathname;
    if (currentPage === "/" || currentPage === "/home") {
      document.querySelector(".announcement-bar").style.display = "block";
    } else {
      document.querySelector(".announcement-bar").innerText = "25% Erbjudande på alla produkter";
      document.querySelector(".announcement-bar").style.color = "grey";
      document.querySelector(".announcement-bar").style.fontSize = "14px";
    }
  });
  const productContainer = document.querySelector("slider-component");
  const clonedProductContainer = productContainer.cloneNode(true);
  const scrollContainer = document.querySelector(".products-again");
  scrollContainer.appendChild(clonedProductContainer);
  scrollContainer.appendChild(clonedProductContainer);
  document.addEventListener("DOMContentLoaded", function() {
    var label = document.getElementById("template--16820883488953__main-1-0");
    if (label) {
      label.style.backgroundColor = "green !important";
    } else {
      console.error("Element not found!");
    }
  });