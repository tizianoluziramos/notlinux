const rls = require("../node_boludes/readline-sync/index.cjs");

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text:
      "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "You must be the change you wish to see in the world.",
    author: "Mahatma Gandhi"
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Abraham Lincoln"
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu"
  },
  {
    text: "That which does not kill us makes us stronger.",
    author: "Friedrich Nietzsche"
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela"
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt"
  },
  {
    text:
      "Success is not the key to happiness. Happiness is the key to success.",
    author: "Albert Schweitzer"
  },
  {
    text:
      "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text:
      "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis"
  },
  {
    text:
      "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau"
  },
  {
    text: "Opportunities don't happen. You create them.",
    author: "Chris Grosser"
  },
  {
    text:
      "Hardships often prepare ordinary people for an extraordinary destiny.",
    author: "C.S. Lewis"
  },
  {
    text:
      "Do not wait to strike till the iron is hot, but make it hot by striking.",
    author: "William Butler Yeats"
  },
  { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
  {
    text: "It is never too late to be what you might have been.",
    author: "George Eliot"
  },
  {
    text:
      "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Don't wait. The time will never be just right.",
    author: "Napoleon Hill"
  },
  {
    text:
      "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle Onassis"
  },
  {
    text:
      "Life isn't about waiting for the storm to pass, it's about learning how to dance in the rain.",
    author: "Vivian Greene"
  },
  {
    text:
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text:
      "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill"
  },
  {
    text:
      "The only place where success comes before work is in the dictionary.",
    author: "Vidal Sassoon"
  },
  {
    text:
      "When one door of happiness closes, another opens; but we often look so long at the closed door that we do not see the one which has been opened for us.",
    author: "Helen Keller"
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    text:
      "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "You only live once, but if you do it right, once is enough.",
    author: "Mae West"
  },
  {
    text:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  },
  {
    text:
      "Don't judge each day by the harvest you reap, but by the seeds that you plant.",
    author: "Robert Louis Stevenson"
  },
  {
    text:
      "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "The best way to predict your future is to create it.",
    author: "Abraham Lincoln"
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James"
  },
  {
    text: "You must be the change you wish to see in the world.",
    author: "Mahatma Gandhi"
  },
  {
    text:
      "There are no secrets to success. It is the result of preparation, hard work, and learning from failure.",
    author: "Colin Powell"
  },
  {
    text:
      "Success is not how high you have climbed, but how you make a positive difference to the world.",
    author: "Roy T. Bennett"
  },
  {
    text:
      "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt"
  },
  { text: "Don't wait for opportunity. Create it.", author: "Anonymous" },
  {
    text:
      "If you want to go fast, go alone. If you want to go far, go together.",
    author: "African Proverb"
  },
  {
    text:
      "Success is not the key to happiness. Happiness is the key to success.",
    author: "Albert Schweitzer"
  },
  { text: "Your limitation—it's only your imagination.", author: "Anonymous" },
  {
    text: "Push yourself, because no one else is going to do it for you.",
    author: "Anonymous"
  },
  { text: "Great things never come from comfort zones.", author: "Anonymous" },
  { text: "Dream it. Wish it. Do it.", author: "Anonymous" },
  {
    text: "Success doesn’t just find you. You have to go out and get it.",
    author: "Anonymous"
  },
  {
    text:
      "The harder you work for something, the greater you’ll feel when you achieve it.",
    author: "Anonymous"
  },
  { text: "Dream bigger. Do bigger.", author: "Anonymous" },
  {
    text: "Don’t stop when you’re tired. Stop when you’re done.",
    author: "Anonymous"
  },
  {
    text: "Wake up with determination. Go to bed with satisfaction.",
    author: "Anonymous"
  },
  {
    text: "Do something today that your future self will thank you for.",
    author: "Anonymous"
  },
  { text: "Little things make big days.", author: "Anonymous" },
  {
    text: "It’s going to be hard, but hard does not mean impossible.",
    author: "Anonymous"
  },
  { text: "Don’t wait for opportunity. Create it.", author: "Anonymous" },
  {
    text:
      "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
    author: "Anonymous"
  },
  {
    text: "The key to success is to focus on goals, not obstacles.",
    author: "Anonymous"
  },
  { text: "Dream it. Believe it. Build it.", author: "Anonymous" },
  {
    text:
      "You don’t have to be great to start, but you have to start to be great.",
    author: "Anonymous"
  },
  {
    text:
      "Success is not the key to happiness. Happiness is the key to success.",
    author: "Albert Schweitzer"
  },
  {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "There is no shortcut to any place worth going.",
    author: "Beverly Sills"
  },
  {
    text:
      "There are no limits to what you can accomplish, except the limits you place on your own thinking.",
    author: "Brian Tracy"
  },
  { text: "Happiness depends upon ourselves.", author: "Aristotle" },
  {
    text: "You must expect great things of yourself before you can do them.",
    author: "Michael Jordan"
  },
  {
    text:
      "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar"
  },
  {
    text:
      "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    author: "Christian D. Larson"
  },
  {
    text:
      "Don’t wait for the perfect moment. Take the moment and make it perfect.",
    author: "Anonymous"
  },
  {
    text: "Everything you’ve ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    text:
      "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "It always seems impossible until it’s done.",
    author: "Nelson Mandela"
  },
  {
    text:
      "Success is not the key to happiness. Happiness is the key to success.",
    author: "Albert Schweitzer"
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Abraham Lincoln"
  },
  {
    text:
      "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill"
  },
  {
    text:
      "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    author: "Martin Luther King Jr."
  },
  {
    text: "If you’re going through hell, keep going.",
    author: "Winston Churchill"
  },
  {
    text:
      "To live is the rarest thing in the world. Most people exist, that is all.",
    author: "Oscar Wilde"
  },
  {
    text: "You only live once, but if you do it right, once is enough.",
    author: "Mae West"
  },
  {
    text: "A journey of a thousand miles begins with a single step.",
    author: "Lao Tzu"
  },
  {
    text:
      "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text:
      "Hardships often prepare ordinary people for an extraordinary destiny.",
    author: "C.S. Lewis"
  },
  {
    text:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "Success is not in what you have, but who you are.",
    author: "Bo Bennett"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde"
  },
  {
    text: "A person who never made a mistake never tried anything new.",
    author: "Albert Einstein"
  },
  { text: "The best revenge is massive success.", author: "Frank Sinatra" },
  {
    text:
      "The difference between who you are and who you want to be is what you do.",
    author: "Anonymous"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text:
      "Success is not how high you have climbed, but how you make a positive difference to the world.",
    author: "Roy T. Bennett"
  },
  {
    text:
      "Keep your face always toward the sunshine—and shadows will fall behind you.",
    author: "Walt Whitman"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky"
  },
  {
    text: "To be the best, you must be able to handle the worst.",
    author: "Wilson Kanadi"
  },
  { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
  {
    text: "Success doesn’t just find you. You have to go out and get it.",
    author: "Anonymous"
  },
  {
    text:
      "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "It always seems impossible until it’s done.",
    author: "Nelson Mandela"
  },
  {
    text:
      "The only way to achieve the impossible is to believe it is possible.",
    author: "Charles Kingsleigh"
  },
  {
    text:
      "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar"
  },
  {
    text: "Don’t watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "Life is 10% what happens to us and 90% how we react to it.",
    author: "Charles R. Swindoll"
  },
  {
    text: "Keep your eyes on the stars, and your feet on the ground.",
    author: "Theodore Roosevelt"
  },
  {
    text: "We may encounter many defeats, but we must not be defeated.",
    author: "Maya Angelou"
  },
  {
    text:
      "The road to success and the road to failure are almost exactly the same.",
    author: "Colin R. Davis"
  },
  {
    text:
      "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    author: "Roy T. Bennett"
  },
  {
    text: "What you do today can improve all your tomorrows.",
    author: "Ralph Marston"
  },
  {
    text:
      "Go confidently in the direction of your dreams. Live the life you have imagined.",
    author: "Henry David Thoreau"
  }
];

globalThis["rpe"] = () => {
  let pregunta = rls.question.question("Please insert the lenguage you want. ");
  if (pregunta === "english") {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(`"${randomQuote.text}" —${randomQuote.author}`);
  } else {
    pregunta = rls.question.question("Please insert the lenguage you want. ");
  }
};

module.exports = globalThis["rpe"];
