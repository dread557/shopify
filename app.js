const notificationBtn = document.getElementById("notificationBtn");
const notificationBox = document.getElementById("notificationBox");
const storeBtn = document.getElementById("storeBtn");
const storeBox = document.getElementById("storeBox");
const mobileSubscriptionBtn = document.getElementById("mobileSubscriptionBtn");
const subscriptionBtn = document.getElementById("subscriptionBtn");
const subscription = document.getElementById("subscription");
const setupBtn = document.getElementById("setupBtn");
const setupContent = document.getElementById("setupContent");
const accordionBtn = document.getElementsByClassName("accordion-btn");
const accordionContent = document.getElementsByClassName("accordion-content");
const accordionItems = document.querySelectorAll("ul > li");
const setupStatusNumber = document.getElementById("setupStatusNumber");
const setupStatusProgress = document.getElementById("setupStatusProgress");
const checkboxes = document.querySelectorAll(
  '.statusCheckbox input[type="checkbox"]'
);
const allStoreMenuItems = storeBox.querySelectorAll('[role="menuitem"]');

const handleMenuEscapeKeypress = (event) => {
  if (event.key === "Escape") {
    storeBtn.ariaExpanded = "false";
    storeBox.classList.remove("open");
    storeBtn.focus();
  }
};

const handleMenuItemArrowKeyPress = (event, menuItemIndex) => {
  const isLastMenuItem = menuItemIndex === allStoreMenuItems.length - 1;
  const isFirstMenuItem = menuItemIndex === 0;

  const nextMenuItem = allStoreMenuItems.item(menuItemIndex + 1);
  const prevMeniItem = allStoreMenuItems.item(menuItemIndex - 1);

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    if (isLastMenuItem) {
      allStoreMenuItems.item(0).focus();

      return;
    }

    nextMenuItem.focus();
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    if (isFirstMenuItem) {
      allStoreMenuItems.item(allStoreMenuItems.length - 1).focus();

      return;
    }

    prevMeniItem.focus();
  }
};

// toggle notification
notificationBtn.addEventListener("click", (event) => {
  const isExpanded =
    notificationBtn.attributes["aria-expanded"].value === "true";
  // Prevent the click event from propagating to the document
  event.stopPropagation();

  // Close the store box if it is open
  if (storeBox.classList.contains("open")) {
    storeBox.classList.remove("open");
  }

  notificationBox.classList.toggle("open");
  if (isExpanded) {
    notificationBtn.ariaExpanded = "false";
    notificationBtn.focus();
  } else {
    notificationBtn.ariaExpanded = "true";
    notificationBox.focus();
  }
});

// toggle store menu
storeBtn.addEventListener("click", (event) => {
  const isExpanded = storeBtn.attributes["aria-expanded"].value === "true";
  // Prevent the click event from propagating to the document
  event.stopPropagation();
  // Close the notification box if it is open
  if (notificationBox.classList.contains("open")) {
    notificationBox.classList.remove("open");
  }

  storeBox.classList.toggle("open");
  if (isExpanded) {
    storeBtn.ariaExpanded = "false";
    storeBtn.focus();
  } else {
    storeBtn.ariaExpanded = "true";
    allStoreMenuItems.item(0).focus();
    storeBox.addEventListener("keyup", handleMenuEscapeKeypress);

    allStoreMenuItems.forEach((menuItem, menuItemIndex) => {
      menuItem.addEventListener("keyup", (event) => {
        handleMenuItemArrowKeyPress(event, menuItemIndex);
      });
    });
  }
});

// toggle pricing modal
subscriptionBtn.addEventListener("click", (event) => {
  // Prevent the click event from propagating to the document
  event.stopPropagation();

  // Close the notification box if it is open
  if (subscription.classList.contains("hide")) {
    subscription.classList.remove("hide");
  }

  subscription.classList.toggle("hide");
});

// mobile view subscription button
mobileSubscriptionBtn.addEventListener("click", (event) => {
  // Prevent the click event from propagating to the document
  event.stopPropagation();

  // Close the notification box if it is open
  if (subscription.classList.contains("hide")) {
    subscription.classList.remove("hide");
  }

  subscription.classList.toggle("hide");
});

// toggle setup
setupBtn.addEventListener("click", () => {
  const isExpanded = setupBtn.attributes["aria-expanded"].value === "true";
  setupBtn.style.transform = setupContent.classList.contains("open")
    ? "rotate(0deg)"
    : "rotate(180deg)";
  setupContent.classList.toggle("open");
  if (isExpanded) {
    setupBtn.ariaExpanded = "false";
  } else {
    setupBtn.ariaExpanded = "true";
  }
});

// Toggle accordion items
for (let i = 0; i < accordionBtn.length; i++) {
  accordionBtn[i].addEventListener("click", () => {
    // If the clicked accordion-btn corresponds to an active accordion-content, do nothing
    if (accordionContent[i].classList.contains("active")) {
      return;
    }

    // Remove "active" class from all accordion-content elements
    for (let j = 0; j < accordionContent.length; j++) {
      accordionContent[j].classList.remove("active");
      accordionItems[j].classList.remove("active-li"); // Remove active class from li
    }

    // Toggle "active" class for the clicked accordion-content
    accordionContent[i].classList.toggle("active");
    accordionItems[i].classList.toggle("active-li"); // Toggle active class for li
  });
}

// Add click event listeners to the checkboxes
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", function () {
    let checkedCount = document.querySelectorAll(
      '.statusCheckbox input[type="checkbox"]:checked'
    ).length;

    // Update the setupStatusNumber
    setupStatusNumber.textContent = checkedCount;

    // Calculate progress percentage
    let progressPercent = (checkedCount / 5) * 100;

    // Update the width of the progress bar
    setupStatusProgress.style.width = progressPercent + "%";
  });
});

document.addEventListener("click", (event) => {
  // Check if the clicked element is not inside the notification box
  if (!notificationBox.contains(event.target)) {
    // If not, close the notification box
    notificationBox.classList.remove("open");
  }

  if (!storeBox.contains(event.target)) {
    // If not, close the store box
    storeBox.classList.remove("open");
  }
});
