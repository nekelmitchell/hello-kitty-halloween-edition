
  /*************** ASSETS ***************/
 const costumes = [
  "costumekitty1.png",
  "costumekitty2.png",
  "costumekitty3.png",
  "costumekitty4.png"
];


const stages = ["costume", "done"];

let currentIndices = { costume: 0 };

function getArrayForStage(stage) {
  if (stage === "costume") return costumes;
  return [];
}

  const selectorScreenEl = document.getElementById("selector-screen");
  const previewImg = document.getElementById("preview-img");
  const baseImg = document.getElementById("base-img");
  const costumeImg = document.getElementById("costume-img");
  const messageOverlay = document.getElementById("message-overlay");
  const messageText = document.getElementById("message-text");

  const backBtn = document.getElementById("back-btn");
  const forwardBtn = document.getElementById("forward-btn");
  const confirmBtn = document.getElementById("confirm-btn");
  const startOverBtn = document.getElementById("start-over-btn");
  const navButtons = document.getElementById("nav-buttons");
  const stageIndicator = document.getElementById("stage-indicator");

  /*************** HELPERS ***************/
  function getCurrentStage() {
    return stages[stageIndex];
  }

const selectorScreens = {
  costume: "costume_screen.png"
};


  function enterStage(index) {
    stageIndex = index;
    const stage = getCurrentStage();
    stageIndicator.textContent = `Step ${Math.min(stageIndex + 1, stages.length)} of ${stages.length}: ${stage}`;
    messageOverlay.style.display = "none";

    // If we reached the "done" stage, show final screen
    if (stage === "done") {
      selectorScreenEl.style.display = "none";
      previewImg.style.display = "none";
      showKitty();
      showFinalMessage();
      navButtons.classList.add("hidden");
      return;
    }

    // Show the Hello Kitty with all currently applied layers
    showKitty();

    // Display the background for the current selector screen
    const screenFile = selectorScreens[stage];
    selectorScreenEl.style.display = "block";
    selectorScreenEl.style.backgroundImage = screenFile ? `url("${screenFile}")` : "";

    // Show the preview image in front of everything
    previewImg.style.display = "block";
    previewImg.style.zIndex = "10";
    navButtons.classList.remove("hidden");

    const idx = currentIndices[stage] || 0;
    updatePreview(stage, idx);

    confirmBtn.textContent = (stageIndex === stages.length - 2) ? "Yes, Done" : "Yes, Done";
  }

  function updatePreview(stage, idx) {
    const arr = getArrayForStage(stage);
    if (!arr.length) return;
    idx = ((idx % arr.length) + arr.length) % arr.length;
    currentIndices[stage] = idx;
    previewImg.src = arr[idx];
  }

  function changePreview(direction) {
    const stage = getCurrentStage();
    if (stage === "done") return;
    const arr = getArrayForStage(stage);
    if (!arr.length) return;
    let idx = currentIndices[stage] || 0;
    idx = (idx + direction + arr.length) % arr.length;
    updatePreview(stage, idx);
  }

  function applyChoice(stage) {
  const idx = currentIndices[stage] || 0;
  const arr = getArrayForStage(stage);
  const chosen = arr[idx];
  if (!chosen) return;

  if (stage === "costume") costumeImg.src = chosen;
}


  function showKitty() {
  baseImg.style.display = "block";
  costumeImg.style.display = costumeImg.src ? "block" : "none";
}


  function showFinalMessage() {
    messageText.textContent = "Hooray! Hello Kitty is ready to Trick or Treat!";
    messageOverlay.style.display = "flex";
  }

  function startOver() {
  currentIndices = { costume: 0 };
  costumeImg.src = "";
  enterStage(0);
}


  /*************** EVENTS ***************/
  backBtn.addEventListener("click", () => changePreview(-1));
  forwardBtn.addEventListener("click", () => changePreview(1));

  confirmBtn.addEventListener("click", () => {
    const stage = getCurrentStage();
    if (stage === "done") return;

    // Apply the selected image to the correct layer
    applyChoice(stage);

    // Keep Kitty visible with the new choice
    showKitty();

    // Proceed to next stage
    setTimeout(() => enterStage(stageIndex + 1), 300);
  });

  startOverBtn.addEventListener("click", startOver);

  document.addEventListener("keydown", (e) => {
    const stage = getCurrentStage();
    if (stage === "done") return;
    if (e.key === "ArrowLeft") changePreview(-1);
    if (e.key === "ArrowRight") changePreview(1);
    if (e.key === "Enter") confirmBtn.click();
  });

  window.addEventListener("load", () => {
    baseImg.style.display = "block";
    enterStage(0);
  });
