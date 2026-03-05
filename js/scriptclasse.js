document.addEventListener("DOMContentLoaded", () => {
  console.log("JS chargé ✅");

  const form = document.getElementById("classes");

  const classes = {
    barbare: {
      name: "Barbare",
      description: "La rage bouillonne en vous. Vous êtes un combattant féroce, puisant dans une fureur primale pour écraser vos ennemis et endurer des coups qui terrasseraient de simples mortels."
    },
    guerrier: {
      name: "Guerrier",
      description: "Maître des armes et des armures. Que vous soyez un chevalier noble ou un mercenaire aguerri, votre expertise martiale et votre discipline au combat font de vous la pierre angulaire de tout groupe."
    },
    paladin: {
      name: "Paladin",
      description: "Guerrier sacré lié par un serment. Vous combinez prouesses martiales et magie divine pour soigner les innocents et châtier les forces des ténèbres au nom de la justice."
    },
    rodeur: {
      name: "Rôdeur",
      description: "Chasseur émérite et protecteur des terres sauvages. Vous traquez vos proies avec une précision mortelle, usant de ruse, de magie naturelle et de vos talents d'archer ou d'épéiste."
    },
    roublard: {
      name: "Roublard",
      description: "Spécialiste de la discrétion, de la ruse et des coups bas. Vous frappez dans l'ombre là où ça fait mal, et vous possédez un talent inné pour déjouer les pièges et forcer les serrures."
    },
    moine: {
      name: "Moine",
      description: "Maître des arts martiaux canalisant le Ki. Votre corps est votre arme, vous attaquez avec une vitesse fulgurante et possédez une discipline spirituelle qui vous rend insaisissable."
    },
    magicien: {
      name: "Magicien",
      description: "Erudit des arcanes. Par des années d'étude acharnée dans d'anciens grimoires, vous avez maîtrisé les lois de la réalité pour plier le feu, l'espace et le temps à votre volonté."
    },
    ensorceleur: {
      name: "Ensorceleur",
      description: "La magie coule dans vos veines. Contrairement à ceux qui l'étudient, la magie est pour vous un don inné, une force chaotique et puissante que vous libérez par pur instinct."
    },
    sorcier: {
      name: "Sorcier",
      description: "Vous avez scellé un pacte avec une entité d'un autre monde. En échange de votre allégeance, vous maniez des sortilèges occultes et mystérieux, tirant votre force d'impénétrables secrets."
    },
    clerc: {
      name: "Clerc",
      description: "Un champion sacerdotal maniant la magie divine. Porte-parole de votre divinité, vous avez le pouvoir de guérir les blessures mortelles et de déchaîner le courroux céleste sur les impies."
    },
    druide: {
      name: "Druide",
      description: "Prêtre de l'Ancienne Foi, protecteur de l'équilibre naturel. Vous commandez aux forces de la nature, manipulez les éléments et pouvez même revêtir la forme de redoutables bêtes sauvages."
    },
    barde: {
      name: "Barde",
      description: "Artiste dont la magie est tissée de paroles et de musique. Vous inspirez vos alliés, charmez vos ennemis, et possédez une connaissance encyclopédique qui fait de vous un atout inestimable en toutes circonstances."
    },
  };

  const questionNames = [
    "combat",
    "force",
    "obstacle",
    "groupe",
    "magie",
    "ideal",
    "peur",
    "recompense"
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

    console.log("Meilleur match :", bestClass, "->", classes[bestClass].name);

    // Afficher la modale de résultat
    const resultPopup = document.getElementById("resultPopup");
    const resultTitle = document.getElementById("result-title");
    const resultDesc = document.getElementById("result-description");
    const closeResultBtn = document.getElementById("closeResultPopup");

    resultTitle.textContent = "Tu es un(e) " + classes[bestClass].name;
    resultDesc.textContent = classes[bestClass].description;
    
    resultPopup.classList.add("active");

    closeResultBtn.onclick = () => {
      resultPopup.classList.remove("active");
      // Réinitialiser le formulaire
      form.reset();
    };
  });
});