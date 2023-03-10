const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".back");
const numbers = document.querySelectorAll(".number");
const confirm = document.querySelector(".confirm");
const slides = document.querySelectorAll(".carousel-slide");

slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});

let counter = 0;

nextBtn.addEventListener("click", function () {
  counter++;
  carousel();
});

prevBtn.addEventListener("click", function () {
  counter--;
  carousel();
});

function carousel() {
  nextBtn.classList.remove("is-hidden");
  prevBtn.classList.remove("is-hidden");
  nextBtn.classList.remove("totally-hidden");
  confirm.classList.remove("show-confirm-btn");
  if (counter === slides.length - 1) {
    nextBtn.classList.add("is-hidden");
    prevBtn.classList.add("is-hidden");
  }
  if (counter === slides.length - 2) {
    nextBtn.classList.add("totally-hidden");
    confirm.classList.add("show-confirm-btn");
  }
  if (counter === 0) {
    prevBtn.classList.add("is-hidden");
  }
  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });

  numbers.forEach(function (number) {
    number.classList.remove("active-track");
    if (counter !== slides.length - 1) {
      numbers[counter].classList.add("active-track");
    }
  });
}

numbers.forEach(function (number) {
  number.addEventListener("click", function (e) {
    switch (e.target.innerText) {
      case "1":
        counter = 0;
        carousel();
        break;
      case "2":
        counter = 1;
        carousel();
        break;
      case "3":
        counter = 2;
        carousel();
        break;
      case "4":
        counter = 3;
        carousel();
    }
  });
});

const emailPattern = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$";
const numberPattern = /^(1\s?)?(\d{3}|\(\d{3}\))[\-\s]?\d{3}[\-\s]?\d{4}/;
const namePattern = /^[a-zA-Z]+ [a-zA-Z]+$/;
const nameInput = document.querySelector(".name-input");
const emailInput = document.querySelector(".email-input");
const numberInput = document.querySelector(".number-input");

let validName = false;

let validEmail = false;

let validNumber = false;

nameInput.addEventListener("keyup", function () {
  const inputTop = this.previousElementSibling;
  const personalCheck = inputTop.querySelector(".personal-input-check");
  let value = this.value.trim();
  if (value.match(namePattern)) {
    personalCheck.innerText = "Valid Name";
    personalCheck.classList.add("valid-check");
    personalCheck.classList.add("display-check");
    validName = true;
  } else if (value === "") {
    personalCheck.classList.add("display-check");
    personalCheck.innerText = "This field is required";
    personalCheck.classList.remove("valid-check");
    personalCheck.classList.add("display-check");
    validName = false;
  } else {
    personalCheck.classList.add("display-check");
    personalCheck.innerText = "Wrong input";
    personalCheck.classList.remove("valid-check");
    validName = false;
  }
});

emailInput.addEventListener("keyup", function () {
  const inputTop = this.previousElementSibling;
  const personalCheck = inputTop.querySelector(".personal-input-check");
  let value = this.value.trim();
  if (value.match(emailPattern)) {
    personalCheck.innerText = "Valid Email";
    personalCheck.classList.add("valid-check");
    personalCheck.classList.add("display-check");
    validEmail = true;
  } else if (value === "") {
    personalCheck.classList.add("display-check");
    personalCheck.innerText = "This field is required";
    personalCheck.classList.remove("valid-check");
    personalCheck.classList.add("display-check");
    validEmail = false;
  } else {
    personalCheck.classList.add("display-check");
    personalCheck.innerText = "Invalid email";
    personalCheck.classList.remove("valid-check");
    validEmail = false;
  }
});

numberInput.addEventListener("keyup", function () {
  const inputTop = this.previousElementSibling;
  const personalCheck = inputTop.querySelector(".personal-input-check");
  let value = this.value.trim();
  if (value.match(numberPattern)) {
    personalCheck.classList.add("display-check");
    personalCheck.innerText = "Valid Phone number";
    personalCheck.classList.add("valid-check");
    validNumber = true;
  } else if (value === "") {
    personalCheck.classList.add("display-check");
    personalCheck.innerText = "This field is required";
    personalCheck.classList.remove("valid-check");
    personalCheck.classList.add("display-check");
    validNumber = false;
  } else {
    personalCheck.classList.add("display-check");
    personalCheck.innerText = "Invalid Phone Number";
    personalCheck.classList.remove("valid-check");
    validNumber = false;
  }
});

