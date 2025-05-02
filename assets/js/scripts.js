// animação do botão de ação
const actionButtons = document.querySelectorAll(".cb_action a");
actionButtons.forEach(button => {
  button.addEventListener("mouseenter", () => {
    button.classList.remove("buttonScaleOut");
    button.classList.add("buttonScaleIn");
  });

  button.addEventListener("mouseleave", () => {
    button.classList.remove("buttonScaleIn");
    button.classList.add("buttonScaleOut");
  });
});

// clique nos personagens
const charactersButtons = document.querySelectorAll(".character");
charactersButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    const character = event.currentTarget;
    const isOpen = character.classList.contains("show");

    // fecha todos antes de abrir o atual
    document.querySelectorAll(".character.show").forEach(el => {
      if (el !== character) {
        el.classList.remove("show");
        hideCharacterDetails(el);
      }
    });

    if (!isOpen) {
      character.classList.add("show");
      showCharacterDetails(character);
    } else {
      character.classList.remove("show");
      hideCharacterDetails(character);
    }
  });
});

function prepareElements(characterButton) {
  const icon = characterButton.querySelector(".caret_down");
  const ctImage = characterButton.querySelector(".ct_image");
  const characterBody = characterButton.querySelector(".character_body");

  return { icon, ctImage, characterBody };
}

function showCharacterDetails(characterButton) {
  const { icon, ctImage, characterBody } = prepareElements(characterButton);

  icon.classList.add("rotate_180deg");
  ctImage.querySelector("img").style.display = "none";
  characterButton.style.borderColor = "#FFFFFF";

  Slide.down(characterBody, 600, () => {
    characterBody.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function hideCharacterDetails(characterButton) {
  const { icon, ctImage, characterBody } = prepareElements(characterButton);

  icon.classList.remove("rotate_180deg");
  ctImage.querySelector("img").style.display = "flex";
  characterButton.style.borderColor = "transparent";

  Slide.up(characterBody, 600);
}

// Slide utilitário
const Slide = (() => {
  const defaultDuration = 300;

  function slideUp(element, duration = defaultDuration) {
    element.style.height = element.scrollHeight + "px";
    element.offsetHeight;
    element.style.transition = `height ${duration}ms ease`;
    element.style.overflow = "hidden";
    element.style.height = "0";

    setTimeout(() => {
      element.style.display = "none";
      cleanup(element);
    }, duration);
  }

  function slideDown(element, duration = defaultDuration, callback = null) {
    element.style.removeProperty("display");
    let display = window.getComputedStyle(element).display;
    if (display === "none") display = "block";
    element.style.display = display;

    const height = element.scrollHeight + "px";
    element.style.height = "0";
    element.offsetHeight;
    element.style.transition = `height ${duration}ms ease`;
    element.style.overflow = "hidden";
    element.style.height = height;

    setTimeout(() => {
      element.style.removeProperty("height");
      cleanup(element);
      if (typeof callback === "function") callback();
    }, duration);
  }

  function cleanup(element) {
    element.style.removeProperty("overflow");
    element.style.removeProperty("transition");
  }

  return {
    up: slideUp,
    down: slideDown
  };
})();
