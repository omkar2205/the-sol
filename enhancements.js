panels.calendar = {
  kicker: "The 29 July committee",
  title: "A complicated date in history",
  html: `<div class="committee-list">
    <div class="committee-item"><strong>Fernando Alonso</strong><br>Drives enough for Saule and several other people.</div>
    <div class="committee-item"><strong>Benito Mussolini</strong><br>Removed from the birthday group chat.</div>
    <div class="committee-item"><strong>Bhavana</strong><br>Omkar’s friend’s girlfriend, whose existence he regularly forgets.</div>
    <div class="committee-item"><strong>Saule Sulcaite 👑</strong><br>Clearly the best result of the date.</div>
  </div>`
};

panels.bike = {
  kicker: "Preferred transport",
  title: "Two wheels, no problem",
  html: `<p>Books secured. Penguin balanced. Karantin refusing to cooperate. The bicycle journey may now begin.</p>`
};

catLines.splice(
  0,
  catLines.length,
  "Karantin has reviewed the ominous ‘hi’. Omkar’s risk level remains unacceptable.",
  "The laptop could be restarted. Karantin has declined to intervene.",
  "Karantin has reviewed the birthday arrangements. Adequate.",
  "The penguin thinks it is in charge. Karantin finds this adorable.",
  "No car. Karantin checked."
);

const bypassVerification = document.getElementById("bypassVerification");
if (bypassVerification) {
  bypassVerification.addEventListener("click", () => {
    const reaction = document.getElementById("verificationReaction");
    experienceState.verificationStatus = "bypassed_by_boss";
    reaction.textContent = "Understood. Management privileges accepted.";
    setTimeout(() => showScreen("world"), 450);
  });
}

function showCatReaction(message, effect, animationClass) {
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
}

const petCat = document.getElementById("petCat");
if (petCat) {
  petCat.addEventListener("click", event => {
    event.stopPropagation();
    experienceState.catPets += 1;
    showCatReaction("Karantin accepts the tribute. You may continue.", "♥  ♥", "petted");
  });
}

const feedCat = document.getElementById("feedCat");
if (feedCat) {
  feedCat.addEventListener("click", event => {
    event.stopPropagation();
    experienceState.catFeeds += 1;
    showCatReaction("Karantin has reviewed and approved your offering.", "🐟", "fed");
  });
}