// Plans JS:
let trackState = true;

const plansDiv = document.querySelector(".plans-div");

const addonsDiv = document.querySelectorAll(".addons-div");

const plansContainer = document.querySelector(".plans-container");

const plansBox = plansContainer.querySelectorAll(".plans-box");

const summary = document.querySelector(".summary");

const totalSpan = document.querySelector(".total span");

const bottomSummary = document.querySelector(".bottom-summary");

plansContainer.addEventListener("click", function (e) {
  const planSelected = summary.querySelector(".plan-selected");
  const planPrice = summary.querySelector(".plan-price");

  const trackDiv = plansContainer.querySelector(".track-div");
  const monthly = plansContainer.querySelector(".monthly");
  const yearly = plansContainer.querySelector(".yearly");

  let target = e.target;
  if (target.classList.value === "plans-box") {
    plansBox.forEach(function (planBox) {
      planBox.classList.remove("active-plan-box");
      target.classList.add("active-plan-box");
    });
  } else if (target.classList.value === "plans-track") {
    if (trackState) {
      trackDiv.classList.add("yearly-track");

      const plansCost = plansContainer.querySelectorAll(".plans-cost");
      plansCost.forEach(function (planCost) {
        planCost.innerText = planCost.innerText.slice(0, -3) + "0" + "/yr";
      });

      yearly.classList.add("active-plan");
      monthly.classList.remove("active-plan");

      plansBox.forEach(function (planBox) {
        const yearPopUp = document.createElement("p");
        yearPopUp.classList.add("year-pop-up");
        let plansInfo = planBox.querySelector(".plans-info");
        yearPopUp.innerText = "2 months free";
        plansInfo.append(yearPopUp);
      });

      addonsDiv.forEach(function (addDiv) {
        const addonTime = addDiv.querySelector(".addons-time");
        addonTime.innerText = addonTime.innerText.slice(0, 3) + "0" + "/yr";
      });
    } else {
      const plansCost = plansContainer.querySelectorAll(".plans-cost");
      plansCost.forEach(function (planCost) {
        planCost.innerText = planCost.innerText.slice(0, -4) + "/mo";
      });

      monthly.classList.add("active-plan");
      yearly.classList.remove("active-plan");

      trackDiv.classList.remove("yearly-track");

      plansBox.forEach(function (planBox) {
        let plansInfo = planBox.querySelector(".plans-info");
        let yearPopUp = plansInfo.querySelector(".year-pop-up");
        yearPopUp.classList.add("remove-popup");
        yearPopUp.classList.remove("year-pop-up");
      });

      addonsDiv.forEach(function (addDiv) {
        const addonTime = addDiv.querySelector(".addons-time");
        addonTime.innerText = addonTime.innerText.slice(0, 3) + "/mo";
      });
    }
    trackState = !trackState;
  }

  const activePlanBox = plansContainer.querySelector(".active-plan-box");
  const plansTitle = activePlanBox.querySelector(".plans-title");
  const activePlanCost = activePlanBox.querySelector(".plans-cost");
  const activePlan = plansContainer.querySelector(".active-plan");

  planSelected.innerHTML = `${plansTitle.innerText} <span>(${activePlan.innerText})</span>`;

  planPrice.innerText = activePlanCost.innerText;

  let slicedActivePlan = activePlan.innerText.slice(0, -2);
  totalSpan.innerText = `(per ${slicedActivePlan.toLowerCase()})`;

  updatePrices();

  calculateTotalPrice();
});

// The addons:
addonsDiv.forEach(function (addDiv) {
  addDiv.addEventListener("click", function () {
    this.classList.toggle("active-addon");
    let checkBox = this.querySelector("input");
    if (this.classList.contains("active-addon")) {
      checkBox.checked = true;
    } else {
      checkBox.checked = false;
    }
  });
});

