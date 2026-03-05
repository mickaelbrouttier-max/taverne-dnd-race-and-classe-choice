document.addEventListener("DOMContentLoaded", () => {
  console.log("JS chargé ✅");

  const form = document.getElementById("raceForm");

  const races = {
    dragonborn: { 
      expected: ["exotique","corps","grand","specialisation","cite","intimidant"], 
      name: "Drakéide",
      description: "Vous arborez fièrement les traits de vos ancêtres draconiques. Imposant et majestueux, vous crachez un souffle destructeur et votre présence inspire autant le respect que la crainte sur le champ de bataille." 
    },
    drow: { 
      expected: ["feerique","ruse","moyen","specialisation","souterrain","enigmatique"], 
      name: "Elfe Noir (Drow)",
      description: "Issu des redoutables cités souterraines de l'Outreterre, vous êtes un maître des ombres et de la ruse. Gracieux et impitoyable, vous utilisez votre vision dans les ténèbres à votre avantage." 
    },
    dwarf: { 
      expected: ["humain","corps","petit","specialisation","souterrain","fiable"], 
      name: "Nain",
      description: "Robuste, endurant et taillé dans la roche même. Vous portez en vous l'héritage des grands forgerons et des guerriers des montagnes, fier et obstiné face à l'adversité." 
    },
    elf: { 
      expected: ["feerique","distance","grand","polyvalence","magique","enigmatique"], 
      name: "Elfe",
      description: "Créature de grâce et de longévité, vous marchez d'un pas léger dans les forêts millénaires. Votre lien avec la magie et la nature fait de vous un être à la beauté et à l'adresse surnaturelles." 
    },
    gnome: { 
      expected: ["humain","magie","trespetit","polyvalence","magique","fiable"], 
      name: "Gnome",
      description: "Petit par la taille mais gigantesque par l'ingéniosité. Votre soif de connaissances, votre curiosité insatiable et votre affinité pour l'illusion ou le bricolage font de vous un allié imprévisible." 
    },
    halfelf: { 
      expected: ["humain","polyvalence","moyen","polyvalence",null,null], 
      name: "Demi-Elfe",
      description: "Héritier de deux mondes, vous combinez l'ambition humaine et la grâce elfique. Ne vous sentant chez vous nulle part, vous êtes un négoicant, diplomate ou aventurier né." 
    },
    halfling: { 
      expected: ["humain","ruse","petit","polyvalence","cite","fiable"], 
      name: "Halfelin",
      description: "Débordant d'une chance surnaturelle, vous faufilez votre petite stature là où les autres échouent. L'hospitalité et les plaisirs simples sont votre force, la ruse votre meilleur bouclier." 
    },
    halforc: { 
      expected: ["humain","corps","grand","specialisation","sauvage","intimidant"], 
      name: "Demi-Orc",
      description: "Votre sang bout d'une sauvagerie brute contenue. La puissance brute de votre héritage vous permet d'encaisser des coups fatals et de terrasser vos cibles avec une force effroyable." 
    },
    human: { 
      expected: ["humain","corps","moyen","polyvalence",null,null], 
      name: "Humain",
      description: "Adaptable, audacieux et ambitieux. Votre courte espérance de vie vous pousse à accomplir de grandes choses, ce qui vous rend incroyablement polyvalent dans vos compétences et idéaux." 
    },
    tiefling: { 
      expected: ["exotique","magie","moyen","specialisation",null,"enigmatique"], 
      name: "Tieffelin",
      description: "Porteur de cornes et de la marque d'un héritage infernal ancien, vous suscitez souvent la méfiance. Mais le chaotique pouvoir qui coule en vous est un outil redoutable entre vos mains." 
    }
  };

  function getSelectedValue(name) {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : null;
  }

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    console.log("Form soumis ✅");

    const questionNames = ["physique", "combat", "taille", "style", "origine", "perception"];
    const answers = questionNames.map(getSelectedValue);
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
        bestMatch = info;
      }
    }

    if (bestMatch) {
      console.log("Redirection vers :", bestMatch.name);
      
      // Afficher la modale de résultat
      const resultPopup = document.getElementById("resultPopup");
      const resultTitle = document.getElementById("result-title");
      const resultDesc = document.getElementById("result-description");
      const closeResultBtn = document.getElementById("closeResultPopup");

      resultTitle.textContent = `Tu appartiens à la lignée des ${bestMatch.name}s`;
      resultDesc.textContent = bestMatch.description;
      
      resultPopup.classList.add("active");

      closeResultBtn.onclick = () => {
        resultPopup.classList.remove("active");
        // Réinitialiser le formulaire
        form.reset();
      };
    }
  });
});