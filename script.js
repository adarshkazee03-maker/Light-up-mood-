/* ============ SUNSHINE WORLD — Phase 1 logic ============ */
(() => {
  "use strict";
  const C = window.CONFIG, $ = id => document.getElementById(id);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const history = []; let current = "welcome", toastT, bubbleT, typeTimer, finalLetterTimer, rainAudio;
  let boredTimer, boredScore = 0, angryScore = 0, emojiScore = 0, currentQuestion = -1;
  let worldId = "", fashionCategory = "", fashionSelections = {}, visitedAdventures = new Set(), foundFlowers = new Set();
  let surpriseGiftOpened = false;

  /* ---- fill content from config ---- */
  $("w-title").textContent = C.welcome.title;
  $("w-line1").textContent = C.welcome.line1;
  $("w-line2").textContent = C.welcome.line2;
  $("btn-start").textContent = C.welcome.button;
  $("d-title").textContent = C.popup.title;
  $("d-body").textContent = C.popup.body;
  $("d-btn").textContent = C.popup.button;
  $("m-title").textContent = C.mood.title;
  $("m-text").textContent = C.mood.text;
  $("sad-title").textContent = C.journeys.sad.title;
  $("tired-title").textContent = C.journeys.tired.title;
  $("angry-title").textContent = C.journeys.angry.title;
  $("angry-intro").textContent = C.journeys.angry.intro;
  $("bubble-game-title").textContent = C.journeys.angry.gameTitle;
  $("bored-title").textContent = C.journeys.bored.title;
  $("catch-title").textContent = C.journeys.bored.catchTitle;
  $("emoji-title").textContent = C.journeys.bored.emojiTitle;
  $("bored-gift-title").textContent = C.journeys.bored.giftTitle;
  $("bored-gift-label").textContent = C.journeys.bored.giftClosed;
  $("happy-title").textContent = C.journeys.happy.title;
  $("happy-intro").textContent = C.journeys.happy.intro;
  $("universe-title").textContent = C.worlds.title;
  $("universe-intro").textContent = C.worlds.intro;
  $("surprise-title").textContent = C.surprise.title;
  $("surprise-intro").textContent = C.surprise.intro;
  $("clue-title").textContent = C.surprise.clueTitle;
  $("surprise-gift-label").textContent = C.surprise.giftClosed;
  $("reveal-letter").textContent = C.surprise.revealButton;
  $("reveal-eyebrow").textContent = C.surprise.revealEyebrow;
  $("reveal-title").textContent = C.surprise.revealTitle;
  $("mood-grid").innerHTML = C.mood.cards.map(m =>
    `<button class="mood-card m-${m.id}" data-mood="${m.id}" aria-label="${m.label}: ${m.desc}">
       <span class="em" aria-hidden="true">${m.emoji}</span>${m.label}<small>${m.desc}</small></button>`).join("");
  renderUniverseCards();
  renderAngryBubbles();
  renderEmojiQuestion();
  renderClues();

  /* ---- screen router ---- */
  function go(name, push = true) {
    if (name === current) return;
    if (push) history.push(current);
    if (current === "sad") clearInterval(typeTimer);
    if (current === "tired") stopRainSound();
    if (current === "bored") stopBoredGame();
    if (current === "reveal") clearInterval(finalLetterTimer);
    if (current === "world" && worldId) document.body.classList.remove("world-" + worldId);
    document.querySelector(".screen.active").classList.remove("active");
    $("screen-" + name).classList.add("active");
    current = name;
    document.body.classList.remove(...Array.from(document.body.classList).filter(name => name.startsWith("scene-")));
    document.body.classList.add("scene-" + name);
    if (name === "world" && worldId) document.body.classList.add("world-" + worldId);
    $("topbar").hidden = name === "welcome";
    $("screen-" + name).querySelector("h1,h2").setAttribute("tabindex", "-1");
    $("screen-" + name).querySelector("h1,h2").focus({ preventScroll: true });
    if (name === "sad") typeLetter();
    if (name === "angry") resetAngryGame();
    if (name === "bored") startBoredGame();
    if (name === "happy") celebrate();
    if (name === "reveal") revealFinalLetter();
  }
  function returnTo(name) {
    if (name === current) return;
    const index = history.lastIndexOf(name);
    history.length = index < 0 ? 0 : index;
    go(name, false);
  }
  $("btn-back").onclick = () => go(history.pop() || "welcome", false);
  $("btn-home").onclick = () => { history.length = 0; go("welcome", false); };
  $("btn-moods").onclick = () => returnTo("mood");
  document.querySelectorAll("[data-back-to-moods]").forEach(button => {
    button.onclick = () => returnTo("mood");
  });
  document.querySelectorAll("[data-back-to-universe]").forEach(button => {
    button.onclick = () => returnTo("universe");
  });
  $("btn-universe").onclick = () => go("universe");
  $("btn-surprise").onclick = () => go("surprise");

  /* ---- toast ---- */
  function toast(msg) {
    const t = $("toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, 2800);
  }
  $("mood-grid").onclick = e => {
    const card = e.target.closest(".mood-card");
    if (!card) return;
    go(card.dataset.mood);
  };

  /* ---- SAD and TIRED journeys ---- */
  const sadFeedback = $("sad-feedback"), tiredFeedback = $("tired-feedback");
  function pick(items) { return items[Math.floor(Math.random() * items.length)]; }
  function typeLetter() {
    const text = C.journeys.sad.letter;
    const target = $("sad-letter");
    clearInterval(typeTimer);
    if (reduce) { target.textContent = text; return; }
    const chars = Array.from(text);
    let index = 0;
    target.textContent = "";
    typeTimer = setInterval(() => {
      target.textContent += chars[index++];
      if (index >= chars.length) clearInterval(typeTimer);
    }, 24);
  }
  function showFeedback(target, message) {
    target.textContent = message;
    target.hidden = false;
  }
  function animateFor(element, className, duration = 1100) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
    setTimeout(() => element.classList.remove(className), duration);
  }
  document.querySelector(".sad-screen .choice-grid").onclick = e => {
    const button = e.target.closest("[data-sad-action]");
    if (!button) return;
    $("screen-sad").classList.remove("quiet-garden");
    switch (button.dataset.sadAction) {
      case "hug":
        animateFor($("sad-buddy"), "hugging");
        showFeedback(sadFeedback, C.journeys.sad.hug);
        break;
      case "sweet":
        showFeedback(sadFeedback, pick(C.journeys.sad.compliments));
        break;
      case "distract": {
        const isJoke = Math.random() < .5;
        const message = isJoke ? pick(C.journeys.sad.jokes) : pick(C.journeys.sad.surprises);
        showFeedback(sadFeedback, message);
        break;
      }
      case "sit":
        $("screen-sad").classList.add("quiet-garden");
        showFeedback(sadFeedback, C.journeys.sad.sit);
        break;
    }
  };
  document.querySelector(".rest-controls").onclick = e => {
    const button = e.target.closest("[data-tired-action]");
    if (!button) return;
    switch (button.dataset.tiredAction) {
      case "hug":
        animateFor(document.querySelector(".sleeping-buddy"), "hugging");
        showFeedback(tiredFeedback, C.journeys.tired.hug);
        break;
      case "rest":
        $("screen-tired").classList.add("resting");
        showFeedback(tiredFeedback, C.journeys.tired.rest);
        break;
      case "message":
        showFeedback(tiredFeedback, C.journeys.tired.message);
        break;
    }
  };

  /* Ambient sound is generated only after an explicit user action. */
  async function toggleRainSound() {
    const button = $("rain-sound");
    const icon = button.querySelector(".audio-icon");
    const label = button.querySelector(".audio-label");
    if (rainAudio?.enabled) {
      rainAudio.enabled = false;
      rainAudio.gain.gain.setTargetAtTime(0.0001, rainAudio.context.currentTime, .12);
      button.setAttribute("aria-pressed", "false");
      icon.textContent = "🔇";
      label.textContent = "Play gentle rain";
      return;
    }
    try {
      if (!rainAudio || rainAudio.context.state === "closed") {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) throw new Error("Web Audio is not supported in this browser.");
        const context = new AudioContext();
        const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
        const samples = buffer.getChannelData(0);
        for (let i = 0; i < samples.length; i++) samples[i] = (Math.random() * 2 - 1) * .22;
        const source = context.createBufferSource();
        const filter = context.createBiquadFilter();
        const gain = context.createGain();
        source.buffer = buffer;
        source.loop = true;
        filter.type = "lowpass";
        filter.frequency.value = 1100;
        gain.gain.value = 0.0001;
        source.connect(filter).connect(gain).connect(context.destination);
        source.start();
        rainAudio = { context, source, gain, enabled: false };
      }
      await rainAudio.context.resume();
      rainAudio.enabled = true;
      rainAudio.gain.gain.setTargetAtTime(.035, rainAudio.context.currentTime, .2);
      button.setAttribute("aria-pressed", "true");
      icon.textContent = "🔊";
      label.textContent = "Mute gentle rain";
    } catch (error) {
      console.error("Could not enable the optional rain sound.", error);
      showFeedback(tiredFeedback, "The rain sound isn't available in this browser, but you can still rest here. 💛");
    }
  }
  function stopRainSound() {
    if (!rainAudio) return;
    const audio = rainAudio;
    rainAudio = null;
    audio.gain.gain.setTargetAtTime(0.0001, audio.context.currentTime, .08);
    setTimeout(() => {
      audio.source.stop();
      audio.context.close().catch(error => console.error("Could not close the rain sound.", error));
    }, 250);
    const button = $("rain-sound");
    button.setAttribute("aria-pressed", "false");
    button.querySelector(".audio-icon").textContent = "🔇";
    button.querySelector(".audio-label").textContent = "Play gentle rain";
  }
  $("rain-sound").onclick = toggleRainSound;

  /* ---- ANGRY: bubbles, kind words, and no pressure ---- */
  const angryFeedback = $("angry-feedback");
  function resetAngryGame() {
    angryScore = 0;
    $("angry-score").textContent = angryScore;
    $("angry-feedback").hidden = true;
    $("angry-bubbles").classList.remove("breathing");
    renderAngryBubbles();
  }
  function renderAngryBubbles() {
    const field = $("angry-bubbles");
    field.replaceChildren();
    for (let i = 0; i < 10; i++) {
      const bubble = document.createElement("button");
      bubble.className = "bubble-target";
      bubble.type = "button";
      bubble.textContent = ["🫧", "🔵", "🟣", "🟡"][i % 4];
      bubble.setAttribute("aria-label", `Squish playful bubble ${i + 1}`);
      field.appendChild(bubble);
    }
  }
  $("angry-bubbles").onclick = e => {
    const bubble = e.target.closest(".bubble-target");
    if (!bubble || bubble.disabled) return;
    bubble.disabled = true;
    bubble.classList.add("popped");
    angryScore++;
    $("angry-score").textContent = angryScore;
    showFeedback(angryFeedback, angryScore === 10
      ? "All ten bubbles popped! You did it your way, at your pace. 💛"
      : pick(C.journeys.angry.popMessages));
  };
  $("angry-replay").onclick = resetAngryGame;
  document.querySelector(".angry-screen .game-actions").onclick = e => {
    const action = e.target.closest("[data-angry-action]")?.dataset.angryAction;
    if (action === "breath") {
      $("angry-bubbles").classList.add("breathing");
      showFeedback(angryFeedback, C.journeys.angry.breath);
    } else if (action === "surprise") {
      showFeedback(angryFeedback, pick(C.journeys.angry.surprises));
    }
  };

  /* ---- BORED: catch, guess, and open tiny surprises ---- */
  function dropSunflower() {
    const field = $("falling-field");
    if (field.childElementCount >= 5) return;
    const flower = document.createElement("button");
    flower.className = "falling-flower";
    flower.type = "button";
    flower.textContent = "🌻";
    flower.setAttribute("aria-label", "Catch this falling sunflower");
    flower.style.left = `${5 + Math.random() * 82}%`;
    let steppedFall;
    if (reduce) {
      let step = 0;
      steppedFall = setInterval(() => {
        step++;
        flower.style.top = `${Math.min(step * 25, 125)}px`;
        if (step === 5) clearInterval(steppedFall);
      }, 700);
    }
    const cleanup = setTimeout(() => {
      clearInterval(steppedFall);
      flower.remove();
    }, 4400);
    flower.onclick = () => {
      clearInterval(steppedFall);
      clearTimeout(cleanup);
      boredScore++;
      $("catch-score").textContent = boredScore;
      flower.remove();
    };
    field.appendChild(flower);
  }
  function stopBoredGame() {
    clearInterval(boredTimer);
    boredTimer = undefined;
    $("falling-field").replaceChildren();
  }
  function startBoredGame() {
    stopBoredGame();
    boredScore = 0;
    $("catch-score").textContent = boredScore;
    dropSunflower();
    boredTimer = setInterval(dropSunflower, 1050);
    renderEmojiQuestion();
  }
  $("catch-replay").onclick = startBoredGame;

  function renderEmojiQuestion() {
    const questions = C.journeys.bored.questions;
    let next = Math.floor(Math.random() * questions.length);
    if (questions.length > 1 && next === currentQuestion) next = (next + 1) % questions.length;
    currentQuestion = next;
    const question = questions[currentQuestion];
    $("emoji-clue").textContent = question.clue;
    $("emoji-feedback").hidden = true;
    $("emoji-next").hidden = true;
    const options = $("emoji-options");
    options.replaceChildren();
    const choices = question.choices.map((choice, index) => ({choice, index}));
    for (let i = choices.length - 1; i > 0; i--) {
      const swap = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[swap]] = [choices[swap], choices[i]];
    }
    choices.forEach(({choice, index}) => {
      const button = makeButton(choice, "emoji-option");
      button.dataset.choice = index;
      options.appendChild(button);
    });
  }
  $("emoji-options").onclick = e => {
    const button = e.target.closest("[data-choice]");
    if (!button || button.disabled) return;
    const question = C.journeys.bored.questions[currentQuestion];
    const correct = Number(button.dataset.choice) === question.answer;
    if (correct) {
      emojiScore++;
      $("emoji-score").textContent = emojiScore;
      $("emoji-feedback").textContent = pick(C.journeys.bored.correct);
      $("emoji-next").hidden = false;
      $("emoji-options").querySelectorAll("button").forEach(option => { option.disabled = true; });
    } else {
      $("emoji-feedback").textContent = pick(C.journeys.bored.tryAgain);
    }
    $("emoji-feedback").hidden = false;
  };
  $("emoji-next").onclick = renderEmojiQuestion;
  $("emoji-replay").onclick = () => {
    emojiScore = 0;
    $("emoji-score").textContent = emojiScore;
    currentQuestion = -1;
    renderEmojiQuestion();
  };
  $("bored-gift").onclick = () => {
    $("bored-gift-feedback").textContent = pick(C.journeys.bored.giftSurprises);
    $("bored-gift-feedback").hidden = false;
    $("bored-gift-label").textContent = C.journeys.bored.giftOpen;
    $("bored-gift").classList.add("gift-open");
  };

  /* ---- HAPPY: confetti, dance, and editable compliments ---- */
  function celebrate() {
    $("happy-feedback").hidden = true;
    const layer = $("happy-confetti");
    layer.replaceChildren();
    if (reduce) return;
    const shapes = ["🌻", "✨", "🌼", "🎉", "💛"];
    for (let i = 0; i < 24; i++) {
      const piece = document.createElement("span");
      piece.textContent = shapes[i % shapes.length];
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.setProperty("--fall-delay", `${Math.random() * 2.5}s`);
      layer.appendChild(piece);
      setTimeout(() => piece.remove(), 6500);
    }
  }
  document.querySelector(".celebration-actions").onclick = e => {
    const action = e.target.closest("[data-happy-action]")?.dataset.happyAction;
    if (action === "dance") {
      animateFor($("happy-buddy"), "dancing", 1800);
      showFeedback($("happy-feedback"), C.journeys.happy.danceMessage);
    } else if (action === "message") {
      showFeedback($("happy-feedback"), personalize(pick(C.journeys.happy.compliments)));
    } else if (action === "confetti") {
      celebrate();
      showFeedback($("happy-feedback"), C.journeys.happy.celebrationMessage);
    }
  };

  /* ---- PHASE 3: five small, interactive worlds ---- */
  function makeButton(text, className = "choice-card") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = text;
    return button;
  }
  function personalize(text) {
    return text.split("{name}").join(C.nicknames[0] || "sunshine")
      .split("{creator}").join(C.creator);
  }
  function withValues(text, values) {
    return Object.entries(values).reduce((result, [key, value]) => result.split(`{${key}}`).join(String(value)), text);
  }
  function renderUniverseCards() {
    const grid = $("universe-grid");
    C.worlds.cards.forEach(world => {
      const card = makeButton("", "universe-card");
      card.dataset.world = world.id;
      const icon = document.createElement("span");
      icon.className = "universe-icon";
      icon.textContent = world.emoji;
      const title = document.createElement("strong");
      title.textContent = world.title;
      const description = document.createElement("small");
      description.textContent = world.desc;
      card.append(icon, title, description);
      grid.appendChild(card);
    });
  }
  function openWorld(id) {
    worldId = id;
    fashionCategory = C.worlds.fashion.categories[0].id;
    $("world-feedback").hidden = true;
    renderWorld();
    go("world");
  }
  function renderWorld() {
    const world = C.worlds[worldId];
    $("world-eyebrow").textContent = world.eyebrow;
    $("world-title").textContent = world.title || C.worlds.cards.find(card => card.id === worldId).title;
    $("world-description").textContent = world.description;
    $("world-visual").className = `world-visual world-visual-${worldId}`;
    const card = C.worlds.cards.find(item => item.id === worldId);
    $("world-art").textContent = card.emoji;
    const controls = $("world-controls");
    controls.replaceChildren();
    if (worldId === "fashion") renderFashionControls(controls);
    if (worldId === "snacks") renderSnackControls(controls);
    if (worldId === "rainy") renderRainyControls(controls);
    if (worldId === "adventure") renderAdventureControls(controls);
    if (worldId === "sunflowers") renderFlowerControls(controls);
  }
  function showWorldFeedback(message) {
    $("world-feedback").textContent = message;
    $("world-feedback").hidden = false;
  }
  function renderFashionControls(controls) {
    controls.replaceChildren();
    const categories = document.createElement("div");
    categories.className = "world-category-list";
    C.worlds.fashion.categories.forEach(category => {
      const button = makeButton(`${category.emoji} ${category.label}`, "category-chip");
      button.dataset.worldAction = "fashion-category";
      button.dataset.category = category.id;
      button.setAttribute("aria-pressed", String(fashionCategory === category.id));
      categories.appendChild(button);
    });
    const options = document.createElement("div");
    options.className = "world-option-list";
    const category = C.worlds.fashion.categories.find(item => item.id === fashionCategory);
    category.options.forEach((option, index) => {
      const button = makeButton(`${option.emoji} ${option.name}`, "choice-card");
      button.dataset.worldAction = "fashion-option";
      button.dataset.option = index;
      options.appendChild(button);
    });
    const surprise = makeButton(`✨ ${C.worlds.fashion.surpriseLabel}`, "btn");
    surprise.dataset.worldAction = "fashion-surprise";
    controls.append(categories, options, surprise);
  }
  function renderSnackControls(controls) {
    const list = document.createElement("div");
    list.className = "world-option-list snack-options";
    C.worlds.snacks.snacks.forEach(snack => {
      const button = makeButton(`🍽️ ${snack}`, "choice-card");
      button.dataset.worldAction = "snack";
      button.dataset.snack = snack;
      list.appendChild(button);
    });
    const surprise = makeButton("🎉 A funny snack surprise", "btn");
    surprise.dataset.worldAction = "snack-surprise";
    controls.append(list, surprise);
  }
  function renderRainyControls(controls) {
    const lamp = makeButton(C.worlds.rainy.lampOn, "choice-card");
    lamp.dataset.worldAction = "lamp";
    lamp.dataset.onLabel = C.worlds.rainy.lampOn;
    lamp.dataset.offLabel = C.worlds.rainy.lampOff;
    const drama = makeButton(`🎬 ${C.worlds.rainy.dramaLabel}`, "btn");
    drama.dataset.worldAction = "drama";
    controls.append(lamp, drama);
    $("world-visual").classList.add("lamp-lit");
    lamp.dataset.lit = "true";
    lamp.textContent = C.worlds.rainy.lampOn;
  }
  function renderAdventureControls(controls) {
    C.worlds.adventure.activities.forEach(activity => {
      const button = makeButton(`${activity.emoji} ${activity.title}`, "choice-card");
      button.dataset.worldAction = "adventure";
      button.dataset.activity = activity.id;
      controls.appendChild(button);
    });
    const visited = makeButton("", "world-visited");
    visited.id = "adventure-progress";
    controls.appendChild(visited);
    updateAdventureProgress();
  }
  function updateAdventureProgress() {
    const progress = $("adventure-progress");
    if (!progress) return;
    progress.textContent = withValues(C.worlds.adventure.visitMessage, {count: visitedAdventures.size});
  }
  function renderFlowerControls(controls) {
    const list = document.createElement("div");
    list.className = "flower-grid";
    C.worlds.sunflowers.flowers.forEach((flower, index) => {
      const button = makeButton(`🌻 Flower ${index + 1}`, "garden-flower");
      button.dataset.worldAction = "flower";
      button.dataset.flower = index;
      if (foundFlowers.has(index)) button.classList.add("bloomed");
      list.appendChild(button);
    });
    const progress = makeButton("", "world-visited");
    progress.id = "flower-progress";
    controls.append(list, progress);
    updateFlowerProgress();
  }
  function updateFlowerProgress() {
    const progress = $("flower-progress");
    if (!progress) return;
    progress.textContent = withValues(C.worlds.sunflowers.foundMessage, {
      count: foundFlowers.size,
      total: C.worlds.sunflowers.flowers.length
    });
  }
  $("universe-grid").onclick = e => {
    const card = e.target.closest("[data-world]");
    if (card) openWorld(card.dataset.world);
  };
  $("world-controls").onclick = e => {
    const button = e.target.closest("[data-world-action]");
    if (!button) return;
    const action = button.dataset.worldAction;
    if (action === "fashion-category") {
      fashionCategory = button.dataset.category;
      $("world-feedback").hidden = true;
      renderFashionControls($("world-controls"));
    } else if (action === "fashion-option") {
      const category = C.worlds.fashion.categories.find(item => item.id === fashionCategory);
      const option = category.options[Number(button.dataset.option)];
      fashionSelections[fashionCategory] = option.name;
      $("world-art").textContent = option.emoji;
      showWorldFeedback(`${option.name} — a lovely choice, ${C.nicknames[0]}!`);
    } else if (action === "fashion-surprise") {
      const chosen = C.worlds.fashion.categories.map(category => {
        const option = pick(category.options);
        fashionSelections[category.id] = option.name;
        return option.name;
      });
      $("world-art").textContent = "✨";
      showWorldFeedback(withValues(C.worlds.fashion.surpriseMessage, {
        name: C.nicknames[0], items: chosen.join(", ")
      }));
    } else if (action === "snack") {
      showWorldFeedback(withValues(C.worlds.snacks.selectedMessage, {
        name: C.nicknames[0], snack: button.dataset.snack
      }));
    } else if (action === "snack-surprise") {
      showWorldFeedback(pick(C.worlds.snacks.surprises));
    } else if (action === "lamp") {
      const lit = button.dataset.lit !== "true";
      button.dataset.lit = String(lit);
      $("world-visual").classList.toggle("lamp-lit", lit);
      button.textContent = lit ? button.dataset.onLabel : button.dataset.offLabel;
      showWorldFeedback(C.worlds.rainy.lampMessage);
    } else if (action === "drama") {
      const drama = pick(C.worlds.rainy.dramaNights);
      showWorldFeedback(`${drama.title}\n${drama.message}`);
    } else if (action === "adventure") {
      const activity = C.worlds.adventure.activities.find(item => item.id === button.dataset.activity);
      visitedAdventures.add(activity.id);
      $("world-art").textContent = activity.emoji;
      showWorldFeedback(activity.message);
      updateAdventureProgress();
    } else if (action === "flower") {
      const index = Number(button.dataset.flower);
      foundFlowers.add(index);
      button.classList.add("bloomed");
      showWorldFeedback(C.worlds.sunflowers.flowers[index].message);
      updateFlowerProgress();
    }
  };

  /* ---- PHASE 4: open the gift, find each clue, read the letter ---- */
  function renderClues() {
    const grid = $("clue-grid");
    C.surprise.clues.forEach((_, index) => {
      const button = makeButton(`🌻 Sunflower clue ${index + 1}`, "clue-button");
      button.dataset.clue = index;
      button.disabled = true;
      grid.appendChild(button);
    });
    updateClueProgress();
  }
  function updateClueProgress() {
    const found = $("clue-grid").querySelectorAll(".found").length;
    $("clue-progress").textContent = `${found} of ${C.surprise.clues.length} found`;
    const ready = surpriseGiftOpened && found === C.surprise.clues.length;
    $("reveal-letter").hidden = !ready;
  }
  $("surprise-gift").onclick = () => {
    surpriseGiftOpened = true;
    $("surprise-gift").classList.add("is-open");
    $("surprise-gift").setAttribute("aria-expanded", "true");
    $("surprise-gift-label").textContent = C.surprise.giftOpened;
    $("surprise-gift-message").textContent = pick(C.surprise.openingMessages);
    $("surprise-gift-message").hidden = false;
    $("clue-grid").querySelectorAll("button").forEach(button => { button.disabled = false; });
    updateClueProgress();
  };
  $("clue-grid").onclick = e => {
    const button = e.target.closest("[data-clue]");
    if (!button || button.disabled) return;
    const index = Number(button.dataset.clue);
    button.disabled = true;
    button.classList.add("found");
    button.textContent = `🌼 Clue ${index + 1} found`;
    $("clue-reveal").textContent = C.surprise.clues[index];
    $("clue-reveal").hidden = false;
    updateClueProgress();
  };
  $("reveal-letter").onclick = () => go("reveal");
  function revealFinalLetter() {
    const target = $("final-letter");
    const text = C.finalLetter;
    clearInterval(finalLetterTimer);
    burst(24);
    if (reduce) { target.textContent = text; return; }
    const chars = Array.from(text);
    let index = 0;
    target.textContent = "";
    finalLetterTimer = setInterval(() => {
      target.textContent += chars[index++];
      if (index >= chars.length) clearInterval(finalLetterTimer);
    }, 22);
  }

  /* ---- welcome popup (with focus handling) ---- */
  const modal = $("modal");
  function openModal() { modal.hidden = false; $("d-btn").focus(); burst(14); }
  function closeModal() { modal.hidden = true; }
  $("btn-start").onclick = openModal;
  $("d-btn").onclick = () => { closeModal(); go("mood"); };
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) { closeModal(); $("btn-start").focus(); } });

  /* ---- companion ---- */
  let line = 0;
  $("companion").onclick = () => {
    const el = $("companion"), b = $("bubble");
    el.classList.remove("wiggle"); void el.offsetWidth; el.classList.add("wiggle");
    b.textContent = C.companionLines[line++ % C.companionLines.length]; b.hidden = false;
    clearTimeout(bubbleT); bubbleT = setTimeout(() => b.hidden = true, 3200);
    burst(5);
  };

  /* ---- secret clue ---- */
  $("secret").onclick = () => toast(C.welcome.secretClue);

  /* ---- falling petals (fewer on small screens) ---- */
  const pc = $("petals");
  function petal(x) {
    const p = document.createElement("span"); p.className = "petal";
    p.style.left = (x ?? Math.random() * 100) + "vw";
    p.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
    p.style.animationDuration = (8 + Math.random() * 8) + "s";
    p.style.animationDelay = (Math.random() * -10) + "s";
    p.style.transform = `scale(${.6 + Math.random() * .8})`;
    return p;
  }
  if (!reduce) { const n = innerWidth < 600 ? 9 : 18; for (let i = 0; i < n; i++) pc.appendChild(petal()); }
  function burst(n) { // small petal burst on interaction
    if (reduce) return;
    for (let i = 0; i < n; i++) {
      const p = petal(); p.style.animationDelay = "0s"; p.style.animationDuration = (3 + Math.random() * 3) + "s";
      pc.appendChild(p); setTimeout(() => p.remove(), 6500);
    }
  }

  /* ---- gentle parallax (pointer only, cheap) ---- */
  if (!reduce && matchMedia("(pointer:fine)").matches) {
    addEventListener("pointermove", e => {
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      document.querySelectorAll(".layer").forEach(l => {
        const d = +l.dataset.depth || 0; l.style.transform = `translate3d(${x * d}px,${y * d}px,0)`;
      });
    }, { passive: true });
  }
})();
