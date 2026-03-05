document.addEventListener("DOMContentLoaded", () => {
  console.log("JS chargé ✅");

  const form = document.getElementById("raceForm");

  const races = {
    dragonborn: { expected: ["exotique","corps","grand","specialisation",], page: "race-dragonborn.html" },
    drow:       { expected: ["feerique","ruse","moyen","specialisation",null], page: "race-drow.html" },
    dwarf:      { expected: ["humain","corps","petit","specialisation",null], page: "race-dwarf.html" },
    elf:        { expected: ["feerique","distance","grand","polyvalence",null], page: "race-elf.html" },
    githyanki:  { expected: ["exotique","corps","grand","polyvalence",null], page: "race-githyanki.html" },
    gnome:      { expected: ["humain","magie","trespetit","polyvalence",null], page: "race-gnome.html" },
    halfelf:    { expected: ["humain","polyvalence","moyen","polyvalence",null], page: "race-halfelf.html" },
    halfling:   { expected: ["humain","ruse","petit","polyvalence",null], page: "race-halfling.html" },
    halforc:    { expected: ["humain","corps","grand","specialisation",null], page: "race-halforc.html" },
    human:      { expected: ["humain","corps","moyen","polyvalence",null], page: "race-human.html" },
    tiefling:   { expected: ["exotique","magie","moyen","specialisation",], page: "race-tiefling.html" }
  };

  function getSelectedValue(name) {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : null;
  }

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    console.log("Form soumis ✅");

    const answers = [
      getSelectedValue("physique"),
      getSelectedValue("combat"),
      getSelectedValue("taille"),
      getSelectedValue("style"),
    ];
    console.log("Réponses :", answers);

    const questionNames = ["physique","combat","taille","style",];
    if (answers.includes(null)) {
      const missing = questionNames.filter((_, i) => !answers[i]);
      const msg = `Merci de répondre à toutes les questions : ${missing.join(", ")}`;
      const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const closeBtn = document.getElementById("closePopup");

      popupMessage.textContent = msg;
      popup.classList.add("active");

      closeBtn.onclick = () => {
        popup.classList.remove("active");
      };
      return;
    }

    let bestMatch = null;
    let maxScore = -1;

    for (const info of Object.values(races)) {
      let score = 0;
      info.expected.forEach((exp, i) => {
        if (exp === answers[i]) score++;
      });
      if (score > maxScore) {
        maxScore = score;
        bestMatch = info.page;
      }
    }

    if (bestMatch) {
      console.log("Redirection vers :", bestMatch);
      window.location.href = bestMatch;
    }
  });
});