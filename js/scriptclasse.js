document.addEventListener("DOMContentLoaded", () => {
  console.log("JS chargé ✅");

  const form = document.getElementById("classes");

  const classes = {
    barbare: { page: "classe-barbare.html" },
    guerrier: { page: "classe-guerrier.html" },
    paladin: { page: "classe-paladin.html" },
    rodeur: { page: "classe-rodeur.html" },
    roublard: { page: "classe-roublard.html" },
    moine: { page: "classe-moine.html" },
    magicien: { page: "classe-magicien.html" },
    ensorceleur: { page: "classe-ensorceleur.html" },
    sorcier: { page: "classe-sorcier.html" },
    clerc: { page: "classe-clerc.html" },
    druide: { page: "classe-druide.html" },
    barde: { page: "classe-barde.html" },
  };

  const questionNames = [
    "combat",
    "force",
    "obstacle",
    "groupe",
    "magie",
    "ideal",
  ];

  function getSelectedValue(name) {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : null;
  }

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    console.log("Form soumis ✅");

    // Récupérer les réponses
    const answers = questionNames.map(getSelectedValue);
    console.log("Réponses :", answers);

    // Vérifier si toutes les questions sont répondues
    if (answers.includes(null)) {
      const missing = questionNames.filter((_, i) => !answers[i]);
      const msg = `Merci de répondre à toutes les questions : ${missing.join(", ")}`;
      const popup = document.getElementById("popup");
      const popupMessage = document.getElementById("popup-message");
      const closeBtn = document.getElementById("closePopup");

      popupMessage.textContent = msg;
      popup.classList.add("active");
      closeBtn.onclick = () => popup.classList.remove("active");
      return;
    }

    // --- Calcul des scores avec points bonus ---
    const scores = {};
    Object.keys(classes).forEach((c) => {
      scores[c] = 0;
    });

    answers.forEach((answer, i) => {
      if (!answer) {
        return;
      }

      const selectedInput = document.querySelector(
        `input[name="${questionNames[i]}"]:checked`
      );
      const points = selectedInput?.dataset.points
        ? parseInt(selectedInput.dataset.points, 10)
        : 1;

      const possibles = answer.split(",").map((c) => c.trim().toLowerCase());
      possibles.forEach((classe) => {
        if (Object.prototype.hasOwnProperty.call(scores, classe)) {
          scores[classe] += points; // Ajoute le bonus
        }
      });
    });

    console.table(scores);

    // Trouver la classe avec le score max
    const topScore = Math.max(...Object.values(scores));
    const candidates = Object.entries(scores)
      .filter(([_, s]) => s === topScore)
      .map(([c]) => c);

    // Tirage au sort si égalité
    const bestClass =
      candidates.length > 1
        ? candidates[Math.floor(Math.random() * candidates.length)]
        : candidates[0];

    if (!bestClass || scores[bestClass] === 0) {
      const popup = document.getElementById("popup");
      const popupMessage = document.getElementById("popup-message");
      const closeBtn = document.getElementById("closePopup");
      popupMessage.textContent = "Aucune classe ne correspond clairement à vos réponses. Essayez d'autres réponses.";
      popup.classList.add("active");
      closeBtn.onclick = () => popup.classList.remove("active");
      return;
    }

    console.log("Meilleur match :", bestClass, "->", classes[bestClass].page);
    window.location.href = classes[bestClass].page;
  });
});