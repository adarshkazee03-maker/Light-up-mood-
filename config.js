/* ============ SUNSHINE WORLD — central configuration ============
   Edit ONLY this file to personalise texts. */
window.CONFIG = {
  nicknames: ["Pukuuu","Fuchuu","Bachaa","Pukuu Maya","Mayalu","Payro Manxye","Missess","Madam je"],
  creator: "Your Sana",
  welcome: {
    title: "Heyyy, Pukuuu! 🌻",
    line1: "Guess whattt? Someone has secretly made a tiny little world just for you.",
    line2: "This little place is filled with sunshine, silly things, tiny surprises and lots of love.",
    button: "Let's explore, Madam je! ✨",
    secretClue: "Psst… someone is secretly cheering for you. 💛"
  },
  popup: {
    title: "Waittt, Fuchuuu! 💛",
    body: "Before we explore, remember one thing...\n\nYou don't have to be happy every moment. This little world is here for your happy days and your not-so-happy days too.\n\nSending you a tiny virtual hug! 🫂",
    button: "Okayyy, let's go!"
  },
  companionLines: [
    "Hiii Madam je! 💙", "Ohana means… snacks. Probably.", "I guard the sunflowers. Seriously.",
    "Boop! You found my nose.", "Someone knows sunflowers make you smile. 🌻", "Tiny blue hug incoming!"
  ],
  mood: {
    title: "How is my sunshine feeling today?",
    text: "Tell me what's going on in that little heart of yours. You don't have to pretend here.",
    cards: [
      {id:"sad",label:"SAD",emoji:"🥺",desc:"Soft rain, warm light"},
      {id:"angry",label:"ANGRY",emoji:"😤",desc:"Cartoon chaos"},
      {id:"bored",label:"BORED",emoji:"🥱",desc:"Tiny arcade"},
      {id:"happy",label:"HAPPY",emoji:"🥰",desc:"Sunflower party"},
      {id:"tired",label:"TIRED",emoji:"😴",desc:"Cosy rainy evening"}
    ]
  },
  journeys: {
    sad: {
      title: "Heyyy, my Pukuuu... 💛",
      letter: "My sweet Pukuuu, if today feels heavy, you don't have to carry it all by yourself. Even the sky needs a little rain before the flowers can rest. You are allowed to feel exactly how you feel, and you are still so very loved. Stay for a while; I'll sit right here with you. 🌻",
      hug: "A big, gentle hug from your little blue friend. No fixing, no questions — just a safe squeeze for as long as you need. 🫂",
      compliments: [
        "Pukuuu, your heart makes ordinary days feel softer just by being in them. 💛",
        "You have the kindest little way of making people feel seen, Madam je. 🌼",
        "Even on a hard day, your gentle light is still there. I hope you can feel it too. ✨",
        "The world is luckier with your laugh, your softness, and all the wonderfully-you things. 🌻"
      ],
      jokes: [
        "Why did the sunflower get a promotion? It was outstanding in its field. 🌻",
        "What do clouds wear under their raincoats? Thunderwear. ☁️",
        "Why did the little raindrop blush? It saw the rainbow changing. 🌈"
      ],
      surprises: [
        "Tiny surprise: somewhere, a sunflower is doing its very best little sunshine impression just for you. 🌻",
        "A pocket-sized reminder: you are someone's favourite notification. 💛",
        "Imagine the blue friend trying to hug a whole sunflower field. It got tangled. It is still trying. 🫂"
      ],
      sit: "Then let's just sit together. Listen to the rain, watch the flowers, and let this moment ask nothing of you. 🌧️"
    },
    tired: {
      title: "Come here, Mayalu. Rest a little. 💛",
      hug: "Come closer, Mayalu. Your little blue friend is giving you the gentlest, cosiest hug. You can let your shoulders rest now. 🫂",
      rest: "Breathe in softly... and let it go. No need to do anything perfectly. Just be here, warm and safe, one gentle breath at a time. 🌙",
      message: "You have done enough for today.\n\nYou don't need to accomplish everything.\nYou don't need to be productive every moment.\nTake a little break, Bachaa.\n\nYou deserve rest, kindness and a little sunshine too. 💛"
    },
    angry: {
      title: "Oof, that's a lot. Let's squish some bubbles! 😤",
      intro: "You are allowed to feel angry. Nothing here will tell you to just calm down. If it feels good, squish a few silly bubbles with me.",
      gameTitle: "Pop-pop-pop the grumpy bubbles",
      breath: "Let's unclench your jaw and let your shoulders drop, only if that feels okay. Your feelings are real, and you don't have to solve everything this second. 💛",
      surprises: [
        "A tiny cartoon duck just rage-waddled past in enormous rain boots. Squeak! 🦆",
        "The blue buddy put a party hat on a bubble. The bubble is taking itself very seriously. 🎈",
        "A sunflower is doing a dramatic soap-opera faint into a cushion. 🌻",
        "Breaking news: one tiny bubble has been promoted to Assistant Vice President of Popping. 🫧"
      ],
      popMessages: ["Boop! One less bubble to worry about.", "Squeee! That bubble was full of tiny silly noises.", "Pop! Your score is growing; no rush at all."]
    },
    bored: {
      title: "Boredom spotted! Tiny games incoming. 🥱",
      intro: "Pick any little game, switch whenever you like, and replay as much as you want. There is no timer and no losing here.",
      catchTitle: "Catch the falling sunflowers",
      emojiTitle: "What do these emojis mean?",
      giftTitle: "A mystery gift for you",
      giftClosed: "Tap to open your mystery box",
      giftOpen: "Tap for another tiny surprise",
      giftSurprises: [
        "A tiny crown for the Queen of Potato Crackers. 👑🥔",
        "One coupon for a no-reason-needed blue buddy hug. Redeem any time. 🫂",
        "A sunflower has written you a very small fan letter. It says: you're amazing. 🌻",
        "Surprise! You are officially allowed one extra snack break. Signed, the snack committee. 🍿",
        "A secret pocket full of imaginary confetti, just for you. ✨"
      ],
      questions: [
        {clue:"A tiny yellow friend follows the sun and loves a sunny day.",choices:["🌻 Sunflower","🌙 Moonflower","🍋 Lemon"],answer:0},
        {clue:"I am round, cheesy, and usually vanish during movie night.",choices:["🍕 Pizza","🧦 Socks","🌧️ Rain"],answer:0},
        {clue:"I have a shell, little legs, and carry my home everywhere.",choices:["🐢 Turtle","🐝 Bee","🦋 Butterfly"],answer:0},
        {clue:"I fall from the sky, but I am not a raindrop. I sparkle in winter.",choices:["❄️ Snowflake","🌼 Daisy","🍪 Cookie"],answer:0}
      ],
      correct: ["That's it! Your emoji detective skills are excellent. 🕵️‍♀️", "You got it! A tiny gold star for you. ⭐", "Correct! The blue buddy is very impressed. 💙"],
      tryAgain: ["Not quite — want to try another guess?", "Close! Take another guess if you like.", "Nope, but that was a wonderfully creative guess!"]
    },
    happy: {
      title: "A happy little sunshine party! 🥰",
      intro: "Your happy deserves room to sparkle. Dance, collect a sweet note, or ask for another shower of sunflowers!",
      compliments: [
        "{name}, your happiness is contagious in the loveliest way. Keep that sunshine for yourself, too. 🌻",
        "Your laugh could brighten even the sleepiest sunflower, {name}. 💛",
        "You make ordinary moments feel like tiny celebrations. So glad you're you! ✨",
        "{name}, you deserve every bit of this joy and all the good things still on their way. 🥰"
      ],
      danceMessage: "The blue buddy has officially joined your happy dance. The moves are questionable; the enthusiasm is enormous. 💃💙",
      celebrationMessage: "More sparkle, more sunflowers, more reasons to celebrate you! 🎉"
    }
  },
  worlds: {
    title: "Her Little Universe ✨",
    intro: "A few little worlds made with you in mind. Pick whichever one feels lovely right now.",
    cards: [
      {id:"fashion",title:"Fashion Paradise",emoji:"👗",desc:"Your own little style studio"},
      {id:"snacks",title:"Snack Paradise",emoji:"🍿",desc:"A very important snack break"},
      {id:"rainy",title:"Cosy Rainy World",emoji:"🌧️",desc:"Warm lights and drama-night vibes"},
      {id:"adventure",title:"Dream Adventure",emoji:"🐎",desc:"Ride, wander, and dive"},
      {id:"sunflowers",title:"Sunflower Garden",emoji:"🌻",desc:"Little flowers, little love notes"}
    ],
    fashion: {
      eyebrow: "A style studio made just for you",
      description: "Choose your details, try a surprise look, and wear whatever makes you feel like yourself.",
      surpriseLabel: "Create a surprise look",
      surpriseMessage: "{name}, your look is {items}. Absolutely your own kind of lovely. 💛",
      categories: [
        {id:"dress",label:"Dresses",emoji:"👗",options:[{name:"Buttercup twirl dress",emoji:"🌼"},{name:"Rosy pink dress",emoji:"🌸"},{name:"Little starry dress",emoji:"✨"}]},
        {id:"heels",label:"Heels",emoji:"👠",options:[{name:"Golden party heels",emoji:"✨"},{name:"Soft pink heels",emoji:"🩷"},{name:"Comfy sparkle shoes",emoji:"💫"}]},
        {id:"jewellery",label:"Jewellery",emoji:"💎",options:[{name:"Sunshine necklace",emoji:"🌞"},{name:"Tiny pearl set",emoji:"🤍"},{name:"Sparkly bracelet",emoji:"✨"}]},
        {id:"nosePins",label:"Nose pins",emoji:"💛",options:[{name:"Tiny golden nose pin",emoji:"🌟"},{name:"Little flower nose pin",emoji:"🌼"},{name:"A soft sparkle",emoji:"✨"}]},
        {id:"rings",label:"Rings",emoji:"💍",options:[{name:"Sunflower ring",emoji:"🌻"},{name:"Little heart ring",emoji:"💛"},{name:"Starry ring",emoji:"⭐"}]},
        {id:"nails",label:"Nails",emoji:"💅",options:[{name:"Peachy nails",emoji:"🍑"},{name:"Rose-pink nails",emoji:"🌷"},{name:"Glittery sunshine nails",emoji:"✨"}]},
        {id:"mehendi",label:"Mehendi",emoji:"🌿",options:[{name:"Tiny flower mehendi",emoji:"🌼"},{name:"Little leafy mehendi",emoji:"🍃"},{name:"Sun-and-heart mehendi",emoji:"☀️"}]}
      ]
    },
    snacks: {
      eyebrow: "The snack committee is ready",
      description: "Build your little snack moment. Potato crackers are absolutely invited.",
      snacks: ["Potato crackers","Momos","Chocolate","Crispy fries","Popcorn","Mango slices"],
      surprises: [
        "The potato crackers have elected you their beloved snack president. 🥔👑",
        "A tiny momo is wearing a raincoat because it heard there might be chutney showers. 🥟",
        "The snack plate says: you deserve a treat, even if the treat is simply a quiet moment. 💛",
        "Emergency snack delivery! The blue buddy brought imaginary extra fries. 🍟"
      ],
      selectedMessage: "{name}, your snack pick is saved in this little moment: {snack}. Excellent choice. 😋"
    },
    rainy: {
      eyebrow: "A soft rainy evening",
      description: "Rain at the window, warm lights, and a drama-night atmosphere. You get to choose the mood.",
      lampOn: "Turn the warm lamp off",
      lampOff: "Turn the warm lamp on",
      dramaLabel: "Pick tonight's drama-night mood",
      dramaNights: [
        {title:"The Great Blanket Mystery",message:"A blanket, a snack, and one episode that definitely won't turn into five. (Probably.)"},
        {title:"Plot Twist and Potato Crackers",message:"The heroine found her courage. The potato crackers found their way to the sofa. Everyone wins."},
        {title:"Rainy-Day Romance",message:"Tonight's plot: soft rain, a warm light, and your favourite person (you) getting a proper rest."}
      ],
      lampMessage: "The room is a little cosier already. Stay for as long as you like. 🕯️"
    },
    adventure: {
      eyebrow: "Choose today's dream adventure",
      description: "No packing, no rush. Pick a place and let your imagination do the travelling.",
      activities: [
        {id:"horse",title:"Horse riding",emoji:"🐎",message:"You and your horse follow a sunny little trail. Your blue buddy is waving from a flower-covered hill. 🌼"},
        {id:"beach",title:"Quiet beach",emoji:"🏖️",message:"Warm sand, gentle waves, and absolutely nowhere else you need to be. 🌊"},
        {id:"underwater",title:"Underwater wonder",emoji:"🐠",message:"A tiny underwater world says hello: curious fish, swaying sea plants, and you floating peacefully. 🫧"}
      ],
      visitMessage: "Little dream places visited: {count} of 3"
    },
    sunflowers: {
      eyebrow: "Every flower has a little note",
      description: "Tap a sunflower to open its message. Collect as many as you like.",
      flowers: [
        {message:"Pukuuu, you are loved in all your moods, on all your days. 💛"},
        {message:"You don't have to earn your rest or your kindness. 🌻"},
        {message:"Your soft heart is a lovely thing. Please be gentle with it. ✨"},
        {message:"Someone is always quietly cheering for you. 🫶"},
        {message:"You make this world brighter simply by being in it. 🌼"},
        {message:"A little reminder from the garden: you are enough, exactly as you are. 💛"}
      ],
      foundMessage: "Little notes found: {count} of {total}"
    }
  },
  surprise: {
    title: "A Little Secret for You 🎁",
    intro: "There are tiny clues hiding in the sunflowers. Open the gift and find each one when you're ready.",
    giftClosed: "Open your mystery gift",
    giftOpened: "Your surprise is open — tap for another little note",
    openingMessages: [
      "A little pocket of sunshine, saved especially for you. 🌞",
      "One imaginary sunflower crown, delivered with a very big hug. 🌻👑",
      "A reminder that someone's favourite person is reading this right now. 💛"
    ],
    clueTitle: "Three sunflower clues",
    clues: [
      "Clue one: someone is very proud of how tenderly you care for the people you love. 🌼",
      "Clue two: the blue buddy has been keeping one extra-large hug ready just for you. 🫂",
      "Clue three: the person who made this little world thinks you are wonderfully, completely you. 💛"
    ],
    revealButton: "🌻 Open your final sunflower letter",
    revealEyebrow: "A little letter, from the heart",
    revealTitle: "For my Pukuuu, with all my love 💛"
  },
  finalLetter: "Dear Pukuuu,\n\nI made this little world so you would always have a soft place to land — for the sunny days, the rainy days, the silly days, and every day in between.\n\nYou never have to be anything other than your own lovely self to be loved. I hope you remember how precious you are, how proud I am of you, and how much warmth you bring into my life.\n\nWhenever you need a smile, a quiet moment, or a tiny sunflower, this place is here for you.\n\nMade with lots and lots of love...\nYOUR SANA 💛"
};