const addonsContainer = document.querySelector(".addons-container");
addonsContainer.addEventListener("click", function (e) {
  let target = e.target;
  if (target.classList.contains("active-addon")) {
    const addonTitle = target.querySelector(".plans-title");
    const addonsTime = target.querySelector(".addons-time");

    const addonSummary = document.createElement("div");
    addonSummary.classList.add("addon-summary");

    const addonSelected = document.createElement("p");
    addonSelected.classList.add("addon-selected");
    addonSelected.innerText = addonTitle.innerText;

    const addonPrice = document.createElement("p");
    addonPrice.classList.add("addon-price");
    addonPrice.innerText = addonsTime.innerText;

    addonSummary.appendChild(addonSelected);
    addonSummary.appendChild(addonPrice);

    bottomSummary.appendChild(addonSummary);
    bottomSummary.classList.add("active-bottom-summary");

    calculateTotalPrice();
  } else {
    const addonTitle = target.querySelector(".plans-title");
    const totalAddons = bottomSummary.querySelectorAll(".addon-summary");

    totalAddons.forEach(function (totalAddon) {
      const addonSelected = totalAddon.querySelector(".addon-selected");
      if (addonTitle.innerText === addonSelected.innerText) {
        bottomSummary.removeChild(addonSelected.parentElement);
      }
    });

    if (totalAddons.length === 1) {
      bottomSummary.classList.remove("active-bottom-summary");
    }

    calculateTotalPrice();
  }
});

// Update the prices:
function updatePrices() {
  const addonSummary = bottomSummary.querySelectorAll(".addon-summary");

  if (addonSummary.length !== 0) {
    addonSummary.forEach(function (addon) {
      addonsDiv.forEach(function (addDiv) {
        const addonTime = addDiv.querySelector(".addons-time");
        const addonsTitle = addDiv.querySelector(".plans-title");
        const addonsSelected = addon.querySelector(".addon-selected");
        if (addonsSelected.innerText === addonsTitle.innerText) {
          const addonsPrice = addon.querySelector(".addon-price");
          addonsPrice.innerText = addonTime.innerText;
        }
      });
    });
  }
}

// The total Price:
function calculateTotalPrice() {
  let planPrice = summary.querySelector(".plan-price");
  let totalArray = [];
  let firstPriceMod = planPrice.innerText.slice(0, -3);
  let secondPriceMod = Number(firstPriceMod.slice(1));

  totalArray.push(secondPriceMod);

  const addonSummary = bottomSummary.querySelectorAll(".addon-summary");
  if (addonSummary.length !== 0) {
    addonSummary.forEach(function (addon) {
      const addonPrice = addon.querySelector(".addon-price");
      let addonPriceMod = addonPrice.innerText.slice(0, -3);
      let addonPriceFinal = Number(addonPriceMod.slice(2));
      totalArray.push(addonPriceFinal);
    });
  }

  let sumOfPrices = totalArray.reduce((a, b) => a + b, 0);
  const totalprice = document.querySelector(".total-price");

  const activePlan = document.querySelector(".active-plan");
  let slicedActivePlan = activePlan.innerText.slice(0, -5);
  if (activePlan.classList.contains("monthly")) {
    totalprice.innerText = `$${sumOfPrices.toString()}/${slicedActivePlan.toLowerCase()}`;
  } else {
    totalprice.innerText = `$${sumOfPrices.toString()}/${slicedActivePlan.toLowerCase()}r`;
  }
}

calculateTotalPrice();

confirm.addEventListener("click", confirmedInput);
function confirmedInput() {
  if (validName && validEmail && validNumber) {
    counter++;
    carousel();
    numbers.forEach(function (number) {
      number.classList.add("stop-number");
    });

    function removeBtns() {
      if (x.matches) {
        let carouselBtns = document.querySelector(".carousel-btn");
        carouselBtns.classList.add("remove-btns");
      }
    }
    var x = window.matchMedia("(max-width: 1000px)");
    removeBtns(x);
  } else if (!validName && validEmail && validNumber) {
    alert("Oops, seems the name input field is either empty or invalid.");
  } else if (validName && !validEmail && validNumber) {
    alert("Oops, seems the email input is either empty or invalid.");
  } else if (validName && validEmail && !validNumber) {
    alert("Oops, seems the number input field is either empty or invalid.");
  } else {
    alert("Please enter all input fields.");
  }
}
