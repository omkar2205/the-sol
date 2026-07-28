panels.india = {
  kicker: "India, briefly",
  title: "One visit. Several foods.",
  html: `<p>India visits completed: <strong>one</strong>.</p><p>Pani puri approval appears promising. The heavily promoted gulab jamun remains formally classified as <strong>mid</strong>.</p>`
};

const bypassVerification = document.getElementById("bypassVerification");
if (bypassVerification) {
  bypassVerification.addEventListener("click", () => {
    const reaction = document.getElementById("verificationReaction");
    reaction.textContent = "Understood. Management privileges accepted.";
    playTone(520, 0.08);
    setTimeout(() => showScreen("world"), 450);
  });
}

function showCatReaction(message, effect, animationClass, tone) {
  const catArea = document.getElementById("catArea");
  const bubble = document.getElementById("catBubble");
  const effectNode = document.getElementById("catEffect");

  catArea.classList.remove("petted", "fed");
  void catArea.offsetWidth;
  catArea.classList.add(animationClass);

  bubble.textContent = message;
  bubble.classList.add("show");
  clearTimeout(showCatReaction.bubbleTimer);
  showCatReaction.bubbleTimer = setTimeout(() => bubble.classList.remove("show"), 3000);

  effectNode.textContent = effect;
  effectNode.classList.remove("show");
  void effectNode.offsetWidth;
  effectNode.classList.add("show");

  playTone(tone, 0.06);
}

const petCat = document.getElementById("petCat");
if (petCat) {
  petCat.addEventListener("click", event => {
    event.stopPropagation();
    showCatReaction("Petting accepted. You may continue.", "♥  ♥", "petted", 340);
  });
}

const feedCat = document.getElementById("feedCat");
if (feedCat) {
  feedCat.addEventListener("click", event => {
    event.stopPropagation();
    showCatReaction("Your offering has been reviewed and approved.", "🐟", "fed", 290);
  });
}
