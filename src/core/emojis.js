const emojis = {
  100: {
    keywords: ['score', 'perfect', 'numbers', 'century', 'exam', 'quiz', 'test', 'pass', 'hundred'],
    char: '💯',
    category: 'symbols',
    name: '100',
    description: 'Hundred Points Symbol',
    skinVariations: false
  },
  1234: {
    keywords: ['numbers', 'blue-square'],
    char: '🔢',
    category: 'symbols',
    name: '1234',
    description: 'Input Symbol for Numbers',
    skinVariations: false
  },
  grinning: {
    keywords: ['face', 'smile', 'happy', 'joy', ':D', 'grin'],
    char: '😀',
    category: 'people',
    name: 'grinning',
    description: 'Grinning Face',
    skinVariations: false
  },
  grimacing: {
    keywords: ['face', 'grimace', 'teeth'],
    char: '😬',
    category: 'people',
    name: 'grimacing',
    description: 'Grimacing Face',
    skinVariations: false
  },
  grin: {
    keywords: ['face', 'happy', 'smile', 'joy', 'kawaii'],
    char: '😁',
    category: 'people',
    name: 'grin',
    description: 'Grinning Face with Smiling Eyes',
    skinVariations: false
  },
  joy: {
    keywords: ['face', 'cry', 'tears', 'weep', 'happy', 'happytears', 'haha'],
    char: '😂',
    category: 'people',
    name: 'joy',
    description: 'Face with Tears of Joy',
    skinVariations: false
  },
  rofl: {
    keywords: ['face', 'rolling', 'floor', 'laughing', 'lol', 'haha'],
    char: '🤣',
    category: 'people',
    name: 'rofl',
    description: 'Rofl Face',
    skinVariations: false
  },
  partying: {
    keywords: ['face', 'celebration', 'woohoo'],
    char: '🥳',
    category: 'people',
    name: 'partying',
    description: 'Partying Face',
    skinVariations: false
  },
  smiley: {
    keywords: ['face', 'happy', 'joy', 'haha', ':D', ':)', 'smile', 'funny'],
    char: '😃',
    category: 'people',
    name: 'smiley',
    description: 'Smiling Face with Open Mouth',
    skinVariations: false
  },
  smile: {
    keywords: ['face', 'happy', 'joy', 'funny', 'haha', 'laugh', 'like', ':D', ':)'],
    char: '😄',
    category: 'people',
    name: 'smile',
    description: 'Smiling Face with Open Mouth and Smiling Eyes',
    skinVariations: false
  },
  sweat_smile: {
    keywords: ['face', 'hot', 'happy', 'laugh', 'sweat', 'smile', 'relief'],
    char: '😅',
    category: 'people',
    name: 'sweat_smile',
    description: 'Smiling Face with Open Mouth and Cold Sweat',
    skinVariations: false
  },
  laughing: {
    keywords: ['happy', 'joy', 'lol', 'satisfied', 'haha', 'face', 'glad', 'XD', 'laugh'],
    char: '😆',
    category: 'people',
    name: 'laughing',
    description: 'Smiling Face with Open Mouth and Tightly-Closed Eyes',
    skinVariations: false
  },
  innocent: {
    keywords: ['face', 'angel', 'heaven', 'halo'],
    char: '😇',
    category: 'people',
    name: 'innocent',
    description: 'Smiling Face with Halo',
    skinVariations: false
  },
  wink: {
    keywords: ['face', 'happy', 'mischievous', 'secret', ';)', 'smile', 'eye'],
    char: '😉',
    category: 'people',
    name: 'wink',
    description: 'Winking Face',
    skinVariations: false
  },
  blush: {
    keywords: ['face', 'smile', 'happy', 'flushed', 'crush', 'embarrassed', 'shy', 'joy'],
    char: '😊',
    category: 'people',
    name: 'blush',
    description: 'Smiling Face with Smiling Eyes',
    skinVariations: false
  },
  slightly_smiling_face: {
    keywords: ['face', 'smile'],
    char: '🙂',
    category: 'people',
    name: 'slightly_smiling_face',
    description: 'Slightly Smiling Face',
    skinVariations: false
  },
  upside_down_face: {
    keywords: ['face', 'flipped', 'silly', 'smile'],
    char: '🙃',
    category: 'people',
    name: 'upside_down_face',
    description: 'Upside-Down Face',
    skinVariations: false
  },
  relaxed: {
    keywords: ['face', 'blush', 'massage', 'happiness'],
    char: '☺️',
    category: 'people',
    name: 'relaxed',
    description: 'White Smiling Face',
    skinVariations: false
  },
  yum: {
    keywords: [
      'happy',
      'joy',
      'tongue',
      'smile',
      'face',
      'silly',
      'yummy',
      'nom',
      'delicious',
      'savouring'
    ],
    char: '😋',
    category: 'people',
    name: 'yum',
    description: 'Face Savouring Delicious Food',
    skinVariations: false
  },
  relieved: {
    keywords: ['face', 'relaxed', 'phew', 'massage', 'happiness'],
    char: '😌',
    category: 'people',
    name: 'relieved',
    description: 'Relieved Face',
    skinVariations: false
  },
  heart_eyes: {
    keywords: ['face', 'love', 'like', 'affection', 'valentines', 'infatuation', 'crush', 'heart'],
    char: '😍',
    category: 'people',
    name: 'heart_eyes',
    description: 'Smiling Face with Heart-Shaped Eyes',
    skinVariations: false
  },
  smiling_face_with_three_hearts: {
    keywords: [
      'face',
      'love',
      'like',
      'affection',
      'valentines',
      'infatuation',
      'crush',
      'hearts',
      'adore'
    ],
    char: '🥰',
    category: 'people',
    name: 'smiling_face_with_three_hearts',
    description: 'Smiling Face With Three Hearts',
    skinVariations: false
  },
  kissing_heart: {
    keywords: ['face', 'love', 'like', 'affection', 'valentines', 'infatuation', 'kiss'],
    char: '😘',
    category: 'people',
    name: 'kissing_heart',
    description: 'Face Throwing a Kiss',
    skinVariations: false
  },
  kissing: {
    keywords: ['love', 'like', 'face', '3', 'valentines', 'infatuation', 'kiss'],
    char: '😗',
    category: 'people',
    name: 'kissing',
    description: 'Kissing Face',
    skinVariations: false
  },
  kissing_smiling_eyes: {
    keywords: ['face', 'affection', 'valentines', 'infatuation', 'kiss'],
    char: '😙',
    category: 'people',
    name: 'kissing_smiling_eyes',
    description: 'Kissing Face with Smiling Eyes',
    skinVariations: false
  },
  kissing_closed_eyes: {
    keywords: ['face', 'love', 'like', 'affection', 'valentines', 'infatuation', 'kiss'],
    char: '😚',
    category: 'people',
    name: 'kissing_closed_eyes',
    description: 'Kissing Face with Closed Eyes',
    skinVariations: false
  },
  stuck_out_tongue_winking_eye: {
    keywords: ['face', 'prank', 'childish', 'playful', 'mischievous', 'smile', 'wink', 'tongue'],
    char: '😜',
    category: 'people',
    name: 'stuck_out_tongue_winking_eye',
    description: 'Face with Stuck-out Tongue and Winking Eye',
    skinVariations: false
  },
  zany: {
    keywords: ['face', 'goofy', 'crazy'],
    char: '🤪',
    category: 'people',
    name: 'zany',
    description: 'Zany Face',
    skinVariations: false
  },
  raised_eyebrow: {
    keywords: ['face', 'distrust', 'scepticism', 'disapproval', 'disbelief', 'surprise'],
    char: '🤨',
    category: 'people',
    name: 'raised_eyebrow',
    description: 'Raised Eyebrow Face',
    skinVariations: false
  },
  monocle: {
    keywords: ['face', 'stuffy', 'wealthy'],
    char: '🧐',
    category: 'people',
    name: 'monocle',
    description: 'Monocle Face',
    skinVariations: false
  },
  stuck_out_tongue_closed_eyes: {
    keywords: ['face', 'prank', 'playful', 'mischievous', 'smile', 'tongue'],
    char: '😝',
    category: 'people',
    name: 'stuck_out_tongue_closed_eyes',
    description: 'Face with Stuck-out Tongue and Tightly-Closed Eyes',
    skinVariations: false
  },
  stuck_out_tongue: {
    keywords: ['face', 'prank', 'childish', 'playful', 'mischievous', 'smile', 'tongue'],
    char: '😛',
    category: 'people',
    name: 'stuck_out_tongue',
    description: 'Face with Stuck-out Tongue',
    skinVariations: false
  },
  money_mouth_face: {
    keywords: ['face', 'rich', 'dollar', 'money'],
    char: '🤑',
    category: 'people',
    name: 'money_mouth_face',
    description: 'Money-Mouth Face',
    skinVariations: false
  },
  nerd_face: {
    keywords: ['face', 'nerdy', 'geek', 'dork'],
    char: '🤓',
    category: 'people',
    name: 'nerd_face',
    description: 'Nerd Face',
    skinVariations: false
  },
  sunglasses: {
    keywords: ['face', 'cool', 'smile', 'summer', 'beach', 'sunglass'],
    char: '😎',
    category: 'people',
    name: 'sunglasses',
    description: 'Smiling Face with Sunglasses',
    skinVariations: false
  },
  star_struck: {
    keywords: ['face', 'smile', 'starry', 'eyes', 'grinning'],
    char: '🤩',
    category: 'people',
    name: 'star_struck',
    description: 'Star Struck Face',
    skinVariations: false
  },
  clown_face: {
    keywords: ['face'],
    char: '🤡',
    category: 'people',
    name: 'clown_face',
    description: 'Clown Face',
    skinVariations: false
  },
  cowboy_hat_face: {
    keywords: ['face', 'cowgirl', 'hat'],
    char: '🤠',
    category: 'people',
    name: 'cowboy_hat_face',
    description: 'Cowboy Hat Face',
    skinVariations: false
  },
  hugs: {
    keywords: ['face', 'smile', 'hug'],
    char: '🤗',
    category: 'people',
    name: 'hugs',
    description: 'Hugs Face',
    skinVariations: false
  },
  smirk: {
    keywords: ['face', 'smile', 'mean', 'prank', 'smug', 'sarcasm'],
    char: '😏',
    category: 'people',
    name: 'smirk',
    description: 'Smirking Face',
    skinVariations: false
  },
  no_mouth: {
    keywords: ['face', 'hellokitty'],
    char: '😶',
    category: 'people',
    name: 'no_mouth',
    description: 'Face Without Mouth',
    skinVariations: false
  },
  neutral_face: {
    keywords: ['indifference', 'meh', ':|', 'neutral'],
    char: '😐',
    category: 'people',
    name: 'neutral_face',
    description: 'Neutral Face',
    skinVariations: false
  },
  expressionless: {
    keywords: ['face', 'indifferent', '-_-', 'meh', 'deadpan'],
    char: '😑',
    category: 'people',
    name: 'expressionless',
    description: 'Expressionless Face',
    skinVariations: false
  },
  unamused: {
    keywords: [
      'indifference',
      'bored',
      'straight face',
      'serious',
      'sarcasm',
      'unimpressed',
      'skeptical',
      'dubious',
      'side_eye'
    ],
    char: '😒',
    category: 'people',
    name: 'unamused',
    description: 'Unamused Face',
    skinVariations: false
  },
  roll_eyes: {
    keywords: ['face', 'eyeroll', 'frustrated'],
    char: '🙄',
    category: 'people',
    name: 'roll_eyes',
    description: 'Roll Eyes Face',
    skinVariations: false
  },
  thinking: {
    keywords: ['face', 'hmmm', 'think', 'consider'],
    char: '🤔',
    category: 'people',
    name: 'thinking',
    description: 'Thinking Face',
    skinVariations: false
  },
  lying_face: {
    keywords: ['face', 'lie', 'pinocchio'],
    char: '🤥',
    category: 'people',
    name: 'lying_face',
    description: 'Lying Face',
    skinVariations: false
  },
  hand_over_mouth: {
    keywords: ['face', 'whoops', 'shock', 'surprise'],
    char: '🤭',
    category: 'people',
    name: 'hand_over_mouth',
    description: 'Hand Over Mouth Face',
    skinVariations: false
  },
  shushing: {
    keywords: ['face', 'quiet', 'shhh'],
    char: '🤫',
    category: 'people',
    name: 'shushing',
    description: 'Shushing Face',
    skinVariations: false
  },
  symbols_over_mouth: {
    keywords: ['face', 'swearing', 'cursing', 'cussing', 'profanity', 'expletive'],
    char: '🤬',
    category: 'people',
    name: 'symbols_over_mouth',
    description: 'Symbols Over Mouth Face',
    skinVariations: false
  },
  exploding_head: {
    keywords: ['face', 'shocked', 'mind', 'blown'],
    char: '🤯',
    category: 'people',
    name: 'exploding_head',
    description: 'Shocked Face with Exploding Head',
    skinVariations: false
  },
  flushed: {
    keywords: ['face', 'blush', 'shy', 'flattered'],
    char: '😳',
    category: 'people',
    name: 'flushed',
    description: 'Flushed Face',
    skinVariations: false
  },
  disappointed: {
    keywords: ['face', 'sad', 'upset', 'depressed', ':('],
    char: '😞',
    category: 'people',
    name: 'disappointed',
    description: 'Disappointed Face',
    skinVariations: false
  },
  worried: {
    keywords: ['face', 'concern', 'nervous', ':('],
    char: '😟',
    category: 'people',
    name: 'worried',
    description: 'Worried Face',
    skinVariations: false
  },
  angry: {
    keywords: ['mad', 'face', 'annoyed', 'frustrated'],
    char: '😠',
    category: 'people',
    name: 'angry',
    description: 'Angry Face',
    skinVariations: false
  },
  rage: {
    keywords: ['angry', 'mad', 'hate', 'despise'],
    char: '😡',
    category: 'people',
    name: 'rage',
    description: 'Pouting Face',
    skinVariations: false
  },
  pensive: {
    keywords: ['face', 'sad', 'depressed', 'upset'],
    char: '😔',
    category: 'people',
    name: 'pensive',
    description: 'Pensive Face',
    skinVariations: false
  },
  confused: {
    keywords: ['face', 'indifference', 'huh', 'weird', 'hmmm', ':/'],
    char: '😕',
    category: 'people',
    name: 'confused',
    description: 'Confused Face',
    skinVariations: false
  },
  slightly_frowning_face: {
    keywords: ['face', 'frowning', 'disappointed', 'sad', 'upset'],
    char: '🙁',
    category: 'people',
    name: 'slightly_frowning_face',
    description: 'Slightly Frowning Face',
    skinVariations: false
  },
  frowning_face: {
    keywords: ['face', 'sad', 'upset', 'frown'],
    char: '☹',
    category: 'people',
    name: 'frowning_face',
    description: 'Frowning Face',
    skinVariations: false
  },
  persevere: {
    keywords: ['face', 'sick', 'no', 'upset', 'oops'],
    char: '😣',
    category: 'people',
    name: 'persevere',
    description: 'Persevering Face',
    skinVariations: false
  },
  confounded: {
    keywords: ['face', 'confused', 'sick', 'unwell', 'oops', ':S'],
    char: '😖',
    category: 'people',
    name: 'confounded',
    description: 'Confounded Face',
    skinVariations: false
  },
  tired_face: {
    keywords: ['sick', 'whine', 'upset', 'frustrated'],
    char: '😫',
    category: 'people',
    name: 'tired_face',
    description: 'Tired Face',
    skinVariations: false
  },
  weary: {
    keywords: ['face', 'tired', 'sleepy', 'sad', 'frustrated', 'upset'],
    char: '😩',
    category: 'people',
    name: 'weary',
    description: 'Weary Face',
    skinVariations: false
  },
  pleading: {
    keywords: ['face', 'begging', 'mercy'],
    char: '🥺',
    category: 'people',
    name: 'pleading',
    description: 'Pleading Face',
    skinVariations: false
  },
  triumph: {
    keywords: ['face', 'gas', 'phew', 'proud', 'pride'],
    char: '😤',
    category: 'people',
    name: 'triumph',
    description: 'Face with Look of Triumph',
    skinVariations: false
  },
  open_mouth: {
    keywords: ['face', 'surprise', 'impressed', 'wow', 'whoa', ':O'],
    char: '😮',
    category: 'people',
    name: 'open_mouth',
    description: 'Face with Open Mouth',
    skinVariations: false
  },
  scream: {
    keywords: ['face', 'munch', 'scared', 'omg'],
    char: '😱',
    category: 'people',
    name: 'scream',
    description: 'Face Screaming in Fear',
    skinVariations: false
  },
  fearful: {
    keywords: ['face', 'scared', 'terrified', 'nervous', 'oops', 'huh'],
    char: '😨',
    category: 'people',
    name: 'fearful',
    description: 'Fearful Face',
    skinVariations: false
  },
  cold_sweat: {
    keywords: ['face', 'nervous', 'sweat'],
    char: '😰',
    category: 'people',
    name: 'cold_sweat',
    description: 'Face with Open Mouth and Cold Sweat',
    skinVariations: false
  },
  hushed: {
    keywords: ['face', 'woo', 'shh'],
    char: '😯',
    category: 'people',
    name: 'hushed',
    description: 'Hushed Face',
    skinVariations: false
  },
  frowning: {
    keywords: ['face', 'aw', 'what'],
    char: '😦',
    category: 'people',
    name: 'frowning',
    description: 'Frowning Face with Open Mouth',
    skinVariations: false
  },
  anguished: {
    keywords: ['face', 'stunned', 'nervous'],
    char: '😧',
    category: 'people',
    name: 'anguished',
    description: 'Anguished Face',
    skinVariations: false
  },
  cry: {
    keywords: ['face', 'tears', 'sad', 'depressed', 'upset', ":'("],
    char: '😢',
    category: 'people',
    name: 'cry',
    description: 'Crying Face',
    skinVariations: false
  },
  disappointed_relieved: {
    keywords: ['face', 'phew', 'sweat', 'nervous'],
    char: '😥',
    category: 'people',
    name: 'disappointed_relieved',
    description: 'Disappointed but Relieved Face',
    skinVariations: false
  },
  drooling_face: {
    keywords: ['face'],
    char: '🤤',
    category: 'people',
    name: 'drooling_face',
    description: 'Drooling Face',
    skinVariations: false
  },
  sleepy: {
    keywords: ['face', 'tired', 'rest', 'nap'],
    char: '😪',
    category: 'people',
    name: 'sleepy',
    description: 'Sleepy Face',
    skinVariations: false
  },
  sweat: {
    keywords: ['face', 'hot', 'sad', 'tired', 'exercise'],
    char: '😓',
    category: 'people',
    name: 'sweat',
    description: 'Face with Cold Sweat',
    skinVariations: false
  },
  hot: {
    keywords: ['face', 'feverish', 'heat', 'red', 'sweating'],
    char: '🥵',
    category: 'people',
    name: 'hot',
    description: 'Hot Face',
    skinVariations: false
  },
  cold: {
    keywords: ['face', 'blue', 'freezing', 'frozen', 'frostbite', 'icicles'],
    char: '🥶',
    category: 'people',
    name: 'cold',
    description: 'Cold Face',
    skinVariations: false
  },
  sob: {
    keywords: ['face', 'cry', 'tears', 'sad', 'upset', 'depressed'],
    char: '😭',
    category: 'people',
    name: 'sob',
    description: 'Loudly Crying Face',
    skinVariations: false
  },
  dizzy_face: {
    keywords: ['spent', 'unconscious', 'xox', 'dizzy'],
    char: '😵',
    category: 'people',
    name: 'dizzy_face',
    description: 'Dizzy Face',
    skinVariations: false
  },
  astonished: {
    keywords: ['face', 'xox', 'surprised', 'poisoned'],
    char: '😲',
    category: 'people',
    name: 'astonished',
    description: 'Astonished Face',
    skinVariations: false
  },
  zipper_mouth_face: {
    keywords: ['face', 'sealed', 'zipper', 'secret'],
    char: '🤐',
    category: 'people',
    name: 'zipper_mouth_face',
    description: 'Zipper-Mouth Face',
    skinVariations: false
  },
  nauseated_face: {
    keywords: ['face', 'vomit', 'gross', 'green', 'sick', 'throw up', 'ill'],
    char: '🤢',
    category: 'people',
    name: 'nauseated_face',
    description: 'Nauseated Face',
    skinVariations: false
  },
  sneezing_face: {
    keywords: ['face', 'gesundheit', 'sneeze', 'sick', 'allergy'],
    char: '🤧',
    category: 'people',
    name: 'sneezing_face',
    description: 'Sneezing Face',
    skinVariations: false
  },
  vomiting: {
    keywords: ['face', 'sick'],
    char: '🤮',
    category: 'people',
    name: 'vomiting',
    description: 'Vomiting Face',
    skinVariations: false
  },
  mask: {
    keywords: ['face', 'sick', 'ill', 'disease'],
    char: '😷',
    category: 'people',
    name: 'mask',
    description: 'Face with Medical Mask',
    skinVariations: false
  },
  face_with_thermometer: {
    keywords: ['sick', 'temperature', 'thermometer', 'cold', 'fever'],
    char: '🤒',
    category: 'people',
    name: 'face_with_thermometer',
    description: 'Face with Thermometer',
    skinVariations: false
  },
  face_with_head_bandage: {
    keywords: ['injured', 'clumsy', 'bandage', 'hurt'],
    char: '🤕',
    category: 'people',
    name: 'face_with_head_bandage',
    description: 'Face with Head-Bandage',
    skinVariations: false
  },
  woozy: {
    keywords: ['face', 'dizzy', 'intoxicated', 'tipsy', 'wavy'],
    char: '🥴',
    category: 'people',
    name: 'woozy',
    description: 'Woozy Face',
    skinVariations: false
  },
  sleeping: {
    keywords: ['face', 'tired', 'sleepy', 'night', 'zzz'],
    char: '😴',
    category: 'people',
    name: 'sleeping',
    description: 'Sleeping Face',
    skinVariations: false
  },
  zzz: {
    keywords: ['sleepy', 'tired', 'dream'],
    char: '💤',
    category: 'people',
    name: 'zzz',
    description: 'Sleeping Symbol',
    skinVariations: false
  },
  poop: {
    keywords: ['hankey', 'shitface', 'fail', 'turd', 'shit'],
    char: '💩',
    category: 'people',
    name: 'poop',
    description: 'Poop Hankey',
    skinVariations: false
  },
  smiling_imp: {
    keywords: ['devil', 'horns'],
    char: '😈',
    category: 'people',
    name: 'smiling_imp',
    description: 'Smiling Face with Horns',
    skinVariations: false
  },
  imp: {
    keywords: ['devil', 'angry', 'horns'],
    char: '👿',
    category: 'people',
    name: 'imp',
    description: 'Imp',
    skinVariations: false
  },
  japanese_ogre: {
    keywords: [
      'monster',
      'red',
      'mask',
      'halloween',
      'scary',
      'creepy',
      'devil',
      'demon',
      'japanese',
      'ogre'
    ],
    char: '👹',
    category: 'people',
    name: 'japanese_ogre',
    description: 'Japanese Ogre',
    skinVariations: false
  },
  japanese_goblin: {
    keywords: ['red', 'evil', 'mask', 'monster', 'scary', 'creepy', 'japanese', 'goblin'],
    char: '👺',
    category: 'people',
    name: 'japanese_goblin',
    description: 'Japanese Goblin',
    skinVariations: false
  },
  skull: {
    keywords: ['dead', 'skeleton', 'creepy', 'death'],
    char: '💀',
    category: 'people',
    name: 'skull',
    description: 'Skull',
    skinVariations: false
  },
  ghost: {
    keywords: ['halloween', 'spooky', 'scary'],
    char: '👻',
    category: 'people',
    name: 'ghost',
    description: 'Ghost',
    skinVariations: false
  },
  alien: {
    keywords: ['UFO', 'paul', 'weird', 'outer_space'],
    char: '👽',
    category: 'people',
    name: 'alien',
    description: 'Extraterrestrial Alien',
    skinVariations: false
  },
  robot: {
    keywords: ['computer', 'machine', 'bot'],
    char: '🤖',
    category: 'people',
    name: 'robot',
    description: 'Robot Computer',
    skinVariations: false
  },
  smiley_cat: {
    keywords: ['animal', 'cats', 'happy', 'smile'],
    char: '😺',
    category: 'people',
    name: 'smiley_cat',
    description: 'Smiling Cat Face with Open Mouth',
    skinVariations: false
  },
  smile_cat: {
    keywords: ['animal', 'cats', 'smile'],
    char: '😸',
    category: 'people',
    name: 'smile_cat',
    description: 'Grinning Cat Face with Smiling Eyes',
    skinVariations: false
  },
  joy_cat: {
    keywords: ['animal', 'cats', 'haha', 'happy', 'tears'],
    char: '😹',
    category: 'people',
    name: 'joy_cat',
    description: 'Cat Face with Tears of Joy',
    skinVariations: false
  },
  heart_eyes_cat: {
    keywords: ['animal', 'love', 'like', 'affection', 'cats', 'valentines', 'heart'],
    char: '😻',
    category: 'people',
    name: 'heart_eyes_cat',
    description: 'Smiling Cat Face with Heart-Shaped Eyes',
    skinVariations: false
  },
  smirk_cat: {
    keywords: ['animal', 'cats', 'smirk'],
    char: '😼',
    category: 'people',
    name: 'smirk_cat',
    description: 'Cat Face with Wry Smile',
    skinVariations: false
  },
  kissing_cat: {
    keywords: ['animal', 'cats', 'kiss'],
    char: '😽',
    category: 'people',
    name: 'kissing_cat',
    description: 'Kissing Cat Face with Closed Eyes',
    skinVariations: false
  },
  scream_cat: {
    keywords: ['animal', 'cats', 'munch', 'scared', 'scream'],
    char: '🙀',
    category: 'people',
    name: 'scream_cat',
    description: 'Weary Cat Face',
    skinVariations: false
  },
  crying_cat_face: {
    keywords: ['animal', 'tears', 'weep', 'sad', 'cats', 'upset', 'cry'],
    char: '😿',
    category: 'people',
    name: 'crying_cat_face',
    description: 'Crying Cat Face',
    skinVariations: false
  },
  pouting_cat: {
    keywords: ['animal', 'cats'],
    char: '😾',
    category: 'people',
    name: 'pouting_cat',
    description: 'Pouting Cat Face',
    skinVariations: false
  },
  palms_up: {
    keywords: ['hands', 'gesture', 'cupped', 'prayer'],
    char: '🤲',
    category: 'people',
    name: 'palms_up',
    description: 'Palms Up Hands',
    skinVariations: true
  },
  raised_hands: {
    keywords: ['gesture', 'hooray', 'yea', 'celebration', 'hands'],
    char: '🙌',
    category: 'people',
    name: 'raised_hands',
    description: 'Person Raising Both Hands in Celebration',
    skinVariations: true
  },
  clap: {
    keywords: ['hands', 'praise', 'applause', 'congrats', 'yay'],
    char: '👏',
    category: 'people',
    name: 'clap',
    description: 'Clapping Hands Sign',
    skinVariations: true
  },
  wave: {
    keywords: ['hands', 'gesture', 'goodbye', 'solong', 'farewell', 'hello', 'hi', 'palm'],
    char: '👋',
    category: 'people',
    name: 'wave',
    description: 'Waving Hand Sign',
    skinVariations: true
  },
  call_me_hand: {
    keywords: ['hands', 'gesture'],
    char: '🤙',
    category: 'people',
    name: 'call_me_hand',
    description: 'Call Me Hand',
    skinVariations: true
  },
  '+1': {
    keywords: ['thumbsup', 'yes', 'awesome', 'good', 'agree', 'accept', 'cool', 'hand', 'like'],
    char: '👍',
    category: 'people',
    name: '+1',
    description: 'Thumbs Up Sign',
    skinVariations: true
  },
  '-1': {
    keywords: ['thumbsdown', 'no', 'dislike', 'hand'],
    char: '👎',
    category: 'people',
    name: '-1',
    description: 'Thumbs Down Sign',
    skinVariations: true
  },
  facepunch: {
    keywords: ['angry', 'violence', 'fist', 'hit', 'attack', 'hand'],
    char: '👊',
    category: 'people',
    name: 'facepunch',
    description: 'Fisted Hand Sign',
    skinVariations: true
  },
  fist: {
    keywords: ['fingers', 'hand', 'grasp'],
    char: '✊',
    category: 'people',
    name: 'fist',
    description: 'Raised Fist',
    skinVariations: true
  },
  fist_left: {
    keywords: ['hand', 'fistbump'],
    char: '🤛',
    category: 'people',
    name: 'fist_left',
    description: 'Fist Left Hand',
    skinVariations: true
  },
  fist_right: {
    keywords: ['hand', 'fistbump'],
    char: '🤜',
    category: 'people',
    name: 'fist_right',
    description: 'Fist Right Hand',
    skinVariations: true
  },
  v: {
    keywords: ['fingers', 'ohyeah', 'hand', 'peace', 'victory', 'two'],
    char: '✌',
    category: 'people',
    name: 'v',
    description: 'Victory Hand',
    skinVariations: true
  },
  ok_hand: {
    keywords: ['fingers', 'limbs', 'perfect', 'ok', 'okay'],
    char: '👌',
    category: 'people',
    name: 'ok_hand',
    description: 'Ok Hand Sign',
    skinVariations: true
  },
  raised_hand: {
    keywords: ['fingers', 'stop', 'highfive', 'palm', 'ban'],
    char: '✋',
    category: 'people',
    name: 'raised_hand',
    description: 'Raised Hand Fingers',
    skinVariations: true
  },
  raised_back_of_hand: {
    keywords: ['fingers', 'raised', 'backhand'],
    char: '🤚',
    category: 'people',
    name: 'raised_back_of_hand',
    description: 'Raised Back of Hand',
    skinVariations: true
  },
  open_hands: {
    keywords: ['fingers', 'butterfly', 'hands', 'open'],
    char: '👐',
    category: 'people',
    name: 'open_hands',
    description: 'Open Hands Sign',
    skinVariations: true
  },
  muscle: {
    keywords: ['arm', 'flex', 'hand', 'summer', 'strong', 'biceps'],
    char: '💪',
    category: 'people',
    name: 'muscle',
    description: 'Flexed Biceps',
    skinVariations: true
  },
  pray: {
    keywords: ['please', 'hope', 'wish', 'namaste', 'highfive'],
    char: '🙏',
    category: 'people',
    name: 'pray',
    description: 'Person with Folded Hands',
    skinVariations: true
  },
  foot: {
    keywords: ['kick', 'stomp'],
    char: '🦶',
    category: 'people',
    name: 'foot',
    description: 'Foot Kick',
    skinVariations: true
  },
  leg: {
    keywords: ['kick', 'limb'],
    char: '🦵',
    category: 'people',
    name: 'leg',
    description: 'Leg Kick',
    skinVariations: true
  },
  handshake: {
    keywords: ['agreement', 'shake'],
    char: '🤝',
    category: 'people',
    name: 'handshake',
    description: 'Handshake',
    skinVariations: false
  },
  point_up: {
    keywords: ['hand', 'fingers', 'direction', 'up'],
    char: '☝',
    category: 'people',
    name: 'point_up',
    description: 'White Up Pointing Index',
    skinVariations: true
  },
  point_up_2: {
    keywords: ['fingers', 'hand', 'direction', 'up'],
    char: '👆',
    category: 'people',
    name: 'point_up_2',
    description: 'White Up Pointing Backhand Index',
    skinVariations: true
  },
  point_down: {
    keywords: ['fingers', 'hand', 'direction', 'down'],
    char: '👇',
    category: 'people',
    name: 'point_down',
    description: 'White Down Pointing Backhand Index',
    skinVariations: true
  },
  point_left: {
    keywords: ['direction', 'fingers', 'hand', 'left'],
    char: '👈',
    category: 'people',
    name: 'point_left',
    description: 'White Left Pointing Backhand Index',
    skinVariations: true
  },
  point_right: {
    keywords: ['fingers', 'hand', 'direction', 'right'],
    char: '👉',
    category: 'people',
    name: 'point_right',
    description: 'White Right Pointing Backhand Index',
    skinVariations: true
  },
  fu: {
    keywords: ['hand', 'fingers', 'rude', 'middle', 'flipping'],
    char: '🖕',
    category: 'people',
    name: 'fu',
    description: 'Fu Hand',
    skinVariations: true
  },
  raised_hand_with_fingers_splayed: {
    keywords: ['hand', 'fingers', 'palm'],
    char: '🖐',
    category: 'people',
    name: 'raised_hand_with_fingers_splayed',
    description: 'Raised Hand with Fingers Splayed',
    skinVariations: true
  },
  love_you: {
    keywords: ['hand', 'fingers', 'gesture'],
    char: '🤟',
    category: 'people',
    name: 'love_you',
    description: 'Love You Hand',
    skinVariations: true
  },
  metal: {
    keywords: ['hand', 'fingers', 'evil_eye', 'sign_of_horns', 'rock_on'],
    char: '🤘',
    category: 'people',
    name: 'metal',
    description: 'Metal Hand',
    skinVariations: true
  },
  crossed_fingers: {
    keywords: ['good', 'lucky'],
    char: '🤞',
    category: 'people',
    name: 'crossed_fingers',
    description: 'Hand with Index and Middle Fingers Crossed',
    skinVariations: true
  },
  vulcan_salute: {
    keywords: ['hand', 'fingers', 'spock', 'star trek'],
    char: '🖖',
    category: 'people',
    name: 'vulcan_salute',
    description: 'Vulcan Salute Hand',
    skinVariations: true
  },
  writing_hand: {
    keywords: ['lower_left_ballpoint_pen', 'stationery', 'write', 'compose'],
    char: '✍',
    category: 'people',
    name: 'writing_hand',
    description: 'Writing Hand',
    skinVariations: true
  },
  selfie: {
    keywords: ['camera', 'phone'],
    char: '🤳',
    category: 'people',
    name: 'selfie',
    description: 'Selfie',
    skinVariations: true
  },
  nail_care: {
    keywords: ['beauty', 'manicure', 'finger', 'fashion', 'nail'],
    char: '💅',
    category: 'people',
    name: 'nail_care',
    description: 'Nail Polish',
    skinVariations: true
  },
  lips: {
    keywords: ['mouth', 'kiss'],
    char: '👄',
    category: 'people',
    name: 'lips',
    description: 'Mouth',
    skinVariations: false
  },
  tooth: {
    keywords: ['teeth', 'dentist'],
    char: '🦷',
    category: 'people',
    name: 'tooth',
    description: 'Tooth Teeth',
    skinVariations: false
  },
  tongue: {
    keywords: ['mouth', 'playful'],
    char: '👅',
    category: 'people',
    name: 'tongue',
    description: 'Tongue',
    skinVariations: false
  },
  ear: {
    keywords: ['face', 'hear', 'sound', 'listen'],
    char: '👂',
    category: 'people',
    name: 'ear',
    description: 'Ear',
    skinVariations: true
  },
  nose: {
    keywords: ['smell', 'sniff'],
    char: '👃',
    category: 'people',
    name: 'nose',
    description: 'Nose',
    skinVariations: true
  },
  eye: {
    keywords: ['face', 'look', 'see', 'watch', 'stare'],
    char: '👁',
    category: 'people',
    name: 'eye',
    description: 'Eye',
    skinVariations: false
  },
  eyes: {
    keywords: ['look', 'watch', 'stalk', 'peek', 'see'],
    char: '👀',
    category: 'people',
    name: 'eyes',
    description: 'Eyes',
    skinVariations: false
  },
  brain: {
    keywords: ['smart', 'intelligent'],
    char: '🧠',
    category: 'people',
    name: 'brain',
    description: 'Brain',
    skinVariations: false
  },
  bust_in_silhouette: {
    keywords: ['user', 'person', 'human'],
    char: '👤',
    category: 'people',
    name: 'bust_in_silhouette',
    description: 'Bust in Silhouette',
    skinVariations: false
  },
  busts_in_silhouette: {
    keywords: ['user', 'person', 'human', 'group', 'team'],
    char: '👥',
    category: 'people',
    name: 'busts_in_silhouette',
    description: 'Busts in Silhouette',
    skinVariations: false
  },
  speaking_head: {
    keywords: ['user', 'person', 'human', 'sing', 'say', 'talk'],
    char: '🗣',
    category: 'people',
    name: 'speaking_head',
    description: 'Speaking Head User',
    skinVariations: false
  },
  baby: {
    keywords: ['child', 'boy', 'girl', 'toddler'],
    char: '👶',
    category: 'people',
    name: 'baby',
    description: 'Baby',
    skinVariations: true
  },
  child: {
    keywords: ['gender-neutral', 'young'],
    char: '🧒',
    category: 'people',
    name: 'child',
    description: 'Child',
    skinVariations: true
  },
  boy: {
    keywords: ['man', 'male', 'guy', 'teenager'],
    char: '👦',
    category: 'people',
    name: 'boy',
    description: 'Boy',
    skinVariations: true
  },
  girl: {
    keywords: ['female', 'woman', 'teenager'],
    char: '👧',
    category: 'people',
    name: 'girl',
    description: 'Girl',
    skinVariations: true
  },
  adult: {
    keywords: ['gender-neutral', 'person'],
    char: '🧑',
    category: 'people',
    name: 'adult',
    description: 'Adult',
    skinVariations: true
  },
  man: {
    keywords: ['mustache', 'father', 'dad', 'guy', 'classy', 'sir', 'moustache'],
    char: '👨',
    category: 'people',
    name: 'man',
    description: 'Man',
    skinVariations: true
  },
  woman: {
    keywords: ['female', 'girls', 'lady'],
    char: '👩',
    category: 'people',
    name: 'woman',
    description: 'Woman',
    skinVariations: true
  },
  blonde_woman: {
    keywords: ['woman', 'female', 'girl', 'blonde', 'person'],
    char: '👱‍♀️',
    category: 'people',
    name: 'blonde_woman',
    description: 'Blonde Woman',
    skinVariations: true
  },
  blonde_man: {
    keywords: ['man', 'male', 'boy', 'blonde', 'guy', 'person'],
    char: '👱',
    category: 'people',
    name: 'blonde_man',
    description: 'Blonde Man',
    skinVariations: true
  },
  bearded_person: {
    keywords: ['person', 'bewhiskered'],
    char: '🧔',
    category: 'people',
    name: 'bearded_person',
    description: 'Bearded Person',
    skinVariations: true
  },
  older_adult: {
    keywords: ['human', 'elder', 'senior', 'gender-neutral'],
    char: '🧓',
    category: 'people',
    name: 'older_adult',
    description: 'Older Adult',
    skinVariations: true
  },
  older_man: {
    keywords: ['human', 'male', 'men', 'old', 'elder', 'senior'],
    char: '👴',
    category: 'people',
    name: 'older_man',
    description: 'Older Man',
    skinVariations: true
  },
  older_woman: {
    keywords: ['human', 'female', 'women', 'lady', 'old', 'elder', 'senior'],
    char: '👵',
    category: 'people',
    name: 'older_woman',
    description: 'Older Woman',
    skinVariations: true
  },
  man_with_gua_pi_mao: {
    keywords: ['male', 'boy', 'chinese'],
    char: '👲',
    category: 'people',
    name: 'man_with_gua_pi_mao',
    description: 'Man with Gua Pi Mao',
    skinVariations: true
  },
  woman_with_headscarf: {
    keywords: ['female', 'hijab', 'mantilla', 'tichel'],
    char: '🧕',
    category: 'people',
    name: 'woman_with_headscarf',
    description: 'Woman With Headscarf Female',
    skinVariations: true
  },
  woman_with_turban: {
    keywords: ['female', 'indian', 'hinduism', 'arabs', 'woman'],
    char: '👳‍♀️',
    category: 'people',
    name: 'woman_with_turban',
    description: 'Woman With Turban Female',
    skinVariations: true
  },
  man_with_turban: {
    keywords: ['male', 'indian', 'hinduism', 'arabs'],
    char: '👳',
    category: 'people',
    name: 'man_with_turban',
    description: 'Man with Turban',
    skinVariations: true
  },
  policewoman: {
    keywords: ['woman', 'police', 'law', 'legal', 'enforcement', 'arrest', '911', 'female'],
    char: '👮‍♀️',
    category: 'people',
    name: 'policewoman',
    description: 'Policewoman',
    skinVariations: true
  },
  policeman: {
    keywords: ['man', 'police', 'law', 'legal', 'enforcement', 'arrest', '911'],
    char: '👮',
    category: 'people',
    name: 'policeman',
    description: 'Policeman',
    skinVariations: true
  },
  construction_worker_woman: {
    keywords: ['female', 'human', 'wip', 'build', 'construction', 'worker', 'labor', 'woman'],
    char: '👷‍♀️',
    category: 'people',
    name: 'construction_worker_woman',
    description: 'Construction Worker Woman Female',
    skinVariations: true
  },
  construction_worker_man: {
    keywords: ['male', 'human', 'wip', 'guy', 'build', 'construction', 'worker', 'labor'],
    char: '👷',
    category: 'people',
    name: 'construction_worker_man',
    description: 'Construction Worker Man Male',
    skinVariations: true
  },
  guardswoman: {
    keywords: ['uk', 'gb', 'british', 'female', 'royal', 'woman'],
    char: '💂‍♀️',
    category: 'people',
    name: 'guardswoman',
    description: 'Guardswoman Uk',
    skinVariations: true
  },
  guardsman: {
    keywords: ['uk', 'gb', 'british', 'male', 'guy', 'royal'],
    char: '💂',
    category: 'people',
    name: 'guardsman',
    description: 'Guardsman',
    skinVariations: true
  },
  female_detective: {
    keywords: ['human', 'spy', 'detective', 'female', 'woman'],
    char: '🕵️‍♀️',
    category: 'people',
    name: 'female_detective',
    description: 'Female Detective Human',
    skinVariations: true
  },
  male_detective: {
    keywords: ['human', 'spy', 'detective'],
    char: '🕵',
    category: 'people',
    name: 'male_detective',
    description: 'Male Detective Human',
    skinVariations: true
  },
  woman_health_worker: {
    keywords: ['doctor', 'nurse', 'therapist', 'healthcare', 'woman', 'human'],
    char: '👩‍⚕️',
    category: 'people',
    name: 'woman_health_worker',
    description: 'Woman Health Worker Doctor',
    skinVariations: true
  },
  man_health_worker: {
    keywords: ['doctor', 'nurse', 'therapist', 'healthcare', 'man', 'human'],
    char: '👨‍⚕️',
    category: 'people',
    name: 'man_health_worker',
    description: 'Man Health Worker Doctor',
    skinVariations: true
  },
  woman_farmer: {
    keywords: ['rancher', 'gardener', 'woman', 'human'],
    char: '👩‍🌾',
    category: 'people',
    name: 'woman_farmer',
    description: 'Woman Farmer Rancher',
    skinVariations: true
  },
  man_farmer: {
    keywords: ['rancher', 'gardener', 'man', 'human'],
    char: '👨‍🌾',
    category: 'people',
    name: 'man_farmer',
    description: 'Man Farmer Rancher',
    skinVariations: true
  },
  woman_cook: {
    keywords: ['chef', 'woman', 'human'],
    char: '👩‍🍳',
    category: 'people',
    name: 'woman_cook',
    description: 'Woman Cook Chef',
    skinVariations: true
  },
  man_cook: {
    keywords: ['chef', 'man', 'human'],
    char: '👨‍🍳',
    category: 'people',
    name: 'man_cook',
    description: 'Man Cook Chef',
    skinVariations: true
  },
  woman_student: {
    keywords: ['graduate', 'woman', 'human'],
    char: '👩‍🎓',
    category: 'people',
    name: 'woman_student',
    description: 'Woman Student Graduate',
    skinVariations: true
  },
  man_student: {
    keywords: ['graduate', 'man', 'human'],
    char: '👨‍🎓',
    category: 'people',
    name: 'man_student',
    description: 'Man Student Graduate',
    skinVariations: true
  },
  woman_singer: {
    keywords: ['rockstar', 'entertainer', 'woman', 'human'],
    char: '👩‍🎤',
    category: 'people',
    name: 'woman_singer',
    description: 'Woman Singer Rockstar',
    skinVariations: true
  },
  man_singer: {
    keywords: ['rockstar', 'entertainer', 'man', 'human'],
    char: '👨‍🎤',
    category: 'people',
    name: 'man_singer',
    description: 'Man Singer Rockstar',
    skinVariations: true
  },
  woman_teacher: {
    keywords: ['instructor', 'professor', 'woman', 'human'],
    char: '👩‍🏫',
    category: 'people',
    name: 'woman_teacher',
    description: 'Woman Teacher Instructor',
    skinVariations: true
  },
  man_teacher: {
    keywords: ['instructor', 'professor', 'man', 'human'],
    char: '👨‍🏫',
    category: 'people',
    name: 'man_teacher',
    description: 'Man Teacher Instructor',
    skinVariations: true
  },
  woman_factory_worker: {
    keywords: ['assembly', 'industrial', 'woman', 'human'],
    char: '👩‍🏭',
    category: 'people',
    name: 'woman_factory_worker',
    description: 'Woman Factory Worker Assembly',
    skinVariations: true
  },
  man_factory_worker: {
    keywords: ['assembly', 'industrial', 'man', 'human'],
    char: '👨‍🏭',
    category: 'people',
    name: 'man_factory_worker',
    description: 'Man Factory Worker Assembly',
    skinVariations: true
  },
  woman_technologist: {
    keywords: [
      'coder',
      'developer',
      'engineer',
      'programmer',
      'software',
      'woman',
      'human',
      'laptop',
      'computer'
    ],
    char: '👩‍💻',
    category: 'people',
    name: 'woman_technologist',
    description: 'Woman Technologist Coder',
    skinVariations: true
  },
  man_technologist: {
    keywords: [
      'coder',
      'developer',
      'engineer',
      'programmer',
      'software',
      'man',
      'human',
      'laptop',
      'computer'
    ],
    char: '👨‍💻',
    category: 'people',
    name: 'man_technologist',
    description: 'Man Technologist Coder',
    skinVariations: true
  },
  woman_office_worker: {
    keywords: ['business', 'manager', 'woman', 'human'],
    char: '👩‍💼',
    category: 'people',
    name: 'woman_office_worker',
    description: 'Woman Office Worker Business',
    skinVariations: true
  },
  man_office_worker: {
    keywords: ['business', 'manager', 'man', 'human'],
    char: '👨‍💼',
    category: 'people',
    name: 'man_office_worker',
    description: 'Man Office Worker Business',
    skinVariations: true
  },
  woman_mechanic: {
    keywords: ['plumber', 'woman', 'human', 'wrench'],
    char: '👩‍🔧',
    category: 'people',
    name: 'woman_mechanic',
    description: 'Woman Mechanic Plumber',
    skinVariations: true
  },
  man_mechanic: {
    keywords: ['plumber', 'man', 'human', 'wrench'],
    char: '👨‍🔧',
    category: 'people',
    name: 'man_mechanic',
    description: 'Man Mechanic Plumber',
    skinVariations: true
  },
  woman_scientist: {
    keywords: ['biologist', 'chemist', 'engineer', 'physicist', 'woman', 'human'],
    char: '👩‍🔬',
    category: 'people',
    name: 'woman_scientist',
    description: 'Woman Scientist Biologist',
    skinVariations: true
  },
  man_scientist: {
    keywords: ['biologist', 'chemist', 'engineer', 'physicist', 'man', 'human'],
    char: '👨‍🔬',
    category: 'people',
    name: 'man_scientist',
    description: 'Man Scientist Biologist',
    skinVariations: true
  },
  woman_artist: {
    keywords: ['painter', 'woman', 'human'],
    char: '👩‍🎨',
    category: 'people',
    name: 'woman_artist',
    description: 'Woman Artist Painter',
    skinVariations: true
  },
  man_artist: {
    keywords: ['painter', 'man', 'human'],
    char: '👨‍🎨',
    category: 'people',
    name: 'man_artist',
    description: 'Man Artist Painter',
    skinVariations: true
  },
  woman_firefighter: {
    keywords: ['fireman', 'woman', 'human'],
    char: '👩‍🚒',
    category: 'people',
    name: 'woman_firefighter',
    description: 'Woman Firefighter Fireman',
    skinVariations: true
  },
  man_firefighter: {
    keywords: ['fireman', 'man', 'human'],
    char: '👨‍🚒',
    category: 'people',
    name: 'man_firefighter',
    description: 'Man Firefighter Fireman',
    skinVariations: true
  },
  woman_pilot: {
    keywords: ['aviator', 'plane', 'woman', 'human'],
    char: '👩‍✈️',
    category: 'people',
    name: 'woman_pilot',
    description: 'Woman Pilot Aviator',
    skinVariations: true
  },
  man_pilot: {
    keywords: ['aviator', 'plane', 'man', 'human'],
    char: '👨‍✈️',
    category: 'people',
    name: 'man_pilot',
    description: 'Man Pilot Aviator',
    skinVariations: true
  },
  woman_astronaut: {
    keywords: ['space', 'rocket', 'woman', 'human'],
    char: '👩‍🚀',
    category: 'people',
    name: 'woman_astronaut',
    description: 'Woman Astronaut Space',
    skinVariations: true
  },
  man_astronaut: {
    keywords: ['space', 'rocket', 'man', 'human'],
    char: '👨‍🚀',
    category: 'people',
    name: 'man_astronaut',
    description: 'Man Astronaut Space',
    skinVariations: true
  },
  woman_judge: {
    keywords: ['justice', 'court', 'woman', 'human'],
    char: '👩‍⚖️',
    category: 'people',
    name: 'woman_judge',
    description: 'Woman Judge Justice',
    skinVariations: true
  },
  man_judge: {
    keywords: ['justice', 'court', 'man', 'human'],
    char: '👨‍⚖️',
    category: 'people',
    name: 'man_judge',
    description: 'Man Judge Justice',
    skinVariations: true
  },
  woman_superhero: {
    keywords: ['woman', 'female', 'good', 'heroine', 'superpowers'],
    char: '🦸‍♀️',
    category: 'people',
    name: 'woman_superhero',
    description: 'Woman Superhero',
    skinVariations: true
  },
  man_superhero: {
    keywords: ['man', 'male', 'good', 'hero', 'superpowers'],
    char: '🦸‍♂️',
    category: 'people',
    name: 'man_superhero',
    description: 'Man Superhero',
    skinVariations: true
  },
  woman_supervillain: {
    keywords: ['woman', 'female', 'evil', 'bad', 'criminal', 'heroine', 'superpowers'],
    char: '🦹‍♀️',
    category: 'people',
    name: 'woman_supervillain',
    description: 'Woman Supervillain',
    skinVariations: true
  },
  man_supervillain: {
    keywords: ['man', 'male', 'evil', 'bad', 'criminal', 'hero', 'superpowers'],
    char: '🦹‍♂️',
    category: 'people',
    name: 'man_supervillain',
    description: 'Man Supervillain',
    skinVariations: true
  },
  mrs_claus: {
    keywords: ['woman', 'female', 'xmas', 'mother christmas'],
    char: '🤶',
    category: 'people',
    name: 'mrs_claus',
    description: 'Mother Christmas',
    skinVariations: true
  },
  santa: {
    keywords: ['festival', 'man', 'male', 'xmas', 'father christmas'],
    char: '🎅',
    category: 'people',
    name: 'santa',
    description: 'Father Christmas',
    skinVariations: true
  },
  sorceress: {
    keywords: ['woman', 'female', 'mage', 'witch'],
    char: '🧙‍♀️',
    category: 'people',
    name: 'sorceress',
    description: 'Sorceress Woman',
    skinVariations: true
  },
  wizard: {
    keywords: ['man', 'male', 'mage', 'sorcerer'],
    char: '🧙‍♂️',
    category: 'people',
    name: 'wizard',
    description: 'Wizard Man',
    skinVariations: true
  },
  woman_elf: {
    keywords: ['woman', 'female'],
    char: '🧝‍♀️',
    category: 'people',
    name: 'woman_elf',
    description: 'Woman Elf',
    skinVariations: true
  },
  man_elf: {
    keywords: ['man', 'male'],
    char: '🧝‍♂️',
    category: 'people',
    name: 'man_elf',
    description: 'Man Elf',
    skinVariations: true
  },
  woman_vampire: {
    keywords: ['woman', 'female'],
    char: '🧛‍♀️',
    category: 'people',
    name: 'woman_vampire',
    description: 'Woman Vampire',
    skinVariations: true
  },
  man_vampire: {
    keywords: ['man', 'male', 'dracula'],
    char: '🧛‍♂️',
    category: 'people',
    name: 'man_vampire',
    description: 'Man Vampire',
    skinVariations: true
  },
  woman_zombie: {
    keywords: ['woman', 'female', 'undead', 'walking dead'],
    char: '🧟‍♀️',
    category: 'people',
    name: 'woman_zombie',
    description: 'Woman Zombie',
    skinVariations: false
  },
  man_zombie: {
    keywords: ['man', 'male', 'dracula', 'undead', 'walking dead'],
    char: '🧟‍♂️',
    category: 'people',
    name: 'man_zombie',
    description: 'Man Zombie',
    skinVariations: false
  },
  woman_genie: {
    keywords: ['woman', 'female'],
    char: '🧞‍♀️',
    category: 'people',
    name: 'woman_genie',
    description: 'Woman Genie',
    skinVariations: false
  },
  man_genie: {
    keywords: ['man', 'male'],
    char: '🧞‍♂️',
    category: 'people',
    name: 'man_genie',
    description: 'Man Genie',
    skinVariations: false
  },
  mermaid: {
    keywords: ['woman', 'female', 'merwoman', 'ariel'],
    char: '🧜‍♀️',
    category: 'people',
    name: 'mermaid',
    description: 'Mermaid',
    skinVariations: true
  },
  merman: {
    keywords: ['man', 'male', 'triton'],
    char: '🧜‍♂️',
    category: 'people',
    name: 'merman',
    description: 'Merman',
    skinVariations: true
  },
  woman_fairy: {
    keywords: ['woman', 'female'],
    char: '🧚‍♀️',
    category: 'people',
    name: 'woman_fairy',
    description: 'Woman Fairy',
    skinVariations: true
  },
  man_fairy: {
    keywords: ['man', 'male'],
    char: '🧚‍♂️',
    category: 'people',
    name: 'man_fairy',
    description: 'Man Fairy',
    skinVariations: true
  },
  angel: {
    keywords: ['heaven', 'wings', 'halo'],
    char: '👼',
    category: 'people',
    name: 'angel',
    description: 'Baby Angel',
    skinVariations: true
  },
  pregnant_woman: {
    keywords: ['baby'],
    char: '🤰',
    category: 'people',
    name: 'pregnant_woman',
    description: 'Pregnant Woman',
    skinVariations: true
  },
  breastfeeding: {
    keywords: ['nursing', 'baby'],
    char: '🤱',
    category: 'people',
    name: 'breastfeeding',
    description: 'Breastfeeding Nursing',
    skinVariations: true
  },
  princess: {
    keywords: ['girl', 'woman', 'female', 'blond', 'crown', 'royal', 'queen'],
    char: '👸',
    category: 'people',
    name: 'princess',
    description: 'Princess',
    skinVariations: true
  },
  prince: {
    keywords: ['boy', 'man', 'male', 'crown', 'royal', 'king'],
    char: '🤴',
    category: 'people',
    name: 'prince',
    description: 'Prince',
    skinVariations: true
  },
  bride_with_veil: {
    keywords: ['couple', 'marriage', 'wedding', 'woman', 'bride'],
    char: '👰',
    category: 'people',
    name: 'bride_with_veil',
    description: 'Bride with Veil',
    skinVariations: true
  },
  man_in_tuxedo: {
    keywords: ['couple', 'marriage', 'wedding', 'groom'],
    char: '🤵',
    category: 'people',
    name: 'man_in_tuxedo',
    description: 'Man in Tuxedo',
    skinVariations: true
  },
  running_woman: {
    keywords: ['woman', 'walking', 'exercise', 'race', 'running', 'female'],
    char: '🏃‍♀️',
    category: 'people',
    name: 'running_woman',
    description: 'Running Woman',
    skinVariations: true
  },
  running_man: {
    keywords: ['man', 'walking', 'exercise', 'race', 'running'],
    char: '🏃',
    category: 'people',
    name: 'running_man',
    description: 'Running Man',
    skinVariations: true
  },
  walking_woman: {
    keywords: ['human', 'feet', 'steps', 'woman', 'female'],
    char: '🚶‍♀️',
    category: 'people',
    name: 'walking_woman',
    description: 'Walking Woman Human',
    skinVariations: true
  },
  walking_man: {
    keywords: ['human', 'feet', 'steps'],
    char: '🚶',
    category: 'people',
    name: 'walking_man',
    description: 'Walking Man Human',
    skinVariations: true
  },
  dancer: {
    keywords: ['female', 'girl', 'woman', 'fun'],
    char: '💃',
    category: 'people',
    name: 'dancer',
    description: 'Dancer',
    skinVariations: true
  },
  man_dancing: {
    keywords: ['male', 'boy', 'fun', 'dancer'],
    char: '🕺',
    category: 'people',
    name: 'man_dancing',
    description: 'Man Dancing',
    skinVariations: true
  },
  dancing_women: {
    keywords: ['female', 'bunny', 'women', 'girls'],
    char: '👯',
    category: 'people',
    name: 'dancing_women',
    description: 'Dancing Women Female',
    skinVariations: false
  },
  dancing_men: {
    keywords: ['male', 'bunny', 'men', 'boys'],
    char: '👯‍♂️',
    category: 'people',
    name: 'dancing_men',
    description: 'Dancing Men Male',
    skinVariations: false
  },
  couple: {
    keywords: [
      'pair',
      'people',
      'human',
      'love',
      'date',
      'dating',
      'like',
      'affection',
      'valentines',
      'marriage'
    ],
    char: '👫',
    category: 'people',
    name: 'couple',
    description: 'Man and Woman Holding Hands',
    skinVariations: false
  },
  two_men_holding_hands: {
    keywords: ['pair', 'couple', 'love', 'like', 'bromance', 'friendship', 'people', 'human'],
    char: '👬',
    category: 'people',
    name: 'two_men_holding_hands',
    description: 'Two Men Holding Hands',
    skinVariations: false
  },
  two_women_holding_hands: {
    keywords: ['pair', 'friendship', 'couple', 'love', 'like', 'female', 'people', 'human'],
    char: '👭',
    category: 'people',
    name: 'two_women_holding_hands',
    description: 'Two Women Holding Hands',
    skinVariations: false
  },
  bowing_woman: {
    keywords: ['woman', 'female', 'girl'],
    char: '🙇‍♀️',
    category: 'people',
    name: 'bowing_woman',
    description: 'Bowing Woman',
    skinVariations: true
  },
  bowing_man: {
    keywords: ['man', 'male', 'boy'],
    char: '🙇',
    category: 'people',
    name: 'bowing_man',
    description: 'Bowing Man',
    skinVariations: true
  },
  man_facepalming: {
    keywords: ['man', 'male', 'boy', 'disbelief'],
    char: '🤦‍♂️',
    category: 'people',
    name: 'man_facepalming',
    description: 'Man Facepalming',
    skinVariations: true
  },
  woman_facepalming: {
    keywords: ['woman', 'female', 'girl', 'disbelief'],
    char: '🤦‍♀️',
    category: 'people',
    name: 'woman_facepalming',
    description: 'Woman Facepalming',
    skinVariations: true
  },
  woman_shrugging: {
    keywords: ['woman', 'female', 'girl', 'confused', 'indifferent', 'doubt'],
    char: '🤷',
    category: 'people',
    name: 'woman_shrugging',
    description: 'Woman Shrugging',
    skinVariations: true
  },
  man_shrugging: {
    keywords: ['man', 'male', 'boy', 'confused', 'indifferent', 'doubt'],
    char: '🤷‍♂️',
    category: 'people',
    name: 'man_shrugging',
    description: 'Man Shrugging',
    skinVariations: true
  },
  tipping_hand_woman: {
    keywords: ['female', 'girl', 'woman', 'human', 'information'],
    char: '💁',
    category: 'people',
    name: 'tipping_hand_woman',
    description: 'Tipping Hand Woman Female',
    skinVariations: true
  },
  tipping_hand_man: {
    keywords: ['male', 'boy', 'man', 'human', 'information'],
    char: '💁‍♂️',
    category: 'people',
    name: 'tipping_hand_man',
    description: 'Tipping Hand Man Male',
    skinVariations: true
  },
  no_good_woman: {
    keywords: ['female', 'girl', 'woman', 'nope'],
    char: '🙅',
    category: 'people',
    name: 'no_good_woman',
    description: 'No Good Woman Female',
    skinVariations: true
  },
  no_good_man: {
    keywords: ['male', 'boy', 'man', 'nope'],
    char: '🙅‍♂️',
    category: 'people',
    name: 'no_good_man',
    description: 'No Good Man Male',
    skinVariations: true
  },
  ok_woman: {
    keywords: ['women', 'girl', 'female', 'pink', 'human', 'woman'],
    char: '🙆',
    category: 'people',
    name: 'ok_woman',
    description: 'Face with Ok Gesture',
    skinVariations: true
  },
  ok_man: {
    keywords: ['men', 'boy', 'male', 'blue', 'human', 'man'],
    char: '🙆‍♂️',
    category: 'people',
    name: 'ok_man',
    description: 'Ok Man Men',
    skinVariations: true
  },
  raising_hand_woman: {
    keywords: ['female', 'girl', 'woman'],
    char: '🙋',
    category: 'people',
    name: 'raising_hand_woman',
    description: 'Raising Hand Woman Female',
    skinVariations: true
  },
  raising_hand_man: {
    keywords: ['male', 'boy', 'man'],
    char: '🙋‍♂️',
    category: 'people',
    name: 'raising_hand_man',
    description: 'Raising Hand Man Male',
    skinVariations: true
  },
  pouting_woman: {
    keywords: ['female', 'girl', 'woman'],
    char: '🙎',
    category: 'people',
    name: 'pouting_woman',
    description: 'Pouting Woman Female',
    skinVariations: true
  },
  pouting_man: {
    keywords: ['male', 'boy', 'man'],
    char: '🙎‍♂️',
    category: 'people',
    name: 'pouting_man',
    description: 'Pouting Man Male',
    skinVariations: true
  },
  frowning_woman: {
    keywords: ['female', 'girl', 'woman', 'sad', 'depressed', 'discouraged', 'unhappy'],
    char: '🙍',
    category: 'people',
    name: 'frowning_woman',
    description: 'Frowning Woman Female',
    skinVariations: true
  },
  frowning_man: {
    keywords: ['male', 'boy', 'man', 'sad', 'depressed', 'discouraged', 'unhappy'],
    char: '🙍‍♂️',
    category: 'people',
    name: 'frowning_man',
    description: 'Frowning Man Male',
    skinVariations: true
  },
  haircut_woman: {
    keywords: ['female', 'girl', 'woman'],
    char: '💇',
    category: 'people',
    name: 'haircut_woman',
    description: 'Haircut Woman Female',
    skinVariations: true
  },
  haircut_man: {
    keywords: ['male', 'boy', 'man'],
    char: '💇‍♂️',
    category: 'people',
    name: 'haircut_man',
    description: 'Haircut Man Male',
    skinVariations: true
  },
  massage_woman: {
    keywords: ['female', 'girl', 'woman', 'head'],
    char: '💆',
    category: 'people',
    name: 'massage_woman',
    description: 'Massage Woman Female',
    skinVariations: true
  },
  massage_man: {
    keywords: ['male', 'boy', 'man', 'head'],
    char: '💆‍♂️',
    category: 'people',
    name: 'massage_man',
    description: 'Massage Man Male',
    skinVariations: true
  },
  woman_in_steamy_room: {
    keywords: ['female', 'woman', 'spa', 'steamroom', 'sauna'],
    char: '🧖‍♀️',
    category: 'people',
    name: 'woman_in_steamy_room',
    description: 'Woman in Steamy Room',
    skinVariations: true
  },
  man_in_steamy_room: {
    keywords: ['male', 'man', 'spa', 'steamroom', 'sauna'],
    char: '🧖‍♂️',
    category: 'people',
    name: 'man_in_steamy_room',
    description: 'Man in Steamy Room',
    skinVariations: true
  },
  couple_with_heart_woman_man: {
    keywords: ['pair', 'love', 'like', 'affection', 'human', 'dating', 'valentines', 'marriage'],
    char: '💑',
    category: 'people',
    name: 'couple_with_heart_woman_man',
    description: 'Couple With Heart Woman Man Pair',
    skinVariations: false
  },
  couple_with_heart_woman_woman: {
    keywords: ['pair', 'love', 'like', 'affection', 'human', 'dating', 'valentines', 'marriage'],
    char: '👩‍❤️‍👩',
    category: 'people',
    name: 'couple_with_heart_woman_woman',
    description: 'Couple With Heart Woman Woman Pair',
    skinVariations: false
  },
  couple_with_heart_man_man: {
    keywords: ['pair', 'love', 'like', 'affection', 'human', 'dating', 'valentines', 'marriage'],
    char: '👨‍❤️‍👨',
    category: 'people',
    name: 'couple_with_heart_man_man',
    description: 'Couple With Heart Man Man Pair',
    skinVariations: false
  },
  couplekiss_man_woman: {
    keywords: ['pair', 'valentines', 'love', 'like', 'dating', 'marriage'],
    char: '💏',
    category: 'people',
    name: 'couplekiss_man_woman',
    description: 'Couplekiss Man Woman Pair',
    skinVariations: false
  },
  couplekiss_woman_woman: {
    keywords: ['pair', 'valentines', 'love', 'like', 'dating', 'marriage'],
    char: '👩‍❤️‍💋‍👩',
    category: 'people',
    name: 'couplekiss_woman_woman',
    description: 'Couplekiss Woman Woman Pair',
    skinVariations: false
  },
  couplekiss_man_man: {
    keywords: ['pair', 'valentines', 'love', 'like', 'dating', 'marriage'],
    char: '👨‍❤️‍💋‍👨',
    category: 'people',
    name: 'couplekiss_man_man',
    description: 'Couplekiss Man Man Pair',
    skinVariations: false
  },
  family_man_woman_boy: {
    keywords: ['home', 'parents', 'child', 'mom', 'dad', 'father', 'mother', 'people', 'human'],
    char: '👪',
    category: 'people',
    name: 'family_man_woman_boy',
    description: 'Family Man Woman Boy Home',
    skinVariations: false
  },
  family_man_woman_girl: {
    keywords: ['home', 'parents', 'people', 'human', 'child'],
    char: '👨‍👩‍👧',
    category: 'people',
    name: 'family_man_woman_girl',
    description: 'Family Man Woman Girl Home',
    skinVariations: false
  },
  family_man_woman_girl_boy: {
    keywords: ['home', 'parents', 'people', 'human', 'children'],
    char: '👨‍👩‍👧‍👦',
    category: 'people',
    name: 'family_man_woman_girl_boy',
    description: 'Family Man Woman Girl Boy Home',
    skinVariations: false
  },
  family_man_woman_boy_boy: {
    keywords: ['home', 'parents', 'people', 'human', 'children'],
    char: '👨‍👩‍👦‍👦',
    category: 'people',
    name: 'family_man_woman_boy_boy',
    description: 'Family Man Woman Boy Boy Home',
    skinVariations: false
  },
  family_man_woman_girl_girl: {
    keywords: ['home', 'parents', 'people', 'human', 'children'],
    char: '👨‍👩‍👧‍👧',
    category: 'people',
    name: 'family_man_woman_girl_girl',
    description: 'Family Man Woman Girl Girl Home',
    skinVariations: false
  },
  family_woman_woman_boy: {
    keywords: ['home', 'parents', 'people', 'human', 'children'],
    char: '👩‍👩‍👦',
    category: 'people',
    name: 'family_woman_woman_boy',
    description: 'Family Woman Woman Boy Home',
    skinVariations: false
  },
  family_woman_woman_girl: {
    keywords: ['home', 'parents', 'people', 'human', 'children'],
    char: '👩‍👩‍👧',
    category: 'people',
    name: 'family_woman_woman_girl',
    description: 'Family Woman Woman Girl Home',
    skinVariations: false
  },
  family_woman_woman_girl_boy: {
    keywords: ['home', 'parents', 'people', 'human', 'children'],
    char: '👩‍👩‍👧‍👦',
    category: 'people',
    name: 'family_woman_woman_girl_boy',
    description: 'Family Woman Woman Girl Boy Home',
    skinVariations: false
  },
  family_woman_woman_boy_boy: {
    keywords: ['home', 'parents', 'people', 'human', 'children'],
    char: '👩‍👩‍👦‍👦',
    category: 'people',
    name: 'family_woman_woman_boy_boy',
    description: 'Family Woman Woman Boy Boy Home',
    skinVariations: false
  },
  family_woman_woman_girl_girl: {
    keywords: ['home', 'parents', 'people', 'human', 'children'],
    char: '👩‍👩‍👧‍👧',
    category: 'people',
    name: 'family_woman_woman_girl_girl',
    description: 'Family Woman Woman Girl Girl Home',
    skinVariations: false
  },
  family_man_man_boy: {
    keywords: ['home', 'parents', 'people', 'human', 'children'],
    char: '👨‍👨‍👦',
    category: 'people',
    name: 'family_man_man_boy',
    description: 'Family Man Man Boy Home',
    skinVariations: false
  },
  family_man_man_girl: {
    keywords: ['home', 'parents', 'people', 'human', 'children'],
    char: '👨‍👨‍👧',
    category: 'people',
    name: 'family_man_man_girl',
    description: 'Family Man Man Girl Home',
    skinVariations: false
  },
  family_man_man_girl_boy: {
    keywords: ['home', 'parents', 'people', 'human', 'children'],
    char: '👨‍👨‍👧‍👦',
    category: 'people',
    name: 'family_man_man_girl_boy',
    description: 'Family Man Man Girl Boy Home',
    skinVariations: false
  },
  family_man_man_boy_boy: {
    keywords: ['home', 'parents', 'people', 'human', 'children'],
    char: '👨‍👨‍👦‍👦',
    category: 'people',
    name: 'family_man_man_boy_boy',
    description: 'Family Man Man Boy Boy Home',
    skinVariations: false
  },
  family_man_man_girl_girl: {
    keywords: ['home', 'parents', 'people', 'human', 'children'],
    char: '👨‍👨‍👧‍👧',
    category: 'people',
    name: 'family_man_man_girl_girl',
    description: 'Family Man Man Girl Girl Home',
    skinVariations: false
  },
  family_woman_boy: {
    keywords: ['home', 'parent', 'people', 'human', 'child'],
    char: '👩‍👦',
    category: 'people',
    name: 'family_woman_boy',
    description: 'Family Woman Boy Home',
    skinVariations: false
  },
  family_woman_girl: {
    keywords: ['home', 'parent', 'people', 'human', 'child'],
    char: '👩‍👧',
    category: 'people',
    name: 'family_woman_girl',
    description: 'Family Woman Girl Home',
    skinVariations: false
  },
  family_woman_girl_boy: {
    keywords: ['home', 'parent', 'people', 'human', 'children'],
    char: '👩‍👧‍👦',
    category: 'people',
    name: 'family_woman_girl_boy',
    description: 'Family Woman Girl Boy Home',
    skinVariations: false
  },
  family_woman_boy_boy: {
    keywords: ['home', 'parent', 'people', 'human', 'children'],
    char: '👩‍👦‍👦',
    category: 'people',
    name: 'family_woman_boy_boy',
    description: 'Family Woman Boy Boy Home',
    skinVariations: false
  },
  family_woman_girl_girl: {
    keywords: ['home', 'parent', 'people', 'human', 'children'],
    char: '👩‍👧‍👧',
    category: 'people',
    name: 'family_woman_girl_girl',
    description: 'Family Woman Girl Girl Home',
    skinVariations: false
  },
  family_man_boy: {
    keywords: ['home', 'parent', 'people', 'human', 'child'],
    char: '👨‍👦',
    category: 'people',
    name: 'family_man_boy',
    description: 'Family Man Boy Home',
    skinVariations: false
  },
  family_man_girl: {
    keywords: ['home', 'parent', 'people', 'human', 'child'],
    char: '👨‍👧',
    category: 'people',
    name: 'family_man_girl',
    description: 'Family Man Girl Home',
    skinVariations: false
  },
  family_man_girl_boy: {
    keywords: ['home', 'parent', 'people', 'human', 'children'],
    char: '👨‍👧‍👦',
    category: 'people',
    name: 'family_man_girl_boy',
    description: 'Family Man Girl Boy Home',
    skinVariations: false
  },
  family_man_boy_boy: {
    keywords: ['home', 'parent', 'people', 'human', 'children'],
    char: '👨‍👦‍👦',
    category: 'people',
    name: 'family_man_boy_boy',
    description: 'Family Man Boy Boy Home',
    skinVariations: false
  },
  family_man_girl_girl: {
    keywords: ['home', 'parent', 'people', 'human', 'children'],
    char: '👨‍👧‍👧',
    category: 'people',
    name: 'family_man_girl_girl',
    description: 'Family Man Girl Girl Home',
    skinVariations: false
  },
  yarn: {
    keywords: ['ball', 'crochet', 'knit'],
    char: '🧶',
    category: 'people',
    name: 'yarn',
    description: 'Yarn Ball',
    skinVariations: false
  },
  thread: {
    keywords: ['needle', 'sewing', 'spool', 'string'],
    char: '🧵',
    category: 'people',
    name: 'thread',
    description: 'Thread Needle',
    skinVariations: false
  },
  coat: {
    keywords: ['jacket'],
    char: '🧥',
    category: 'people',
    name: 'coat',
    description: 'Coat',
    skinVariations: false
  },
  labcoat: {
    keywords: ['doctor', 'experiment', 'scientist', 'chemist'],
    char: '🥼',
    category: 'people',
    name: 'labcoat',
    description: 'Labcoat Doctor',
    skinVariations: false
  },
  womans_clothes: {
    keywords: ['fashion', 'shopping_bags', 'female'],
    char: '👚',
    category: 'people',
    name: 'womans_clothes',
    description: 'Womans Clothes',
    skinVariations: false
  },
  tshirt: {
    keywords: ['fashion', 'cloth', 'casual', 'shirt', 'tee'],
    char: '👕',
    category: 'people',
    name: 'tshirt',
    description: 'Tshirt Fashion',
    skinVariations: false
  },
  jeans: {
    keywords: ['fashion', 'shopping'],
    char: '👖',
    category: 'people',
    name: 'jeans',
    description: 'Jeans',
    skinVariations: false
  },
  necktie: {
    keywords: ['shirt', 'suitup', 'formal', 'fashion', 'cloth', 'business'],
    char: '👔',
    category: 'people',
    name: 'necktie',
    description: 'Necktie',
    skinVariations: false
  },
  dress: {
    keywords: ['clothes', 'fashion', 'shopping'],
    char: '👗',
    category: 'people',
    name: 'dress',
    description: 'Dress',
    skinVariations: false
  },
  bikini: {
    keywords: ['swimming', 'female', 'woman', 'girl', 'fashion', 'beach', 'summer'],
    char: '👙',
    category: 'people',
    name: 'bikini',
    description: 'Bikini',
    skinVariations: false
  },
  kimono: {
    keywords: ['dress', 'fashion', 'women', 'female', 'japanese'],
    char: '👘',
    category: 'people',
    name: 'kimono',
    description: 'Kimono',
    skinVariations: false
  },
  lipstick: {
    keywords: ['female', 'girl', 'fashion', 'woman'],
    char: '💄',
    category: 'people',
    name: 'lipstick',
    description: 'Lipstick',
    skinVariations: false
  },
  kiss: {
    keywords: ['face', 'lips', 'love', 'like', 'affection', 'valentines'],
    char: '💋',
    category: 'people',
    name: 'kiss',
    description: 'Kiss Mark',
    skinVariations: false
  },
  footprints: {
    keywords: ['feet', 'tracking', 'walking', 'beach'],
    char: '👣',
    category: 'people',
    name: 'footprints',
    description: 'Footprints',
    skinVariations: false
  },
  flat_shoe: {
    keywords: ['ballet', 'slip-on', 'slipper'],
    char: '🥿',
    category: 'people',
    name: 'flat_shoe',
    description: 'Flat Shoe Ballet',
    skinVariations: false
  },
  high_heel: {
    keywords: ['fashion', 'shoes', 'female', 'pumps', 'stiletto'],
    char: '👠',
    category: 'people',
    name: 'high_heel',
    description: 'High-Heeled Shoe',
    skinVariations: false
  },
  sandal: {
    keywords: ['shoes', 'fashion', 'flip flops'],
    char: '👡',
    category: 'people',
    name: 'sandal',
    description: 'Womans Sandal',
    skinVariations: false
  },
  boot: {
    keywords: ['shoes', 'fashion'],
    char: '👢',
    category: 'people',
    name: 'boot',
    description: 'Womans Boots',
    skinVariations: false
  },
  mans_shoe: {
    keywords: ['fashion', 'male'],
    char: '👞',
    category: 'people',
    name: 'mans_shoe',
    description: 'Mans Shoe',
    skinVariations: false
  },
  athletic_shoe: {
    keywords: ['shoes', 'sports', 'sneakers'],
    char: '👟',
    category: 'people',
    name: 'athletic_shoe',
    description: 'Athletic Shoe',
    skinVariations: false
  },
  hiking_boot: {
    keywords: ['backpacking', 'camping', 'hiking'],
    char: '🥾',
    category: 'people',
    name: 'hiking_boot',
    description: 'Hiking Boot Backpacking',
    skinVariations: false
  },
  socks: {
    keywords: ['stockings', 'clothes'],
    char: '🧦',
    category: 'people',
    name: 'socks',
    description: 'Socks',
    skinVariations: false
  },
  gloves: {
    keywords: ['hands', 'winter', 'clothes'],
    char: '🧤',
    category: 'people',
    name: 'gloves',
    description: 'Gloves',
    skinVariations: false
  },
  scarf: {
    keywords: ['neck', 'winter', 'clothes'],
    char: '🧣',
    category: 'people',
    name: 'scarf',
    description: 'Scarf',
    skinVariations: false
  },
  womans_hat: {
    keywords: ['fashion', 'accessories', 'female', 'lady', 'spring'],
    char: '👒',
    category: 'people',
    name: 'womans_hat',
    description: 'Womans Hat',
    skinVariations: false
  },
  tophat: {
    keywords: ['magic', 'gentleman', 'classy', 'circus'],
    char: '🎩',
    category: 'people',
    name: 'tophat',
    description: 'Top Hat',
    skinVariations: false
  },
  billed_hat: {
    keywords: ['cap', 'baseball'],
    char: '🧢',
    category: 'people',
    name: 'billed_hat',
    description: 'Billed Hat Cap',
    skinVariations: false
  },
  rescue_worker_helmet: {
    keywords: ['construction', 'build'],
    char: '⛑',
    category: 'people',
    name: 'rescue_worker_helmet',
    description: 'Rescue Worker Helmet Construction',
    skinVariations: false
  },
  mortar_board: {
    keywords: [
      'school',
      'college',
      'degree',
      'university',
      'graduation',
      'cap',
      'hat',
      'legal',
      'learn',
      'education'
    ],
    char: '🎓',
    category: 'people',
    name: 'mortar_board',
    description: 'Graduation Cap',
    skinVariations: false
  },
  crown: {
    keywords: ['king', 'kod', 'leader', 'royalty', 'lord'],
    char: '👑',
    category: 'people',
    name: 'crown',
    description: 'Crown',
    skinVariations: false
  },
  school_satchel: {
    keywords: ['student', 'education', 'bag', 'backpack'],
    char: '🎒',
    category: 'people',
    name: 'school_satchel',
    description: 'School Satchel',
    skinVariations: false
  },
  luggage: {
    keywords: ['packing', 'travel'],
    char: '🧳',
    category: 'people',
    name: 'luggage',
    description: 'Luggage Packing',
    skinVariations: false
  },
  pouch: {
    keywords: ['bag', 'accessories', 'shopping'],
    char: '👝',
    category: 'people',
    name: 'pouch',
    description: 'Pouch',
    skinVariations: false
  },
  purse: {
    keywords: ['fashion', 'accessories', 'money', 'sales', 'shopping'],
    char: '👛',
    category: 'people',
    name: 'purse',
    description: 'Purse',
    skinVariations: false
  },
  handbag: {
    keywords: ['fashion', 'accessory', 'accessories', 'shopping'],
    char: '👜',
    category: 'people',
    name: 'handbag',
    description: 'Handbag',
    skinVariations: false
  },
  briefcase: {
    keywords: ['business', 'documents', 'work', 'law', 'legal', 'job', 'career'],
    char: '💼',
    category: 'people',
    name: 'briefcase',
    description: 'Briefcase',
    skinVariations: false
  },
  eyeglasses: {
    keywords: ['fashion', 'accessories', 'eyesight', 'nerdy', 'dork', 'geek'],
    char: '👓',
    category: 'people',
    name: 'eyeglasses',
    description: 'Eyeglasses',
    skinVariations: false
  },
  dark_sunglasses: {
    keywords: ['face', 'cool', 'accessories'],
    char: '🕶',
    category: 'people',
    name: 'dark_sunglasses',
    description: 'Dark Sunglasses',
    skinVariations: false
  },
  goggles: {
    keywords: ['eyes', 'protection', 'safety'],
    char: '🥽',
    category: 'people',
    name: 'goggles',
    description: 'Goggles Eyes',
    skinVariations: false
  },
  ring: {
    keywords: [
      'wedding',
      'propose',
      'marriage',
      'valentines',
      'diamond',
      'fashion',
      'jewelry',
      'gem',
      'engagement'
    ],
    char: '💍',
    category: 'people',
    name: 'ring',
    description: 'Ring',
    skinVariations: false
  },
  closed_umbrella: {
    keywords: ['weather', 'rain', 'drizzle'],
    char: '🌂',
    category: 'people',
    name: 'closed_umbrella',
    description: 'Closed Umbrella',
    skinVariations: false
  },
  dog: {
    keywords: ['animal', 'friend', 'nature', 'woof', 'puppy', 'pet', 'faithful'],
    char: '🐶',
    category: 'animals_and_nature',
    name: 'dog',
    description: 'Dog Face',
    skinVariations: false
  },
  cat: {
    keywords: ['animal', 'meow', 'nature', 'pet', 'kitten'],
    char: '🐱',
    category: 'animals_and_nature',
    name: 'cat',
    description: 'Cat Face',
    skinVariations: false
  },
  mouse: {
    keywords: ['animal', 'nature', 'cheese_wedge', 'rodent'],
    char: '🐭',
    category: 'animals_and_nature',
    name: 'mouse',
    description: 'Mouse Face',
    skinVariations: false
  },
  hamster: {
    keywords: ['animal', 'nature'],
    char: '🐹',
    category: 'animals_and_nature',
    name: 'hamster',
    description: 'Hamster Face',
    skinVariations: false
  },
  rabbit: {
    keywords: ['animal', 'nature', 'pet', 'spring', 'magic', 'bunny'],
    char: '🐰',
    category: 'animals_and_nature',
    name: 'rabbit',
    description: 'Rabbit Face',
    skinVariations: false
  },
  fox_face: {
    keywords: ['animal', 'nature', 'face'],
    char: '🦊',
    category: 'animals_and_nature',
    name: 'fox_face',
    description: 'Fox Face',
    skinVariations: false
  },
  bear: {
    keywords: ['animal', 'nature', 'wild'],
    char: '🐻',
    category: 'animals_and_nature',
    name: 'bear',
    description: 'Bear Face',
    skinVariations: false
  },
  panda_face: {
    keywords: ['animal', 'nature', 'panda'],
    char: '🐼',
    category: 'animals_and_nature',
    name: 'panda_face',
    description: 'Panda Face',
    skinVariations: false
  },
  koala: {
    keywords: ['animal', 'nature'],
    char: '🐨',
    category: 'animals_and_nature',
    name: 'koala',
    description: 'Koala',
    skinVariations: false
  },
  tiger: {
    keywords: ['animal', 'cat', 'danger', 'wild', 'nature', 'roar'],
    char: '🐯',
    category: 'animals_and_nature',
    name: 'tiger',
    description: 'Tiger Face',
    skinVariations: false
  },
  lion: {
    keywords: ['animal', 'nature'],
    char: '🦁',
    category: 'animals_and_nature',
    name: 'lion',
    description: 'Lion Animal',
    skinVariations: false
  },
  cow: {
    keywords: ['beef', 'ox', 'animal', 'nature', 'moo', 'milk'],
    char: '🐮',
    category: 'animals_and_nature',
    name: 'cow',
    description: 'Cow Face',
    skinVariations: false
  },
  pig: {
    keywords: ['animal', 'oink', 'nature'],
    char: '🐷',
    category: 'animals_and_nature',
    name: 'pig',
    description: 'Pig Face',
    skinVariations: false
  },
  pig_nose: {
    keywords: ['animal', 'oink'],
    char: '🐽',
    category: 'animals_and_nature',
    name: 'pig_nose',
    description: 'Pig Nose',
    skinVariations: false
  },
  frog: {
    keywords: ['animal', 'nature', 'croak', 'toad'],
    char: '🐸',
    category: 'animals_and_nature',
    name: 'frog',
    description: 'Frog Face',
    skinVariations: false
  },
  squid: {
    keywords: ['animal', 'nature', 'ocean', 'sea'],
    char: '🦑',
    category: 'animals_and_nature',
    name: 'squid',
    description: 'Squid',
    skinVariations: false
  },
  octopus: {
    keywords: ['animal', 'creature', 'ocean', 'sea', 'nature', 'beach'],
    char: '🐙',
    category: 'animals_and_nature',
    name: 'octopus',
    description: 'Octopus',
    skinVariations: false
  },
  shrimp: {
    keywords: ['animal', 'ocean', 'nature', 'seafood'],
    char: '🦐',
    category: 'animals_and_nature',
    name: 'shrimp',
    description: 'Shrimp',
    skinVariations: false
  },
  monkey_face: {
    keywords: ['animal', 'nature', 'circus'],
    char: '🐵',
    category: 'animals_and_nature',
    name: 'monkey_face',
    description: 'Monkey Face',
    skinVariations: false
  },
  gorilla: {
    keywords: ['animal', 'nature', 'circus'],
    char: '🦍',
    category: 'animals_and_nature',
    name: 'gorilla',
    description: 'Gorilla',
    skinVariations: false
  },
  see_no_evil: {
    keywords: ['monkey', 'animal', 'nature', 'haha'],
    char: '🙈',
    category: 'animals_and_nature',
    name: 'see_no_evil',
    description: 'See-No-Evil Monkey',
    skinVariations: false
  },
  hear_no_evil: {
    keywords: ['animal', 'monkey', 'nature'],
    char: '🙉',
    category: 'animals_and_nature',
    name: 'hear_no_evil',
    description: 'Hear-No-Evil Monkey',
    skinVariations: false
  },
  speak_no_evil: {
    keywords: ['monkey', 'animal', 'nature', 'omg'],
    char: '🙊',
    category: 'animals_and_nature',
    name: 'speak_no_evil',
    description: 'Speak-No-Evil Monkey',
    skinVariations: false
  },
  monkey: {
    keywords: ['animal', 'nature', 'banana', 'circus'],
    char: '🐒',
    category: 'animals_and_nature',
    name: 'monkey',
    description: 'Monkey',
    skinVariations: false
  },
  chicken: {
    keywords: ['animal', 'cluck', 'nature', 'bird'],
    char: '🐔',
    category: 'animals_and_nature',
    name: 'chicken',
    description: 'Chicken',
    skinVariations: false
  },
  penguin: {
    keywords: ['animal', 'nature'],
    char: '🐧',
    category: 'animals_and_nature',
    name: 'penguin',
    description: 'Penguin',
    skinVariations: false
  },
  bird: {
    keywords: ['animal', 'nature', 'fly', 'tweet', 'spring'],
    char: '🐦',
    category: 'animals_and_nature',
    name: 'bird',
    description: 'Bird',
    skinVariations: false
  },
  baby_chick: {
    keywords: ['animal', 'chicken', 'bird'],
    char: '🐤',
    category: 'animals_and_nature',
    name: 'baby_chick',
    description: 'Baby Chick',
    skinVariations: false
  },
  hatching_chick: {
    keywords: ['animal', 'chicken', 'egg', 'born', 'baby', 'bird'],
    char: '🐣',
    category: 'animals_and_nature',
    name: 'hatching_chick',
    description: 'Hatching Chick',
    skinVariations: false
  },
  hatched_chick: {
    keywords: ['animal', 'chicken', 'baby', 'bird'],
    char: '🐥',
    category: 'animals_and_nature',
    name: 'hatched_chick',
    description: 'Front-Facing Baby Chick',
    skinVariations: false
  },
  duck: {
    keywords: ['animal', 'nature', 'bird', 'mallard'],
    char: '🦆',
    category: 'animals_and_nature',
    name: 'duck',
    description: 'Duck',
    skinVariations: false
  },
  eagle: {
    keywords: ['animal', 'nature', 'bird'],
    char: '🦅',
    category: 'animals_and_nature',
    name: 'eagle',
    description: 'Eagle',
    skinVariations: false
  },
  owl: {
    keywords: ['animal', 'nature', 'bird', 'hoot'],
    char: '🦉',
    category: 'animals_and_nature',
    name: 'owl',
    description: 'Owl',
    skinVariations: false
  },
  bat: {
    keywords: ['animal', 'nature', 'blind', 'vampire'],
    char: '🦇',
    category: 'animals_and_nature',
    name: 'bat',
    description: 'Bat',
    skinVariations: false
  },
  wolf: {
    keywords: ['animal', 'nature', 'wild'],
    char: '🐺',
    category: 'animals_and_nature',
    name: 'wolf',
    description: 'Wolf Face',
    skinVariations: false
  },
  boar: {
    keywords: ['animal', 'nature'],
    char: '🐗',
    category: 'animals_and_nature',
    name: 'boar',
    description: 'Boar',
    skinVariations: false
  },
  horse: {
    keywords: ['animal', 'brown', 'nature'],
    char: '🐴',
    category: 'animals_and_nature',
    name: 'horse',
    description: 'Horse Face',
    skinVariations: false
  },
  unicorn: {
    keywords: ['animal', 'nature', 'mystical'],
    char: '🦄',
    category: 'animals_and_nature',
    name: 'unicorn',
    description: 'Unicorn Animal',
    skinVariations: false
  },
  honeybee: {
    keywords: ['animal', 'insect', 'nature', 'bug', 'spring', 'honey'],
    char: '🐝',
    category: 'animals_and_nature',
    name: 'honeybee',
    description: 'Honeybee Animal',
    skinVariations: false
  },
  bug: {
    keywords: ['animal', 'insect', 'nature', 'worm'],
    char: '🐛',
    category: 'animals_and_nature',
    name: 'bug',
    description: 'Bug',
    skinVariations: false
  },
  butterfly: {
    keywords: ['animal', 'insect', 'nature', 'caterpillar'],
    char: '🦋',
    category: 'animals_and_nature',
    name: 'butterfly',
    description: 'Butterfly',
    skinVariations: false
  },
  snail: {
    keywords: ['slow', 'animal', 'shell'],
    char: '🐌',
    category: 'animals_and_nature',
    name: 'snail',
    description: 'Snail',
    skinVariations: false
  },
  beetle: {
    keywords: ['animal', 'insect', 'nature', 'ladybug'],
    char: '🐞',
    category: 'animals_and_nature',
    name: 'beetle',
    description: 'Lady Beetle',
    skinVariations: false
  },
  ant: {
    keywords: ['animal', 'insect', 'nature', 'bug'],
    char: '🐜',
    category: 'animals_and_nature',
    name: 'ant',
    description: 'Ant',
    skinVariations: false
  },
  grasshopper: {
    keywords: ['animal', 'cricket', 'chirp'],
    char: '🦗',
    category: 'animals_and_nature',
    name: 'grasshopper',
    description: 'Grasshopper Animal',
    skinVariations: false
  },
  spider: {
    keywords: ['animal', 'arachnid'],
    char: '🕷',
    category: 'animals_and_nature',
    name: 'spider',
    description: 'Spider',
    skinVariations: false
  },
  scorpion: {
    keywords: ['animal', 'arachnid'],
    char: '🦂',
    category: 'animals_and_nature',
    name: 'scorpion',
    description: 'Scorpion',
    skinVariations: false
  },
  crab: {
    keywords: ['animal', 'crustacean'],
    char: '🦀',
    category: 'animals_and_nature',
    name: 'crab',
    description: 'Crab',
    skinVariations: false
  },
  snake: {
    keywords: ['animal', 'evil', 'nature', 'hiss', 'python'],
    char: '🐍',
    category: 'animals_and_nature',
    name: 'snake',
    description: 'Snake',
    skinVariations: false
  },
  lizard: {
    keywords: ['animal', 'nature', 'reptile'],
    char: '🦎',
    category: 'animals_and_nature',
    name: 'lizard',
    description: 'Lizard',
    skinVariations: false
  },
  't-rex': {
    keywords: ['animal', 'nature', 'dinosaur', 'tyrannosaurus', 'extinct'],
    char: '🦖',
    category: 'animals_and_nature',
    name: 't-rex',
    description: 'T-Rex',
    skinVariations: false
  },
  sauropod: {
    keywords: [
      'animal',
      'nature',
      'dinosaur',
      'brachiosaurus',
      'brontosaurus',
      'diplodocus',
      'extinct'
    ],
    char: '🦕',
    category: 'animals_and_nature',
    name: 'sauropod',
    description: 'Sauropod',
    skinVariations: false
  },
  turtle: {
    keywords: ['animal', 'slow', 'nature', 'tortoise'],
    char: '🐢',
    category: 'animals_and_nature',
    name: 'turtle',
    description: 'Turtle',
    skinVariations: false
  },
  tropical_fish: {
    keywords: ['animal', 'swim', 'ocean', 'beach', 'nemo'],
    char: '🐠',
    category: 'animals_and_nature',
    name: 'tropical_fish',
    description: 'Tropical Fish',
    skinVariations: false
  },
  fish: {
    keywords: ['animal', 'food', 'nature'],
    char: '🐟',
    category: 'animals_and_nature',
    name: 'fish',
    description: 'Fish',
    skinVariations: false
  },
  blowfish: {
    keywords: ['animal', 'nature', 'food', 'sea', 'ocean'],
    char: '🐡',
    category: 'animals_and_nature',
    name: 'blowfish',
    description: 'Blowfish',
    skinVariations: false
  },
  dolphin: {
    keywords: ['animal', 'nature', 'fish', 'sea', 'ocean', 'flipper', 'fins', 'beach'],
    char: '🐬',
    category: 'animals_and_nature',
    name: 'dolphin',
    description: 'Dolphin',
    skinVariations: false
  },
  shark: {
    keywords: ['animal', 'nature', 'fish', 'sea', 'ocean', 'jaws', 'fins', 'beach'],
    char: '🦈',
    category: 'animals_and_nature',
    name: 'shark',
    description: 'Shark',
    skinVariations: false
  },
  whale: {
    keywords: ['animal', 'nature', 'sea', 'ocean'],
    char: '🐳',
    category: 'animals_and_nature',
    name: 'whale',
    description: 'Spouting Whale',
    skinVariations: false
  },
  whale2: {
    keywords: ['animal', 'nature', 'sea', 'ocean'],
    char: '🐋',
    category: 'animals_and_nature',
    name: 'whale2',
    description: 'Whale',
    skinVariations: false
  },
  crocodile: {
    keywords: ['animal', 'nature', 'reptile', 'lizard', 'alligator'],
    char: '🐊',
    category: 'animals_and_nature',
    name: 'crocodile',
    description: 'Crocodile',
    skinVariations: false
  },
  leopard: {
    keywords: ['animal', 'nature'],
    char: '🐆',
    category: 'animals_and_nature',
    name: 'leopard',
    description: 'Leopard',
    skinVariations: false
  },
  zebra: {
    keywords: ['animal', 'nature', 'stripes', 'safari'],
    char: '🦓',
    category: 'animals_and_nature',
    name: 'zebra',
    description: 'Zebra Animal',
    skinVariations: false
  },
  tiger2: {
    keywords: ['animal', 'nature', 'roar'],
    char: '🐅',
    category: 'animals_and_nature',
    name: 'tiger2',
    description: 'Tiger',
    skinVariations: false
  },
  water_buffalo: {
    keywords: ['animal', 'nature', 'ox', 'cow'],
    char: '🐃',
    category: 'animals_and_nature',
    name: 'water_buffalo',
    description: 'Water Buffalo',
    skinVariations: false
  },
  ox: {
    keywords: ['animal', 'cow', 'beef'],
    char: '🐂',
    category: 'animals_and_nature',
    name: 'ox',
    description: 'Ox',
    skinVariations: false
  },
  cow2: {
    keywords: ['beef', 'ox', 'animal', 'nature', 'moo', 'milk'],
    char: '🐄',
    category: 'animals_and_nature',
    name: 'cow2',
    description: 'Cow',
    skinVariations: false
  },
  deer: {
    keywords: ['animal', 'nature', 'horns', 'venison'],
    char: '🦌',
    category: 'animals_and_nature',
    name: 'deer',
    description: 'Deer',
    skinVariations: false
  },
  dromedary_camel: {
    keywords: ['animal', 'hot', 'desert', 'hump'],
    char: '🐪',
    category: 'animals_and_nature',
    name: 'dromedary_camel',
    description: 'Dromedary Camel',
    skinVariations: false
  },
  camel: {
    keywords: ['animal', 'nature', 'hot', 'desert', 'hump'],
    char: '🐫',
    category: 'animals_and_nature',
    name: 'camel',
    description: 'Bactrian Camel',
    skinVariations: false
  },
  giraffe: {
    keywords: ['animal', 'nature', 'spots', 'safari'],
    char: '🦒',
    category: 'animals_and_nature',
    name: 'giraffe',
    description: 'Giraffe Animal',
    skinVariations: false
  },
  elephant: {
    keywords: ['animal', 'nature', 'nose', 'th', 'circus'],
    char: '🐘',
    category: 'animals_and_nature',
    name: 'elephant',
    description: 'Elephant',
    skinVariations: false
  },
  rhinoceros: {
    keywords: ['animal', 'nature', 'horn'],
    char: '🦏',
    category: 'animals_and_nature',
    name: 'rhinoceros',
    description: 'Rhinoceros',
    skinVariations: false
  },
  goat: {
    keywords: ['animal', 'nature'],
    char: '🐐',
    category: 'animals_and_nature',
    name: 'goat',
    description: 'Goat',
    skinVariations: false
  },
  ram: {
    keywords: ['animal', 'sheep', 'nature'],
    char: '🐏',
    category: 'animals_and_nature',
    name: 'ram',
    description: 'Ram',
    skinVariations: false
  },
  sheep: {
    keywords: ['animal', 'nature', 'wool', 'shipit'],
    char: '🐑',
    category: 'animals_and_nature',
    name: 'sheep',
    description: 'Sheep',
    skinVariations: false
  },
  racehorse: {
    keywords: ['animal', 'gamble', 'luck'],
    char: '🐎',
    category: 'animals_and_nature',
    name: 'racehorse',
    description: 'Horse',
    skinVariations: false
  },
  pig2: {
    keywords: ['animal', 'nature'],
    char: '🐖',
    category: 'animals_and_nature',
    name: 'pig2',
    description: 'Pig',
    skinVariations: false
  },
  rat: {
    keywords: ['animal', 'mouse', 'rodent'],
    char: '🐀',
    category: 'animals_and_nature',
    name: 'rat',
    description: 'Rat',
    skinVariations: false
  },
  mouse2: {
    keywords: ['animal', 'nature', 'rodent'],
    char: '🐁',
    category: 'animals_and_nature',
    name: 'mouse2',
    description: 'Mouse',
    skinVariations: false
  },
  rooster: {
    keywords: ['animal', 'nature', 'chicken'],
    char: '🐓',
    category: 'animals_and_nature',
    name: 'rooster',
    description: 'Rooster',
    skinVariations: false
  },
  turkey: {
    keywords: ['animal', 'bird'],
    char: '🦃',
    category: 'animals_and_nature',
    name: 'turkey',
    description: 'Turkey',
    skinVariations: false
  },
  dove: {
    keywords: ['animal', 'bird'],
    char: '🕊',
    category: 'animals_and_nature',
    name: 'dove',
    description: 'Dove Animal',
    skinVariations: false
  },
  dog2: {
    keywords: ['animal', 'nature', 'friend', 'doge', 'pet', 'faithful'],
    char: '🐕',
    category: 'animals_and_nature',
    name: 'dog2',
    description: 'Dog',
    skinVariations: false
  },
  poodle: {
    keywords: ['dog', 'animal', '101', 'nature', 'pet'],
    char: '🐩',
    category: 'animals_and_nature',
    name: 'poodle',
    description: 'Poodle',
    skinVariations: false
  },
  cat2: {
    keywords: ['animal', 'meow', 'pet', 'cats'],
    char: '🐈',
    category: 'animals_and_nature',
    name: 'cat2',
    description: 'Cat',
    skinVariations: false
  },
  rabbit2: {
    keywords: ['animal', 'nature', 'pet', 'magic', 'spring'],
    char: '🐇',
    category: 'animals_and_nature',
    name: 'rabbit2',
    description: 'Rabbit',
    skinVariations: false
  },
  chipmunk: {
    keywords: ['animal', 'nature', 'rodent', 'squirrel'],
    char: '🐿',
    category: 'animals_and_nature',
    name: 'chipmunk',
    description: 'Chipmunk',
    skinVariations: false
  },
  hedgehog: {
    keywords: ['animal', 'nature', 'spiny'],
    char: '🦔',
    category: 'animals_and_nature',
    name: 'hedgehog',
    description: 'Hedgehog',
    skinVariations: false
  },
  raccoon: {
    keywords: ['animal', 'nature'],
    char: '🦝',
    category: 'animals_and_nature',
    name: 'raccoon',
    description: 'Raccoon Animal',
    skinVariations: false
  },
  llama: {
    keywords: ['animal', 'nature', 'alpaca'],
    char: '🦙',
    category: 'animals_and_nature',
    name: 'llama',
    description: 'Llama Animal',
    skinVariations: false
  },
  hippopotamus: {
    keywords: ['animal', 'nature'],
    char: '🦛',
    category: 'animals_and_nature',
    name: 'hippopotamus',
    description: 'Hippopotamus Animal',
    skinVariations: false
  },
  kangaroo: {
    keywords: ['animal', 'nature', 'australia', 'joey', 'hop', 'marsupial'],
    char: '🦘',
    category: 'animals_and_nature',
    name: 'kangaroo',
    description: 'Kangaroo Animal',
    skinVariations: false
  },
  badger: {
    keywords: ['animal', 'nature', 'honey'],
    char: '🦡',
    category: 'animals_and_nature',
    name: 'badger',
    description: 'Badger Animal',
    skinVariations: false
  },
  swan: {
    keywords: ['animal', 'nature', 'bird'],
    char: '🦢',
    category: 'animals_and_nature',
    name: 'swan',
    description: 'Swan Animal',
    skinVariations: false
  },
  peacock: {
    keywords: ['animal', 'nature', 'peahen', 'bird'],
    char: '🦚',
    category: 'animals_and_nature',
    name: 'peacock',
    description: 'Peacock Animal',
    skinVariations: false
  },
  parrot: {
    keywords: ['animal', 'nature', 'bird', 'pirate', 'talk'],
    char: '🦜',
    category: 'animals_and_nature',
    name: 'parrot',
    description: 'Parrot Animal',
    skinVariations: false
  },
  lobster: {
    keywords: ['animal', 'nature', 'bisque', 'claws', 'seafood'],
    char: '🦞',
    category: 'animals_and_nature',
    name: 'lobster',
    description: 'Lobster Animal',
    skinVariations: false
  },
  mosquito: {
    keywords: ['animal', 'nature', 'insect', 'malaria'],
    char: '🦟',
    category: 'animals_and_nature',
    name: 'mosquito',
    description: 'Mosquito Animal',
    skinVariations: false
  },
  paw_prints: {
    keywords: ['animal', 'tracking', 'footprints', 'dog', 'cat', 'pet', 'feet'],
    char: '🐾',
    category: 'animals_and_nature',
    name: 'paw_prints',
    description: 'Paw Prints Animal',
    skinVariations: false
  },
  dragon: {
    keywords: ['animal', 'myth', 'nature', 'chinese', 'green'],
    char: '🐉',
    category: 'animals_and_nature',
    name: 'dragon',
    description: 'Dragon',
    skinVariations: false
  },
  dragon_face: {
    keywords: ['animal', 'myth', 'nature', 'chinese', 'green'],
    char: '🐲',
    category: 'animals_and_nature',
    name: 'dragon_face',
    description: 'Dragon Face',
    skinVariations: false
  },
  cactus: {
    keywords: ['vegetable', 'plant', 'nature'],
    char: '🌵',
    category: 'animals_and_nature',
    name: 'cactus',
    description: 'Cactus',
    skinVariations: false
  },
  christmas_tree: {
    keywords: ['festival', 'vacation', 'december', 'xmas', 'celebration'],
    char: '🎄',
    category: 'animals_and_nature',
    name: 'christmas_tree',
    description: 'Christmas Tree',
    skinVariations: false
  },
  evergreen_tree: {
    keywords: ['plant', 'nature'],
    char: '🌲',
    category: 'animals_and_nature',
    name: 'evergreen_tree',
    description: 'Evergreen Tree',
    skinVariations: false
  },
  deciduous_tree: {
    keywords: ['plant', 'nature'],
    char: '🌳',
    category: 'animals_and_nature',
    name: 'deciduous_tree',
    description: 'Deciduous Tree',
    skinVariations: false
  },
  palm_tree: {
    keywords: ['plant', 'vegetable', 'nature', 'summer', 'beach', 'mojito', 'tropical'],
    char: '🌴',
    category: 'animals_and_nature',
    name: 'palm_tree',
    description: 'Palm Tree',
    skinVariations: false
  },
  seedling: {
    keywords: ['plant', 'nature', 'grass', 'lawn', 'spring'],
    char: '🌱',
    category: 'animals_and_nature',
    name: 'seedling',
    description: 'Seedling',
    skinVariations: false
  },
  herb: {
    keywords: ['vegetable', 'plant', 'medicine', 'weed', 'grass', 'lawn'],
    char: '🌿',
    category: 'animals_and_nature',
    name: 'herb',
    description: 'Herb',
    skinVariations: false
  },
  shamrock: {
    keywords: ['vegetable', 'plant', 'nature', 'irish', 'clover'],
    char: '☘',
    category: 'animals_and_nature',
    name: 'shamrock',
    description: 'Shamrock',
    skinVariations: false
  },
  four_leaf_clover: {
    keywords: ['vegetable', 'plant', 'nature', 'lucky', 'irish'],
    char: '🍀',
    category: 'animals_and_nature',
    name: 'four_leaf_clover',
    description: 'Four Leaf Clover',
    skinVariations: false
  },
  bamboo: {
    keywords: ['plant', 'nature', 'vegetable', 'panda', 'pine_decoration'],
    char: '🎍',
    category: 'animals_and_nature',
    name: 'bamboo',
    description: 'Pine Decoration',
    skinVariations: false
  },
  tanabata_tree: {
    keywords: ['plant', 'nature', 'branch', 'summer'],
    char: '🎋',
    category: 'animals_and_nature',
    name: 'tanabata_tree',
    description: 'Tanabata Tree',
    skinVariations: false
  },
  leaves: {
    keywords: ['nature', 'plant', 'tree', 'vegetable', 'grass', 'lawn', 'spring'],
    char: '🍃',
    category: 'animals_and_nature',
    name: 'leaves',
    description: 'Leaf Fluttering in Wind',
    skinVariations: false
  },
  fallen_leaf: {
    keywords: ['nature', 'plant', 'vegetable', 'leaves'],
    char: '🍂',
    category: 'animals_and_nature',
    name: 'fallen_leaf',
    description: 'Fallen Leaf',
    skinVariations: false
  },
  maple_leaf: {
    keywords: ['nature', 'plant', 'vegetable', 'ca', 'fall'],
    char: '🍁',
    category: 'animals_and_nature',
    name: 'maple_leaf',
    description: 'Maple Leaf',
    skinVariations: false
  },
  ear_of_rice: {
    keywords: ['nature', 'plant'],
    char: '🌾',
    category: 'animals_and_nature',
    name: 'ear_of_rice',
    description: 'Ear of Rice',
    skinVariations: false
  },
  hibiscus: {
    keywords: ['plant', 'vegetable', 'flowers', 'beach'],
    char: '🌺',
    category: 'animals_and_nature',
    name: 'hibiscus',
    description: 'Hibiscus',
    skinVariations: false
  },
  sunflower: {
    keywords: ['nature', 'plant', 'fall'],
    char: '🌻',
    category: 'animals_and_nature',
    name: 'sunflower',
    description: 'Sunflower',
    skinVariations: false
  },
  rose: {
    keywords: ['flowers', 'valentines', 'love', 'spring'],
    char: '🌹',
    category: 'animals_and_nature',
    name: 'rose',
    description: 'Rose',
    skinVariations: false
  },
  wilted_flower: {
    keywords: ['plant', 'nature', 'flower'],
    char: '🥀',
    category: 'animals_and_nature',
    name: 'wilted_flower',
    description: 'Wilted Flower',
    skinVariations: false
  },
  tulip: {
    keywords: ['flowers', 'plant', 'nature', 'summer', 'spring'],
    char: '🌷',
    category: 'animals_and_nature',
    name: 'tulip',
    description: 'Tulip',
    skinVariations: false
  },
  blossom: {
    keywords: ['nature', 'flowers', 'yellow'],
    char: '🌼',
    category: 'animals_and_nature',
    name: 'blossom',
    description: 'Blossom',
    skinVariations: false
  },
  cherry_blossom: {
    keywords: ['nature', 'plant', 'spring', 'flower'],
    char: '🌸',
    category: 'animals_and_nature',
    name: 'cherry_blossom',
    description: 'Cherry Blossom',
    skinVariations: false
  },
  bouquet: {
    keywords: ['flowers', 'nature', 'spring'],
    char: '💐',
    category: 'animals_and_nature',
    name: 'bouquet',
    description: 'Bouquet',
    skinVariations: false
  },
  mushroom: {
    keywords: ['plant', 'vegetable'],
    char: '🍄',
    category: 'animals_and_nature',
    name: 'mushroom',
    description: 'Mushroom',
    skinVariations: false
  },
  chestnut: {
    keywords: ['food', 'squirrel'],
    char: '🌰',
    category: 'animals_and_nature',
    name: 'chestnut',
    description: 'Chestnut',
    skinVariations: false
  },
  jack_o_lantern: {
    keywords: ['halloween', 'light', 'pumpkin', 'creepy', 'fall'],
    char: '🎃',
    category: 'animals_and_nature',
    name: 'jack_o_lantern',
    description: 'Jack-O-Lantern',
    skinVariations: false
  },
  shell: {
    keywords: ['nature', 'sea', 'beach'],
    char: '🐚',
    category: 'animals_and_nature',
    name: 'shell',
    description: 'Spiral Shell',
    skinVariations: false
  },
  spider_web: {
    keywords: ['animal', 'insect', 'arachnid', 'silk'],
    char: '🕸',
    category: 'animals_and_nature',
    name: 'spider_web',
    description: 'Spider Web',
    skinVariations: false
  },
  earth_americas: {
    keywords: ['globe', 'world', 'USA', 'international'],
    char: '🌎',
    category: 'animals_and_nature',
    name: 'earth_americas',
    description: 'Earth Globe Americas',
    skinVariations: false
  },
  earth_africa: {
    keywords: ['globe', 'world', 'international'],
    char: '🌍',
    category: 'animals_and_nature',
    name: 'earth_africa',
    description: 'Earth Globe Europe-Africa',
    skinVariations: false
  },
  earth_asia: {
    keywords: ['globe', 'world', 'east', 'international'],
    char: '🌏',
    category: 'animals_and_nature',
    name: 'earth_asia',
    description: 'Earth Globe Asia-Australia',
    skinVariations: false
  },
  full_moon: {
    keywords: ['nature', 'yellow', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep'],
    char: '🌕',
    category: 'animals_and_nature',
    name: 'full_moon',
    description: 'Full Moon Symbol',
    skinVariations: false
  },
  waning_gibbous_moon: {
    keywords: [
      'nature',
      'twilight',
      'planet',
      'space',
      'night',
      'evening',
      'sleep',
      'waxing_gibbous_moon'
    ],
    char: '🌖',
    category: 'animals_and_nature',
    name: 'waning_gibbous_moon',
    description: 'Waning Gibbous Moon Symbol',
    skinVariations: false
  },
  last_quarter_moon: {
    keywords: ['nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep'],
    char: '🌗',
    category: 'animals_and_nature',
    name: 'last_quarter_moon',
    description: 'Last Quarter Moon Symbol',
    skinVariations: false
  },
  waning_crescent_moon: {
    keywords: ['nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep'],
    char: '🌘',
    category: 'animals_and_nature',
    name: 'waning_crescent_moon',
    description: 'Waning Crescent Moon Symbol',
    skinVariations: false
  },
  new_moon: {
    keywords: ['nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep'],
    char: '🌑',
    category: 'animals_and_nature',
    name: 'new_moon',
    description: 'New Moon Symbol',
    skinVariations: false
  },
  waxing_crescent_moon: {
    keywords: ['nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep'],
    char: '🌒',
    category: 'animals_and_nature',
    name: 'waxing_crescent_moon',
    description: 'Waxing Crescent Moon Symbol',
    skinVariations: false
  },
  first_quarter_moon: {
    keywords: ['nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep'],
    char: '🌓',
    category: 'animals_and_nature',
    name: 'first_quarter_moon',
    description: 'First Quarter Moon Symbol',
    skinVariations: false
  },
  waxing_gibbous_moon: {
    keywords: ['nature', 'night', 'sky', 'gray', 'twilight', 'planet', 'space', 'evening', 'sleep'],
    char: '🌔',
    category: 'animals_and_nature',
    name: 'waxing_gibbous_moon',
    description: 'Waxing Gibbous Moon Nature',
    skinVariations: false
  },
  new_moon_with_face: {
    keywords: ['nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep'],
    char: '🌚',
    category: 'animals_and_nature',
    name: 'new_moon_with_face',
    description: 'New Moon with Face',
    skinVariations: false
  },
  full_moon_with_face: {
    keywords: ['nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep'],
    char: '🌝',
    category: 'animals_and_nature',
    name: 'full_moon_with_face',
    description: 'Full Moon with Face',
    skinVariations: false
  },
  first_quarter_moon_with_face: {
    keywords: ['nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep'],
    char: '🌛',
    category: 'animals_and_nature',
    name: 'first_quarter_moon_with_face',
    description: 'First Quarter Moon with Face',
    skinVariations: false
  },
  last_quarter_moon_with_face: {
    keywords: ['nature', 'twilight', 'planet', 'space', 'night', 'evening', 'sleep'],
    char: '🌜',
    category: 'animals_and_nature',
    name: 'last_quarter_moon_with_face',
    description: 'Last Quarter Moon with Face',
    skinVariations: false
  },
  sun_with_face: {
    keywords: ['nature', 'morning', 'sky'],
    char: '🌞',
    category: 'animals_and_nature',
    name: 'sun_with_face',
    description: 'Sun with Face',
    skinVariations: false
  },
  crescent_moon: {
    keywords: ['night', 'sleep', 'sky', 'evening', 'magic'],
    char: '🌙',
    category: 'animals_and_nature',
    name: 'crescent_moon',
    description: 'Crescent Moon',
    skinVariations: false
  },
  star: {
    keywords: ['night', 'yellow'],
    char: '⭐',
    category: 'animals_and_nature',
    name: 'star',
    description: 'White Medium Star',
    skinVariations: false
  },
  star2: {
    keywords: ['night', 'sparkle', 'awesome', 'good', 'magic'],
    char: '🌟',
    category: 'animals_and_nature',
    name: 'star2',
    description: 'Glowing Star',
    skinVariations: false
  },
  dizzy: {
    keywords: ['star', 'sparkle', 'shoot', 'magic'],
    char: '💫',
    category: 'animals_and_nature',
    name: 'dizzy',
    description: 'Dizzy Symbol',
    skinVariations: false
  },
  sparkles: {
    keywords: ['stars', 'shine', 'shiny', 'cool', 'awesome', 'good', 'magic'],
    char: '✨',
    category: 'animals_and_nature',
    name: 'sparkles',
    description: 'Sparkles',
    skinVariations: false
  },
  comet: {
    keywords: ['space'],
    char: '☄',
    category: 'animals_and_nature',
    name: 'comet',
    description: 'Comet',
    skinVariations: false
  },
  sunny: {
    keywords: ['weather', 'nature', 'brightness', 'summer', 'beach', 'spring'],
    char: '☀️',
    category: 'animals_and_nature',
    name: 'sunny',
    description: 'Black Sun with Rays',
    skinVariations: false
  },
  sun_behind_small_cloud: {
    keywords: ['weather'],
    char: '🌤',
    category: 'animals_and_nature',
    name: 'sun_behind_small_cloud',
    description: 'Sun Behind Small Cloud Weather',
    skinVariations: false
  },
  partly_sunny: {
    keywords: ['weather', 'nature', 'cloudy', 'morning', 'fall', 'spring'],
    char: '⛅',
    category: 'animals_and_nature',
    name: 'partly_sunny',
    description: 'Sun Behind Cloud',
    skinVariations: false
  },
  sun_behind_large_cloud: {
    keywords: ['weather'],
    char: '🌥',
    category: 'animals_and_nature',
    name: 'sun_behind_large_cloud',
    description: 'Sun Behind Large Cloud Weather',
    skinVariations: false
  },
  sun_behind_rain_cloud: {
    keywords: ['weather'],
    char: '🌦',
    category: 'animals_and_nature',
    name: 'sun_behind_rain_cloud',
    description: 'Sun Behind Rain Cloud Weather',
    skinVariations: false
  },
  cloud: {
    keywords: ['weather', 'sky'],
    char: '☁️',
    category: 'animals_and_nature',
    name: 'cloud',
    description: 'Cloud',
    skinVariations: false
  },
  cloud_with_rain: {
    keywords: ['weather'],
    char: '🌧',
    category: 'animals_and_nature',
    name: 'cloud_with_rain',
    description: 'Cloud With Rain Weather',
    skinVariations: false
  },
  cloud_with_lightning_and_rain: {
    keywords: ['weather', 'lightning'],
    char: '⛈',
    category: 'animals_and_nature',
    name: 'cloud_with_lightning_and_rain',
    description: 'Cloud With Lightning And Rain Weather',
    skinVariations: false
  },
  cloud_with_lightning: {
    keywords: ['weather', 'thunder'],
    char: '🌩',
    category: 'animals_and_nature',
    name: 'cloud_with_lightning',
    description: 'Cloud With Lightning Weather',
    skinVariations: false
  },
  zap: {
    keywords: ['thunder', 'weather', 'lightning bolt', 'fast'],
    char: '⚡',
    category: 'animals_and_nature',
    name: 'zap',
    description: 'High Voltage Sign',
    skinVariations: false
  },
  fire: {
    keywords: ['hot', 'cook', 'flame'],
    char: '🔥',
    category: 'animals_and_nature',
    name: 'fire',
    description: 'Fire',
    skinVariations: false
  },
  boom: {
    keywords: ['bomb', 'explode', 'explosion', 'collision', 'blown'],
    char: '💥',
    category: 'animals_and_nature',
    name: 'boom',
    description: 'Collision Symbol',
    skinVariations: false
  },
  snowflake: {
    keywords: ['winter', 'season', 'cold', 'weather', 'christmas', 'xmas'],
    char: '❄️',
    category: 'animals_and_nature',
    name: 'snowflake',
    description: 'Snowflake',
    skinVariations: false
  },
  cloud_with_snow: {
    keywords: ['weather'],
    char: '🌨',
    category: 'animals_and_nature',
    name: 'cloud_with_snow',
    description: 'Cloud With Snow Weather',
    skinVariations: false
  },
  snowman: {
    keywords: [
      'winter',
      'season',
      'cold',
      'weather',
      'christmas',
      'xmas',
      'frozen',
      'without_snow'
    ],
    char: '⛄',
    category: 'animals_and_nature',
    name: 'snowman',
    description: 'Snowman',
    skinVariations: false
  },
  snowman_with_snow: {
    keywords: ['winter', 'season', 'cold', 'weather', 'christmas', 'xmas', 'frozen'],
    char: '☃',
    category: 'animals_and_nature',
    name: 'snowman_with_snow',
    description: 'Snowman With Snow Winter',
    skinVariations: false
  },
  wind_face: {
    keywords: ['gust', 'air'],
    char: '🌬',
    category: 'animals_and_nature',
    name: 'wind_face',
    description: 'Wind Face Gust',
    skinVariations: false
  },
  dash: {
    keywords: ['wind', 'air', 'fast', 'shoo', 'fart', 'smoke', 'puff'],
    char: '💨',
    category: 'animals_and_nature',
    name: 'dash',
    description: 'Dash Symbol',
    skinVariations: false
  },
  tornado: {
    keywords: ['weather', 'cyclone', 'twister'],
    char: '🌪',
    category: 'animals_and_nature',
    name: 'tornado',
    description: 'Tornado',
    skinVariations: false
  },
  fog: {
    keywords: ['weather'],
    char: '🌫',
    category: 'animals_and_nature',
    name: 'fog',
    description: 'Fog',
    skinVariations: false
  },
  open_umbrella: {
    keywords: ['weather', 'spring'],
    char: '☂',
    category: 'animals_and_nature',
    name: 'open_umbrella',
    description: 'Open Umbrella Weather',
    skinVariations: false
  },
  umbrella: {
    keywords: ['rainy', 'weather', 'spring'],
    char: '☔',
    category: 'animals_and_nature',
    name: 'umbrella',
    description: 'Umbrella',
    skinVariations: false
  },
  droplet: {
    keywords: ['water', 'drip', 'faucet', 'spring'],
    char: '💧',
    category: 'animals_and_nature',
    name: 'droplet',
    description: 'Droplet',
    skinVariations: false
  },
  sweat_drops: {
    keywords: ['water', 'drip', 'oops'],
    char: '💦',
    category: 'animals_and_nature',
    name: 'sweat_drops',
    description: 'Splashing Sweat Symbol',
    skinVariations: false
  },
  ocean: {
    keywords: ['sea', 'water', 'wave', 'nature', 'tsunami', 'disaster'],
    char: '🌊',
    category: 'animals_and_nature',
    name: 'ocean',
    description: 'Water Wave',
    skinVariations: false
  },
  green_apple: {
    keywords: ['fruit', 'nature'],
    char: '🍏',
    category: 'food_and_drink',
    name: 'green_apple',
    description: 'Green Apple',
    skinVariations: false
  },
  apple: {
    keywords: ['fruit', 'mac', 'school'],
    char: '🍎',
    category: 'food_and_drink',
    name: 'apple',
    description: 'Red Apple',
    skinVariations: false
  },
  pear: {
    keywords: ['fruit', 'nature', 'food'],
    char: '🍐',
    category: 'food_and_drink',
    name: 'pear',
    description: 'Pear',
    skinVariations: false
  },
  tangerine: {
    keywords: ['food', 'fruit', 'nature', 'orange'],
    char: '🍊',
    category: 'food_and_drink',
    name: 'tangerine',
    description: 'Tangerine',
    skinVariations: false
  },
  lemon: {
    keywords: ['fruit', 'nature'],
    char: '🍋',
    category: 'food_and_drink',
    name: 'lemon',
    description: 'Lemon',
    skinVariations: false
  },
  banana: {
    keywords: ['fruit', 'food', 'monkey'],
    char: '🍌',
    category: 'food_and_drink',
    name: 'banana',
    description: 'Banana',
    skinVariations: false
  },
  watermelon: {
    keywords: ['fruit', 'food', 'picnic', 'summer'],
    char: '🍉',
    category: 'food_and_drink',
    name: 'watermelon',
    description: 'Watermelon',
    skinVariations: false
  },
  grapes: {
    keywords: ['fruit', 'food', 'wine'],
    char: '🍇',
    category: 'food_and_drink',
    name: 'grapes',
    description: 'Grapes',
    skinVariations: false
  },
  strawberry: {
    keywords: ['fruit', 'food', 'nature'],
    char: '🍓',
    category: 'food_and_drink',
    name: 'strawberry',
    description: 'Strawberry',
    skinVariations: false
  },
  melon: {
    keywords: ['fruit', 'nature', 'food'],
    char: '🍈',
    category: 'food_and_drink',
    name: 'melon',
    description: 'Melon',
    skinVariations: false
  },
  cherries: {
    keywords: ['food', 'fruit'],
    char: '🍒',
    category: 'food_and_drink',
    name: 'cherries',
    description: 'Cherries',
    skinVariations: false
  },
  peach: {
    keywords: ['fruit', 'nature', 'food'],
    char: '🍑',
    category: 'food_and_drink',
    name: 'peach',
    description: 'Peach',
    skinVariations: false
  },
  pineapple: {
    keywords: ['fruit', 'nature', 'food'],
    char: '🍍',
    category: 'food_and_drink',
    name: 'pineapple',
    description: 'Pineapple',
    skinVariations: false
  },
  coconut: {
    keywords: ['fruit', 'nature', 'food', 'palm'],
    char: '🥥',
    category: 'food_and_drink',
    name: 'coconut',
    description: 'Coconut',
    skinVariations: false
  },
  kiwi_fruit: {
    keywords: ['fruit', 'food'],
    char: '🥝',
    category: 'food_and_drink',
    name: 'kiwi_fruit',
    description: 'Kiwi Fruit',
    skinVariations: false
  },
  mango: {
    keywords: ['fruit', 'food', 'tropical'],
    char: '🥭',
    category: 'food_and_drink',
    name: 'mango',
    description: 'Mango Fruit',
    skinVariations: false
  },
  avocado: {
    keywords: ['fruit', 'food'],
    char: '🥑',
    category: 'food_and_drink',
    name: 'avocado',
    description: 'Avocado',
    skinVariations: false
  },
  broccoli: {
    keywords: ['fruit', 'food', 'vegetable'],
    char: '🥦',
    category: 'food_and_drink',
    name: 'broccoli',
    description: 'Broccoli',
    skinVariations: false
  },
  tomato: {
    keywords: ['fruit', 'vegetable', 'nature', 'food'],
    char: '🍅',
    category: 'food_and_drink',
    name: 'tomato',
    description: 'Tomato',
    skinVariations: false
  },
  eggplant: {
    keywords: ['vegetable', 'nature', 'food', 'aubergine'],
    char: '🍆',
    category: 'food_and_drink',
    name: 'eggplant',
    description: 'Aubergine',
    skinVariations: false
  },
  cucumber: {
    keywords: ['fruit', 'food', 'pickle'],
    char: '🥒',
    category: 'food_and_drink',
    name: 'cucumber',
    description: 'Cucumber',
    skinVariations: false
  },
  carrot: {
    keywords: ['vegetable', 'food', 'orange'],
    char: '🥕',
    category: 'food_and_drink',
    name: 'carrot',
    description: 'Carrot',
    skinVariations: false
  },
  hot_pepper: {
    keywords: ['food', 'spicy', 'chilli', 'chili'],
    char: '🌶',
    category: 'food_and_drink',
    name: 'hot_pepper',
    description: 'Hot Pepper',
    skinVariations: false
  },
  potato: {
    keywords: ['food', 'tuber', 'vegatable', 'starch'],
    char: '🥔',
    category: 'food_and_drink',
    name: 'potato',
    description: 'Potato',
    skinVariations: false
  },
  corn: {
    keywords: ['food', 'vegetable', 'plant'],
    char: '🌽',
    category: 'food_and_drink',
    name: 'corn',
    description: 'Ear of Maize',
    skinVariations: false
  },
  leafy_greens: {
    keywords: ['food', 'vegetable', 'plant', 'bok choy', 'cabbage', 'kale', 'lettuce'],
    char: '🥬',
    category: 'food_and_drink',
    name: 'leafy_greens',
    description: 'Leafy Greens Food',
    skinVariations: false
  },
  sweet_potato: {
    keywords: ['food', 'nature'],
    char: '🍠',
    category: 'food_and_drink',
    name: 'sweet_potato',
    description: 'Roasted Sweet Potato',
    skinVariations: false
  },
  peanuts: {
    keywords: ['food', 'nut'],
    char: '🥜',
    category: 'food_and_drink',
    name: 'peanuts',
    description: 'Peanuts',
    skinVariations: false
  },
  honey_pot: {
    keywords: ['bees', 'sweet', 'kitchen'],
    char: '🍯',
    category: 'food_and_drink',
    name: 'honey_pot',
    description: 'Honey Pot',
    skinVariations: false
  },
  croissant: {
    keywords: ['food', 'bread', 'french'],
    char: '🥐',
    category: 'food_and_drink',
    name: 'croissant',
    description: 'Croissant',
    skinVariations: false
  },
  bread: {
    keywords: ['food', 'wheat', 'breakfast', 'toast'],
    char: '🍞',
    category: 'food_and_drink',
    name: 'bread',
    description: 'Bread',
    skinVariations: false
  },
  baguette_bread: {
    keywords: ['food', 'bread', 'french'],
    char: '🥖',
    category: 'food_and_drink',
    name: 'baguette_bread',
    description: 'Baguette Bread',
    skinVariations: false
  },
  bagel: {
    keywords: ['food', 'bread', 'bakery', 'schmear'],
    char: '🥯',
    category: 'food_and_drink',
    name: 'bagel',
    description: 'Bagel Food',
    skinVariations: false
  },
  pretzel: {
    keywords: ['food', 'bread', 'twisted'],
    char: '🥨',
    category: 'food_and_drink',
    name: 'pretzel',
    description: 'Pretzel',
    skinVariations: false
  },
  cheese: {
    keywords: ['food', 'chadder'],
    char: '🧀',
    category: 'food_and_drink',
    name: 'cheese',
    description: 'Cheese Food',
    skinVariations: false
  },
  egg: {
    keywords: ['food', 'chicken', 'breakfast'],
    char: '🥚',
    category: 'food_and_drink',
    name: 'egg',
    description: 'Egg',
    skinVariations: false
  },
  bacon: {
    keywords: ['food', 'breakfast', 'pork', 'pig', 'meat'],
    char: '🥓',
    category: 'food_and_drink',
    name: 'bacon',
    description: 'Bacon',
    skinVariations: false
  },
  steak: {
    keywords: ['food', 'cow', 'meat', 'cut', 'chop', 'lambchop', 'porkchop'],
    char: '🥩',
    category: 'food_and_drink',
    name: 'steak',
    description: 'Steak Food',
    skinVariations: false
  },
  pancakes: {
    keywords: ['food', 'breakfast', 'flapjacks', 'hotcakes'],
    char: '🥞',
    category: 'food_and_drink',
    name: 'pancakes',
    description: 'Pancakes',
    skinVariations: false
  },
  poultry_leg: {
    keywords: ['food', 'meat', 'drumstick', 'bird', 'chicken', 'turkey'],
    char: '🍗',
    category: 'food_and_drink',
    name: 'poultry_leg',
    description: 'Poultry Leg',
    skinVariations: false
  },
  meat_on_bone: {
    keywords: ['good', 'food', 'drumstick'],
    char: '🍖',
    category: 'food_and_drink',
    name: 'meat_on_bone',
    description: 'Meat on Bone',
    skinVariations: false
  },
  bone: {
    keywords: ['skeleton'],
    char: '🦴',
    category: 'food_and_drink',
    name: 'bone',
    description: 'Bone Skeleton',
    skinVariations: false
  },
  fried_shrimp: {
    keywords: ['food', 'animal', 'appetizer', 'summer'],
    char: '🍤',
    category: 'food_and_drink',
    name: 'fried_shrimp',
    description: 'Fried Shrimp',
    skinVariations: false
  },
  fried_egg: {
    keywords: ['food', 'breakfast', 'kitchen', 'egg'],
    char: '🍳',
    category: 'food_and_drink',
    name: 'fried_egg',
    description: 'Cooking',
    skinVariations: false
  },
  hamburger: {
    keywords: ['meat', 'fast food', 'beef', 'cheeseburger', 'mcdonalds', 'burger king'],
    char: '🍔',
    category: 'food_and_drink',
    name: 'hamburger',
    description: 'Hamburger',
    skinVariations: false
  },
  fries: {
    keywords: ['chips', 'snack', 'fast food'],
    char: '🍟',
    category: 'food_and_drink',
    name: 'fries',
    description: 'French Fries',
    skinVariations: false
  },
  stuffed_flatbread: {
    keywords: ['food', 'flatbread', 'stuffed', 'gyro'],
    char: '🥙',
    category: 'food_and_drink',
    name: 'stuffed_flatbread',
    description: 'Stuffed Flatbread',
    skinVariations: false
  },
  hotdog: {
    keywords: ['food', 'frankfurter'],
    char: '🌭',
    category: 'food_and_drink',
    name: 'hotdog',
    description: 'Hot Dog',
    skinVariations: false
  },
  pizza: {
    keywords: ['food', 'party'],
    char: '🍕',
    category: 'food_and_drink',
    name: 'pizza',
    description: 'Slice of Pizza',
    skinVariations: false
  },
  sandwich: {
    keywords: ['food', 'lunch', 'bread'],
    char: '🥪',
    category: 'food_and_drink',
    name: 'sandwich',
    description: 'Sandwich',
    skinVariations: false
  },
  canned_food: {
    keywords: ['food', 'soup'],
    char: '🥫',
    category: 'food_and_drink',
    name: 'canned_food',
    description: 'Canned Food',
    skinVariations: false
  },
  spaghetti: {
    keywords: ['food', 'italian', 'noodle'],
    char: '🍝',
    category: 'food_and_drink',
    name: 'spaghetti',
    description: 'Spaghetti',
    skinVariations: false
  },
  taco: {
    keywords: ['food', 'mexican'],
    char: '🌮',
    category: 'food_and_drink',
    name: 'taco',
    description: 'Taco',
    skinVariations: false
  },
  burrito: {
    keywords: ['food', 'mexican'],
    char: '🌯',
    category: 'food_and_drink',
    name: 'burrito',
    description: 'Burrito',
    skinVariations: false
  },
  green_salad: {
    keywords: ['food', 'healthy', 'lettuce'],
    char: '🥗',
    category: 'food_and_drink',
    name: 'green_salad',
    description: 'Green Salad',
    skinVariations: false
  },
  shallow_pan_of_food: {
    keywords: ['food', 'cooking', 'casserole', 'paella'],
    char: '🥘',
    category: 'food_and_drink',
    name: 'shallow_pan_of_food',
    description: 'Shallow Pan of Food',
    skinVariations: false
  },
  ramen: {
    keywords: ['food', 'japanese', 'noodle', 'chopsticks'],
    char: '🍜',
    category: 'food_and_drink',
    name: 'ramen',
    description: 'Steaming Bowl',
    skinVariations: false
  },
  stew: {
    keywords: ['food', 'meat', 'soup'],
    char: '🍲',
    category: 'food_and_drink',
    name: 'stew',
    description: 'Pot of Food',
    skinVariations: false
  },
  fish_cake: {
    keywords: [
      'food',
      'japan',
      'sea',
      'beach',
      'narutomaki',
      'pink',
      'swirl',
      'kamaboko',
      'surimi',
      'ramen'
    ],
    char: '🍥',
    category: 'food_and_drink',
    name: 'fish_cake',
    description: 'Fish Cake with Swirl Design',
    skinVariations: false
  },
  fortune_cookie: {
    keywords: ['food', 'prophecy'],
    char: '🥠',
    category: 'food_and_drink',
    name: 'fortune_cookie',
    description: 'Fortune Cookie',
    skinVariations: false
  },
  sushi: {
    keywords: ['food', 'fish', 'japanese', 'rice'],
    char: '🍣',
    category: 'food_and_drink',
    name: 'sushi',
    description: 'Sushi',
    skinVariations: false
  },
  bento: {
    keywords: ['food', 'japanese', 'box'],
    char: '🍱',
    category: 'food_and_drink',
    name: 'bento',
    description: 'Bento Box',
    skinVariations: false
  },
  curry: {
    keywords: ['food', 'spicy', 'hot', 'indian'],
    char: '🍛',
    category: 'food_and_drink',
    name: 'curry',
    description: 'Curry and Rice',
    skinVariations: false
  },
  rice_ball: {
    keywords: ['food', 'japanese'],
    char: '🍙',
    category: 'food_and_drink',
    name: 'rice_ball',
    description: 'Rice Ball',
    skinVariations: false
  },
  rice: {
    keywords: ['food', 'china', 'asian'],
    char: '🍚',
    category: 'food_and_drink',
    name: 'rice',
    description: 'Cooked Rice',
    skinVariations: false
  },
  rice_cracker: {
    keywords: ['food', 'japanese'],
    char: '🍘',
    category: 'food_and_drink',
    name: 'rice_cracker',
    description: 'Rice Cracker',
    skinVariations: false
  },
  oden: {
    keywords: ['food', 'japanese'],
    char: '🍢',
    category: 'food_and_drink',
    name: 'oden',
    description: 'Oden',
    skinVariations: false
  },
  dango: {
    keywords: ['food', 'dessert', 'sweet', 'japanese', 'barbecue', 'meat'],
    char: '🍡',
    category: 'food_and_drink',
    name: 'dango',
    description: 'Dango',
    skinVariations: false
  },
  shaved_ice: {
    keywords: ['hot', 'dessert', 'summer'],
    char: '🍧',
    category: 'food_and_drink',
    name: 'shaved_ice',
    description: 'Shaved Ice',
    skinVariations: false
  },
  ice_cream: {
    keywords: ['food', 'hot', 'dessert'],
    char: '🍨',
    category: 'food_and_drink',
    name: 'ice_cream',
    description: 'Ice Cream',
    skinVariations: false
  },
  icecream: {
    keywords: ['food', 'hot', 'dessert', 'summer'],
    char: '🍦',
    category: 'food_and_drink',
    name: 'icecream',
    description: 'Soft Ice Cream',
    skinVariations: false
  },
  pie: {
    keywords: ['food', 'dessert', 'pastry'],
    char: '🥧',
    category: 'food_and_drink',
    name: 'pie',
    description: 'Pie',
    skinVariations: false
  },
  cake: {
    keywords: ['food', 'dessert'],
    char: '🍰',
    category: 'food_and_drink',
    name: 'cake',
    description: 'Shortcake',
    skinVariations: false
  },
  cupcake: {
    keywords: ['food', 'dessert', 'bakery', 'sweet'],
    char: '🧁',
    category: 'food_and_drink',
    name: 'cupcake',
    description: 'Cupcake Food',
    skinVariations: false
  },
  moon_cake: {
    keywords: ['food', 'autumn'],
    char: '🥮',
    category: 'food_and_drink',
    name: 'moon_cake',
    description: 'Moon Cake Food',
    skinVariations: false
  },
  birthday: {
    keywords: ['food', 'dessert', 'cake'],
    char: '🎂',
    category: 'food_and_drink',
    name: 'birthday',
    description: 'Birthday Cake',
    skinVariations: false
  },
  custard: {
    keywords: ['dessert', 'food'],
    char: '🍮',
    category: 'food_and_drink',
    name: 'custard',
    description: 'Custard',
    skinVariations: false
  },
  candy: {
    keywords: ['snack', 'dessert', 'sweet', 'lolly'],
    char: '🍬',
    category: 'food_and_drink',
    name: 'candy',
    description: 'Candy',
    skinVariations: false
  },
  lollipop: {
    keywords: ['food', 'snack', 'candy', 'sweet'],
    char: '🍭',
    category: 'food_and_drink',
    name: 'lollipop',
    description: 'Lollipop',
    skinVariations: false
  },
  chocolate_bar: {
    keywords: ['food', 'snack', 'dessert', 'sweet'],
    char: '🍫',
    category: 'food_and_drink',
    name: 'chocolate_bar',
    description: 'Chocolate Bar',
    skinVariations: false
  },
  popcorn: {
    keywords: ['food', 'movie theater', 'films', 'snack'],
    char: '🍿',
    category: 'food_and_drink',
    name: 'popcorn',
    description: 'Popcorn',
    skinVariations: false
  },
  dumpling: {
    keywords: ['food', 'empanada', 'pierogi', 'potsticker'],
    char: '🥟',
    category: 'food_and_drink',
    name: 'dumpling',
    description: 'Dumpling',
    skinVariations: false
  },
  doughnut: {
    keywords: ['food', 'dessert', 'snack', 'sweet', 'donut'],
    char: '🍩',
    category: 'food_and_drink',
    name: 'doughnut',
    description: 'Doughnut',
    skinVariations: false
  },
  cookie: {
    keywords: ['food', 'snack', 'oreo', 'chocolate', 'sweet', 'dessert'],
    char: '🍪',
    category: 'food_and_drink',
    name: 'cookie',
    description: 'Cookie',
    skinVariations: false
  },
  milk_glass: {
    keywords: ['beverage', 'drink', 'cow'],
    char: '🥛',
    category: 'food_and_drink',
    name: 'milk_glass',
    description: 'Milk Glass Beverage',
    skinVariations: false
  },
  beer: {
    keywords: ['relax', 'beverage', 'drink', 'drunk', 'party', 'pub', 'summer', 'alcohol', 'booze'],
    char: '🍺',
    category: 'food_and_drink',
    name: 'beer',
    description: 'Beer Mug',
    skinVariations: false
  },
  beers: {
    keywords: ['relax', 'beverage', 'drink', 'drunk', 'party', 'pub', 'summer', 'alcohol', 'booze'],
    char: '🍻',
    category: 'food_and_drink',
    name: 'beers',
    description: 'Clinking Beer Mugs',
    skinVariations: false
  },
  clinking_glasses: {
    keywords: [
      'beverage',
      'drink',
      'party',
      'alcohol',
      'celebrate',
      'cheers',
      'wine',
      'champagne',
      'toast'
    ],
    char: '🥂',
    category: 'food_and_drink',
    name: 'clinking_glasses',
    description: 'Clinking Glasses',
    skinVariations: false
  },
  wine_glass: {
    keywords: ['drink', 'beverage', 'drunk', 'alcohol', 'booze'],
    char: '🍷',
    category: 'food_and_drink',
    name: 'wine_glass',
    description: 'Wine Glass',
    skinVariations: false
  },
  tumbler_glass: {
    keywords: [
      'drink',
      'beverage',
      'drunk',
      'alcohol',
      'liquor',
      'booze',
      'bourbon',
      'scotch',
      'whisky',
      'glass',
      'shot'
    ],
    char: '🥃',
    category: 'food_and_drink',
    name: 'tumbler_glass',
    description: 'Tumbler Glass',
    skinVariations: false
  },
  cocktail: {
    keywords: ['drink', 'drunk', 'alcohol', 'beverage', 'booze', 'mojito'],
    char: '🍸',
    category: 'food_and_drink',
    name: 'cocktail',
    description: 'Cocktail Glass',
    skinVariations: false
  },
  tropical_drink: {
    keywords: ['beverage', 'cocktail', 'summer', 'beach', 'alcohol', 'booze', 'mojito'],
    char: '🍹',
    category: 'food_and_drink',
    name: 'tropical_drink',
    description: 'Tropical Drink',
    skinVariations: false
  },
  champagne: {
    keywords: ['drink', 'wine', 'bottle', 'celebration'],
    char: '🍾',
    category: 'food_and_drink',
    name: 'champagne',
    description: 'Bottle with Popping Cork',
    skinVariations: false
  },
  sake: {
    keywords: ['wine', 'drink', 'drunk', 'beverage', 'japanese', 'alcohol', 'booze'],
    char: '🍶',
    category: 'food_and_drink',
    name: 'sake',
    description: 'Sake Bottle and Cup',
    skinVariations: false
  },
  tea: {
    keywords: ['drink', 'bowl', 'breakfast', 'green', 'british'],
    char: '🍵',
    category: 'food_and_drink',
    name: 'tea',
    description: 'Teacup Without Handle',
    skinVariations: false
  },
  cup_with_straw: {
    keywords: ['drink', 'soda'],
    char: '🥤',
    category: 'food_and_drink',
    name: 'cup_with_straw',
    description: 'Cup with Straw',
    skinVariations: false
  },
  coffee: {
    keywords: ['beverage', 'caffeine', 'latte', 'espresso'],
    char: '☕',
    category: 'food_and_drink',
    name: 'coffee',
    description: 'Hot Beverage',
    skinVariations: false
  },
  baby_bottle: {
    keywords: ['food', 'container', 'milk'],
    char: '🍼',
    category: 'food_and_drink',
    name: 'baby_bottle',
    description: 'Baby Bottle',
    skinVariations: false
  },
  salt: {
    keywords: ['condiment', 'shaker'],
    char: '🧂',
    category: 'food_and_drink',
    name: 'salt',
    description: 'Salt Condiment',
    skinVariations: false
  },
  spoon: {
    keywords: ['cutlery', 'kitchen', 'tableware'],
    char: '🥄',
    category: 'food_and_drink',
    name: 'spoon',
    description: 'Spoon',
    skinVariations: false
  },
  fork_and_knife: {
    keywords: ['cutlery', 'kitchen'],
    char: '🍴',
    category: 'food_and_drink',
    name: 'fork_and_knife',
    description: 'Fork and Knife',
    skinVariations: false
  },
  plate_with_cutlery: {
    keywords: ['food', 'eat', 'meal', 'lunch', 'dinner', 'restaurant'],
    char: '🍽',
    category: 'food_and_drink',
    name: 'plate_with_cutlery',
    description: 'Plate With Cutlery Food',
    skinVariations: false
  },
  bowl_with_spoon: {
    keywords: ['food', 'breakfast', 'cereal', 'oatmeal', 'porridge'],
    char: '🥣',
    category: 'food_and_drink',
    name: 'bowl_with_spoon',
    description: 'Bowl with Spoon',
    skinVariations: false
  },
  takeout_box: {
    keywords: ['food', 'leftovers'],
    char: '🥡',
    category: 'food_and_drink',
    name: 'takeout_box',
    description: 'Takeout Box',
    skinVariations: false
  },
  chopsticks: {
    keywords: ['food'],
    char: '🥢',
    category: 'food_and_drink',
    name: 'chopsticks',
    description: 'Chopsticks',
    skinVariations: false
  },
  soccer: {
    keywords: ['sports', 'football'],
    char: '⚽',
    category: 'activity',
    name: 'soccer',
    description: 'Soccer Ball',
    skinVariations: false
  },
  basketball: {
    keywords: ['sports', 'balls', 'NBA'],
    char: '🏀',
    category: 'activity',
    name: 'basketball',
    description: 'Basketball and Hoop',
    skinVariations: false
  },
  football: {
    keywords: ['sports', 'balls', 'NFL'],
    char: '🏈',
    category: 'activity',
    name: 'football',
    description: 'American Football',
    skinVariations: false
  },
  baseball: {
    keywords: ['sports', 'balls'],
    char: '⚾',
    category: 'activity',
    name: 'baseball',
    description: 'Baseball',
    skinVariations: false
  },
  softball: {
    keywords: ['sports', 'balls'],
    char: '🥎',
    category: 'activity',
    name: 'softball',
    description: 'Softball Sports',
    skinVariations: false
  },
  tennis: {
    keywords: ['sports', 'balls', 'green'],
    char: '🎾',
    category: 'activity',
    name: 'tennis',
    description: 'Tennis Racquet and Ball',
    skinVariations: false
  },
  volleyball: {
    keywords: ['sports', 'balls'],
    char: '🏐',
    category: 'activity',
    name: 'volleyball',
    description: 'Volleyball',
    skinVariations: false
  },
  rugby_football: {
    keywords: ['sports', 'team'],
    char: '🏉',
    category: 'activity',
    name: 'rugby_football',
    description: 'Rugby Football',
    skinVariations: false
  },
  flying_disc: {
    keywords: ['sports', 'frisbee', 'ultimate'],
    char: '🥏',
    category: 'activity',
    name: 'flying_disc',
    description: 'Flying Disc Sports',
    skinVariations: false
  },
  '8ball': {
    keywords: ['pool', 'hobby', 'game', 'luck', 'magic'],
    char: '🎱',
    category: 'activity',
    name: '8ball',
    description: 'Billiards',
    skinVariations: false
  },
  golf: {
    keywords: ['sports', 'business', 'flag', 'hole', 'summer'],
    char: '⛳',
    category: 'activity',
    name: 'golf',
    description: 'Flag in Hole',
    skinVariations: false
  },
  golfing_woman: {
    keywords: ['sports', 'business', 'woman', 'female'],
    char: '🏌️‍♀️',
    category: 'activity',
    name: 'golfing_woman',
    description: 'Golfing Woman Sports',
    skinVariations: false
  },
  golfing_man: {
    keywords: ['sports', 'business'],
    char: '🏌',
    category: 'activity',
    name: 'golfing_man',
    description: 'Golfing Man Sports',
    skinVariations: true
  },
  ping_pong: {
    keywords: ['sports', 'pingpong'],
    char: '🏓',
    category: 'activity',
    name: 'ping_pong',
    description: 'Ping Pong Sports',
    skinVariations: false
  },
  badminton: {
    keywords: ['sports'],
    char: '🏸',
    category: 'activity',
    name: 'badminton',
    description: 'Badminton Sports',
    skinVariations: false
  },
  goal_net: {
    keywords: ['sports'],
    char: '🥅',
    category: 'activity',
    name: 'goal_net',
    description: 'Goal Net',
    skinVariations: false
  },
  ice_hockey: {
    keywords: ['sports'],
    char: '🏒',
    category: 'activity',
    name: 'ice_hockey',
    description: 'Ice Hockey Sports',
    skinVariations: false
  },
  field_hockey: {
    keywords: ['sports'],
    char: '🏑',
    category: 'activity',
    name: 'field_hockey',
    description: 'Field Hockey Sports',
    skinVariations: false
  },
  lacrosse: {
    keywords: ['sports', 'ball', 'stick'],
    char: '🥍',
    category: 'activity',
    name: 'lacrosse',
    description: 'Lacrosse Sports',
    skinVariations: false
  },
  cricket: {
    keywords: ['sports'],
    char: '🏏',
    category: 'activity',
    name: 'cricket',
    description: 'Cricket',
    skinVariations: false
  },
  ski: {
    keywords: ['sports', 'winter', 'cold', 'snow'],
    char: '🎿',
    category: 'activity',
    name: 'ski',
    description: 'Ski and Ski Boot',
    skinVariations: false
  },
  skier: {
    keywords: ['sports', 'winter', 'snow'],
    char: '⛷',
    category: 'activity',
    name: 'skier',
    description: 'Skier',
    skinVariations: false
  },
  snowboarder: {
    keywords: ['sports', 'winter'],
    char: '🏂',
    category: 'activity',
    name: 'snowboarder',
    description: 'Snowboarder',
    skinVariations: true
  },
  person_fencing: {
    keywords: ['sports', 'fencing', 'sword'],
    char: '🤺',
    category: 'activity',
    name: 'person_fencing',
    description: 'Person Fencing Sports',
    skinVariations: false
  },
  women_wrestling: {
    keywords: ['sports', 'wrestlers'],
    char: '🤼‍♀️',
    category: 'activity',
    name: 'women_wrestling',
    description: 'Women Wrestling Sports',
    skinVariations: false
  },
  men_wrestling: {
    keywords: ['sports', 'wrestlers'],
    char: '🤼‍♂️',
    category: 'activity',
    name: 'men_wrestling',
    description: 'Men Wrestling Sports',
    skinVariations: false
  },
  woman_cartwheeling: {
    keywords: ['gymnastics'],
    char: '🤸‍♀️',
    category: 'activity',
    name: 'woman_cartwheeling',
    description: 'Woman Cartwheeling Gymnastics',
    skinVariations: true
  },
  man_cartwheeling: {
    keywords: ['gymnastics'],
    char: '🤸‍♂️',
    category: 'activity',
    name: 'man_cartwheeling',
    description: 'Man Cartwheeling Gymnastics',
    skinVariations: true
  },
  woman_playing_handball: {
    keywords: ['sports'],
    char: '🤾‍♀️',
    category: 'activity',
    name: 'woman_playing_handball',
    description: 'Woman Playing Handball Sports',
    skinVariations: true
  },
  man_playing_handball: {
    keywords: ['sports'],
    char: '🤾‍♂️',
    category: 'activity',
    name: 'man_playing_handball',
    description: 'Man Playing Handball Sports',
    skinVariations: true
  },
  ice_skate: {
    keywords: ['sports'],
    char: '⛸',
    category: 'activity',
    name: 'ice_skate',
    description: 'Ice Skate',
    skinVariations: false
  },
  curling_stone: {
    keywords: ['sports'],
    char: '🥌',
    category: 'activity',
    name: 'curling_stone',
    description: 'Curling Stone',
    skinVariations: false
  },
  skateboard: {
    keywords: ['board'],
    char: '🛹',
    category: 'activity',
    name: 'skateboard',
    description: 'Skateboard',
    skinVariations: false
  },
  sled: {
    keywords: ['sleigh', 'luge', 'toboggan'],
    char: '🛷',
    category: 'activity',
    name: 'sled',
    description: 'Sled',
    skinVariations: false
  },
  bow_and_arrow: {
    keywords: ['sports'],
    char: '🏹',
    category: 'activity',
    name: 'bow_and_arrow',
    description: 'Bow and Arrow',
    skinVariations: false
  },
  fishing_pole_and_fish: {
    keywords: ['food', 'hobby', 'summer'],
    char: '🎣',
    category: 'activity',
    name: 'fishing_pole_and_fish',
    description: 'Fishing Pole and Fish',
    skinVariations: false
  },
  boxing_glove: {
    keywords: ['sports', 'fighting'],
    char: '🥊',
    category: 'activity',
    name: 'boxing_glove',
    description: 'Boxing Glove',
    skinVariations: false
  },
  martial_arts_uniform: {
    keywords: ['judo', 'karate', 'taekwondo'],
    char: '🥋',
    category: 'activity',
    name: 'martial_arts_uniform',
    description: 'Martial Arts Uniform',
    skinVariations: false
  },
  rowing_woman: {
    keywords: ['sports', 'hobby', 'water', 'ship', 'woman', 'female'],
    char: '🚣‍♀️',
    category: 'activity',
    name: 'rowing_woman',
    description: 'Rowing Woman Sports',
    skinVariations: true
  },
  rowing_man: {
    keywords: ['sports', 'hobby', 'water', 'ship'],
    char: '🚣',
    category: 'activity',
    name: 'rowing_man',
    description: 'Rowing Man Sports',
    skinVariations: true
  },
  climbing_woman: {
    keywords: ['sports', 'hobby', 'woman', 'female', 'rock'],
    char: '🧗‍♀️',
    category: 'activity',
    name: 'climbing_woman',
    description: 'Climbing Woman Sports',
    skinVariations: true
  },
  climbing_man: {
    keywords: ['sports', 'hobby', 'man', 'male', 'rock'],
    char: '🧗‍♂️',
    category: 'activity',
    name: 'climbing_man',
    description: 'Climbing Man Sports',
    skinVariations: true
  },
  swimming_woman: {
    keywords: ['sports', 'exercise', 'human', 'athlete', 'water', 'summer', 'woman', 'female'],
    char: '🏊‍♀️',
    category: 'activity',
    name: 'swimming_woman',
    description: 'Swimming Woman Sports',
    skinVariations: true
  },
  swimming_man: {
    keywords: ['sports', 'exercise', 'human', 'athlete', 'water', 'summer'],
    char: '🏊',
    category: 'activity',
    name: 'swimming_man',
    description: 'Swimming Man Sports',
    skinVariations: true
  },
  woman_playing_water_polo: {
    keywords: ['sports', 'pool'],
    char: '🤽‍♀️',
    category: 'activity',
    name: 'woman_playing_water_polo',
    description: 'Woman Playing Water Polo Sports',
    skinVariations: true
  },
  man_playing_water_polo: {
    keywords: ['sports', 'pool'],
    char: '🤽‍♂️',
    category: 'activity',
    name: 'man_playing_water_polo',
    description: 'Man Playing Water Polo Sports',
    skinVariations: true
  },
  woman_in_lotus_position: {
    keywords: ['woman', 'female', 'meditation', 'yoga', 'serenity', 'zen', 'mindfulness'],
    char: '🧘‍♀️',
    category: 'activity',
    name: 'woman_in_lotus_position',
    description: 'Woman in Lotus Position',
    skinVariations: true
  },
  man_in_lotus_position: {
    keywords: ['man', 'male', 'meditation', 'yoga', 'serenity', 'zen', 'mindfulness'],
    char: '🧘‍♂️',
    category: 'activity',
    name: 'man_in_lotus_position',
    description: 'Man in Lotus Position',
    skinVariations: true
  },
  surfing_woman: {
    keywords: ['sports', 'ocean', 'sea', 'summer', 'beach', 'woman', 'female'],
    char: '🏄‍♀️',
    category: 'activity',
    name: 'surfing_woman',
    description: 'Surfing Woman Sports',
    skinVariations: true
  },
  surfing_man: {
    keywords: ['sports', 'ocean', 'sea', 'summer', 'beach'],
    char: '🏄',
    category: 'activity',
    name: 'surfing_man',
    description: 'Surfing Man Sports',
    skinVariations: true
  },
  bath: {
    keywords: ['clean', 'shower', 'bathroom'],
    char: '🛀',
    category: 'activity',
    name: 'bath',
    description: 'Bath',
    skinVariations: true
  },
  basketball_woman: {
    keywords: ['sports', 'human', 'woman', 'female'],
    char: '⛹️‍♀️',
    category: 'activity',
    name: 'basketball_woman',
    description: 'Basketball Woman Sports',
    skinVariations: true
  },
  basketball_man: {
    keywords: ['sports', 'human'],
    char: '⛹',
    category: 'activity',
    name: 'basketball_man',
    description: 'Basketball Man Sports',
    skinVariations: true
  },
  weight_lifting_woman: {
    keywords: ['sports', 'training', 'exercise', 'woman', 'female'],
    char: '🏋️‍♀️',
    category: 'activity',
    name: 'weight_lifting_woman',
    description: 'Weight Lifting Woman Sports',
    skinVariations: true
  },
  weight_lifting_man: {
    keywords: ['sports', 'training', 'exercise'],
    char: '🏋',
    category: 'activity',
    name: 'weight_lifting_man',
    description: 'Weight Lifting Man Sports',
    skinVariations: true
  },
  biking_woman: {
    keywords: ['sports', 'bike', 'exercise', 'hipster', 'woman', 'female'],
    char: '🚴‍♀️',
    category: 'activity',
    name: 'biking_woman',
    description: 'Biking Woman Sports',
    skinVariations: true
  },
  biking_man: {
    keywords: ['sports', 'bike', 'exercise', 'hipster'],
    char: '🚴',
    category: 'activity',
    name: 'biking_man',
    description: 'Biking Man Sports',
    skinVariations: true
  },
  mountain_biking_woman: {
    keywords: ['transportation', 'sports', 'human', 'race', 'bike', 'woman', 'female'],
    char: '🚵‍♀️',
    category: 'activity',
    name: 'mountain_biking_woman',
    description: 'Mountain Biking Woman Transportation',
    skinVariations: true
  },
  mountain_biking_man: {
    keywords: ['transportation', 'sports', 'human', 'race', 'bike'],
    char: '🚵',
    category: 'activity',
    name: 'mountain_biking_man',
    description: 'Mountain Biking Man Transportation',
    skinVariations: true
  },
  horse_racing: {
    keywords: ['animal', 'betting', 'competition', 'gambling', 'luck'],
    char: '🏇',
    category: 'activity',
    name: 'horse_racing',
    description: 'Horse Racing',
    skinVariations: true
  },
  business_suit_levitating: {
    keywords: ['suit', 'business', 'levitate', 'hover', 'jump'],
    char: '🕴',
    category: 'activity',
    name: 'business_suit_levitating',
    description: 'Business Suit Levitating',
    skinVariations: true
  },
  trophy: {
    keywords: ['win', 'award', 'contest', 'place', 'ftw', 'ceremony'],
    char: '🏆',
    category: 'activity',
    name: 'trophy',
    description: 'Trophy',
    skinVariations: false
  },
  running_shirt_with_sash: {
    keywords: ['play', 'pageant'],
    char: '🎽',
    category: 'activity',
    name: 'running_shirt_with_sash',
    description: 'Running Shirt with Sash',
    skinVariations: false
  },
  medal_sports: {
    keywords: ['award', 'winning'],
    char: '🏅',
    category: 'activity',
    name: 'medal_sports',
    description: 'Medal Sports Award',
    skinVariations: false
  },
  medal_military: {
    keywords: ['award', 'winning', 'army'],
    char: '🎖',
    category: 'activity',
    name: 'medal_military',
    description: 'Medal Military Award',
    skinVariations: false
  },
  '1st_place_medal': {
    keywords: ['award', 'winning', 'first'],
    char: '🥇',
    category: 'activity',
    name: '1st_place_medal',
    description: '1st Place Medal Award',
    skinVariations: false
  },
  '2nd_place_medal': {
    keywords: ['award', 'second'],
    char: '🥈',
    category: 'activity',
    name: '2nd_place_medal',
    description: '2nd Place Medal Award',
    skinVariations: false
  },
  '3rd_place_medal': {
    keywords: ['award', 'third'],
    char: '🥉',
    category: 'activity',
    name: '3rd_place_medal',
    description: '3rd Place Medal Award',
    skinVariations: false
  },
  reminder_ribbon: {
    keywords: ['sports', 'cause', 'support', 'awareness'],
    char: '🎗',
    category: 'activity',
    name: 'reminder_ribbon',
    description: 'Reminder Ribbon',
    skinVariations: false
  },
  rosette: {
    keywords: ['flower', 'decoration', 'military'],
    char: '🏵',
    category: 'activity',
    name: 'rosette',
    description: 'Rosette',
    skinVariations: false
  },
  ticket: {
    keywords: ['event', 'concert', 'pass'],
    char: '🎫',
    category: 'activity',
    name: 'ticket',
    description: 'Ticket',
    skinVariations: false
  },
  tickets: {
    keywords: ['sports', 'concert', 'entrance'],
    char: '🎟',
    category: 'activity',
    name: 'tickets',
    description: 'Tickets Sports',
    skinVariations: false
  },
  performing_arts: {
    keywords: ['acting', 'theater', 'drama'],
    char: '🎭',
    category: 'activity',
    name: 'performing_arts',
    description: 'Performing Arts',
    skinVariations: false
  },
  art: {
    keywords: ['design', 'paint', 'draw', 'colors'],
    char: '🎨',
    category: 'activity',
    name: 'art',
    description: 'Artist Palette',
    skinVariations: false
  },
  circus_tent: {
    keywords: ['festival', 'carnival', 'party'],
    char: '🎪',
    category: 'activity',
    name: 'circus_tent',
    description: 'Circus Tent',
    skinVariations: false
  },
  woman_juggling: {
    keywords: ['juggle', 'balance', 'skill', 'multitask'],
    char: '🤹‍♀️',
    category: 'activity',
    name: 'woman_juggling',
    description: 'Woman Juggling Juggle',
    skinVariations: true
  },
  man_juggling: {
    keywords: ['juggle', 'balance', 'skill', 'multitask'],
    char: '🤹‍♂️',
    category: 'activity',
    name: 'man_juggling',
    description: 'Man Juggling Juggle',
    skinVariations: true
  },
  microphone: {
    keywords: ['sound', 'music', 'PA', 'sing', 'talkshow'],
    char: '🎤',
    category: 'activity',
    name: 'microphone',
    description: 'Microphone',
    skinVariations: false
  },
  headphones: {
    keywords: ['music', 'score', 'gadgets'],
    char: '🎧',
    category: 'activity',
    name: 'headphones',
    description: 'Headphone',
    skinVariations: false
  },
  musical_score: {
    keywords: ['treble', 'clef', 'compose'],
    char: '🎼',
    category: 'activity',
    name: 'musical_score',
    description: 'Musical Score',
    skinVariations: false
  },
  musical_keyboard: {
    keywords: ['piano', 'instrument', 'compose'],
    char: '🎹',
    category: 'activity',
    name: 'musical_keyboard',
    description: 'Musical Keyboard',
    skinVariations: false
  },
  drum: {
    keywords: ['music', 'instrument', 'drumsticks', 'snare'],
    char: '🥁',
    category: 'activity',
    name: 'drum',
    description: 'Drum Music',
    skinVariations: false
  },
  saxophone: {
    keywords: ['music', 'instrument', 'jazz', 'blues'],
    char: '🎷',
    category: 'activity',
    name: 'saxophone',
    description: 'Saxophone',
    skinVariations: false
  },
  trumpet: {
    keywords: ['music', 'brass'],
    char: '🎺',
    category: 'activity',
    name: 'trumpet',
    description: 'Trumpet',
    skinVariations: false
  },
  guitar: {
    keywords: ['music', 'instrument'],
    char: '🎸',
    category: 'activity',
    name: 'guitar',
    description: 'Guitar',
    skinVariations: false
  },
  violin: {
    keywords: ['music', 'instrument', 'orchestra', 'symphony'],
    char: '🎻',
    category: 'activity',
    name: 'violin',
    description: 'Violin',
    skinVariations: false
  },
  clapper: {
    keywords: ['movie', 'film', 'record'],
    char: '🎬',
    category: 'activity',
    name: 'clapper',
    description: 'Clapper Board',
    skinVariations: false
  },
  video_game: {
    keywords: ['play', 'console', 'PS4', 'controller'],
    char: '🎮',
    category: 'activity',
    name: 'video_game',
    description: 'Video Game',
    skinVariations: false
  },
  space_invader: {
    keywords: ['game', 'arcade', 'play'],
    char: '👾',
    category: 'activity',
    name: 'space_invader',
    description: 'Alien Monster',
    skinVariations: false
  },
  dart: {
    keywords: ['game', 'play', 'bar', 'target', 'bullseye'],
    char: '🎯',
    category: 'activity',
    name: 'dart',
    description: 'Direct Hit',
    skinVariations: false
  },
  game_die: {
    keywords: ['dice', 'random', 'tabletop', 'play', 'luck'],
    char: '🎲',
    category: 'activity',
    name: 'game_die',
    description: 'Game Die',
    skinVariations: false
  },
  chess_pawn: {
    keywords: ['expendable'],
    char: '♟',
    category: 'activity',
    name: 'chess_pawn',
    description: 'Chess Pawn Expendable',
    skinVariations: false
  },
  slot_machine: {
    keywords: ['bet', 'gamble', 'vegas', 'fruit machine', 'luck', 'casino'],
    char: '🎰',
    category: 'activity',
    name: 'slot_machine',
    description: 'Slot Machine',
    skinVariations: false
  },
  jigsaw: {
    keywords: ['interlocking', 'puzzle', 'piece'],
    char: '🧩',
    category: 'activity',
    name: 'jigsaw',
    description: 'Jigsaw Interlocking',
    skinVariations: false
  },
  bowling: {
    keywords: ['sports', 'fun', 'play'],
    char: '🎳',
    category: 'activity',
    name: 'bowling',
    description: 'Bowling',
    skinVariations: false
  },
  red_car: {
    keywords: ['red', 'transportation', 'vehicle'],
    char: '🚗',
    category: 'travel_and_places',
    name: 'red_car',
    description: 'Red Car',
    skinVariations: false
  },
  taxi: {
    keywords: ['uber', 'vehicle', 'cars', 'transportation'],
    char: '🚕',
    category: 'travel_and_places',
    name: 'taxi',
    description: 'Taxi',
    skinVariations: false
  },
  blue_car: {
    keywords: ['transportation', 'vehicle'],
    char: '🚙',
    category: 'travel_and_places',
    name: 'blue_car',
    description: 'Recreational Vehicle',
    skinVariations: false
  },
  bus: {
    keywords: ['car', 'vehicle', 'transportation'],
    char: '🚌',
    category: 'travel_and_places',
    name: 'bus',
    description: 'Bus',
    skinVariations: false
  },
  trolleybus: {
    keywords: ['bart', 'transportation', 'vehicle'],
    char: '🚎',
    category: 'travel_and_places',
    name: 'trolleybus',
    description: 'Trolleybus',
    skinVariations: false
  },
  racing_car: {
    keywords: ['sports', 'race', 'fast', 'formula', 'f1'],
    char: '🏎',
    category: 'travel_and_places',
    name: 'racing_car',
    description: 'Racing Car',
    skinVariations: false
  },
  police_car: {
    keywords: ['vehicle', 'cars', 'transportation', 'law', 'legal', 'enforcement'],
    char: '🚓',
    category: 'travel_and_places',
    name: 'police_car',
    description: 'Police Car',
    skinVariations: false
  },
  ambulance: {
    keywords: ['health', '911', 'hospital'],
    char: '🚑',
    category: 'travel_and_places',
    name: 'ambulance',
    description: 'Ambulance',
    skinVariations: false
  },
  fire_engine: {
    keywords: ['transportation', 'cars', 'vehicle'],
    char: '🚒',
    category: 'travel_and_places',
    name: 'fire_engine',
    description: 'Fire Engine',
    skinVariations: false
  },
  minibus: {
    keywords: ['vehicle', 'car', 'transportation'],
    char: '🚐',
    category: 'travel_and_places',
    name: 'minibus',
    description: 'Minibus',
    skinVariations: false
  },
  truck: {
    keywords: ['cars', 'transportation'],
    char: '🚚',
    category: 'travel_and_places',
    name: 'truck',
    description: 'Delivery Truck',
    skinVariations: false
  },
  articulated_lorry: {
    keywords: ['vehicle', 'cars', 'transportation', 'express'],
    char: '🚛',
    category: 'travel_and_places',
    name: 'articulated_lorry',
    description: 'Articulated Lorry',
    skinVariations: false
  },
  tractor: {
    keywords: ['vehicle', 'car', 'farming', 'agriculture'],
    char: '🚜',
    category: 'travel_and_places',
    name: 'tractor',
    description: 'Tractor',
    skinVariations: false
  },
  kick_scooter: {
    keywords: ['vehicle', 'kick', 'razor'],
    char: '🛴',
    category: 'travel_and_places',
    name: 'kick_scooter',
    description: 'Kick Scooter Vehicle',
    skinVariations: false
  },
  motorcycle: {
    keywords: ['race', 'sports', 'fast'],
    char: '🏍',
    category: 'travel_and_places',
    name: 'motorcycle',
    description: 'Motorcycle Race',
    skinVariations: false
  },
  bike: {
    keywords: ['sports', 'bicycle', 'exercise', 'hipster'],
    char: '🚲',
    category: 'travel_and_places',
    name: 'bike',
    description: 'Bicycle',
    skinVariations: false
  },
  motor_scooter: {
    keywords: ['vehicle', 'vespa', 'sasha'],
    char: '🛵',
    category: 'travel_and_places',
    name: 'motor_scooter',
    description: 'Motor Scooter',
    skinVariations: false
  },
  rotating_light: {
    keywords: [
      'police',
      'ambulance',
      '911',
      'emergency',
      'alert',
      'error',
      'pinged',
      'law',
      'legal'
    ],
    char: '🚨',
    category: 'travel_and_places',
    name: 'rotating_light',
    description: 'Police Cars Revolving Light',
    skinVariations: false
  },
  oncoming_police_car: {
    keywords: ['vehicle', 'law', 'legal', 'enforcement', '911'],
    char: '🚔',
    category: 'travel_and_places',
    name: 'oncoming_police_car',
    description: 'Oncoming Police Car',
    skinVariations: false
  },
  oncoming_bus: {
    keywords: ['vehicle', 'transportation'],
    char: '🚍',
    category: 'travel_and_places',
    name: 'oncoming_bus',
    description: 'Oncoming Bus',
    skinVariations: false
  },
  oncoming_automobile: {
    keywords: ['car', 'vehicle', 'transportation'],
    char: '🚘',
    category: 'travel_and_places',
    name: 'oncoming_automobile',
    description: 'Oncoming Automobile',
    skinVariations: false
  },
  oncoming_taxi: {
    keywords: ['vehicle', 'cars', 'uber'],
    char: '🚖',
    category: 'travel_and_places',
    name: 'oncoming_taxi',
    description: 'Oncoming Taxi',
    skinVariations: false
  },
  aerial_tramway: {
    keywords: ['transportation', 'vehicle', 'ski'],
    char: '🚡',
    category: 'travel_and_places',
    name: 'aerial_tramway',
    description: 'Aerial Tramway',
    skinVariations: false
  },
  mountain_cableway: {
    keywords: ['transportation', 'vehicle', 'ski'],
    char: '🚠',
    category: 'travel_and_places',
    name: 'mountain_cableway',
    description: 'Mountain Cableway',
    skinVariations: false
  },
  suspension_railway: {
    keywords: ['vehicle', 'transportation'],
    char: '🚟',
    category: 'travel_and_places',
    name: 'suspension_railway',
    description: 'Suspension Railway',
    skinVariations: false
  },
  railway_car: {
    keywords: ['transportation', 'vehicle'],
    char: '🚃',
    category: 'travel_and_places',
    name: 'railway_car',
    description: 'Railway Car',
    skinVariations: false
  },
  train: {
    keywords: ['transportation', 'vehicle', 'carriage', 'public', 'travel'],
    char: '🚋',
    category: 'travel_and_places',
    name: 'train',
    description: 'Tram Car',
    skinVariations: false
  },
  monorail: {
    keywords: ['transportation', 'vehicle'],
    char: '🚝',
    category: 'travel_and_places',
    name: 'monorail',
    description: 'Monorail',
    skinVariations: false
  },
  bullettrain_side: {
    keywords: ['transportation', 'vehicle'],
    char: '🚄',
    category: 'travel_and_places',
    name: 'bullettrain_side',
    description: 'High-Speed Train',
    skinVariations: false
  },
  bullettrain_front: {
    keywords: ['transportation', 'vehicle', 'speed', 'fast', 'public', 'travel'],
    char: '🚅',
    category: 'travel_and_places',
    name: 'bullettrain_front',
    description: 'High-Speed Train with Bullet Nose',
    skinVariations: false
  },
  light_rail: {
    keywords: ['transportation', 'vehicle'],
    char: '🚈',
    category: 'travel_and_places',
    name: 'light_rail',
    description: 'Light Rail',
    skinVariations: false
  },
  mountain_railway: {
    keywords: ['transportation', 'vehicle'],
    char: '🚞',
    category: 'travel_and_places',
    name: 'mountain_railway',
    description: 'Mountain Railway',
    skinVariations: false
  },
  steam_locomotive: {
    keywords: ['transportation', 'vehicle', 'train'],
    char: '🚂',
    category: 'travel_and_places',
    name: 'steam_locomotive',
    description: 'Steam Locomotive',
    skinVariations: false
  },
  train2: {
    keywords: ['transportation', 'vehicle'],
    char: '🚆',
    category: 'travel_and_places',
    name: 'train2',
    description: 'Train',
    skinVariations: false
  },
  metro: {
    keywords: ['transportation', 'blue-square', 'mrt', 'underground', 'tube'],
    char: '🚇',
    category: 'travel_and_places',
    name: 'metro',
    description: 'Metro',
    skinVariations: false
  },
  tram: {
    keywords: ['transportation', 'vehicle'],
    char: '🚊',
    category: 'travel_and_places',
    name: 'tram',
    description: 'Tram',
    skinVariations: false
  },
  station: {
    keywords: ['transportation', 'vehicle', 'public'],
    char: '🚉',
    category: 'travel_and_places',
    name: 'station',
    description: 'Station',
    skinVariations: false
  },
  flying_saucer: {
    keywords: ['transportation', 'vehicle', 'ufo'],
    char: '🛸',
    category: 'travel_and_places',
    name: 'flying_saucer',
    description: 'Flying Saucer',
    skinVariations: false
  },
  helicopter: {
    keywords: ['transportation', 'vehicle', 'fly'],
    char: '🚁',
    category: 'travel_and_places',
    name: 'helicopter',
    description: 'Helicopter',
    skinVariations: false
  },
  small_airplane: {
    keywords: ['flight', 'transportation', 'fly', 'vehicle'],
    char: '🛩',
    category: 'travel_and_places',
    name: 'small_airplane',
    description: 'Small Airplane',
    skinVariations: false
  },
  airplane: {
    keywords: ['vehicle', 'transportation', 'flight', 'fly'],
    char: '✈️',
    category: 'travel_and_places',
    name: 'airplane',
    description: 'Airplane',
    skinVariations: false
  },
  flight_departure: {
    keywords: ['airport', 'flight', 'landing'],
    char: '🛫',
    category: 'travel_and_places',
    name: 'flight_departure',
    description: 'Flight Departure Airport',
    skinVariations: false
  },
  flight_arrival: {
    keywords: ['airport', 'flight', 'boarding'],
    char: '🛬',
    category: 'travel_and_places',
    name: 'flight_arrival',
    description: 'Flight Arrival Airport',
    skinVariations: false
  },
  sailboat: {
    keywords: ['ship', 'summer', 'transportation', 'water', 'sailing'],
    char: '⛵',
    category: 'travel_and_places',
    name: 'sailboat',
    description: 'Sailboat Ship',
    skinVariations: false
  },
  motor_boat: {
    keywords: ['ship'],
    char: '🛥',
    category: 'travel_and_places',
    name: 'motor_boat',
    description: 'Motor Boat',
    skinVariations: false
  },
  speedboat: {
    keywords: ['ship', 'transportation', 'vehicle', 'summer'],
    char: '🚤',
    category: 'travel_and_places',
    name: 'speedboat',
    description: 'Speedboat',
    skinVariations: false
  },
  ferry: {
    keywords: ['boat', 'ship', 'yacht'],
    char: '⛴',
    category: 'travel_and_places',
    name: 'ferry',
    description: 'Ferry',
    skinVariations: false
  },
  passenger_ship: {
    keywords: ['yacht', 'cruise', 'ferry'],
    char: '🛳',
    category: 'travel_and_places',
    name: 'passenger_ship',
    description: 'Passenger Ship',
    skinVariations: false
  },
  rocket: {
    keywords: ['launch', 'ship', 'staffmode', 'NASA', 'outer space', 'outer_space', 'fly'],
    char: '🚀',
    category: 'travel_and_places',
    name: 'rocket',
    description: 'Rocket',
    skinVariations: false
  },
  artificial_satellite: {
    keywords: ['communication', 'gps', 'orbit', 'spaceflight', 'NASA', 'ISS'],
    char: '🛰',
    category: 'travel_and_places',
    name: 'artificial_satellite',
    description: 'Artificial Satellite Communication',
    skinVariations: false
  },
  seat: {
    keywords: ['sit', 'airplane', 'transport', 'bus', 'flight', 'fly'],
    char: '💺',
    category: 'travel_and_places',
    name: 'seat',
    description: 'Seat',
    skinVariations: false
  },
  canoe: {
    keywords: ['boat', 'paddle', 'water', 'ship'],
    char: '🛶',
    category: 'travel_and_places',
    name: 'canoe',
    description: 'Canoe',
    skinVariations: false
  },
  anchor: {
    keywords: ['ship', 'ferry', 'sea', 'boat'],
    char: '⚓',
    category: 'travel_and_places',
    name: 'anchor',
    description: 'Anchor',
    skinVariations: false
  },
  construction: {
    keywords: ['wip', 'progress', 'caution', 'warning'],
    char: '🚧',
    category: 'travel_and_places',
    name: 'construction',
    description: 'Construction Sign',
    skinVariations: false
  },
  fuelpump: {
    keywords: ['gas station', 'petroleum'],
    char: '⛽',
    category: 'travel_and_places',
    name: 'fuelpump',
    description: 'Fuel Pump',
    skinVariations: false
  },
  busstop: {
    keywords: ['transportation', 'wait'],
    char: '🚏',
    category: 'travel_and_places',
    name: 'busstop',
    description: 'Bus Stop',
    skinVariations: false
  },
  vertical_traffic_light: {
    keywords: ['transportation', 'driving'],
    char: '🚦',
    category: 'travel_and_places',
    name: 'vertical_traffic_light',
    description: 'Vertical Traffic Light',
    skinVariations: false
  },
  traffic_light: {
    keywords: ['transportation', 'signal'],
    char: '🚥',
    category: 'travel_and_places',
    name: 'traffic_light',
    description: 'Horizontal Traffic Light',
    skinVariations: false
  },
  checkered_flag: {
    keywords: ['contest', 'finishline', 'race', 'gokart'],
    char: '🏁',
    category: 'travel_and_places',
    name: 'checkered_flag',
    description: 'Chequered Flag',
    skinVariations: false
  },
  ship: {
    keywords: ['transportation', 'titanic', 'deploy'],
    char: '🚢',
    category: 'travel_and_places',
    name: 'ship',
    description: 'Ship',
    skinVariations: false
  },
  ferris_wheel: {
    keywords: ['photo', 'carnival', 'londoneye'],
    char: '🎡',
    category: 'travel_and_places',
    name: 'ferris_wheel',
    description: 'Ferris Wheel',
    skinVariations: false
  },
  roller_coaster: {
    keywords: ['carnival', 'playground', 'photo', 'fun'],
    char: '🎢',
    category: 'travel_and_places',
    name: 'roller_coaster',
    description: 'Roller Coaster',
    skinVariations: false
  },
  carousel_horse: {
    keywords: ['photo', 'carnival'],
    char: '🎠',
    category: 'travel_and_places',
    name: 'carousel_horse',
    description: 'Carousel Horse',
    skinVariations: false
  },
  building_construction: {
    keywords: ['wip', 'working', 'progress'],
    char: '🏗',
    category: 'travel_and_places',
    name: 'building_construction',
    description: 'Building Construction',
    skinVariations: false
  },
  foggy: {
    keywords: ['photo', 'mountain'],
    char: '🌁',
    category: 'travel_and_places',
    name: 'foggy',
    description: 'Foggy',
    skinVariations: false
  },
  tokyo_tower: {
    keywords: ['photo', 'japanese'],
    char: '🗼',
    category: 'travel_and_places',
    name: 'tokyo_tower',
    description: 'Tokyo Tower',
    skinVariations: false
  },
  factory: {
    keywords: ['building', 'industry', 'pollution', 'smoke'],
    char: '🏭',
    category: 'travel_and_places',
    name: 'factory',
    description: 'Factory',
    skinVariations: false
  },
  fountain: {
    keywords: ['photo', 'summer', 'water', 'fresh'],
    char: '⛲',
    category: 'travel_and_places',
    name: 'fountain',
    description: 'Fountain',
    skinVariations: false
  },
  rice_scene: {
    keywords: ['photo', 'japan', 'asia', 'tsukimi'],
    char: '🎑',
    category: 'travel_and_places',
    name: 'rice_scene',
    description: 'Moon Viewing Ceremony',
    skinVariations: false
  },
  mountain: {
    keywords: ['photo', 'nature', 'environment'],
    char: '⛰',
    category: 'travel_and_places',
    name: 'mountain',
    description: 'Mountain',
    skinVariations: false
  },
  mountain_snow: {
    keywords: ['photo', 'nature', 'environment', 'winter', 'cold'],
    char: '🏔',
    category: 'travel_and_places',
    name: 'mountain_snow',
    description: 'Mountain Snow Photo',
    skinVariations: false
  },
  mount_fuji: {
    keywords: ['photo', 'mountain', 'nature', 'japanese'],
    char: '🗻',
    category: 'travel_and_places',
    name: 'mount_fuji',
    description: 'Mount Fuji',
    skinVariations: false
  },
  volcano: {
    keywords: ['photo', 'nature', 'disaster'],
    char: '🌋',
    category: 'travel_and_places',
    name: 'volcano',
    description: 'Volcano',
    skinVariations: false
  },
  japan: {
    keywords: ['nation', 'country', 'japanese', 'asia'],
    char: '🗾',
    category: 'travel_and_places',
    name: 'japan',
    description: 'Silhouette of Japan',
    skinVariations: false
  },
  camping: {
    keywords: ['photo', 'outdoors', 'tent'],
    char: '🏕',
    category: 'travel_and_places',
    name: 'camping',
    description: 'Camping',
    skinVariations: false
  },
  tent: {
    keywords: ['photo', 'camping', 'outdoors'],
    char: '⛺',
    category: 'travel_and_places',
    name: 'tent',
    description: 'Tent',
    skinVariations: false
  },
  national_park: {
    keywords: ['photo', 'environment', 'nature'],
    char: '🏞',
    category: 'travel_and_places',
    name: 'national_park',
    description: 'National Park',
    skinVariations: false
  },
  motorway: {
    keywords: ['road', 'cupertino', 'interstate', 'highway'],
    char: '🛣',
    category: 'travel_and_places',
    name: 'motorway',
    description: 'Motorway',
    skinVariations: false
  },
  railway_track: {
    keywords: ['train', 'transportation'],
    char: '🛤',
    category: 'travel_and_places',
    name: 'railway_track',
    description: 'Railway Track',
    skinVariations: false
  },
  sunrise: {
    keywords: ['morning', 'view', 'vacation', 'photo'],
    char: '🌅',
    category: 'travel_and_places',
    name: 'sunrise',
    description: 'Sunrise',
    skinVariations: false
  },
  sunrise_over_mountains: {
    keywords: ['view', 'vacation', 'photo'],
    char: '🌄',
    category: 'travel_and_places',
    name: 'sunrise_over_mountains',
    description: 'Sunrise over Mountains',
    skinVariations: false
  },
  desert: {
    keywords: ['photo', 'warm', 'saharah'],
    char: '🏜',
    category: 'travel_and_places',
    name: 'desert',
    description: 'Desert',
    skinVariations: false
  },
  beach_umbrella: {
    keywords: ['weather', 'summer', 'sunny', 'sand', 'mojito'],
    char: '🏖',
    category: 'travel_and_places',
    name: 'beach_umbrella',
    description: 'Beach Umbrella Weather',
    skinVariations: false
  },
  desert_island: {
    keywords: ['photo', 'tropical', 'mojito'],
    char: '🏝',
    category: 'travel_and_places',
    name: 'desert_island',
    description: 'Desert Island',
    skinVariations: false
  },
  city_sunrise: {
    keywords: ['photo', 'good morning', 'dawn'],
    char: '🌇',
    category: 'travel_and_places',
    name: 'city_sunrise',
    description: 'Sunset over Buildings',
    skinVariations: false
  },
  city_sunset: {
    keywords: ['photo', 'evening', 'sky', 'buildings'],
    char: '🌆',
    category: 'travel_and_places',
    name: 'city_sunset',
    description: 'Cityscape at Dusk',
    skinVariations: false
  },
  cityscape: {
    keywords: ['photo', 'night life', 'urban'],
    char: '🏙',
    category: 'travel_and_places',
    name: 'cityscape',
    description: 'Cityscape',
    skinVariations: false
  },
  night_with_stars: {
    keywords: ['evening', 'city', 'downtown'],
    char: '🌃',
    category: 'travel_and_places',
    name: 'night_with_stars',
    description: 'Night with Stars',
    skinVariations: false
  },
  bridge_at_night: {
    keywords: ['photo', 'sanfrancisco'],
    char: '🌉',
    category: 'travel_and_places',
    name: 'bridge_at_night',
    description: 'Bridge at Night',
    skinVariations: false
  },
  milky_way: {
    keywords: ['photo', 'space', 'stars'],
    char: '🌌',
    category: 'travel_and_places',
    name: 'milky_way',
    description: 'Milky Way',
    skinVariations: false
  },
  stars: {
    keywords: ['night', 'photo'],
    char: '🌠',
    category: 'travel_and_places',
    name: 'stars',
    description: 'Shooting Star',
    skinVariations: false
  },
  sparkler: {
    keywords: ['stars', 'night', 'shine'],
    char: '🎇',
    category: 'travel_and_places',
    name: 'sparkler',
    description: 'Firework Sparkler',
    skinVariations: false
  },
  fireworks: {
    keywords: ['photo', 'festival', 'carnival', 'congratulations'],
    char: '🎆',
    category: 'travel_and_places',
    name: 'fireworks',
    description: 'Fireworks',
    skinVariations: false
  },
  rainbow: {
    keywords: ['nature', 'happy', 'unicorn_face', 'photo', 'sky', 'spring'],
    char: '🌈',
    category: 'travel_and_places',
    name: 'rainbow',
    description: 'Rainbow',
    skinVariations: false
  },
  houses: {
    keywords: ['buildings', 'photo'],
    char: '🏘',
    category: 'travel_and_places',
    name: 'houses',
    description: 'Houses Buildings',
    skinVariations: false
  },
  european_castle: {
    keywords: ['building', 'royalty', 'history'],
    char: '🏰',
    category: 'travel_and_places',
    name: 'european_castle',
    description: 'European Castle',
    skinVariations: false
  },
  japanese_castle: {
    keywords: ['photo', 'building'],
    char: '🏯',
    category: 'travel_and_places',
    name: 'japanese_castle',
    description: 'Japanese Castle',
    skinVariations: false
  },
  stadium: {
    keywords: ['photo', 'place', 'sports', 'concert', 'venue'],
    char: '🏟',
    category: 'travel_and_places',
    name: 'stadium',
    description: 'Stadium',
    skinVariations: false
  },
  statue_of_liberty: {
    keywords: ['american', 'newyork'],
    char: '🗽',
    category: 'travel_and_places',
    name: 'statue_of_liberty',
    description: 'Statue of Liberty',
    skinVariations: false
  },
  house: {
    keywords: ['building', 'home'],
    char: '🏠',
    category: 'travel_and_places',
    name: 'house',
    description: 'House Building',
    skinVariations: false
  },
  house_with_garden: {
    keywords: ['home', 'plant', 'nature'],
    char: '🏡',
    category: 'travel_and_places',
    name: 'house_with_garden',
    description: 'House with Garden',
    skinVariations: false
  },
  derelict_house: {
    keywords: ['abandon', 'evict', 'broken', 'building'],
    char: '🏚',
    category: 'travel_and_places',
    name: 'derelict_house',
    description: 'Derelict House Abandon',
    skinVariations: false
  },
  office: {
    keywords: ['building', 'bureau', 'work'],
    char: '🏢',
    category: 'travel_and_places',
    name: 'office',
    description: 'Office Building',
    skinVariations: false
  },
  department_store: {
    keywords: ['building', 'shopping', 'mall'],
    char: '🏬',
    category: 'travel_and_places',
    name: 'department_store',
    description: 'Department Store',
    skinVariations: false
  },
  post_office: {
    keywords: ['building', 'envelope', 'communication'],
    char: '🏣',
    category: 'travel_and_places',
    name: 'post_office',
    description: 'Japanese Post Office',
    skinVariations: false
  },
  european_post_office: {
    keywords: ['building', 'email'],
    char: '🏤',
    category: 'travel_and_places',
    name: 'european_post_office',
    description: 'European Post Office',
    skinVariations: false
  },
  hospital: {
    keywords: ['building', 'health', 'surgery', 'doctor'],
    char: '🏥',
    category: 'travel_and_places',
    name: 'hospital',
    description: 'Hospital',
    skinVariations: false
  },
  bank: {
    keywords: ['building', 'money', 'sales', 'cash', 'business', 'enterprise'],
    char: '🏦',
    category: 'travel_and_places',
    name: 'bank',
    description: 'Bank',
    skinVariations: false
  },
  hotel: {
    keywords: ['building', 'accomodation', 'checkin'],
    char: '🏨',
    category: 'travel_and_places',
    name: 'hotel',
    description: 'Hotel',
    skinVariations: false
  },
  convenience_store: {
    keywords: ['building', 'shopping', 'groceries'],
    char: '🏪',
    category: 'travel_and_places',
    name: 'convenience_store',
    description: 'Convenience Store',
    skinVariations: false
  },
  school: {
    keywords: ['building', 'student', 'education', 'learn', 'teach'],
    char: '🏫',
    category: 'travel_and_places',
    name: 'school',
    description: 'School',
    skinVariations: false
  },
  love_hotel: {
    keywords: ['like', 'affection', 'dating'],
    char: '🏩',
    category: 'travel_and_places',
    name: 'love_hotel',
    description: 'Love Hotel',
    skinVariations: false
  },
  wedding: {
    keywords: ['love', 'like', 'affection', 'couple', 'marriage', 'bride', 'groom'],
    char: '💒',
    category: 'travel_and_places',
    name: 'wedding',
    description: 'Wedding',
    skinVariations: false
  },
  classical_building: {
    keywords: ['art', 'culture', 'history'],
    char: '🏛',
    category: 'travel_and_places',
    name: 'classical_building',
    description: 'Classical Building',
    skinVariations: false
  },
  church: {
    keywords: ['building', 'religion', 'christ'],
    char: '⛪',
    category: 'travel_and_places',
    name: 'church',
    description: 'Church',
    skinVariations: false
  },
  mosque: {
    keywords: ['islam', 'worship', 'minaret'],
    char: '🕌',
    category: 'travel_and_places',
    name: 'mosque',
    description: 'Mosque',
    skinVariations: false
  },
  synagogue: {
    keywords: ['judaism', 'worship', 'temple', 'jewish'],
    char: '🕍',
    category: 'travel_and_places',
    name: 'synagogue',
    description: 'Synagogue',
    skinVariations: false
  },
  kaaba: {
    keywords: ['mecca', 'mosque', 'islam'],
    char: '🕋',
    category: 'travel_and_places',
    name: 'kaaba',
    description: 'Kaaba',
    skinVariations: false
  },
  shinto_shrine: {
    keywords: ['temple', 'japan', 'kyoto'],
    char: '⛩',
    category: 'travel_and_places',
    name: 'shinto_shrine',
    description: 'Shinto Shrine',
    skinVariations: false
  },
  watch: {
    keywords: ['time', 'accessories'],
    char: '⌚',
    category: 'objects',
    name: 'watch',
    description: 'Watch',
    skinVariations: false
  },
  iphone: {
    keywords: ['technology', 'apple', 'gadgets', 'dial'],
    char: '📱',
    category: 'objects',
    name: 'iphone',
    description: 'Mobile Phone',
    skinVariations: false
  },
  calling: {
    keywords: ['iphone', 'incoming'],
    char: '📲',
    category: 'objects',
    name: 'calling',
    description: 'Mobile Phone with Rightwards Arrow at Left',
    skinVariations: false
  },
  computer: {
    keywords: ['technology', 'laptop', 'screen', 'display', 'monitor'],
    char: '💻',
    category: 'objects',
    name: 'computer',
    description: 'Personal Computer',
    skinVariations: false
  },
  keyboard: {
    keywords: ['technology', 'computer', 'type', 'input', 'text'],
    char: '⌨',
    category: 'objects',
    name: 'keyboard',
    description: 'Keyboard',
    skinVariations: false
  },
  desktop_computer: {
    keywords: ['technology', 'computing', 'screen'],
    char: '🖥',
    category: 'objects',
    name: 'desktop_computer',
    description: 'Desktop Computer',
    skinVariations: false
  },
  printer: {
    keywords: ['paper', 'ink'],
    char: '🖨',
    category: 'objects',
    name: 'printer',
    description: 'Printer',
    skinVariations: false
  },
  computer_mouse: {
    keywords: ['click'],
    char: '🖱',
    category: 'objects',
    name: 'computer_mouse',
    description: 'Computer Mouse Click',
    skinVariations: false
  },
  trackball: {
    keywords: ['technology', 'trackpad'],
    char: '🖲',
    category: 'objects',
    name: 'trackball',
    description: 'Trackball',
    skinVariations: false
  },
  joystick: {
    keywords: ['game', 'play'],
    char: '🕹',
    category: 'objects',
    name: 'joystick',
    description: 'Joystick',
    skinVariations: false
  },
  clamp: {
    keywords: ['tool'],
    char: '🗜',
    category: 'objects',
    name: 'clamp',
    description: 'Clamp Tool',
    skinVariations: false
  },
  minidisc: {
    keywords: ['technology', 'record', 'data', 'disk', '90s'],
    char: '💽',
    category: 'objects',
    name: 'minidisc',
    description: 'Minidisc',
    skinVariations: false
  },
  floppy_disk: {
    keywords: ['oldschool', 'technology', 'save', '90s', '80s'],
    char: '💾',
    category: 'objects',
    name: 'floppy_disk',
    description: 'Floppy Disk',
    skinVariations: false
  },
  cd: {
    keywords: ['technology', 'dvd', 'disk', 'disc', '90s'],
    char: '💿',
    category: 'objects',
    name: 'cd',
    description: 'Optical Disc',
    skinVariations: false
  },
  dvd: {
    keywords: ['cd', 'disk', 'disc'],
    char: '📀',
    category: 'objects',
    name: 'dvd',
    description: 'Dvd',
    skinVariations: false
  },
  vhs: {
    keywords: ['record', 'video', 'oldschool', '90s', '80s'],
    char: '📼',
    category: 'objects',
    name: 'vhs',
    description: 'Videocassette',
    skinVariations: false
  },
  camera: {
    keywords: ['gadgets', 'photography'],
    char: '📷',
    category: 'objects',
    name: 'camera',
    description: 'Camera',
    skinVariations: false
  },
  camera_flash: {
    keywords: ['photography', 'gadgets'],
    char: '📸',
    category: 'objects',
    name: 'camera_flash',
    description: 'Camera Flash Photography',
    skinVariations: false
  },
  video_camera: {
    keywords: ['film', 'record'],
    char: '📹',
    category: 'objects',
    name: 'video_camera',
    description: 'Video Camera',
    skinVariations: false
  },
  movie_camera: {
    keywords: ['film', 'record'],
    char: '🎥',
    category: 'objects',
    name: 'movie_camera',
    description: 'Movie Camera',
    skinVariations: false
  },
  film_projector: {
    keywords: ['video', 'tape', 'record', 'movie'],
    char: '📽',
    category: 'objects',
    name: 'film_projector',
    description: 'Film Projector',
    skinVariations: false
  },
  film_strip: {
    keywords: ['movie'],
    char: '🎞',
    category: 'objects',
    name: 'film_strip',
    description: 'Film Strip Movie',
    skinVariations: false
  },
  telephone_receiver: {
    keywords: ['technology', 'communication', 'dial'],
    char: '📞',
    category: 'objects',
    name: 'telephone_receiver',
    description: 'Telephone Receiver',
    skinVariations: false
  },
  phone: {
    keywords: ['technology', 'communication', 'dial', 'telephone'],
    char: '☎️',
    category: 'objects',
    name: 'phone',
    description: 'Black Telephone',
    skinVariations: false
  },
  pager: {
    keywords: ['bbcall', 'oldschool', '90s'],
    char: '📟',
    category: 'objects',
    name: 'pager',
    description: 'Pager',
    skinVariations: false
  },
  fax: {
    keywords: ['communication', 'technology'],
    char: '📠',
    category: 'objects',
    name: 'fax',
    description: 'Fax Machine',
    skinVariations: false
  },
  tv: {
    keywords: ['technology', 'program', 'oldschool', 'show', 'television'],
    char: '📺',
    category: 'objects',
    name: 'tv',
    description: 'Television',
    skinVariations: false
  },
  radio: {
    keywords: ['communication', 'music', 'podcast', 'program'],
    char: '📻',
    category: 'objects',
    name: 'radio',
    description: 'Radio',
    skinVariations: false
  },
  studio_microphone: {
    keywords: ['sing', 'recording', 'artist', 'talkshow'],
    char: '🎙',
    category: 'objects',
    name: 'studio_microphone',
    description: 'Studio Microphone',
    skinVariations: false
  },
  level_slider: {
    keywords: ['scale'],
    char: '🎚',
    category: 'objects',
    name: 'level_slider',
    description: 'Level Slider',
    skinVariations: false
  },
  control_knobs: {
    keywords: ['dial'],
    char: '🎛',
    category: 'objects',
    name: 'control_knobs',
    description: 'Control Knobs',
    skinVariations: false
  },
  compass: {
    keywords: ['magnetic', 'navigation', 'orienteering'],
    char: '🧭',
    category: 'objects',
    name: 'compass',
    description: 'Compass Magnetic',
    skinVariations: false
  },
  stopwatch: {
    keywords: ['time', 'deadline'],
    char: '⏱',
    category: 'objects',
    name: 'stopwatch',
    description: 'Stopwatch',
    skinVariations: false
  },
  timer_clock: {
    keywords: ['alarm'],
    char: '⏲',
    category: 'objects',
    name: 'timer_clock',
    description: 'Timer Clock',
    skinVariations: false
  },
  alarm_clock: {
    keywords: ['time', 'wake'],
    char: '⏰',
    category: 'objects',
    name: 'alarm_clock',
    description: 'Alarm Clock',
    skinVariations: false
  },
  mantelpiece_clock: {
    keywords: ['time'],
    char: '🕰',
    category: 'objects',
    name: 'mantelpiece_clock',
    description: 'Mantelpiece Clock',
    skinVariations: false
  },
  hourglass_flowing_sand: {
    keywords: ['oldschool', 'time', 'countdown'],
    char: '⏳',
    category: 'objects',
    name: 'hourglass_flowing_sand',
    description: 'Hourglass with Flowing Sand',
    skinVariations: false
  },
  hourglass: {
    keywords: ['time', 'clock', 'oldschool', 'limit', 'exam', 'quiz', 'test'],
    char: '⌛',
    category: 'objects',
    name: 'hourglass',
    description: 'Hourglass',
    skinVariations: false
  },
  satellite: {
    keywords: ['communication', 'future', 'radio', 'space'],
    char: '📡',
    category: 'objects',
    name: 'satellite',
    description: 'Satellite',
    skinVariations: false
  },
  battery: {
    keywords: ['power', 'energy', 'sustain'],
    char: '🔋',
    category: 'objects',
    name: 'battery',
    description: 'Battery',
    skinVariations: false
  },
  electric_plug: {
    keywords: ['charger', 'power'],
    char: '🔌',
    category: 'objects',
    name: 'electric_plug',
    description: 'Electric Plug',
    skinVariations: false
  },
  bulb: {
    keywords: ['light', 'electricity', 'idea'],
    char: '💡',
    category: 'objects',
    name: 'bulb',
    description: 'Electric Light Bulb',
    skinVariations: false
  },
  flashlight: {
    keywords: ['dark', 'camping', 'sight', 'night'],
    char: '🔦',
    category: 'objects',
    name: 'flashlight',
    description: 'Electric Torch',
    skinVariations: false
  },
  candle: {
    keywords: ['fire', 'wax'],
    char: '🕯',
    category: 'objects',
    name: 'candle',
    description: 'Candle',
    skinVariations: false
  },
  fire_extinguisher: {
    keywords: ['quench'],
    char: '🧯',
    category: 'objects',
    name: 'fire_extinguisher',
    description: 'Fire Extinguisher Quench',
    skinVariations: false
  },
  wastebasket: {
    keywords: ['bin', 'trash', 'rubbish', 'garbage', 'toss'],
    char: '🗑',
    category: 'objects',
    name: 'wastebasket',
    description: 'Wastebasket',
    skinVariations: false
  },
  oil_drum: {
    keywords: ['barrell'],
    char: '🛢',
    category: 'objects',
    name: 'oil_drum',
    description: 'Oil Drum',
    skinVariations: false
  },
  money_with_wings: {
    keywords: ['dollar', 'bills', 'payment', 'sale'],
    char: '💸',
    category: 'objects',
    name: 'money_with_wings',
    description: 'Money with Wings',
    skinVariations: false
  },
  dollar: {
    keywords: ['money', 'sales', 'bill', 'currency'],
    char: '💵',
    category: 'objects',
    name: 'dollar',
    description: 'Banknote with Dollar Sign',
    skinVariations: false
  },
  yen: {
    keywords: ['money', 'sales', 'japanese', 'dollar', 'currency'],
    char: '💴',
    category: 'objects',
    name: 'yen',
    description: 'Banknote with Yen Sign',
    skinVariations: false
  },
  euro: {
    keywords: ['money', 'sales', 'dollar', 'currency'],
    char: '💶',
    category: 'objects',
    name: 'euro',
    description: 'Banknote with Euro Sign',
    skinVariations: false
  },
  pound: {
    keywords: ['british', 'sterling', 'money', 'sales', 'bills', 'uk', 'england', 'currency'],
    char: '💷',
    category: 'objects',
    name: 'pound',
    description: 'Banknote with Pound Sign',
    skinVariations: false
  },
  moneybag: {
    keywords: ['dollar', 'payment', 'coins', 'sale'],
    char: '💰',
    category: 'objects',
    name: 'moneybag',
    description: 'Money Bag',
    skinVariations: false
  },
  credit_card: {
    keywords: ['money', 'sales', 'dollar', 'bill', 'payment', 'shopping'],
    char: '💳',
    category: 'objects',
    name: 'credit_card',
    description: 'Credit Card',
    skinVariations: false
  },
  gem: {
    keywords: ['blue', 'ruby', 'diamond', 'jewelry'],
    char: '💎',
    category: 'objects',
    name: 'gem',
    description: 'Gem Stone',
    skinVariations: false
  },
  balance_scale: {
    keywords: ['law', 'fairness', 'weight'],
    char: '⚖',
    category: 'objects',
    name: 'balance_scale',
    description: 'Balance Scale Law',
    skinVariations: false
  },
  toolbox: {
    keywords: ['tools', 'diy', 'fix', 'maintainer', 'mechanic'],
    char: '🧰',
    category: 'objects',
    name: 'toolbox',
    description: 'Toolbox Tools',
    skinVariations: false
  },
  wrench: {
    keywords: ['tools', 'diy', 'ikea', 'fix', 'maintainer'],
    char: '🔧',
    category: 'objects',
    name: 'wrench',
    description: 'Wrench',
    skinVariations: false
  },
  hammer: {
    keywords: ['tools', 'build', 'create'],
    char: '🔨',
    category: 'objects',
    name: 'hammer',
    description: 'Hammer',
    skinVariations: false
  },
  hammer_and_pick: {
    keywords: ['tools', 'build', 'create'],
    char: '⚒',
    category: 'objects',
    name: 'hammer_and_pick',
    description: 'Hammer and Pick',
    skinVariations: false
  },
  hammer_and_wrench: {
    keywords: ['tools', 'build', 'create'],
    char: '🛠',
    category: 'objects',
    name: 'hammer_and_wrench',
    description: 'Hammer and Wrench',
    skinVariations: false
  },
  pick: {
    keywords: ['tools', 'dig'],
    char: '⛏',
    category: 'objects',
    name: 'pick',
    description: 'Pick',
    skinVariations: false
  },
  nut_and_bolt: {
    keywords: ['handy', 'tools', 'fix'],
    char: '🔩',
    category: 'objects',
    name: 'nut_and_bolt',
    description: 'Nut and Bolt',
    skinVariations: false
  },
  gear: {
    keywords: ['cog'],
    char: '⚙',
    category: 'objects',
    name: 'gear',
    description: 'Gear',
    skinVariations: false
  },
  brick: {
    keywords: ['bricks'],
    char: '🧱',
    category: 'objects',
    name: 'brick',
    description: 'Brick Bricks',
    skinVariations: false
  },
  chains: {
    keywords: ['lock', 'arrest'],
    char: '⛓',
    category: 'objects',
    name: 'chains',
    description: 'Chains',
    skinVariations: false
  },
  magnet: {
    keywords: ['attraction', 'magnetic'],
    char: '🧲',
    category: 'objects',
    name: 'magnet',
    description: 'Magnet Attraction',
    skinVariations: false
  },
  gun: {
    keywords: ['violence', 'weapon', 'pistol', 'revolver'],
    char: '🔫',
    category: 'objects',
    name: 'gun',
    description: 'Pistol',
    skinVariations: false
  },
  bomb: {
    keywords: ['boom', 'explode', 'explosion', 'terrorism'],
    char: '💣',
    category: 'objects',
    name: 'bomb',
    description: 'Bomb',
    skinVariations: false
  },
  firecracker: {
    keywords: ['dynamite', 'boom', 'explode', 'explosion', 'explosive'],
    char: '🧨',
    category: 'objects',
    name: 'firecracker',
    description: 'Firecracker Dynamite',
    skinVariations: false
  },
  hocho: {
    keywords: ['knife', 'blade', 'cutlery', 'kitchen', 'weapon'],
    char: '🔪',
    category: 'objects',
    name: 'hocho',
    description: 'Hocho',
    skinVariations: false
  },
  dagger: {
    keywords: ['weapon'],
    char: '🗡',
    category: 'objects',
    name: 'dagger',
    description: 'Dagger Weapon',
    skinVariations: false
  },
  crossed_swords: {
    keywords: ['weapon'],
    char: '⚔',
    category: 'objects',
    name: 'crossed_swords',
    description: 'Crossed Swords',
    skinVariations: false
  },
  shield: {
    keywords: ['protection', 'security'],
    char: '🛡',
    category: 'objects',
    name: 'shield',
    description: 'Shield',
    skinVariations: false
  },
  smoking: {
    keywords: ['kills', 'tobacco', 'cigarette', 'joint', 'smoke'],
    char: '🚬',
    category: 'objects',
    name: 'smoking',
    description: 'Smoking Symbol',
    skinVariations: false
  },
  skull_and_crossbones: {
    keywords: ['poison', 'danger', 'deadly', 'scary', 'death', 'pirate', 'evil'],
    char: '☠',
    category: 'objects',
    name: 'skull_and_crossbones',
    description: 'Skull and Crossbones',
    skinVariations: false
  },
  coffin: {
    keywords: [
      'vampire',
      'dead',
      'die',
      'death',
      'rip',
      'graveyard',
      'cemetery',
      'casket',
      'funeral',
      'box'
    ],
    char: '⚰',
    category: 'objects',
    name: 'coffin',
    description: 'Coffin',
    skinVariations: false
  },
  funeral_urn: {
    keywords: ['dead', 'die', 'death', 'rip', 'ashes'],
    char: '⚱',
    category: 'objects',
    name: 'funeral_urn',
    description: 'Funeral Urn',
    skinVariations: false
  },
  amphora: {
    keywords: ['vase', 'jar'],
    char: '🏺',
    category: 'objects',
    name: 'amphora',
    description: 'Amphora',
    skinVariations: false
  },
  crystal_ball: {
    keywords: ['disco', 'party', 'magic', 'circus', 'fortune_teller'],
    char: '🔮',
    category: 'objects',
    name: 'crystal_ball',
    description: 'Crystal Ball',
    skinVariations: false
  },
  prayer_beads: {
    keywords: ['dhikr', 'religious'],
    char: '📿',
    category: 'objects',
    name: 'prayer_beads',
    description: 'Prayer Beads',
    skinVariations: false
  },
  nazar_amulet: {
    keywords: ['bead', 'charm'],
    char: '🧿',
    category: 'objects',
    name: 'nazar_amulet',
    description: 'Nazar Amulet Bead',
    skinVariations: false
  },
  barber: {
    keywords: ['hair', 'salon', 'style'],
    char: '💈',
    category: 'objects',
    name: 'barber',
    description: 'Barber Pole',
    skinVariations: false
  },
  alembic: {
    keywords: ['distilling', 'science', 'experiment', 'chemistry'],
    char: '⚗',
    category: 'objects',
    name: 'alembic',
    description: 'Alembic',
    skinVariations: false
  },
  telescope: {
    keywords: ['stars', 'space', 'zoom', 'science', 'astronomy'],
    char: '🔭',
    category: 'objects',
    name: 'telescope',
    description: 'Telescope',
    skinVariations: false
  },
  microscope: {
    keywords: ['laboratory', 'experiment', 'zoomin', 'science', 'study'],
    char: '🔬',
    category: 'objects',
    name: 'microscope',
    description: 'Microscope',
    skinVariations: false
  },
  hole: {
    keywords: ['embarrassing'],
    char: '🕳',
    category: 'objects',
    name: 'hole',
    description: 'Hole',
    skinVariations: false
  },
  pill: {
    keywords: ['health', 'medicine', 'doctor', 'pharmacy', 'drug'],
    char: '💊',
    category: 'objects',
    name: 'pill',
    description: 'Pill',
    skinVariations: false
  },
  syringe: {
    keywords: ['health', 'hospital', 'drugs', 'blood', 'medicine', 'needle', 'doctor', 'nurse'],
    char: '💉',
    category: 'objects',
    name: 'syringe',
    description: 'Syringe',
    skinVariations: false
  },
  dna: {
    keywords: ['biologist', 'genetics', 'life'],
    char: '🧬',
    category: 'objects',
    name: 'dna',
    description: 'Dna Biologist',
    skinVariations: false
  },
  microbe: {
    keywords: ['amoeba', 'bacteria', 'germs'],
    char: '🦠',
    category: 'objects',
    name: 'microbe',
    description: 'Microbe Amoeba',
    skinVariations: false
  },
  petri_dish: {
    keywords: ['bacteria', 'biology', 'culture', 'lab'],
    char: '🧫',
    category: 'objects',
    name: 'petri_dish',
    description: 'Petri Dish Bacteria',
    skinVariations: false
  },
  test_tube: {
    keywords: ['chemistry', 'experiment', 'lab', 'science'],
    char: '🧪',
    category: 'objects',
    name: 'test_tube',
    description: 'Test Tube Chemistry',
    skinVariations: false
  },
  thermometer: {
    keywords: ['weather', 'temperature', 'hot', 'cold'],
    char: '🌡',
    category: 'objects',
    name: 'thermometer',
    description: 'Thermometer',
    skinVariations: false
  },
  broom: {
    keywords: ['cleaning', 'sweeping', 'witch'],
    char: '🧹',
    category: 'objects',
    name: 'broom',
    description: 'Broom Cleaning',
    skinVariations: false
  },
  basket: {
    keywords: ['laundry'],
    char: '🧺',
    category: 'objects',
    name: 'basket',
    description: 'Basket Laundry',
    skinVariations: false
  },
  toilet_paper: {
    keywords: ['roll'],
    char: '🧻',
    category: 'objects',
    name: 'toilet_paper',
    description: 'Toilet Paper Roll',
    skinVariations: false
  },
  label: {
    keywords: ['sale', 'tag'],
    char: '🏷',
    category: 'objects',
    name: 'label',
    description: 'Label',
    skinVariations: false
  },
  bookmark: {
    keywords: ['favorite', 'label', 'save'],
    char: '🔖',
    category: 'objects',
    name: 'bookmark',
    description: 'Bookmark',
    skinVariations: false
  },
  toilet: {
    keywords: ['restroom', 'wc', 'washroom', 'bathroom', 'potty'],
    char: '🚽',
    category: 'objects',
    name: 'toilet',
    description: 'Toilet',
    skinVariations: false
  },
  shower: {
    keywords: ['clean', 'water', 'bathroom'],
    char: '🚿',
    category: 'objects',
    name: 'shower',
    description: 'Shower',
    skinVariations: false
  },
  bathtub: {
    keywords: ['clean', 'shower', 'bathroom'],
    char: '🛁',
    category: 'objects',
    name: 'bathtub',
    description: 'Bathtub',
    skinVariations: false
  },
  soap: {
    keywords: ['bar', 'bathing', 'cleaning', 'lather'],
    char: '🧼',
    category: 'objects',
    name: 'soap',
    description: 'Soap Bar',
    skinVariations: false
  },
  sponge: {
    keywords: ['absorbing', 'cleaning', 'porous'],
    char: '🧽',
    category: 'objects',
    name: 'sponge',
    description: 'Sponge Absorbing',
    skinVariations: false
  },
  lotion_bottle: {
    keywords: ['moisturizer', 'sunscreen'],
    char: '🧴',
    category: 'objects',
    name: 'lotion_bottle',
    description: 'Lotion Bottle Moisturizer',
    skinVariations: false
  },
  key: {
    keywords: ['lock', 'door', 'password'],
    char: '🔑',
    category: 'objects',
    name: 'key',
    description: 'Key',
    skinVariations: false
  },
  old_key: {
    keywords: ['lock', 'door', 'password'],
    char: '🗝',
    category: 'objects',
    name: 'old_key',
    description: 'Old Key',
    skinVariations: false
  },
  couch_and_lamp: {
    keywords: ['read', 'chill'],
    char: '🛋',
    category: 'objects',
    name: 'couch_and_lamp',
    description: 'Couch and Lamp',
    skinVariations: false
  },
  sleeping_bed: {
    keywords: ['bed', 'rest'],
    char: '🛌',
    category: 'objects',
    name: 'sleeping_bed',
    description: 'Sleeping Bed',
    skinVariations: true
  },
  bed: {
    keywords: ['sleep', 'rest'],
    char: '🛏',
    category: 'objects',
    name: 'bed',
    description: 'Bed',
    skinVariations: false
  },
  door: {
    keywords: ['house', 'entry', 'exit'],
    char: '🚪',
    category: 'objects',
    name: 'door',
    description: 'Door',
    skinVariations: false
  },
  bellhop_bell: {
    keywords: ['service'],
    char: '🛎',
    category: 'objects',
    name: 'bellhop_bell',
    description: 'Bellhop Bell',
    skinVariations: false
  },
  teddy_bear: {
    keywords: ['plush', 'stuffed'],
    char: '🧸',
    category: 'objects',
    name: 'teddy_bear',
    description: 'Teddy Bear Plush',
    skinVariations: false
  },
  framed_picture: {
    keywords: ['photography'],
    char: '🖼',
    category: 'objects',
    name: 'framed_picture',
    description: 'Framed Picture Photography',
    skinVariations: false
  },
  world_map: {
    keywords: ['location', 'direction'],
    char: '🗺',
    category: 'objects',
    name: 'world_map',
    description: 'World Map',
    skinVariations: false
  },
  parasol_on_ground: {
    keywords: ['weather', 'summer'],
    char: '⛱',
    category: 'objects',
    name: 'parasol_on_ground',
    description: 'Parasol On Ground Weather',
    skinVariations: false
  },
  moyai: {
    keywords: ['rock', 'easter island', 'moai'],
    char: '🗿',
    category: 'objects',
    name: 'moyai',
    description: 'Moyai',
    skinVariations: false
  },
  shopping: {
    keywords: ['mall', 'buy', 'purchase'],
    char: '🛍',
    category: 'objects',
    name: 'shopping',
    description: 'Shopping Mall',
    skinVariations: false
  },
  shopping_cart: {
    keywords: ['trolley'],
    char: '🛒',
    category: 'objects',
    name: 'shopping_cart',
    description: 'Shopping Cart Trolley',
    skinVariations: false
  },
  balloon: {
    keywords: ['party', 'celebration', 'birthday', 'circus'],
    char: '🎈',
    category: 'objects',
    name: 'balloon',
    description: 'Balloon',
    skinVariations: false
  },
  flags: {
    keywords: ['fish', 'japanese', 'koinobori', 'carp', 'banner'],
    char: '🎏',
    category: 'objects',
    name: 'flags',
    description: 'Carp Streamer',
    skinVariations: false
  },
  ribbon: {
    keywords: ['decoration', 'pink', 'girl', 'bowtie'],
    char: '🎀',
    category: 'objects',
    name: 'ribbon',
    description: 'Ribbon',
    skinVariations: false
  },
  gift: {
    keywords: ['present', 'birthday', 'christmas', 'xmas'],
    char: '🎁',
    category: 'objects',
    name: 'gift',
    description: 'Wrapped Present',
    skinVariations: false
  },
  confetti_ball: {
    keywords: ['festival', 'party', 'birthday', 'circus'],
    char: '🎊',
    category: 'objects',
    name: 'confetti_ball',
    description: 'Confetti Ball',
    skinVariations: false
  },
  tada: {
    keywords: ['party', 'congratulations', 'birthday', 'magic', 'circus', 'celebration'],
    char: '🎉',
    category: 'objects',
    name: 'tada',
    description: 'Party Popper',
    skinVariations: false
  },
  dolls: {
    keywords: ['japanese', 'toy', 'kimono'],
    char: '🎎',
    category: 'objects',
    name: 'dolls',
    description: 'Japanese Dolls',
    skinVariations: false
  },
  wind_chime: {
    keywords: ['nature', 'ding', 'spring', 'bell'],
    char: '🎐',
    category: 'objects',
    name: 'wind_chime',
    description: 'Wind Chime',
    skinVariations: false
  },
  crossed_flags: {
    keywords: ['japanese', 'nation', 'country', 'border'],
    char: '🎌',
    category: 'objects',
    name: 'crossed_flags',
    description: 'Crossed Flags',
    skinVariations: false
  },
  izakaya_lantern: {
    keywords: ['light', 'paper', 'halloween', 'spooky'],
    char: '🏮',
    category: 'objects',
    name: 'izakaya_lantern',
    description: 'Izakaya Lantern',
    skinVariations: false
  },
  red_envelope: {
    keywords: ['gift'],
    char: '🧧',
    category: 'objects',
    name: 'red_envelope',
    description: 'Red Envelope Gift',
    skinVariations: false
  },
  email: {
    keywords: ['letter', 'postal', 'inbox', 'communication'],
    char: '✉️',
    category: 'objects',
    name: 'email',
    description: 'Envelope',
    skinVariations: false
  },
  envelope_with_arrow: {
    keywords: ['email', 'communication'],
    char: '📩',
    category: 'objects',
    name: 'envelope_with_arrow',
    description: 'Envelope with Downwards Arrow Above',
    skinVariations: false
  },
  incoming_envelope: {
    keywords: ['email', 'inbox'],
    char: '📨',
    category: 'objects',
    name: 'incoming_envelope',
    description: 'Incoming Envelope',
    skinVariations: false
  },
  'e-mail': {
    keywords: ['communication', 'inbox'],
    char: '📧',
    category: 'objects',
    name: 'e-mail',
    description: 'E-Mail Symbol',
    skinVariations: false
  },
  love_letter: {
    keywords: ['email', 'like', 'affection', 'envelope', 'valentines'],
    char: '💌',
    category: 'objects',
    name: 'love_letter',
    description: 'Love Letter',
    skinVariations: false
  },
  postbox: {
    keywords: ['email', 'letter', 'envelope'],
    char: '📮',
    category: 'objects',
    name: 'postbox',
    description: 'Postbox',
    skinVariations: false
  },
  mailbox_closed: {
    keywords: ['email', 'communication', 'inbox'],
    char: '📪',
    category: 'objects',
    name: 'mailbox_closed',
    description: 'Closed Mailbox with Lowered Flag',
    skinVariations: false
  },
  mailbox: {
    keywords: ['email', 'inbox', 'communication'],
    char: '📫',
    category: 'objects',
    name: 'mailbox',
    description: 'Closed Mailbox with Raised Flag',
    skinVariations: false
  },
  mailbox_with_mail: {
    keywords: ['email', 'inbox', 'communication'],
    char: '📬',
    category: 'objects',
    name: 'mailbox_with_mail',
    description: 'Open Mailbox with Raised Flag',
    skinVariations: false
  },
  mailbox_with_no_mail: {
    keywords: ['email', 'inbox'],
    char: '📭',
    category: 'objects',
    name: 'mailbox_with_no_mail',
    description: 'Open Mailbox with Lowered Flag',
    skinVariations: false
  },
  package: {
    keywords: ['mail', 'gift', 'cardboard', 'box', 'moving'],
    char: '📦',
    category: 'objects',
    name: 'package',
    description: 'Package',
    skinVariations: false
  },
  postal_horn: {
    keywords: ['instrument', 'music'],
    char: '📯',
    category: 'objects',
    name: 'postal_horn',
    description: 'Postal Horn',
    skinVariations: false
  },
  inbox_tray: {
    keywords: ['email', 'documents'],
    char: '📥',
    category: 'objects',
    name: 'inbox_tray',
    description: 'Inbox Tray',
    skinVariations: false
  },
  outbox_tray: {
    keywords: ['inbox', 'email'],
    char: '📤',
    category: 'objects',
    name: 'outbox_tray',
    description: 'Outbox Tray',
    skinVariations: false
  },
  scroll: {
    keywords: ['documents', 'ancient', 'history', 'paper'],
    char: '📜',
    category: 'objects',
    name: 'scroll',
    description: 'Scroll',
    skinVariations: false
  },
  page_with_curl: {
    keywords: ['documents', 'office', 'paper'],
    char: '📃',
    category: 'objects',
    name: 'page_with_curl',
    description: 'Page with Curl',
    skinVariations: false
  },
  bookmark_tabs: {
    keywords: ['favorite', 'save', 'order', 'tidy'],
    char: '📑',
    category: 'objects',
    name: 'bookmark_tabs',
    description: 'Bookmark Tabs',
    skinVariations: false
  },
  receipt: {
    keywords: ['accounting', 'expenses'],
    char: '🧾',
    category: 'objects',
    name: 'receipt',
    description: 'Receipt Accounting',
    skinVariations: false
  },
  bar_chart: {
    keywords: ['graph', 'presentation', 'stats'],
    char: '📊',
    category: 'objects',
    name: 'bar_chart',
    description: 'Bar Chart',
    skinVariations: false
  },
  chart_with_upwards_trend: {
    keywords: [
      'graph',
      'presentation',
      'stats',
      'recovery',
      'business',
      'economics',
      'money',
      'sales',
      'good',
      'success'
    ],
    char: '📈',
    category: 'objects',
    name: 'chart_with_upwards_trend',
    description: 'Chart with Upwards Trend',
    skinVariations: false
  },
  chart_with_downwards_trend: {
    keywords: [
      'graph',
      'presentation',
      'stats',
      'recession',
      'business',
      'economics',
      'money',
      'sales',
      'bad',
      'failure'
    ],
    char: '📉',
    category: 'objects',
    name: 'chart_with_downwards_trend',
    description: 'Chart with Downwards Trend',
    skinVariations: false
  },
  page_facing_up: {
    keywords: ['documents', 'office', 'paper', 'information'],
    char: '📄',
    category: 'objects',
    name: 'page_facing_up',
    description: 'Page Facing Up',
    skinVariations: false
  },
  date: {
    keywords: ['calendar', 'schedule'],
    char: '📅',
    category: 'objects',
    name: 'date',
    description: 'Calendar',
    skinVariations: false
  },
  calendar: {
    keywords: ['schedule', 'date', 'planning'],
    char: '📆',
    category: 'objects',
    name: 'calendar',
    description: 'Tear-off Calendar',
    skinVariations: false
  },
  spiral_calendar: {
    keywords: ['date', 'schedule', 'planning'],
    char: '🗓',
    category: 'objects',
    name: 'spiral_calendar',
    description: 'Spiral Calendar Date',
    skinVariations: false
  },
  card_index: {
    keywords: ['business', 'stationery'],
    char: '📇',
    category: 'objects',
    name: 'card_index',
    description: 'Card Index',
    skinVariations: false
  },
  card_file_box: {
    keywords: ['business', 'stationery'],
    char: '🗃',
    category: 'objects',
    name: 'card_file_box',
    description: 'Card File Box',
    skinVariations: false
  },
  ballot_box: {
    keywords: ['election', 'vote'],
    char: '🗳',
    category: 'objects',
    name: 'ballot_box',
    description: 'Ballot Box Election',
    skinVariations: false
  },
  file_cabinet: {
    keywords: ['filing', 'organizing'],
    char: '🗄',
    category: 'objects',
    name: 'file_cabinet',
    description: 'File Cabinet',
    skinVariations: false
  },
  clipboard: {
    keywords: ['stationery', 'documents'],
    char: '📋',
    category: 'objects',
    name: 'clipboard',
    description: 'Clipboard',
    skinVariations: false
  },
  spiral_notepad: {
    keywords: ['memo', 'stationery'],
    char: '🗒',
    category: 'objects',
    name: 'spiral_notepad',
    description: 'Spiral Notepad Memo',
    skinVariations: false
  },
  file_folder: {
    keywords: ['documents', 'business', 'office'],
    char: '📁',
    category: 'objects',
    name: 'file_folder',
    description: 'File Folder',
    skinVariations: false
  },
  open_file_folder: {
    keywords: ['documents', 'load'],
    char: '📂',
    category: 'objects',
    name: 'open_file_folder',
    description: 'Open File Folder',
    skinVariations: false
  },
  card_index_dividers: {
    keywords: ['organizing', 'business', 'stationery'],
    char: '🗂',
    category: 'objects',
    name: 'card_index_dividers',
    description: 'Card Index Dividers',
    skinVariations: false
  },
  newspaper_roll: {
    keywords: ['press', 'headline'],
    char: '🗞',
    category: 'objects',
    name: 'newspaper_roll',
    description: 'Newspaper Roll Press',
    skinVariations: false
  },
  newspaper: {
    keywords: ['press', 'headline'],
    char: '📰',
    category: 'objects',
    name: 'newspaper',
    description: 'Newspaper',
    skinVariations: false
  },
  notebook: {
    keywords: ['stationery', 'record', 'notes', 'paper', 'study'],
    char: '📓',
    category: 'objects',
    name: 'notebook',
    description: 'Notebook',
    skinVariations: false
  },
  closed_book: {
    keywords: ['read', 'library', 'knowledge', 'textbook', 'learn'],
    char: '📕',
    category: 'objects',
    name: 'closed_book',
    description: 'Closed Book',
    skinVariations: false
  },
  green_book: {
    keywords: ['read', 'library', 'knowledge', 'study'],
    char: '📗',
    category: 'objects',
    name: 'green_book',
    description: 'Green Book',
    skinVariations: false
  },
  blue_book: {
    keywords: ['read', 'library', 'knowledge', 'learn', 'study'],
    char: '📘',
    category: 'objects',
    name: 'blue_book',
    description: 'Blue Book',
    skinVariations: false
  },
  orange_book: {
    keywords: ['read', 'library', 'knowledge', 'textbook', 'study'],
    char: '📙',
    category: 'objects',
    name: 'orange_book',
    description: 'Orange Book',
    skinVariations: false
  },
  notebook_with_decorative_cover: {
    keywords: ['classroom', 'notes', 'record', 'paper', 'study'],
    char: '📔',
    category: 'objects',
    name: 'notebook_with_decorative_cover',
    description: 'Notebook with Decorative Cover',
    skinVariations: false
  },
  ledger: {
    keywords: ['notes', 'paper'],
    char: '📒',
    category: 'objects',
    name: 'ledger',
    description: 'Ledger',
    skinVariations: false
  },
  books: {
    keywords: ['literature', 'library', 'study'],
    char: '📚',
    category: 'objects',
    name: 'books',
    description: 'Books',
    skinVariations: false
  },
  open_book: {
    keywords: ['book', 'read', 'library', 'knowledge', 'literature', 'learn', 'study'],
    char: '📖',
    category: 'objects',
    name: 'open_book',
    description: 'Open Book',
    skinVariations: false
  },
  safety_pin: {
    keywords: ['diaper'],
    char: '🧷',
    category: 'objects',
    name: 'safety_pin',
    description: 'Safety Pin Diaper',
    skinVariations: false
  },
  link: {
    keywords: ['rings', 'url'],
    char: '🔗',
    category: 'objects',
    name: 'link',
    description: 'Link Symbol',
    skinVariations: false
  },
  paperclip: {
    keywords: ['documents', 'stationery'],
    char: '📎',
    category: 'objects',
    name: 'paperclip',
    description: 'Paperclip',
    skinVariations: false
  },
  paperclips: {
    keywords: ['documents', 'stationery'],
    char: '🖇',
    category: 'objects',
    name: 'paperclips',
    description: 'Paperclips Documents',
    skinVariations: false
  },
  scissors: {
    keywords: ['stationery', 'cut'],
    char: '✂️',
    category: 'objects',
    name: 'scissors',
    description: 'Black Scissors',
    skinVariations: false
  },
  triangular_ruler: {
    keywords: ['stationery', 'math', 'architect', 'sketch'],
    char: '📐',
    category: 'objects',
    name: 'triangular_ruler',
    description: 'Triangular Ruler',
    skinVariations: false
  },
  straight_ruler: {
    keywords: [
      'stationery',
      'calculate',
      'length',
      'math',
      'school',
      'drawing',
      'architect',
      'sketch'
    ],
    char: '📏',
    category: 'objects',
    name: 'straight_ruler',
    description: 'Straight Ruler',
    skinVariations: false
  },
  abacus: {
    keywords: ['calculation'],
    char: '🧮',
    category: 'objects',
    name: 'abacus',
    description: 'Abacus Calculation',
    skinVariations: false
  },
  pushpin: {
    keywords: ['stationery', 'mark', 'here'],
    char: '📌',
    category: 'objects',
    name: 'pushpin',
    description: 'Pushpin',
    skinVariations: false
  },
  round_pushpin: {
    keywords: ['stationery', 'location', 'map', 'here'],
    char: '📍',
    category: 'objects',
    name: 'round_pushpin',
    description: 'Round Pushpin',
    skinVariations: false
  },
  triangular_flag_on_post: {
    keywords: ['mark', 'milestone', 'place'],
    char: '🚩',
    category: 'objects',
    name: 'triangular_flag_on_post',
    description: 'Triangular Flag on Post',
    skinVariations: false
  },
  white_flag: {
    keywords: ['losing', 'loser', 'lost', 'surrender', 'give up', 'fail'],
    char: '🏳',
    category: 'objects',
    name: 'white_flag',
    description: 'White Flag Losing',
    skinVariations: false
  },
  black_flag: {
    keywords: ['pirate'],
    char: '🏴',
    category: 'objects',
    name: 'black_flag',
    description: 'Black Flag Pirate',
    skinVariations: false
  },
  rainbow_flag: {
    keywords: [
      'flag',
      'rainbow',
      'pride',
      'gay',
      'lgbt',
      'glbt',
      'queer',
      'homosexual',
      'lesbian',
      'bisexual',
      'transgender'
    ],
    char: '🏳️‍🌈',
    category: 'objects',
    name: 'rainbow_flag',
    description: 'Rainbow Flag',
    skinVariations: false
  },
  closed_lock_with_key: {
    keywords: ['security', 'privacy'],
    char: '🔐',
    category: 'objects',
    name: 'closed_lock_with_key',
    description: 'Closed Lock with Key',
    skinVariations: false
  },
  lock: {
    keywords: ['security', 'password', 'padlock'],
    char: '🔒',
    category: 'objects',
    name: 'lock',
    description: 'Lock',
    skinVariations: false
  },
  unlock: {
    keywords: ['privacy', 'security'],
    char: '🔓',
    category: 'objects',
    name: 'unlock',
    description: 'Open Lock',
    skinVariations: false
  },
  lock_with_ink_pen: {
    keywords: ['security', 'secret'],
    char: '🔏',
    category: 'objects',
    name: 'lock_with_ink_pen',
    description: 'Lock with Ink Pen',
    skinVariations: false
  },
  pen: {
    keywords: ['stationery', 'writing', 'write'],
    char: '🖊',
    category: 'objects',
    name: 'pen',
    description: 'Pen Stationery',
    skinVariations: false
  },
  fountain_pen: {
    keywords: ['stationery', 'writing', 'write'],
    char: '🖋',
    category: 'objects',
    name: 'fountain_pen',
    description: 'Fountain Pen Stationery',
    skinVariations: false
  },
  black_nib: {
    keywords: ['pen', 'stationery', 'writing', 'write'],
    char: '✒️',
    category: 'objects',
    name: 'black_nib',
    description: 'Black Nib',
    skinVariations: false
  },
  memo: {
    keywords: [
      'write',
      'documents',
      'stationery',
      'pencil',
      'paper',
      'writing',
      'legal',
      'exam',
      'quiz',
      'test',
      'study',
      'compose'
    ],
    char: '📝',
    category: 'objects',
    name: 'memo',
    description: 'Memo',
    skinVariations: false
  },
  pencil2: {
    keywords: ['stationery', 'write', 'paper', 'writing', 'school', 'study'],
    char: '✏️',
    category: 'objects',
    name: 'pencil2',
    description: 'Pencil',
    skinVariations: false
  },
  crayon: {
    keywords: ['drawing', 'creativity'],
    char: '🖍',
    category: 'objects',
    name: 'crayon',
    description: 'Crayon Drawing',
    skinVariations: false
  },
  paintbrush: {
    keywords: ['drawing', 'creativity', 'art'],
    char: '🖌',
    category: 'objects',
    name: 'paintbrush',
    description: 'Paintbrush Drawing',
    skinVariations: false
  },
  mag: {
    keywords: ['search', 'zoom', 'find', 'detective'],
    char: '🔍',
    category: 'objects',
    name: 'mag',
    description: 'Left-Pointing Magnifying Glass',
    skinVariations: false
  },
  mag_right: {
    keywords: ['search', 'zoom', 'find', 'detective'],
    char: '🔎',
    category: 'objects',
    name: 'mag_right',
    description: 'Right-Pointing Magnifying Glass',
    skinVariations: false
  },
  heart: {
    keywords: ['love', 'like', 'valentines'],
    char: '❤️',
    category: 'symbols',
    name: 'heart',
    description: 'Heavy Black Heart',
    skinVariations: false
  },
  orange_heart: {
    keywords: ['love', 'like', 'affection', 'valentines'],
    char: '🧡',
    category: 'symbols',
    name: 'orange_heart',
    description: 'Orange Heart',
    skinVariations: false
  },
  yellow_heart: {
    keywords: ['love', 'like', 'affection', 'valentines'],
    char: '💛',
    category: 'symbols',
    name: 'yellow_heart',
    description: 'Yellow Heart',
    skinVariations: false
  },
  green_heart: {
    keywords: ['love', 'like', 'affection', 'valentines'],
    char: '💚',
    category: 'symbols',
    name: 'green_heart',
    description: 'Green Heart',
    skinVariations: false
  },
  blue_heart: {
    keywords: ['love', 'like', 'affection', 'valentines'],
    char: '💙',
    category: 'symbols',
    name: 'blue_heart',
    description: 'Blue Heart',
    skinVariations: false
  },
  purple_heart: {
    keywords: ['love', 'like', 'affection', 'valentines'],
    char: '💜',
    category: 'symbols',
    name: 'purple_heart',
    description: 'Purple Heart',
    skinVariations: false
  },
  black_heart: {
    keywords: ['evil'],
    char: '🖤',
    category: 'symbols',
    name: 'black_heart',
    description: 'Black Heart',
    skinVariations: false
  },
  broken_heart: {
    keywords: ['sad', 'sorry', 'break', 'heart', 'heartbreak'],
    char: '💔',
    category: 'symbols',
    name: 'broken_heart',
    description: 'Broken Heart',
    skinVariations: false
  },
  heavy_heart_exclamation: {
    keywords: ['decoration', 'love'],
    char: '❣',
    category: 'symbols',
    name: 'heavy_heart_exclamation',
    description: 'Heavy Heart Exclamation Decoration',
    skinVariations: false
  },
  two_hearts: {
    keywords: ['love', 'like', 'affection', 'valentines', 'heart'],
    char: '💕',
    category: 'symbols',
    name: 'two_hearts',
    description: 'Two Hearts',
    skinVariations: false
  },
  revolving_hearts: {
    keywords: ['love', 'like', 'affection', 'valentines'],
    char: '💞',
    category: 'symbols',
    name: 'revolving_hearts',
    description: 'Revolving Hearts',
    skinVariations: false
  },
  heartbeat: {
    keywords: ['love', 'like', 'affection', 'valentines', 'pink', 'heart'],
    char: '💓',
    category: 'symbols',
    name: 'heartbeat',
    description: 'Beating Heart',
    skinVariations: false
  },
  heartpulse: {
    keywords: ['like', 'love', 'affection', 'valentines', 'pink'],
    char: '💗',
    category: 'symbols',
    name: 'heartpulse',
    description: 'Growing Heart',
    skinVariations: false
  },
  sparkling_heart: {
    keywords: ['love', 'like', 'affection', 'valentines'],
    char: '💖',
    category: 'symbols',
    name: 'sparkling_heart',
    description: 'Sparkling Heart',
    skinVariations: false
  },
  cupid: {
    keywords: ['love', 'like', 'heart', 'affection', 'valentines'],
    char: '💘',
    category: 'symbols',
    name: 'cupid',
    description: 'Heart with Arrow',
    skinVariations: false
  },
  gift_heart: {
    keywords: ['love', 'valentines'],
    char: '💝',
    category: 'symbols',
    name: 'gift_heart',
    description: 'Heart with Ribbon',
    skinVariations: false
  },
  heart_decoration: {
    keywords: ['purple-square', 'love', 'like'],
    char: '💟',
    category: 'symbols',
    name: 'heart_decoration',
    description: 'Heart Decoration',
    skinVariations: false
  },
  peace_symbol: {
    keywords: ['hippie'],
    char: '☮',
    category: 'symbols',
    name: 'peace_symbol',
    description: 'Peace Symbol',
    skinVariations: false
  },
  latin_cross: {
    keywords: ['christianity'],
    char: '✝',
    category: 'symbols',
    name: 'latin_cross',
    description: 'Latin Cross',
    skinVariations: false
  },
  star_and_crescent: {
    keywords: ['islam'],
    char: '☪',
    category: 'symbols',
    name: 'star_and_crescent',
    description: 'Star and Crescent',
    skinVariations: false
  },
  om: {
    keywords: ['hinduism', 'buddhism', 'sikhism', 'jainism'],
    char: '🕉',
    category: 'symbols',
    name: 'om',
    description: 'Oman Flag',
    skinVariations: false
  },
  wheel_of_dharma: {
    keywords: ['hinduism', 'buddhism', 'sikhism', 'jainism'],
    char: '☸',
    category: 'symbols',
    name: 'wheel_of_dharma',
    description: 'Wheel of Dharma',
    skinVariations: false
  },
  star_of_david: {
    keywords: ['judaism'],
    char: '✡',
    category: 'symbols',
    name: 'star_of_david',
    description: 'Star of David',
    skinVariations: false
  },
  six_pointed_star: {
    keywords: ['purple-square', 'religion', 'jewish', 'hexagram'],
    char: '🔯',
    category: 'symbols',
    name: 'six_pointed_star',
    description: 'Six Pointed Star with Middle Dot',
    skinVariations: false
  },
  menorah: {
    keywords: ['hanukkah', 'candles', 'jewish'],
    char: '🕎',
    category: 'symbols',
    name: 'menorah',
    description: 'Menorah Hanukkah',
    skinVariations: false
  },
  yin_yang: {
    keywords: ['balance'],
    char: '☯',
    category: 'symbols',
    name: 'yin_yang',
    description: 'Yin Yang',
    skinVariations: false
  },
  orthodox_cross: {
    keywords: ['suppedaneum', 'religion'],
    char: '☦',
    category: 'symbols',
    name: 'orthodox_cross',
    description: 'Orthodox Cross',
    skinVariations: false
  },
  place_of_worship: {
    keywords: ['religion', 'church', 'temple', 'prayer'],
    char: '🛐',
    category: 'symbols',
    name: 'place_of_worship',
    description: 'Place of Worship',
    skinVariations: false
  },
  ophiuchus: {
    keywords: ['sign', 'purple-square', 'constellation', 'astrology'],
    char: '⛎',
    category: 'symbols',
    name: 'ophiuchus',
    description: 'Ophiuchus',
    skinVariations: false
  },
  aries: {
    keywords: ['sign', 'purple-square', 'zodiac', 'astrology'],
    char: '♈',
    category: 'symbols',
    name: 'aries',
    description: 'Aries',
    skinVariations: false
  },
  taurus: {
    keywords: ['purple-square', 'sign', 'zodiac', 'astrology'],
    char: '♉',
    category: 'symbols',
    name: 'taurus',
    description: 'Taurus',
    skinVariations: false
  },
  gemini: {
    keywords: ['sign', 'zodiac', 'purple-square', 'astrology'],
    char: '♊',
    category: 'symbols',
    name: 'gemini',
    description: 'Gemini',
    skinVariations: false
  },
  cancer: {
    keywords: ['sign', 'zodiac', 'purple-square', 'astrology'],
    char: '♋',
    category: 'symbols',
    name: 'cancer',
    description: 'Cancer',
    skinVariations: false
  },
  leo: {
    keywords: ['sign', 'purple-square', 'zodiac', 'astrology'],
    char: '♌',
    category: 'symbols',
    name: 'leo',
    description: 'Leo',
    skinVariations: false
  },
  virgo: {
    keywords: ['sign', 'zodiac', 'purple-square', 'astrology'],
    char: '♍',
    category: 'symbols',
    name: 'virgo',
    description: 'Virgo',
    skinVariations: false
  },
  libra: {
    keywords: ['sign', 'purple-square', 'zodiac', 'astrology'],
    char: '♎',
    category: 'symbols',
    name: 'libra',
    description: 'Libra',
    skinVariations: false
  },
  scorpius: {
    keywords: ['sign', 'zodiac', 'purple-square', 'astrology', 'scorpio'],
    char: '♏',
    category: 'symbols',
    name: 'scorpius',
    description: 'Scorpius',
    skinVariations: false
  },
  sagittarius: {
    keywords: ['sign', 'zodiac', 'purple-square', 'astrology'],
    char: '♐',
    category: 'symbols',
    name: 'sagittarius',
    description: 'Sagittarius',
    skinVariations: false
  },
  capricorn: {
    keywords: ['sign', 'zodiac', 'purple-square', 'astrology'],
    char: '♑',
    category: 'symbols',
    name: 'capricorn',
    description: 'Capricorn',
    skinVariations: false
  },
  aquarius: {
    keywords: ['sign', 'purple-square', 'zodiac', 'astrology'],
    char: '♒',
    category: 'symbols',
    name: 'aquarius',
    description: 'Aquarius',
    skinVariations: false
  },
  pisces: {
    keywords: ['purple-square', 'sign', 'zodiac', 'astrology'],
    char: '♓',
    category: 'symbols',
    name: 'pisces',
    description: 'Pisces',
    skinVariations: false
  },
  id: {
    keywords: ['purple-square', 'words'],
    char: '🆔',
    category: 'symbols',
    name: 'id',
    description: 'Squared Id',
    skinVariations: false
  },
  atom_symbol: {
    keywords: ['science', 'physics', 'chemistry'],
    char: '⚛',
    category: 'symbols',
    name: 'atom_symbol',
    description: 'Atom Symbol',
    skinVariations: false
  },
  u7a7a: {
    keywords: ['kanji', 'japanese', 'chinese', 'empty', 'sky', 'blue-square'],
    char: '🈳',
    category: 'symbols',
    name: 'u7a7a',
    description: 'Squared Cjk Unified Ideograph-7a7a',
    skinVariations: false
  },
  u5272: {
    keywords: ['cut', 'divide', 'chinese', 'kanji', 'pink-square'],
    char: '🈹',
    category: 'symbols',
    name: 'u5272',
    description: 'Squared Cjk Unified Ideograph-5272',
    skinVariations: false
  },
  radioactive: {
    keywords: ['nuclear', 'danger'],
    char: '☢',
    category: 'symbols',
    name: 'radioactive',
    description: 'Radioactive Nuclear',
    skinVariations: false
  },
  biohazard: {
    keywords: ['danger'],
    char: '☣',
    category: 'symbols',
    name: 'biohazard',
    description: 'Biohazard Danger',
    skinVariations: false
  },
  mobile_phone_off: {
    keywords: ['mute', 'orange-square', 'silence', 'quiet'],
    char: '📴',
    category: 'symbols',
    name: 'mobile_phone_off',
    description: 'Mobile Phone off',
    skinVariations: false
  },
  vibration_mode: {
    keywords: ['orange-square', 'phone'],
    char: '📳',
    category: 'symbols',
    name: 'vibration_mode',
    description: 'Vibration Mode',
    skinVariations: false
  },
  u6709: {
    keywords: ['orange-square', 'chinese', 'have', 'kanji'],
    char: '🈶',
    category: 'symbols',
    name: 'u6709',
    description: 'Squared Cjk Unified Ideograph-6709',
    skinVariations: false
  },
  u7121: {
    keywords: ['nothing', 'chinese', 'kanji', 'japanese', 'orange-square'],
    char: '🈚',
    category: 'symbols',
    name: 'u7121',
    description: 'Squared Cjk Unified Ideograph-7121',
    skinVariations: false
  },
  u7533: {
    keywords: ['chinese', 'japanese', 'kanji', 'orange-square'],
    char: '🈸',
    category: 'symbols',
    name: 'u7533',
    description: 'Squared Cjk Unified Ideograph-7533',
    skinVariations: false
  },
  u55b6: {
    keywords: ['japanese', 'opening hours', 'orange-square'],
    char: '🈺',
    category: 'symbols',
    name: 'u55b6',
    description: 'Squared Cjk Unified Ideograph-55b6',
    skinVariations: false
  },
  u6708: {
    keywords: ['chinese', 'month', 'moon', 'japanese', 'orange-square', 'kanji'],
    char: '🈷️',
    category: 'symbols',
    name: 'u6708',
    description: 'Squared Cjk Unified Ideograph-6708',
    skinVariations: false
  },
  eight_pointed_black_star: {
    keywords: ['orange-square', 'shape', 'polygon'],
    char: '✴️',
    category: 'symbols',
    name: 'eight_pointed_black_star',
    description: 'Eight Pointed Black Star',
    skinVariations: false
  },
  vs: {
    keywords: ['words', 'orange-square'],
    char: '🆚',
    category: 'symbols',
    name: 'vs',
    description: 'Squared Vs',
    skinVariations: false
  },
  accept: {
    keywords: ['ok', 'good', 'chinese', 'kanji', 'agree', 'yes', 'orange-circle'],
    char: '🉑',
    category: 'symbols',
    name: 'accept',
    description: 'Circled Ideograph Accept',
    skinVariations: false
  },
  white_flower: {
    keywords: ['japanese', 'spring'],
    char: '💮',
    category: 'symbols',
    name: 'white_flower',
    description: 'White Flower',
    skinVariations: false
  },
  ideograph_advantage: {
    keywords: ['chinese', 'kanji', 'obtain', 'get', 'circle'],
    char: '🉐',
    category: 'symbols',
    name: 'ideograph_advantage',
    description: 'Circled Ideograph Advantage',
    skinVariations: false
  },
  secret: {
    keywords: ['privacy', 'chinese', 'sshh', 'kanji', 'red-circle'],
    char: '㊙️',
    category: 'symbols',
    name: 'secret',
    description: 'Circled Ideograph Secret',
    skinVariations: false
  },
  congratulations: {
    keywords: ['chinese', 'kanji', 'japanese', 'red-circle'],
    char: '㊗️',
    category: 'symbols',
    name: 'congratulations',
    description: 'Circled Ideograph Congratulation',
    skinVariations: false
  },
  u5408: {
    keywords: ['japanese', 'chinese', 'join', 'kanji', 'red-square'],
    char: '🈴',
    category: 'symbols',
    name: 'u5408',
    description: 'Squared Cjk Unified Ideograph-5408',
    skinVariations: false
  },
  u6e80: {
    keywords: ['full', 'chinese', 'japanese', 'red-square', 'kanji'],
    char: '🈵',
    category: 'symbols',
    name: 'u6e80',
    description: 'Squared Cjk Unified Ideograph-6e80',
    skinVariations: false
  },
  u7981: {
    keywords: ['kanji', 'japanese', 'chinese', 'forbidden', 'limit', 'restricted', 'red-square'],
    char: '🈲',
    category: 'symbols',
    name: 'u7981',
    description: 'Squared Cjk Unified Ideograph-7981',
    skinVariations: false
  },
  a: {
    keywords: ['red-square', 'alphabet', 'letter'],
    char: '🅰️',
    category: 'symbols',
    name: 'a',
    description: 'Negative Squared Latin Capital Letter a',
    skinVariations: false
  },
  b: {
    keywords: ['red-square', 'alphabet', 'letter'],
    char: '🅱️',
    category: 'symbols',
    name: 'b',
    description: 'Negative Squared Latin Capital Letter B',
    skinVariations: false
  },
  ab: {
    keywords: ['red-square', 'alphabet'],
    char: '🆎',
    category: 'symbols',
    name: 'ab',
    description: 'Negative Squared Ab',
    skinVariations: false
  },
  cl: {
    keywords: ['alphabet', 'words', 'red-square'],
    char: '🆑',
    category: 'symbols',
    name: 'cl',
    description: 'Squared Cl',
    skinVariations: false
  },
  o2: {
    keywords: ['alphabet', 'red-square', 'letter'],
    char: '🅾️',
    category: 'symbols',
    name: 'o2',
    description: 'Negative Squared Latin Capital Letter O',
    skinVariations: false
  },
  sos: {
    keywords: ['help', 'red-square', 'words', 'emergency', '911'],
    char: '🆘',
    category: 'symbols',
    name: 'sos',
    description: 'Squared Sos',
    skinVariations: false
  },
  no_entry: {
    keywords: ['limit', 'security', 'privacy', 'bad', 'denied', 'stop', 'circle'],
    char: '⛔',
    category: 'symbols',
    name: 'no_entry',
    description: 'No Entry',
    skinVariations: false
  },
  name_badge: {
    keywords: ['fire', 'forbid'],
    char: '📛',
    category: 'symbols',
    name: 'name_badge',
    description: 'Name Badge',
    skinVariations: false
  },
  no_entry_sign: {
    keywords: ['forbid', 'stop', 'limit', 'denied', 'disallow', 'circle'],
    char: '🚫',
    category: 'symbols',
    name: 'no_entry_sign',
    description: 'No Entry Sign',
    skinVariations: false
  },
  x: {
    keywords: ['no', 'delete', 'remove', 'cancel', 'red'],
    char: '❌',
    category: 'symbols',
    name: 'x',
    description: 'Cross Mark',
    skinVariations: false
  },
  o: {
    keywords: ['circle', 'round'],
    char: '⭕',
    category: 'symbols',
    name: 'o',
    description: 'Heavy Large Circle',
    skinVariations: false
  },
  stop_sign: {
    keywords: ['stop'],
    char: '🛑',
    category: 'symbols',
    name: 'stop_sign',
    description: 'Stop Sign',
    skinVariations: false
  },
  anger: {
    keywords: ['angry', 'mad'],
    char: '💢',
    category: 'symbols',
    name: 'anger',
    description: 'Anger Symbol',
    skinVariations: false
  },
  hotsprings: {
    keywords: ['bath', 'warm', 'relax'],
    char: '♨️',
    category: 'symbols',
    name: 'hotsprings',
    description: 'Hot Springs',
    skinVariations: false
  },
  no_pedestrians: {
    keywords: ['rules', 'crossing', 'walking', 'circle'],
    char: '🚷',
    category: 'symbols',
    name: 'no_pedestrians',
    description: 'No Pedestrians',
    skinVariations: false
  },
  do_not_litter: {
    keywords: ['trash', 'bin', 'garbage', 'circle'],
    char: '🚯',
    category: 'symbols',
    name: 'do_not_litter',
    description: 'Do Not Litter Symbol',
    skinVariations: false
  },
  no_bicycles: {
    keywords: ['cyclist', 'prohibited', 'circle'],
    char: '🚳',
    category: 'symbols',
    name: 'no_bicycles',
    description: 'No Bicycles',
    skinVariations: false
  },
  'non-potable_water': {
    keywords: ['drink', 'faucet', 'tap', 'circle'],
    char: '🚱',
    category: 'symbols',
    name: 'non-potable_water',
    description: 'Non-Potable Water Symbol',
    skinVariations: false
  },
  underage: {
    keywords: ['18', 'drink', 'pub', 'night', 'minor', 'circle'],
    char: '🔞',
    category: 'symbols',
    name: 'underage',
    description: 'No One Under Eighteen Symbol',
    skinVariations: false
  },
  no_mobile_phones: {
    keywords: ['iphone', 'mute', 'circle'],
    char: '📵',
    category: 'symbols',
    name: 'no_mobile_phones',
    description: 'No Mobile Phones',
    skinVariations: false
  },
  exclamation: {
    keywords: ['heavy_exclamation_mark', 'danger', 'surprise', 'punctuation', 'wow', 'warning'],
    char: '❗',
    category: 'symbols',
    name: 'exclamation',
    description: 'Heavy Exclamation Mark Symbol',
    skinVariations: false
  },
  grey_exclamation: {
    keywords: ['surprise', 'punctuation', 'gray', 'wow', 'warning'],
    char: '❕',
    category: 'symbols',
    name: 'grey_exclamation',
    description: 'White Exclamation Mark Ornament',
    skinVariations: false
  },
  question: {
    keywords: ['doubt', 'confused'],
    char: '❓',
    category: 'symbols',
    name: 'question',
    description: 'Black Question Mark Ornament',
    skinVariations: false
  },
  grey_question: {
    keywords: ['doubts', 'gray', 'huh', 'confused'],
    char: '❔',
    category: 'symbols',
    name: 'grey_question',
    description: 'White Question Mark Ornament',
    skinVariations: false
  },
  bangbang: {
    keywords: ['exclamation', 'surprise'],
    char: '‼️',
    category: 'symbols',
    name: 'bangbang',
    description: 'Double Exclamation Mark',
    skinVariations: false
  },
  interrobang: {
    keywords: ['wat', 'punctuation', 'surprise'],
    char: '⁉️',
    category: 'symbols',
    name: 'interrobang',
    description: 'Exclamation Question Mark',
    skinVariations: false
  },
  low_brightness: {
    keywords: ['sun', 'afternoon', 'warm', 'summer'],
    char: '🔅',
    category: 'symbols',
    name: 'low_brightness',
    description: 'Low Brightness Symbol',
    skinVariations: false
  },
  high_brightness: {
    keywords: ['sun', 'light'],
    char: '🔆',
    category: 'symbols',
    name: 'high_brightness',
    description: 'High Brightness Symbol',
    skinVariations: false
  },
  trident: {
    keywords: ['weapon', 'spear'],
    char: '🔱',
    category: 'symbols',
    name: 'trident',
    description: 'Trident Emblem',
    skinVariations: false
  },
  fleur_de_lis: {
    keywords: ['decorative', 'scout'],
    char: '⚜',
    category: 'symbols',
    name: 'fleur_de_lis',
    description: 'Fleur De Lis',
    skinVariations: false
  },
  part_alternation_mark: {
    keywords: ['graph', 'presentation', 'stats', 'business', 'economics', 'bad'],
    char: '〽️',
    category: 'symbols',
    name: 'part_alternation_mark',
    description: 'Part Alternation Mark',
    skinVariations: false
  },
  warning: {
    keywords: ['exclamation', 'wip', 'alert', 'error', 'problem', 'issue'],
    char: '⚠️',
    category: 'symbols',
    name: 'warning',
    description: 'Warning Sign',
    skinVariations: false
  },
  children_crossing: {
    keywords: ['school', 'warning', 'danger', 'sign', 'driving', 'yellow-diamond'],
    char: '🚸',
    category: 'symbols',
    name: 'children_crossing',
    description: 'Children Crossing',
    skinVariations: false
  },
  beginner: {
    keywords: ['badge', 'shield'],
    char: '🔰',
    category: 'symbols',
    name: 'beginner',
    description: 'Japanese Symbol for Beginner',
    skinVariations: false
  },
  recycle: {
    keywords: ['arrow', 'environment', 'garbage', 'trash'],
    char: '♻️',
    category: 'symbols',
    name: 'recycle',
    description: 'Black Universal Recycling Symbol',
    skinVariations: false
  },
  u6307: {
    keywords: ['chinese', 'point', 'green-square', 'kanji'],
    char: '🈯',
    category: 'symbols',
    name: 'u6307',
    description: 'Squared Cjk Unified Ideograph-6307',
    skinVariations: false
  },
  chart: {
    keywords: ['green-square', 'graph', 'presentation', 'stats'],
    char: '💹',
    category: 'symbols',
    name: 'chart',
    description: 'Chart with Upwards Trend and Yen Sign',
    skinVariations: false
  },
  sparkle: {
    keywords: ['stars', 'green-square', 'awesome', 'good', 'fireworks'],
    char: '❇️',
    category: 'symbols',
    name: 'sparkle',
    description: 'Sparkle',
    skinVariations: false
  },
  eight_spoked_asterisk: {
    keywords: ['star', 'sparkle', 'green-square'],
    char: '✳️',
    category: 'symbols',
    name: 'eight_spoked_asterisk',
    description: 'Eight Spoked Asterisk',
    skinVariations: false
  },
  negative_squared_cross_mark: {
    keywords: ['x', 'green-square', 'no', 'deny'],
    char: '❎',
    category: 'symbols',
    name: 'negative_squared_cross_mark',
    description: 'Negative Squared Cross Mark',
    skinVariations: false
  },
  white_check_mark: {
    keywords: ['green-square', 'ok', 'agree', 'vote', 'election', 'answer', 'tick'],
    char: '✅',
    category: 'symbols',
    name: 'white_check_mark',
    description: 'White Heavy Check Mark',
    skinVariations: false
  },
  diamond_shape_with_a_dot_inside: {
    keywords: ['jewel', 'blue', 'gem', 'crystal', 'fancy'],
    char: '💠',
    category: 'symbols',
    name: 'diamond_shape_with_a_dot_inside',
    description: 'Diamond Shape with a Dot Inside',
    skinVariations: false
  },
  cyclone: {
    keywords: [
      'weather',
      'swirl',
      'blue',
      'cloud',
      'vortex',
      'spiral',
      'whirlpool',
      'spin',
      'tornado',
      'hurricane',
      'typhoon'
    ],
    char: '🌀',
    category: 'symbols',
    name: 'cyclone',
    description: 'Cyclone',
    skinVariations: false
  },
  loop: {
    keywords: ['tape', 'cassette'],
    char: '➿',
    category: 'symbols',
    name: 'loop',
    description: 'Double Curly Loop',
    skinVariations: false
  },
  globe_with_meridians: {
    keywords: ['earth', 'international', 'world', 'internet', 'interweb', 'i18n'],
    char: '🌐',
    category: 'symbols',
    name: 'globe_with_meridians',
    description: 'Globe with Meridians',
    skinVariations: false
  },
  m: {
    keywords: ['alphabet', 'blue-circle', 'letter'],
    char: 'Ⓜ️',
    category: 'symbols',
    name: 'm',
    description: 'Circled Latin Capital Letter M',
    skinVariations: false
  },
  atm: {
    keywords: ['money', 'sales', 'cash', 'blue-square', 'payment', 'bank'],
    char: '🏧',
    category: 'symbols',
    name: 'atm',
    description: 'Automated Teller Machine',
    skinVariations: false
  },
  sa: {
    keywords: ['japanese', 'blue-square', 'katakana'],
    char: '🈂️',
    category: 'symbols',
    name: 'sa',
    description: 'Squared Katakana Sa',
    skinVariations: false
  },
  passport_control: {
    keywords: ['custom', 'blue-square'],
    char: '🛂',
    category: 'symbols',
    name: 'passport_control',
    description: 'Passport Control',
    skinVariations: false
  },
  customs: {
    keywords: ['passport', 'border', 'blue-square'],
    char: '🛃',
    category: 'symbols',
    name: 'customs',
    description: 'Customs',
    skinVariations: false
  },
  baggage_claim: {
    keywords: ['blue-square', 'airport', 'transport'],
    char: '🛄',
    category: 'symbols',
    name: 'baggage_claim',
    description: 'Baggage Claim',
    skinVariations: false
  },
  left_luggage: {
    keywords: ['blue-square', 'travel'],
    char: '🛅',
    category: 'symbols',
    name: 'left_luggage',
    description: 'Left Luggage',
    skinVariations: false
  },
  wheelchair: {
    keywords: ['blue-square', 'disabled', 'a11y', 'accessibility'],
    char: '♿',
    category: 'symbols',
    name: 'wheelchair',
    description: 'Wheelchair Symbol',
    skinVariations: false
  },
  no_smoking: {
    keywords: ['cigarette', 'blue-square', 'smell', 'smoke'],
    char: '🚭',
    category: 'symbols',
    name: 'no_smoking',
    description: 'No Smoking Symbol',
    skinVariations: false
  },
  wc: {
    keywords: ['toilet', 'restroom', 'blue-square'],
    char: '🚾',
    category: 'symbols',
    name: 'wc',
    description: 'Water Closet',
    skinVariations: false
  },
  parking: {
    keywords: ['cars', 'blue-square', 'alphabet', 'letter'],
    char: '🅿️',
    category: 'symbols',
    name: 'parking',
    description: 'Negative Squared Latin Capital Letter P',
    skinVariations: false
  },
  potable_water: {
    keywords: ['blue-square', 'liquid', 'restroom', 'cleaning', 'faucet'],
    char: '🚰',
    category: 'symbols',
    name: 'potable_water',
    description: 'Potable Water Symbol',
    skinVariations: false
  },
  mens: {
    keywords: ['toilet', 'restroom', 'wc', 'blue-square', 'gender', 'male'],
    char: '🚹',
    category: 'symbols',
    name: 'mens',
    description: 'Mens Symbol',
    skinVariations: false
  },
  womens: {
    keywords: ['purple-square', 'woman', 'female', 'toilet', 'loo', 'restroom', 'gender'],
    char: '🚺',
    category: 'symbols',
    name: 'womens',
    description: 'Womens Symbol',
    skinVariations: false
  },
  baby_symbol: {
    keywords: ['orange-square', 'child'],
    char: '🚼',
    category: 'symbols',
    name: 'baby_symbol',
    description: 'Baby Symbol',
    skinVariations: false
  },
  restroom: {
    keywords: ['blue-square', 'toilet', 'refresh', 'wc', 'gender'],
    char: '🚻',
    category: 'symbols',
    name: 'restroom',
    description: 'Restroom',
    skinVariations: false
  },
  put_litter_in_its_place: {
    keywords: ['blue-square', 'sign', 'human', 'info'],
    char: '🚮',
    category: 'symbols',
    name: 'put_litter_in_its_place',
    description: 'Put Litter in Its Place Symbol',
    skinVariations: false
  },
  cinema: {
    keywords: ['blue-square', 'record', 'film', 'movie', 'curtain', 'stage', 'theater'],
    char: '🎦',
    category: 'symbols',
    name: 'cinema',
    description: 'Cinema',
    skinVariations: false
  },
  signal_strength: {
    keywords: [
      'blue-square',
      'reception',
      'phone',
      'internet',
      'connection',
      'wifi',
      'bluetooth',
      'bars'
    ],
    char: '📶',
    category: 'symbols',
    name: 'signal_strength',
    description: 'Antenna with Bars',
    skinVariations: false
  },
  koko: {
    keywords: ['blue-square', 'here', 'katakana', 'japanese', 'destination'],
    char: '🈁',
    category: 'symbols',
    name: 'koko',
    description: 'Squared Katakana Koko',
    skinVariations: false
  },
  ng: {
    keywords: ['blue-square', 'words', 'shape', 'icon'],
    char: '🆖',
    category: 'symbols',
    name: 'ng',
    description: 'Squared Ng',
    skinVariations: false
  },
  ok: {
    keywords: ['good', 'agree', 'yes', 'blue-square'],
    char: '🆗',
    category: 'symbols',
    name: 'ok',
    description: 'Squared Ok',
    skinVariations: false
  },
  up: {
    keywords: ['blue-square', 'above', 'high'],
    char: '🆙',
    category: 'symbols',
    name: 'up',
    description: 'Squared Up with Exclamation Mark',
    skinVariations: false
  },
  cool: {
    keywords: ['words', 'blue-square'],
    char: '🆒',
    category: 'symbols',
    name: 'cool',
    description: 'Squared Cool',
    skinVariations: false
  },
  new: {
    keywords: ['blue-square', 'words', 'start'],
    char: '🆕',
    category: 'symbols',
    name: 'new',
    description: 'Squared New',
    skinVariations: false
  },
  free: {
    keywords: ['blue-square', 'words'],
    char: '🆓',
    category: 'symbols',
    name: 'free',
    description: 'Squared Free',
    skinVariations: false
  },
  zero: {
    keywords: ['0', 'numbers', 'blue-square', 'null'],
    char: '0️⃣',
    category: 'symbols',
    name: 'zero',
    description: 'Keycap 0',
    skinVariations: false
  },
  one: {
    keywords: ['blue-square', 'numbers', '1'],
    char: '1️⃣',
    category: 'symbols',
    name: 'one',
    description: 'Keycap 1',
    skinVariations: false
  },
  two: {
    keywords: ['numbers', '2', 'prime', 'blue-square'],
    char: '2️⃣',
    category: 'symbols',
    name: 'two',
    description: 'Keycap 2',
    skinVariations: false
  },
  three: {
    keywords: ['3', 'numbers', 'prime', 'blue-square'],
    char: '3️⃣',
    category: 'symbols',
    name: 'three',
    description: 'Keycap 3',
    skinVariations: false
  },
  four: {
    keywords: ['4', 'numbers', 'blue-square'],
    char: '4️⃣',
    category: 'symbols',
    name: 'four',
    description: 'Keycap 4',
    skinVariations: false
  },
  five: {
    keywords: ['5', 'numbers', 'blue-square', 'prime'],
    char: '5️⃣',
    category: 'symbols',
    name: 'five',
    description: 'Keycap 5',
    skinVariations: false
  },
  six: {
    keywords: ['6', 'numbers', 'blue-square'],
    char: '6️⃣',
    category: 'symbols',
    name: 'six',
    description: 'Keycap 6',
    skinVariations: false
  },
  seven: {
    keywords: ['7', 'numbers', 'blue-square', 'prime'],
    char: '7️⃣',
    category: 'symbols',
    name: 'seven',
    description: 'Keycap 7',
    skinVariations: false
  },
  eight: {
    keywords: ['8', 'blue-square', 'numbers'],
    char: '8️⃣',
    category: 'symbols',
    name: 'eight',
    description: 'Keycap 8',
    skinVariations: false
  },
  nine: {
    keywords: ['blue-square', 'numbers', '9'],
    char: '9️⃣',
    category: 'symbols',
    name: 'nine',
    description: 'Keycap 9',
    skinVariations: false
  },
  keycap_ten: {
    keywords: ['numbers', '10', 'blue-square'],
    char: '🔟',
    category: 'symbols',
    name: 'keycap_ten',
    description: 'Keycap Ten',
    skinVariations: false
  },
  asterisk: {
    keywords: ['star', 'keycap'],
    char: '*⃣',
    category: 'symbols',
    name: 'asterisk',
    description: 'Asterisk Star',
    skinVariations: false
  },
  eject_button: {
    keywords: ['blue-square'],
    char: '⏏️',
    category: 'symbols',
    name: 'eject_button',
    description: 'Eject Button Blue-square',
    skinVariations: false
  },
  arrow_forward: {
    keywords: ['blue-square', 'right', 'direction', 'play'],
    char: '▶️',
    category: 'symbols',
    name: 'arrow_forward',
    description: 'Black Right-Pointing Triangle',
    skinVariations: false
  },
  pause_button: {
    keywords: ['pause', 'blue-square'],
    char: '⏸',
    category: 'symbols',
    name: 'pause_button',
    description: 'Pause Button',
    skinVariations: false
  },
  next_track_button: {
    keywords: ['forward', 'next', 'blue-square'],
    char: '⏭',
    category: 'symbols',
    name: 'next_track_button',
    description: 'Next Track Button Forward',
    skinVariations: false
  },
  stop_button: {
    keywords: ['blue-square'],
    char: '⏹',
    category: 'symbols',
    name: 'stop_button',
    description: 'Stop Button Blue-square',
    skinVariations: false
  },
  record_button: {
    keywords: ['blue-square'],
    char: '⏺',
    category: 'symbols',
    name: 'record_button',
    description: 'Record Button Blue-square',
    skinVariations: false
  },
  play_or_pause_button: {
    keywords: ['blue-square', 'play', 'pause'],
    char: '⏯',
    category: 'symbols',
    name: 'play_or_pause_button',
    description: 'Play Or Pause Button Blue-square',
    skinVariations: false
  },
  previous_track_button: {
    keywords: ['backward'],
    char: '⏮',
    category: 'symbols',
    name: 'previous_track_button',
    description: 'Previous Track Button Backward',
    skinVariations: false
  },
  fast_forward: {
    keywords: ['blue-square', 'play', 'speed', 'continue'],
    char: '⏩',
    category: 'symbols',
    name: 'fast_forward',
    description: 'Black Right-Pointing Double Triangle',
    skinVariations: false
  },
  rewind: {
    keywords: ['play', 'blue-square'],
    char: '⏪',
    category: 'symbols',
    name: 'rewind',
    description: 'Black Left-Pointing Double Triangle',
    skinVariations: false
  },
  twisted_rightwards_arrows: {
    keywords: ['blue-square', 'shuffle', 'music', 'random'],
    char: '🔀',
    category: 'symbols',
    name: 'twisted_rightwards_arrows',
    description: 'Twisted Rightwards Arrows',
    skinVariations: false
  },
  repeat: {
    keywords: ['loop', 'record'],
    char: '🔁',
    category: 'symbols',
    name: 'repeat',
    description: 'Clockwise Rightwards and Leftwards Open Circle Arrows',
    skinVariations: false
  },
  repeat_one: {
    keywords: ['blue-square', 'loop'],
    char: '🔂',
    category: 'symbols',
    name: 'repeat_one',
    description: 'Clockwise Rightwards and Leftwards Open Circle Arrows with Circled One Overlay',
    skinVariations: false
  },
  arrow_backward: {
    keywords: ['blue-square', 'left', 'direction'],
    char: '◀️',
    category: 'symbols',
    name: 'arrow_backward',
    description: 'Black Left-Pointing Triangle',
    skinVariations: false
  },
  arrow_up_small: {
    keywords: ['blue-square', 'triangle', 'direction', 'point', 'forward', 'top'],
    char: '🔼',
    category: 'symbols',
    name: 'arrow_up_small',
    description: 'Up-Pointing Small Red Triangle',
    skinVariations: false
  },
  arrow_down_small: {
    keywords: ['blue-square', 'direction', 'bottom'],
    char: '🔽',
    category: 'symbols',
    name: 'arrow_down_small',
    description: 'Down-Pointing Small Red Triangle',
    skinVariations: false
  },
  arrow_double_up: {
    keywords: ['blue-square', 'direction', 'top'],
    char: '⏫',
    category: 'symbols',
    name: 'arrow_double_up',
    description: 'Black Up-Pointing Double Triangle',
    skinVariations: false
  },
  arrow_double_down: {
    keywords: ['blue-square', 'direction', 'bottom'],
    char: '⏬',
    category: 'symbols',
    name: 'arrow_double_down',
    description: 'Black Down-Pointing Double Triangle',
    skinVariations: false
  },
  arrow_right: {
    keywords: ['blue-square', 'next'],
    char: '➡️',
    category: 'symbols',
    name: 'arrow_right',
    description: 'Black Rightwards Arrow',
    skinVariations: false
  },
  arrow_left: {
    keywords: ['blue-square', 'previous', 'back'],
    char: '⬅️',
    category: 'symbols',
    name: 'arrow_left',
    description: 'Leftwards Black Arrow',
    skinVariations: false
  },
  arrow_up: {
    keywords: ['blue-square', 'continue', 'top', 'direction'],
    char: '⬆️',
    category: 'symbols',
    name: 'arrow_up',
    description: 'Upwards Black Arrow',
    skinVariations: false
  },
  arrow_down: {
    keywords: ['blue-square', 'direction', 'bottom'],
    char: '⬇️',
    category: 'symbols',
    name: 'arrow_down',
    description: 'Downwards Black Arrow',
    skinVariations: false
  },
  arrow_upper_right: {
    keywords: ['blue-square', 'point', 'direction', 'diagonal', 'northeast'],
    char: '↗️',
    category: 'symbols',
    name: 'arrow_upper_right',
    description: 'North East Arrow',
    skinVariations: false
  },
  arrow_lower_right: {
    keywords: ['blue-square', 'direction', 'diagonal', 'southeast'],
    char: '↘️',
    category: 'symbols',
    name: 'arrow_lower_right',
    description: 'South East Arrow',
    skinVariations: false
  },
  arrow_lower_left: {
    keywords: ['blue-square', 'direction', 'diagonal', 'southwest'],
    char: '↙️',
    category: 'symbols',
    name: 'arrow_lower_left',
    description: 'South West Arrow',
    skinVariations: false
  },
  arrow_upper_left: {
    keywords: ['blue-square', 'point', 'direction', 'diagonal', 'northwest'],
    char: '↖️',
    category: 'symbols',
    name: 'arrow_upper_left',
    description: 'North West Arrow',
    skinVariations: false
  },
  arrow_up_down: {
    keywords: ['blue-square', 'direction', 'way', 'vertical'],
    char: '↕️',
    category: 'symbols',
    name: 'arrow_up_down',
    description: 'Up Down Arrow',
    skinVariations: false
  },
  left_right_arrow: {
    keywords: ['shape', 'direction', 'horizontal', 'sideways'],
    char: '↔️',
    category: 'symbols',
    name: 'left_right_arrow',
    description: 'Left Right Arrow',
    skinVariations: false
  },
  arrows_counterclockwise: {
    keywords: ['blue-square', 'sync', 'cycle'],
    char: '🔄',
    category: 'symbols',
    name: 'arrows_counterclockwise',
    description: 'Anticlockwise Downwards and Upwards Open Circle Arrows',
    skinVariations: false
  },
  arrow_right_hook: {
    keywords: ['blue-square', 'return', 'rotate', 'direction'],
    char: '↪️',
    category: 'symbols',
    name: 'arrow_right_hook',
    description: 'Rightwards Arrow with Hook',
    skinVariations: false
  },
  leftwards_arrow_with_hook: {
    keywords: ['back', 'return', 'blue-square', 'undo', 'enter'],
    char: '↩️',
    category: 'symbols',
    name: 'leftwards_arrow_with_hook',
    description: 'Leftwards Arrow with Hook',
    skinVariations: false
  },
  arrow_heading_up: {
    keywords: ['blue-square', 'direction', 'top'],
    char: '⤴️',
    category: 'symbols',
    name: 'arrow_heading_up',
    description: 'Arrow Pointing Rightwards Then Curving Upwards',
    skinVariations: false
  },
  arrow_heading_down: {
    keywords: ['blue-square', 'direction', 'bottom'],
    char: '⤵️',
    category: 'symbols',
    name: 'arrow_heading_down',
    description: 'Arrow Pointing Rightwards Then Curving Downwards',
    skinVariations: false
  },
  hash: {
    keywords: ['symbol', 'blue-square', 'twitter'],
    char: '#️⃣',
    category: 'symbols',
    name: 'hash',
    description: 'Hash Key',
    skinVariations: false
  },
  information_source: {
    keywords: ['blue-square', 'alphabet', 'letter'],
    char: 'ℹ️',
    category: 'symbols',
    name: 'information_source',
    description: 'Information Source',
    skinVariations: false
  },
  abc: {
    keywords: ['blue-square', 'alphabet'],
    char: '🔤',
    category: 'symbols',
    name: 'abc',
    description: 'Input Symbol for Latin Letters',
    skinVariations: false
  },
  abcd: {
    keywords: ['blue-square', 'alphabet'],
    char: '🔡',
    category: 'symbols',
    name: 'abcd',
    description: 'Input Symbol for Latin Small Letters',
    skinVariations: false
  },
  capital_abcd: {
    keywords: ['alphabet', 'words', 'blue-square'],
    char: '🔠',
    category: 'symbols',
    name: 'capital_abcd',
    description: 'Input Symbol for Latin Capital Letters',
    skinVariations: false
  },
  symbols: {
    keywords: ['blue-square', 'music', 'note', 'ampersand', 'percent', 'glyphs', 'characters'],
    char: '🔣',
    category: 'symbols',
    name: 'symbols',
    description: 'Input Symbol for Symbols',
    skinVariations: false
  },
  musical_note: {
    keywords: ['score', 'tone', 'sound'],
    char: '🎵',
    category: 'symbols',
    name: 'musical_note',
    description: 'Musical Note',
    skinVariations: false
  },
  notes: {
    keywords: ['music', 'score'],
    char: '🎶',
    category: 'symbols',
    name: 'notes',
    description: 'Multiple Musical Notes',
    skinVariations: false
  },
  wavy_dash: {
    keywords: ['draw', 'line', 'moustache', 'mustache', 'squiggle', 'scribble'],
    char: '〰️',
    category: 'symbols',
    name: 'wavy_dash',
    description: 'Wavy Dash',
    skinVariations: false
  },
  curly_loop: {
    keywords: ['scribble', 'draw', 'shape', 'squiggle'],
    char: '➰',
    category: 'symbols',
    name: 'curly_loop',
    description: 'Curly Loop',
    skinVariations: false
  },
  heavy_check_mark: {
    keywords: ['ok', 'nike', 'answer', 'yes', 'tick'],
    char: '✔️',
    category: 'symbols',
    name: 'heavy_check_mark',
    description: 'Heavy Check Mark',
    skinVariations: false
  },
  arrows_clockwise: {
    keywords: ['sync', 'cycle', 'round', 'repeat'],
    char: '🔃',
    category: 'symbols',
    name: 'arrows_clockwise',
    description: 'Clockwise Downwards and Upwards Open Circle Arrows',
    skinVariations: false
  },
  heavy_plus_sign: {
    keywords: ['math', 'calculation', 'addition', 'more', 'increase'],
    char: '➕',
    category: 'symbols',
    name: 'heavy_plus_sign',
    description: 'Heavy Plus Sign',
    skinVariations: false
  },
  heavy_minus_sign: {
    keywords: ['math', 'calculation', 'subtract', 'less'],
    char: '➖',
    category: 'symbols',
    name: 'heavy_minus_sign',
    description: 'Heavy Minus Sign',
    skinVariations: false
  },
  heavy_division_sign: {
    keywords: ['divide', 'math', 'calculation'],
    char: '➗',
    category: 'symbols',
    name: 'heavy_division_sign',
    description: 'Heavy Division Sign',
    skinVariations: false
  },
  heavy_multiplication_x: {
    keywords: ['math', 'calculation'],
    char: '✖️',
    category: 'symbols',
    name: 'heavy_multiplication_x',
    description: 'Heavy Multiplication X',
    skinVariations: false
  },
  infinity: {
    keywords: ['forever'],
    char: '♾',
    category: 'symbols',
    name: 'infinity',
    description: 'Infinity Forever',
    skinVariations: false
  },
  heavy_dollar_sign: {
    keywords: ['money', 'sales', 'payment', 'currency', 'buck'],
    char: '💲',
    category: 'symbols',
    name: 'heavy_dollar_sign',
    description: 'Heavy Dollar Sign',
    skinVariations: false
  },
  currency_exchange: {
    keywords: ['money', 'sales', 'dollar', 'travel'],
    char: '💱',
    category: 'symbols',
    name: 'currency_exchange',
    description: 'Currency Exchange',
    skinVariations: false
  },
  copyright: {
    keywords: ['ip', 'license', 'circle', 'law', 'legal'],
    char: '©️',
    category: 'symbols',
    name: 'copyright',
    description: 'Copyright Sign',
    skinVariations: false
  },
  registered: {
    keywords: ['alphabet', 'circle'],
    char: '®️',
    category: 'symbols',
    name: 'registered',
    description: 'Registered Sign',
    skinVariations: false
  },
  tm: {
    keywords: ['trademark', 'brand', 'law', 'legal'],
    char: '™️',
    category: 'symbols',
    name: 'tm',
    description: 'Trade Mark Sign',
    skinVariations: false
  },
  end: {
    keywords: ['words', 'arrow'],
    char: '🔚',
    category: 'symbols',
    name: 'end',
    description: 'End with Leftwards Arrow Above',
    skinVariations: false
  },
  back: {
    keywords: ['arrow', 'words', 'return'],
    char: '🔙',
    category: 'symbols',
    name: 'back',
    description: 'Back with Leftwards Arrow Above',
    skinVariations: false
  },
  on: {
    keywords: ['arrow', 'words'],
    char: '🔛',
    category: 'symbols',
    name: 'on',
    description: 'On with Exclamation Mark with Left Right Arrow Above',
    skinVariations: false
  },
  top: {
    keywords: ['words', 'blue-square'],
    char: '🔝',
    category: 'symbols',
    name: 'top',
    description: 'Top with Upwards Arrow Above',
    skinVariations: false
  },
  soon: {
    keywords: ['arrow', 'words'],
    char: '🔜',
    category: 'symbols',
    name: 'soon',
    description: 'Soon with Rightwards Arrow Above',
    skinVariations: false
  },
  ballot_box_with_check: {
    keywords: ['ok', 'agree', 'confirm', 'black-square', 'vote', 'election', 'yes', 'tick'],
    char: '☑️',
    category: 'symbols',
    name: 'ballot_box_with_check',
    description: 'Ballot Box with Check',
    skinVariations: false
  },
  radio_button: {
    keywords: ['input', 'old', 'music', 'circle'],
    char: '🔘',
    category: 'symbols',
    name: 'radio_button',
    description: 'Radio Button',
    skinVariations: false
  },
  white_circle: {
    keywords: ['shape', 'round'],
    char: '⚪',
    category: 'symbols',
    name: 'white_circle',
    description: 'Medium White Circle',
    skinVariations: false
  },
  black_circle: {
    keywords: ['shape', 'button', 'round'],
    char: '⚫',
    category: 'symbols',
    name: 'black_circle',
    description: 'Medium Black Circle',
    skinVariations: false
  },
  red_circle: {
    keywords: ['shape', 'error', 'danger'],
    char: '🔴',
    category: 'symbols',
    name: 'red_circle',
    description: 'Large Red Circle',
    skinVariations: false
  },
  large_blue_circle: {
    keywords: ['shape', 'icon', 'button'],
    char: '🔵',
    category: 'symbols',
    name: 'large_blue_circle',
    description: 'Large Blue Circle',
    skinVariations: false
  },
  small_orange_diamond: {
    keywords: ['shape', 'jewel', 'gem'],
    char: '🔸',
    category: 'symbols',
    name: 'small_orange_diamond',
    description: 'Small Orange Diamond',
    skinVariations: false
  },
  small_blue_diamond: {
    keywords: ['shape', 'jewel', 'gem'],
    char: '🔹',
    category: 'symbols',
    name: 'small_blue_diamond',
    description: 'Small Blue Diamond',
    skinVariations: false
  },
  large_orange_diamond: {
    keywords: ['shape', 'jewel', 'gem'],
    char: '🔶',
    category: 'symbols',
    name: 'large_orange_diamond',
    description: 'Large Orange Diamond',
    skinVariations: false
  },
  large_blue_diamond: {
    keywords: ['shape', 'jewel', 'gem'],
    char: '🔷',
    category: 'symbols',
    name: 'large_blue_diamond',
    description: 'Large Blue Diamond',
    skinVariations: false
  },
  small_red_triangle: {
    keywords: ['shape', 'direction', 'up', 'top'],
    char: '🔺',
    category: 'symbols',
    name: 'small_red_triangle',
    description: 'Up-Pointing Red Triangle',
    skinVariations: false
  },
  black_small_square: {
    keywords: ['shape', 'icon'],
    char: '▪️',
    category: 'symbols',
    name: 'black_small_square',
    description: 'Black Small Square',
    skinVariations: false
  },
  white_small_square: {
    keywords: ['shape', 'icon'],
    char: '▫️',
    category: 'symbols',
    name: 'white_small_square',
    description: 'White Small Square',
    skinVariations: false
  },
  black_large_square: {
    keywords: ['shape', 'icon', 'button'],
    char: '⬛',
    category: 'symbols',
    name: 'black_large_square',
    description: 'Black Large Square',
    skinVariations: false
  },
  white_large_square: {
    keywords: ['shape', 'icon', 'stone', 'button'],
    char: '⬜',
    category: 'symbols',
    name: 'white_large_square',
    description: 'White Large Square',
    skinVariations: false
  },
  small_red_triangle_down: {
    keywords: ['shape', 'direction', 'bottom'],
    char: '🔻',
    category: 'symbols',
    name: 'small_red_triangle_down',
    description: 'Down-Pointing Red Triangle',
    skinVariations: false
  },
  black_medium_square: {
    keywords: ['shape', 'button', 'icon'],
    char: '◼️',
    category: 'symbols',
    name: 'black_medium_square',
    description: 'Black Medium Square',
    skinVariations: false
  },
  white_medium_square: {
    keywords: ['shape', 'stone', 'icon'],
    char: '◻️',
    category: 'symbols',
    name: 'white_medium_square',
    description: 'White Medium Square',
    skinVariations: false
  },
  black_medium_small_square: {
    keywords: ['icon', 'shape', 'button'],
    char: '◾',
    category: 'symbols',
    name: 'black_medium_small_square',
    description: 'Black Medium Small Square',
    skinVariations: false
  },
  white_medium_small_square: {
    keywords: ['shape', 'stone', 'icon', 'button'],
    char: '◽',
    category: 'symbols',
    name: 'white_medium_small_square',
    description: 'White Medium Small Square',
    skinVariations: false
  },
  black_square_button: {
    keywords: ['shape', 'input', 'frame'],
    char: '🔲',
    category: 'symbols',
    name: 'black_square_button',
    description: 'Black Square Button',
    skinVariations: false
  },
  white_square_button: {
    keywords: ['shape', 'input'],
    char: '🔳',
    category: 'symbols',
    name: 'white_square_button',
    description: 'White Square Button',
    skinVariations: false
  },
  speaker: {
    keywords: ['sound', 'volume', 'silence', 'broadcast'],
    char: '🔈',
    category: 'symbols',
    name: 'speaker',
    description: 'Speaker',
    skinVariations: false
  },
  sound: {
    keywords: ['volume', 'speaker', 'broadcast'],
    char: '🔉',
    category: 'symbols',
    name: 'sound',
    description: 'Speaker with One Sound Wave',
    skinVariations: false
  },
  loud_sound: {
    keywords: ['volume', 'noise', 'noisy', 'speaker', 'broadcast'],
    char: '🔊',
    category: 'symbols',
    name: 'loud_sound',
    description: 'Speaker with Three Sound Waves',
    skinVariations: false
  },
  mute: {
    keywords: ['sound', 'volume', 'silence', 'quiet'],
    char: '🔇',
    category: 'symbols',
    name: 'mute',
    description: 'Speaker with Cancellation Stroke',
    skinVariations: false
  },
  mega: {
    keywords: ['sound', 'speaker', 'volume'],
    char: '📣',
    category: 'symbols',
    name: 'mega',
    description: 'Cheering Megaphone',
    skinVariations: false
  },
  loudspeaker: {
    keywords: ['volume', 'sound'],
    char: '📢',
    category: 'symbols',
    name: 'loudspeaker',
    description: 'Public Address Loudspeaker',
    skinVariations: false
  },
  bell: {
    keywords: ['sound', 'notification', 'christmas', 'xmas', 'chime'],
    char: '🔔',
    category: 'symbols',
    name: 'bell',
    description: 'Bell',
    skinVariations: false
  },
  no_bell: {
    keywords: ['sound', 'volume', 'mute', 'quiet', 'silent'],
    char: '🔕',
    category: 'symbols',
    name: 'no_bell',
    description: 'Bell with Cancellation Stroke',
    skinVariations: false
  },
  black_joker: {
    keywords: ['poker', 'cards', 'game', 'play', 'magic'],
    char: '🃏',
    category: 'symbols',
    name: 'black_joker',
    description: 'Playing Card Black Joker',
    skinVariations: false
  },
  mahjong: {
    keywords: ['game', 'play', 'chinese', 'kanji'],
    char: '🀄',
    category: 'symbols',
    name: 'mahjong',
    description: 'Mahjong Tile Red Dragon',
    skinVariations: false
  },
  spades: {
    keywords: ['poker', 'cards', 'suits', 'magic'],
    char: '♠️',
    category: 'symbols',
    name: 'spades',
    description: 'Black Spade Suit',
    skinVariations: false
  },
  clubs: {
    keywords: ['poker', 'cards', 'magic', 'suits'],
    char: '♣️',
    category: 'symbols',
    name: 'clubs',
    description: 'Black Club Suit',
    skinVariations: false
  },
  hearts: {
    keywords: ['poker', 'cards', 'magic', 'suits'],
    char: '♥️',
    category: 'symbols',
    name: 'hearts',
    description: 'Black Heart Suit',
    skinVariations: false
  },
  diamonds: {
    keywords: ['poker', 'cards', 'magic', 'suits'],
    char: '♦️',
    category: 'symbols',
    name: 'diamonds',
    description: 'Black Diamond Suit',
    skinVariations: false
  },
  flower_playing_cards: {
    keywords: ['game', 'sunset', 'red'],
    char: '🎴',
    category: 'symbols',
    name: 'flower_playing_cards',
    description: 'Flower Playing Cards',
    skinVariations: false
  },
  thought_balloon: {
    keywords: ['bubble', 'cloud', 'speech', 'thinking', 'dream'],
    char: '💭',
    category: 'symbols',
    name: 'thought_balloon',
    description: 'Thought Balloon',
    skinVariations: false
  },
  right_anger_bubble: {
    keywords: ['caption', 'speech', 'thinking', 'mad'],
    char: '🗯',
    category: 'symbols',
    name: 'right_anger_bubble',
    description: 'Right Anger Bubble',
    skinVariations: false
  },
  speech_balloon: {
    keywords: ['bubble', 'words', 'message', 'talk', 'chatting'],
    char: '💬',
    category: 'symbols',
    name: 'speech_balloon',
    description: 'Speech Balloon',
    skinVariations: false
  },
  left_speech_bubble: {
    keywords: ['words', 'message', 'talk', 'chatting'],
    char: '🗨',
    category: 'symbols',
    name: 'left_speech_bubble',
    description: 'Left Speech Bubble',
    skinVariations: false
  },
  clock1: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕐',
    category: 'symbols',
    name: 'clock1',
    description: 'Clock Face One Oclock',
    skinVariations: false
  },
  clock2: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕑',
    category: 'symbols',
    name: 'clock2',
    description: 'Clock Face Two Oclock',
    skinVariations: false
  },
  clock3: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕒',
    category: 'symbols',
    name: 'clock3',
    description: 'Clock Face Three Oclock',
    skinVariations: false
  },
  clock4: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕓',
    category: 'symbols',
    name: 'clock4',
    description: 'Clock Face Four Oclock',
    skinVariations: false
  },
  clock5: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕔',
    category: 'symbols',
    name: 'clock5',
    description: 'Clock Face Five Oclock',
    skinVariations: false
  },
  clock6: {
    keywords: ['time', 'late', 'early', 'schedule', 'dawn', 'dusk'],
    char: '🕕',
    category: 'symbols',
    name: 'clock6',
    description: 'Clock Face Six Oclock',
    skinVariations: false
  },
  clock7: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕖',
    category: 'symbols',
    name: 'clock7',
    description: 'Clock Face Seven Oclock',
    skinVariations: false
  },
  clock8: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕗',
    category: 'symbols',
    name: 'clock8',
    description: 'Clock Face Eight Oclock',
    skinVariations: false
  },
  clock9: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕘',
    category: 'symbols',
    name: 'clock9',
    description: 'Clock Face Nine Oclock',
    skinVariations: false
  },
  clock10: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕙',
    category: 'symbols',
    name: 'clock10',
    description: 'Clock Face Ten Oclock',
    skinVariations: false
  },
  clock11: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕚',
    category: 'symbols',
    name: 'clock11',
    description: 'Clock Face Eleven Oclock',
    skinVariations: false
  },
  clock12: {
    keywords: ['time', 'noon', 'midnight', 'midday', 'late', 'early', 'schedule'],
    char: '🕛',
    category: 'symbols',
    name: 'clock12',
    description: 'Clock Face Twelve Oclock',
    skinVariations: false
  },
  clock130: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕜',
    category: 'symbols',
    name: 'clock130',
    description: 'Clock Face One-Thirty',
    skinVariations: false
  },
  clock230: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕝',
    category: 'symbols',
    name: 'clock230',
    description: 'Clock Face Two-Thirty',
    skinVariations: false
  },
  clock330: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕞',
    category: 'symbols',
    name: 'clock330',
    description: 'Clock Face Three-Thirty',
    skinVariations: false
  },
  clock430: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕟',
    category: 'symbols',
    name: 'clock430',
    description: 'Clock Face Four-Thirty',
    skinVariations: false
  },
  clock530: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕠',
    category: 'symbols',
    name: 'clock530',
    description: 'Clock Face Five-Thirty',
    skinVariations: false
  },
  clock630: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕡',
    category: 'symbols',
    name: 'clock630',
    description: 'Clock Face Six-Thirty',
    skinVariations: false
  },
  clock730: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕢',
    category: 'symbols',
    name: 'clock730',
    description: 'Clock Face Seven-Thirty',
    skinVariations: false
  },
  clock830: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕣',
    category: 'symbols',
    name: 'clock830',
    description: 'Clock Face Eight-Thirty',
    skinVariations: false
  },
  clock930: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕤',
    category: 'symbols',
    name: 'clock930',
    description: 'Clock Face Nine-Thirty',
    skinVariations: false
  },
  clock1030: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕥',
    category: 'symbols',
    name: 'clock1030',
    description: 'Clock Face Ten-Thirty',
    skinVariations: false
  },
  clock1130: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕦',
    category: 'symbols',
    name: 'clock1130',
    description: 'Clock Face Eleven-Thirty',
    skinVariations: false
  },
  clock1230: {
    keywords: ['time', 'late', 'early', 'schedule'],
    char: '🕧',
    category: 'symbols',
    name: 'clock1230',
    description: 'Clock Face Twelve-Thirty',
    skinVariations: false
  },
  afghanistan: {
    keywords: ['af', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇫',
    category: 'flags',
    name: 'afghanistan',
    description: 'Afghanistan Flag',
    skinVariations: false
  },
  aland_islands: {
    keywords: ['Åland', 'islands', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇽',
    category: 'flags',
    name: 'aland-islands',
    description: 'Aland Islands Flag',
    skinVariations: false
  },
  albania: {
    keywords: ['al', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇱',
    category: 'flags',
    name: 'albania',
    description: 'Albania Flag',
    skinVariations: false
  },
  algeria: {
    keywords: ['dz', 'flag', 'nation', 'country', 'banner'],
    char: '🇩🇿',
    category: 'flags',
    name: 'algeria',
    description: 'Algeria Flag',
    skinVariations: false
  },
  american_samoa: {
    keywords: ['american', 'ws', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇸',
    category: 'flags',
    name: 'american-samoa',
    description: 'American Samoa Flag',
    skinVariations: false
  },
  andorra: {
    keywords: ['ad', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇩',
    category: 'flags',
    name: 'andorra',
    description: 'Andorra Flag',
    skinVariations: false
  },
  angola: {
    keywords: ['ao', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇴',
    category: 'flags',
    name: 'angola',
    description: 'Angola Flag',
    skinVariations: false
  },
  anguilla: {
    keywords: ['ai', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇮',
    category: 'flags',
    name: 'anguilla',
    description: 'Anguilla Flag',
    skinVariations: false
  },
  antarctica: {
    keywords: ['aq', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇶',
    category: 'flags',
    name: 'antarctica',
    description: 'Antarctica Flag',
    skinVariations: false
  },
  antigua_barbuda: {
    keywords: ['antigua', 'barbuda', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇬',
    category: 'flags',
    name: 'antigua-barbuda',
    description: 'Antigua Barbuda Flag',
    skinVariations: false
  },
  argentina: {
    keywords: ['ar', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇷',
    category: 'flags',
    name: 'argentina',
    description: 'Argentina Flag',
    skinVariations: false
  },
  armenia: {
    keywords: ['am', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇲',
    category: 'flags',
    name: 'armenia',
    description: 'Armenia Flag',
    skinVariations: false
  },
  aruba: {
    keywords: ['aw', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇼',
    category: 'flags',
    name: 'aruba',
    description: 'Aruba Flag',
    skinVariations: false
  },
  australia: {
    keywords: ['au', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇺',
    category: 'flags',
    name: 'australia',
    description: 'Australia Flag',
    skinVariations: false
  },
  austria: {
    keywords: ['at', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇹',
    category: 'flags',
    name: 'austria',
    description: 'Austria Flag',
    skinVariations: false
  },
  azerbaijan: {
    keywords: ['az', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇿',
    category: 'flags',
    name: 'azerbaijan',
    description: 'Azerbaijan Flag',
    skinVariations: false
  },
  bahamas: {
    keywords: ['bs', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇸',
    category: 'flags',
    name: 'bahamas',
    description: 'Bahamas Flag',
    skinVariations: false
  },
  bahrain: {
    keywords: ['bh', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇭',
    category: 'flags',
    name: 'bahrain',
    description: 'Bahrain Flag',
    skinVariations: false
  },
  bangladesh: {
    keywords: ['bd', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇩',
    category: 'flags',
    name: 'bangladesh',
    description: 'Bangladesh Flag',
    skinVariations: false
  },
  barbados: {
    keywords: ['bb', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇧',
    category: 'flags',
    name: 'barbados',
    description: 'Barbados Flag',
    skinVariations: false
  },
  belarus: {
    keywords: ['by', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇾',
    category: 'flags',
    name: 'belarus',
    description: 'Belarus Flag',
    skinVariations: false
  },
  belgium: {
    keywords: ['be', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇪',
    category: 'flags',
    name: 'belgium',
    description: 'Belgium Flag',
    skinVariations: false
  },
  belize: {
    keywords: ['bz', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇿',
    category: 'flags',
    name: 'belize',
    description: 'Belize Flag',
    skinVariations: false
  },
  benin: {
    keywords: ['bj', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇯',
    category: 'flags',
    name: 'benin',
    description: 'Benin Flag',
    skinVariations: false
  },
  bermuda: {
    keywords: ['bm', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇲',
    category: 'flags',
    name: 'bermuda',
    description: 'Bermuda Flag',
    skinVariations: false
  },
  bhutan: {
    keywords: ['bt', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇹',
    category: 'flags',
    name: 'bhutan',
    description: 'Bhutan Flag',
    skinVariations: false
  },
  bolivia: {
    keywords: ['bo', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇴',
    category: 'flags',
    name: 'bolivia',
    description: 'Bolivia Flag',
    skinVariations: false
  },
  caribbean_netherlands: {
    keywords: ['bonaire', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇶',
    category: 'flags',
    name: 'caribbean-netherlands',
    description: 'Caribbean Netherlands Flag',
    skinVariations: false
  },
  bosnia_herzegovina: {
    keywords: ['bosnia', 'herzegovina', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇦',
    category: 'flags',
    name: 'bosnia-herzegovina',
    description: 'Bosnia Herzegovina Flag',
    skinVariations: false
  },
  botswana: {
    keywords: ['bw', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇼',
    category: 'flags',
    name: 'botswana',
    description: 'Botswana Flag',
    skinVariations: false
  },
  brazil: {
    keywords: ['br', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇷',
    category: 'flags',
    name: 'brazil',
    description: 'Brazil Flag',
    skinVariations: false
  },
  british_indian_ocean_territory: {
    keywords: ['british', 'indian', 'ocean', 'territory', 'flag', 'nation', 'country', 'banner'],
    char: '🇮🇴',
    category: 'flags',
    name: 'british-indian-ocean-territory',
    description: 'British Indian Ocean Territory Flag',
    skinVariations: false
  },
  british_virgin_islands: {
    keywords: ['british', 'virgin', 'islands', 'bvi', 'flag', 'nation', 'country', 'banner'],
    char: '🇻🇬',
    category: 'flags',
    name: 'british-virgin-islands',
    description: 'British Virgin Islands Flag',
    skinVariations: false
  },
  brunei: {
    keywords: ['bn', 'darussalam', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇳',
    category: 'flags',
    name: 'brunei',
    description: 'Brunei Flag',
    skinVariations: false
  },
  bulgaria: {
    keywords: ['bg', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇬',
    category: 'flags',
    name: 'bulgaria',
    description: 'Bulgaria Flag',
    skinVariations: false
  },
  burkina_faso: {
    keywords: ['burkina', 'faso', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇫',
    category: 'flags',
    name: 'burkina-faso',
    description: 'Burkina Faso Flag',
    skinVariations: false
  },
  burundi: {
    keywords: ['bi', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇮',
    category: 'flags',
    name: 'burundi',
    description: 'Burundi Flag',
    skinVariations: false
  },
  cape_verde: {
    keywords: ['cabo', 'verde', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇻',
    category: 'flags',
    name: 'cape-verde',
    description: 'Cape Verde Flag',
    skinVariations: false
  },
  cambodia: {
    keywords: ['kh', 'flag', 'nation', 'country', 'banner'],
    char: '🇰🇭',
    category: 'flags',
    name: 'cambodia',
    description: 'Cambodia Flag',
    skinVariations: false
  },
  cameroon: {
    keywords: ['cm', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇲',
    category: 'flags',
    name: 'cameroon',
    description: 'Cameroon Flag',
    skinVariations: false
  },
  canada: {
    keywords: ['ca', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇦',
    category: 'flags',
    name: 'canada',
    description: 'Canada Flag',
    skinVariations: false
  },
  canary_islands: {
    keywords: ['canary', 'islands', 'flag', 'nation', 'country', 'banner'],
    char: '🇮🇨',
    category: 'flags',
    name: 'canary-islands',
    description: 'Canary Islands Flag',
    skinVariations: false
  },
  cayman_islands: {
    keywords: ['cayman', 'islands', 'flag', 'nation', 'country', 'banner'],
    char: '🇰🇾',
    category: 'flags',
    name: 'cayman-islands',
    description: 'Cayman Islands Flag',
    skinVariations: false
  },
  central_african_republic: {
    keywords: ['central', 'african', 'republic', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇫',
    category: 'flags',
    name: 'central-african-republic',
    description: 'Central African Republic Flag',
    skinVariations: false
  },
  chad: {
    keywords: ['td', 'flag', 'nation', 'country', 'banner'],
    char: '🇹🇩',
    category: 'flags',
    name: 'chad',
    description: 'Chad Flag',
    skinVariations: false
  },
  chile: {
    keywords: ['flag', 'nation', 'country', 'banner'],
    char: '🇨🇱',
    category: 'flags',
    name: 'chile',
    description: 'Chile Flag',
    skinVariations: false
  },
  cn: {
    keywords: ['china', 'chinese', 'prc', 'flag', 'country', 'nation', 'banner'],
    char: '🇨🇳',
    category: 'flags',
    name: 'china',
    description: 'China Flag',
    skinVariations: false
  },
  christmas_island: {
    keywords: ['christmas', 'island', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇽',
    category: 'flags',
    name: 'christmas-island',
    description: 'Christmas Island Flag',
    skinVariations: false
  },
  cocos_islands: {
    keywords: ['cocos', 'keeling', 'islands', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇨',
    category: 'flags',
    name: 'cocos-islands',
    description: 'Cocos Islands Flag',
    skinVariations: false
  },
  colombia: {
    keywords: ['co', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇴',
    category: 'flags',
    name: 'colombia',
    description: 'Colombia Flag',
    skinVariations: false
  },
  comoros: {
    keywords: ['km', 'flag', 'nation', 'country', 'banner'],
    char: '🇰🇲',
    category: 'flags',
    name: 'comoros',
    description: 'Comoros Flag',
    skinVariations: false
  },
  congo_brazzaville: {
    keywords: ['congo', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇬',
    category: 'flags',
    name: 'congo-brazzaville',
    description: 'Congo Brazzaville Flag',
    skinVariations: false
  },
  congo_kinshasa: {
    keywords: ['congo', 'democratic', 'republic', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇩',
    category: 'flags',
    name: 'congo-kinshasa',
    description: 'Congo Kinshasa Flag',
    skinVariations: false
  },
  cook_islands: {
    keywords: ['cook', 'islands', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇰',
    category: 'flags',
    name: 'cook-islands',
    description: 'Cook Islands Flag',
    skinVariations: false
  },
  costa_rica: {
    keywords: ['costa', 'rica', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇷',
    category: 'flags',
    name: 'costa-rica',
    description: 'Costa Rica Flag',
    skinVariations: false
  },
  croatia: {
    keywords: ['hr', 'flag', 'nation', 'country', 'banner'],
    char: '🇭🇷',
    category: 'flags',
    name: 'croatia',
    description: 'Croatia Flag',
    skinVariations: false
  },
  cuba: {
    keywords: ['cu', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇺',
    category: 'flags',
    name: 'cuba',
    description: 'Cuba Flag',
    skinVariations: false
  },
  curacao: {
    keywords: ['curaçao', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇼',
    category: 'flags',
    name: 'curacao',
    description: 'Curacao Flag',
    skinVariations: false
  },
  cyprus: {
    keywords: ['cy', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇾',
    category: 'flags',
    name: 'cyprus',
    description: 'Cyprus Flag',
    skinVariations: false
  },
  czech_republic: {
    keywords: ['cz', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇿',
    category: 'flags',
    name: 'czechia',
    description: 'Czech Republic Flag',
    skinVariations: false
  },
  denmark: {
    keywords: ['dk', 'flag', 'nation', 'country', 'banner'],
    char: '🇩🇰',
    category: 'flags',
    name: 'denmark',
    description: 'Denmark Flag',
    skinVariations: false
  },
  djibouti: {
    keywords: ['dj', 'flag', 'nation', 'country', 'banner'],
    char: '🇩🇯',
    category: 'flags',
    name: 'djibouti',
    description: 'Djibouti Flag',
    skinVariations: false
  },
  dominica: {
    keywords: ['dm', 'flag', 'nation', 'country', 'banner'],
    char: '🇩🇲',
    category: 'flags',
    name: 'dominica',
    description: 'Dominica Flag',
    skinVariations: false
  },
  dominican_republic: {
    keywords: ['dominican', 'republic', 'flag', 'nation', 'country', 'banner'],
    char: '🇩🇴',
    category: 'flags',
    name: 'dominican-republic',
    description: 'Dominican Republic Flag',
    skinVariations: false
  },
  ecuador: {
    keywords: ['ec', 'flag', 'nation', 'country', 'banner'],
    char: '🇪🇨',
    category: 'flags',
    name: 'ecuador',
    description: 'Ecuador Flag',
    skinVariations: false
  },
  egypt: {
    keywords: ['eg', 'flag', 'nation', 'country', 'banner'],
    char: '🇪🇬',
    category: 'flags',
    name: 'egypt',
    description: 'Egypt Flag',
    skinVariations: false
  },
  el_salvador: {
    keywords: ['el', 'salvador', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇻',
    category: 'flags',
    name: 'el-salvador',
    description: 'El Salvador Flag',
    skinVariations: false
  },
  equatorial_guinea: {
    keywords: ['equatorial', 'gn', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇶',
    category: 'flags',
    name: 'equatorial-guinea',
    description: 'Equatorial Guinea Flag',
    skinVariations: false
  },
  eritrea: {
    keywords: ['er', 'flag', 'nation', 'country', 'banner'],
    char: '🇪🇷',
    category: 'flags',
    name: 'eritrea',
    description: 'Eritrea Flag',
    skinVariations: false
  },
  estonia: {
    keywords: ['ee', 'flag', 'nation', 'country', 'banner'],
    char: '🇪🇪',
    category: 'flags',
    name: 'estonia',
    description: 'Estonia Flag',
    skinVariations: false
  },
  ethiopia: {
    keywords: ['et', 'flag', 'nation', 'country', 'banner'],
    char: '🇪🇹',
    category: 'flags',
    name: 'ethiopia',
    description: 'Ethiopia Flag',
    skinVariations: false
  },
  eu: {
    keywords: ['european', 'union', 'flag', 'banner'],
    char: '🇪🇺',
    category: 'flags',
    name: 'european-union',
    description: 'European Union Flag',
    skinVariations: false
  },
  falkland_islands: {
    keywords: ['falkland', 'islands', 'malvinas', 'flag', 'nation', 'country', 'banner'],
    char: '🇫🇰',
    category: 'flags',
    name: 'falkland-islands',
    description: 'Falkland Islands Flag',
    skinVariations: false
  },
  faroe_islands: {
    keywords: ['faroe', 'islands', 'flag', 'nation', 'country', 'banner'],
    char: '🇫🇴',
    category: 'flags',
    name: 'faroe-islands',
    description: 'Faroe Islands Flag',
    skinVariations: false
  },
  fiji: {
    keywords: ['fj', 'flag', 'nation', 'country', 'banner'],
    char: '🇫🇯',
    category: 'flags',
    name: 'fiji',
    description: 'Fiji Flag',
    skinVariations: false
  },
  finland: {
    keywords: ['fi', 'flag', 'nation', 'country', 'banner'],
    char: '🇫🇮',
    category: 'flags',
    name: 'finland',
    description: 'Finland Flag',
    skinVariations: false
  },
  fr: {
    keywords: ['banner', 'flag', 'nation', 'france', 'french', 'country'],
    char: '🇫🇷',
    category: 'flags',
    name: 'france',
    description: 'France Flag',
    skinVariations: false
  },
  french_guiana: {
    keywords: ['french', 'guiana', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇫',
    category: 'flags',
    name: 'french-guiana',
    description: 'French Guiana Flag',
    skinVariations: false
  },
  french_polynesia: {
    keywords: ['french', 'polynesia', 'flag', 'nation', 'country', 'banner'],
    char: '🇵🇫',
    category: 'flags',
    name: 'french-polynesia',
    description: 'French Polynesia Flag',
    skinVariations: false
  },
  french_southern_territories: {
    keywords: ['french', 'southern', 'territories', 'flag', 'nation', 'country', 'banner'],
    char: '🇹🇫',
    category: 'flags',
    name: 'french-southern-territories',
    description: 'French Southern Territories Flag',
    skinVariations: false
  },
  gabon: {
    keywords: ['ga', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇦',
    category: 'flags',
    name: 'gabon',
    description: 'Gabon Flag',
    skinVariations: false
  },
  gambia: {
    keywords: ['gm', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇲',
    category: 'flags',
    name: 'gambia',
    description: 'Gambia Flag',
    skinVariations: false
  },
  georgia: {
    keywords: ['ge', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇪',
    category: 'flags',
    name: 'georgia',
    description: 'Georgia Flag',
    skinVariations: false
  },
  de: {
    keywords: ['german', 'nation', 'flag', 'country', 'banner'],
    char: '🇩🇪',
    category: 'flags',
    name: 'germany',
    description: 'Germany Flag',
    skinVariations: false
  },
  ghana: {
    keywords: ['gh', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇭',
    category: 'flags',
    name: 'ghana',
    description: 'Ghana Flag',
    skinVariations: false
  },
  gibraltar: {
    keywords: ['gi', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇮',
    category: 'flags',
    name: 'gibraltar',
    description: 'Gibraltar Flag',
    skinVariations: false
  },
  greece: {
    keywords: ['gr', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇷',
    category: 'flags',
    name: 'greece',
    description: 'Greece Flag',
    skinVariations: false
  },
  greenland: {
    keywords: ['gl', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇱',
    category: 'flags',
    name: 'greenland',
    description: 'Greenland Flag',
    skinVariations: false
  },
  grenada: {
    keywords: ['gd', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇩',
    category: 'flags',
    name: 'grenada',
    description: 'Grenada Flag',
    skinVariations: false
  },
  guadeloupe: {
    keywords: ['gp', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇵',
    category: 'flags',
    name: 'guadeloupe',
    description: 'Guadeloupe Flag',
    skinVariations: false
  },
  guam: {
    keywords: ['gu', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇺',
    category: 'flags',
    name: 'guam',
    description: 'Guam Flag',
    skinVariations: false
  },
  guatemala: {
    keywords: ['gt', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇹',
    category: 'flags',
    name: 'guatemala',
    description: 'Guatemala Flag',
    skinVariations: false
  },
  guernsey: {
    keywords: ['gg', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇬',
    category: 'flags',
    name: 'guernsey',
    description: 'Guernsey Flag',
    skinVariations: false
  },
  guinea: {
    keywords: ['gn', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇳',
    category: 'flags',
    name: 'guinea',
    description: 'Guinea Flag',
    skinVariations: false
  },
  guinea_bissau: {
    keywords: ['gw', 'bissau', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇼',
    category: 'flags',
    name: 'guinea-bissau',
    description: 'Guinea Bissau Flag',
    skinVariations: false
  },
  guyana: {
    keywords: ['gy', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇾',
    category: 'flags',
    name: 'guyana',
    description: 'Guyana Flag',
    skinVariations: false
  },
  haiti: {
    keywords: ['ht', 'flag', 'nation', 'country', 'banner'],
    char: '🇭🇹',
    category: 'flags',
    name: 'haiti',
    description: 'Haiti Flag',
    skinVariations: false
  },
  honduras: {
    keywords: ['hn', 'flag', 'nation', 'country', 'banner'],
    char: '🇭🇳',
    category: 'flags',
    name: 'honduras',
    description: 'Honduras Flag',
    skinVariations: false
  },
  hong_kong: {
    keywords: ['hong', 'kong', 'flag', 'nation', 'country', 'banner'],
    char: '🇭🇰',
    category: 'flags',
    name: 'hong-kong-sar-china',
    description: 'Hong Kong Flag',
    skinVariations: false
  },
  hungary: {
    keywords: ['hu', 'flag', 'nation', 'country', 'banner'],
    char: '🇭🇺',
    category: 'flags',
    name: 'hungary',
    description: 'Hungary Flag',
    skinVariations: false
  },
  iceland: {
    keywords: ['is', 'flag', 'nation', 'country', 'banner'],
    char: '🇮🇸',
    category: 'flags',
    name: 'iceland',
    description: 'Iceland Flag',
    skinVariations: false
  },
  india: {
    keywords: ['in', 'flag', 'nation', 'country', 'banner'],
    char: '🇮🇳',
    category: 'flags',
    name: 'india',
    description: 'India Flag',
    skinVariations: false
  },
  indonesia: {
    keywords: ['flag', 'nation', 'country', 'banner'],
    char: '🇮🇩',
    category: 'flags',
    name: 'indonesia',
    description: 'Indonesia Flag',
    skinVariations: false
  },
  iran: {
    keywords: ['iran,', 'islamic', 'republic', 'flag', 'nation', 'country', 'banner'],
    char: '🇮🇷',
    category: 'flags',
    name: 'iran',
    description: 'Iran Flag',
    skinVariations: false
  },
  iraq: {
    keywords: ['iq', 'flag', 'nation', 'country', 'banner'],
    char: '🇮🇶',
    category: 'flags',
    name: 'iraq',
    description: 'Iraq Flag',
    skinVariations: false
  },
  ireland: {
    keywords: ['ie', 'flag', 'nation', 'country', 'banner'],
    char: '🇮🇪',
    category: 'flags',
    name: 'ireland',
    description: 'Ireland Flag',
    skinVariations: false
  },
  isle_of_man: {
    keywords: ['isle', 'man', 'flag', 'nation', 'country', 'banner'],
    char: '🇮🇲',
    category: 'flags',
    name: 'isle-of-man',
    description: 'Isle Of Man Flag',
    skinVariations: false
  },
  israel: {
    keywords: ['il', 'flag', 'nation', 'country', 'banner'],
    char: '🇮🇱',
    category: 'flags',
    name: 'israel',
    description: 'Israel Flag',
    skinVariations: false
  },
  it: {
    keywords: ['italy', 'flag', 'nation', 'country', 'banner'],
    char: '🇮🇹',
    category: 'flags',
    name: 'italy',
    description: 'Italy Flag',
    skinVariations: false
  },
  cote_divoire: {
    keywords: ['ivory', 'coast', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇮',
    category: 'flags',
    name: 'cote-divoire',
    description: 'Cote Divoire Flag',
    skinVariations: false
  },
  jamaica: {
    keywords: ['jm', 'flag', 'nation', 'country', 'banner'],
    char: '🇯🇲',
    category: 'flags',
    name: 'jamaica',
    description: 'Jamaica Flag',
    skinVariations: false
  },
  jp: {
    keywords: ['japanese', 'nation', 'flag', 'country', 'banner'],
    char: '🇯🇵',
    category: 'flags',
    name: 'japan',
    description: 'Japan Flag',
    skinVariations: false
  },
  jersey: {
    keywords: ['je', 'flag', 'nation', 'country', 'banner'],
    char: '🇯🇪',
    category: 'flags',
    name: 'jersey',
    description: 'Jersey Flag',
    skinVariations: false
  },
  jordan: {
    keywords: ['jo', 'flag', 'nation', 'country', 'banner'],
    char: '🇯🇴',
    category: 'flags',
    name: 'jordan',
    description: 'Jordan Flag',
    skinVariations: false
  },
  kazakhstan: {
    keywords: ['kz', 'flag', 'nation', 'country', 'banner'],
    char: '🇰🇿',
    category: 'flags',
    name: 'kazakhstan',
    description: 'Kazakhstan Flag',
    skinVariations: false
  },
  kenya: {
    keywords: ['ke', 'flag', 'nation', 'country', 'banner'],
    char: '🇰🇪',
    category: 'flags',
    name: 'kenya',
    description: 'Kenya Flag',
    skinVariations: false
  },
  kiribati: {
    keywords: ['ki', 'flag', 'nation', 'country', 'banner'],
    char: '🇰🇮',
    category: 'flags',
    name: 'kiribati',
    description: 'Kiribati Flag',
    skinVariations: false
  },
  kosovo: {
    keywords: ['xk', 'flag', 'nation', 'country', 'banner'],
    char: '🇽🇰',
    category: 'flags',
    name: 'kosovo',
    description: 'Kosovo Flag',
    skinVariations: false
  },
  kuwait: {
    keywords: ['kw', 'flag', 'nation', 'country', 'banner'],
    char: '🇰🇼',
    category: 'flags',
    name: 'kuwait',
    description: 'Kuwait Flag',
    skinVariations: false
  },
  kyrgyzstan: {
    keywords: ['kg', 'flag', 'nation', 'country', 'banner'],
    char: '🇰🇬',
    category: 'flags',
    name: 'kyrgyzstan',
    description: 'Kyrgyzstan Flag',
    skinVariations: false
  },
  laos: {
    keywords: ['lao', 'democratic', 'republic', 'flag', 'nation', 'country', 'banner'],
    char: '🇱🇦',
    category: 'flags',
    name: 'laos',
    description: 'Laos Flag',
    skinVariations: false
  },
  latvia: {
    keywords: ['lv', 'flag', 'nation', 'country', 'banner'],
    char: '🇱🇻',
    category: 'flags',
    name: 'latvia',
    description: 'Latvia Flag',
    skinVariations: false
  },
  lebanon: {
    keywords: ['lb', 'flag', 'nation', 'country', 'banner'],
    char: '🇱🇧',
    category: 'flags',
    name: 'lebanon',
    description: 'Lebanon Flag',
    skinVariations: false
  },
  lesotho: {
    keywords: ['ls', 'flag', 'nation', 'country', 'banner'],
    char: '🇱🇸',
    category: 'flags',
    name: 'lesotho',
    description: 'Lesotho Flag',
    skinVariations: false
  },
  liberia: {
    keywords: ['lr', 'flag', 'nation', 'country', 'banner'],
    char: '🇱🇷',
    category: 'flags',
    name: 'liberia',
    description: 'Liberia Flag',
    skinVariations: false
  },
  libya: {
    keywords: ['ly', 'flag', 'nation', 'country', 'banner'],
    char: '🇱🇾',
    category: 'flags',
    name: 'libya',
    description: 'Libya Flag',
    skinVariations: false
  },
  liechtenstein: {
    keywords: ['li', 'flag', 'nation', 'country', 'banner'],
    char: '🇱🇮',
    category: 'flags',
    name: 'liechtenstein',
    description: 'Liechtenstein Flag',
    skinVariations: false
  },
  lithuania: {
    keywords: ['lt', 'flag', 'nation', 'country', 'banner'],
    char: '🇱🇹',
    category: 'flags',
    name: 'lithuania',
    description: 'Lithuania Flag',
    skinVariations: false
  },
  luxembourg: {
    keywords: ['lu', 'flag', 'nation', 'country', 'banner'],
    char: '🇱🇺',
    category: 'flags',
    name: 'luxembourg',
    description: 'Luxembourg Flag',
    skinVariations: false
  },
  macau: {
    keywords: ['macao', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇴',
    category: 'flags',
    name: 'macao-sar-china',
    description: 'Macau Flag',
    skinVariations: false
  },
  macedonia: {
    keywords: ['north', 'macedonia,', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇰',
    category: 'flags',
    name: 'north-macedonia',
    description: 'Macedonia Flag',
    skinVariations: false
  },
  madagascar: {
    keywords: ['mg', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇬',
    category: 'flags',
    name: 'madagascar',
    description: 'Madagascar Flag',
    skinVariations: false
  },
  malawi: {
    keywords: ['mw', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇼',
    category: 'flags',
    name: 'malawi',
    description: 'Malawi Flag',
    skinVariations: false
  },
  malaysia: {
    keywords: ['my', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇾',
    category: 'flags',
    name: 'malaysia',
    description: 'Malaysia Flag',
    skinVariations: false
  },
  maldives: {
    keywords: ['mv', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇻',
    category: 'flags',
    name: 'maldives',
    description: 'Maldives Flag',
    skinVariations: false
  },
  mali: {
    keywords: ['ml', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇱',
    category: 'flags',
    name: 'mali',
    description: 'Mali Flag',
    skinVariations: false
  },
  malta: {
    keywords: ['mt', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇹',
    category: 'flags',
    name: 'malta',
    description: 'Malta Flag',
    skinVariations: false
  },
  marshall_islands: {
    keywords: ['marshall', 'islands', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇭',
    category: 'flags',
    name: 'marshall-islands',
    description: 'Marshall Islands Flag',
    skinVariations: false
  },
  martinique: {
    keywords: ['mq', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇶',
    category: 'flags',
    name: 'martinique',
    description: 'Martinique Flag',
    skinVariations: false
  },
  mauritania: {
    keywords: ['mr', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇷',
    category: 'flags',
    name: 'mauritania',
    description: 'Mauritania Flag',
    skinVariations: false
  },
  mauritius: {
    keywords: ['mu', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇺',
    category: 'flags',
    name: 'mauritius',
    description: 'Mauritius Flag',
    skinVariations: false
  },
  mayotte: {
    keywords: ['yt', 'flag', 'nation', 'country', 'banner'],
    char: '🇾🇹',
    category: 'flags',
    name: 'mayotte',
    description: 'Mayotte Flag',
    skinVariations: false
  },
  mexico: {
    keywords: ['mx', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇽',
    category: 'flags',
    name: 'mexico',
    description: 'Mexico Flag',
    skinVariations: false
  },
  micronesia: {
    keywords: ['micronesia,', 'federated', 'states', 'flag', 'nation', 'country', 'banner'],
    char: '🇫🇲',
    category: 'flags',
    name: 'micronesia',
    description: 'Micronesia Flag',
    skinVariations: false
  },
  moldova: {
    keywords: ['moldova,', 'republic', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇩',
    category: 'flags',
    name: 'moldova',
    description: 'Moldova Flag',
    skinVariations: false
  },
  monaco: {
    keywords: ['mc', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇨',
    category: 'flags',
    name: 'monaco',
    description: 'Monaco Flag',
    skinVariations: false
  },
  mongolia: {
    keywords: ['mn', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇳',
    category: 'flags',
    name: 'mongolia',
    description: 'Mongolia Flag',
    skinVariations: false
  },
  montenegro: {
    keywords: ['me', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇪',
    category: 'flags',
    name: 'montenegro',
    description: 'Montenegro Flag',
    skinVariations: false
  },
  montserrat: {
    keywords: ['ms', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇸',
    category: 'flags',
    name: 'montserrat',
    description: 'Montserrat Flag',
    skinVariations: false
  },
  morocco: {
    keywords: ['ma', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇦',
    category: 'flags',
    name: 'morocco',
    description: 'Morocco Flag',
    skinVariations: false
  },
  mozambique: {
    keywords: ['mz', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇿',
    category: 'flags',
    name: 'mozambique',
    description: 'Mozambique Flag',
    skinVariations: false
  },
  myanmar: {
    keywords: ['mm', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇲',
    category: 'flags',
    name: 'myanmar-burma',
    description: 'Myanmar Flag',
    skinVariations: false
  },
  namibia: {
    keywords: ['na', 'flag', 'nation', 'country', 'banner'],
    char: '🇳🇦',
    category: 'flags',
    name: 'namibia',
    description: 'Namibia Flag',
    skinVariations: false
  },
  nauru: {
    keywords: ['nr', 'flag', 'nation', 'country', 'banner'],
    char: '🇳🇷',
    category: 'flags',
    name: 'nauru',
    description: 'Nauru Flag',
    skinVariations: false
  },
  nepal: {
    keywords: ['np', 'flag', 'nation', 'country', 'banner'],
    char: '🇳🇵',
    category: 'flags',
    name: 'nepal',
    description: 'Nepal Flag',
    skinVariations: false
  },
  netherlands: {
    keywords: ['nl', 'flag', 'nation', 'country', 'banner'],
    char: '🇳🇱',
    category: 'flags',
    name: 'netherlands',
    description: 'Netherlands Flag',
    skinVariations: false
  },
  new_caledonia: {
    keywords: ['new', 'caledonia', 'flag', 'nation', 'country', 'banner'],
    char: '🇳🇨',
    category: 'flags',
    name: 'new-caledonia',
    description: 'New Caledonia Flag',
    skinVariations: false
  },
  new_zealand: {
    keywords: ['new', 'zealand', 'flag', 'nation', 'country', 'banner'],
    char: '🇳🇿',
    category: 'flags',
    name: 'new-zealand',
    description: 'New Zealand Flag',
    skinVariations: false
  },
  nicaragua: {
    keywords: ['ni', 'flag', 'nation', 'country', 'banner'],
    char: '🇳🇮',
    category: 'flags',
    name: 'nicaragua',
    description: 'Nicaragua Flag',
    skinVariations: false
  },
  niger: {
    keywords: ['ne', 'flag', 'nation', 'country', 'banner'],
    char: '🇳🇪',
    category: 'flags',
    name: 'niger',
    description: 'Niger Flag',
    skinVariations: false
  },
  nigeria: {
    keywords: ['flag', 'nation', 'country', 'banner'],
    char: '🇳🇬',
    category: 'flags',
    name: 'nigeria',
    description: 'Nigeria Flag',
    skinVariations: false
  },
  niue: {
    keywords: ['nu', 'flag', 'nation', 'country', 'banner'],
    char: '🇳🇺',
    category: 'flags',
    name: 'niue',
    description: 'Niue Flag',
    skinVariations: false
  },
  norfolk_island: {
    keywords: ['norfolk', 'island', 'flag', 'nation', 'country', 'banner'],
    char: '🇳🇫',
    category: 'flags',
    name: 'norfolk-island',
    description: 'Norfolk Island Flag',
    skinVariations: false
  },
  northern_mariana_islands: {
    keywords: ['northern', 'mariana', 'islands', 'flag', 'nation', 'country', 'banner'],
    char: '🇲🇵',
    category: 'flags',
    name: 'northern-mariana-islands',
    description: 'Northern Mariana Islands Flag',
    skinVariations: false
  },
  north_korea: {
    keywords: ['north', 'korea', 'nation', 'flag', 'country', 'banner'],
    char: '🇰🇵',
    category: 'flags',
    name: 'north-korea',
    description: 'North Korea Flag',
    skinVariations: false
  },
  norway: {
    keywords: ['no', 'flag', 'nation', 'country', 'banner'],
    char: '🇳🇴',
    category: 'flags',
    name: 'norway',
    description: 'Norway Flag',
    skinVariations: false
  },
  oman: {
    keywords: ['om_symbol', 'flag', 'nation', 'country', 'banner'],
    char: '🇴🇲',
    category: 'flags',
    name: 'oman',
    description: 'Oman Flag',
    skinVariations: false
  },
  pakistan: {
    keywords: ['pk', 'flag', 'nation', 'country', 'banner'],
    char: '🇵🇰',
    category: 'flags',
    name: 'pakistan',
    description: 'Pakistan Flag',
    skinVariations: false
  },
  palau: {
    keywords: ['pw', 'flag', 'nation', 'country', 'banner'],
    char: '🇵🇼',
    category: 'flags',
    name: 'palau',
    description: 'Palau Flag',
    skinVariations: false
  },
  palestinian_territories: {
    keywords: ['palestine', 'palestinian', 'territories', 'flag', 'nation', 'country', 'banner'],
    char: '🇵🇸',
    category: 'flags',
    name: 'palestinian-territories',
    description: 'Palestinian Territories Flag',
    skinVariations: false
  },
  panama: {
    keywords: ['pa', 'flag', 'nation', 'country', 'banner'],
    char: '🇵🇦',
    category: 'flags',
    name: 'panama',
    description: 'Panama Flag',
    skinVariations: false
  },
  papua_new_guinea: {
    keywords: ['papua', 'new', 'guinea', 'flag', 'nation', 'country', 'banner'],
    char: '🇵🇬',
    category: 'flags',
    name: 'papua-new-guinea',
    description: 'Papua New Guinea Flag',
    skinVariations: false
  },
  paraguay: {
    keywords: ['py', 'flag', 'nation', 'country', 'banner'],
    char: '🇵🇾',
    category: 'flags',
    name: 'paraguay',
    description: 'Paraguay Flag',
    skinVariations: false
  },
  peru: {
    keywords: ['pe', 'flag', 'nation', 'country', 'banner'],
    char: '🇵🇪',
    category: 'flags',
    name: 'peru',
    description: 'Peru Flag',
    skinVariations: false
  },
  philippines: {
    keywords: ['ph', 'flag', 'nation', 'country', 'banner'],
    char: '🇵🇭',
    category: 'flags',
    name: 'philippines',
    description: 'Philippines Flag',
    skinVariations: false
  },
  pitcairn_islands: {
    keywords: ['pitcairn', 'flag', 'nation', 'country', 'banner'],
    char: '🇵🇳',
    category: 'flags',
    name: 'pitcairn-islands',
    description: 'Pitcairn Islands Flag',
    skinVariations: false
  },
  poland: {
    keywords: ['pl', 'flag', 'nation', 'country', 'banner'],
    char: '🇵🇱',
    category: 'flags',
    name: 'poland',
    description: 'Poland Flag',
    skinVariations: false
  },
  portugal: {
    keywords: ['pt', 'flag', 'nation', 'country', 'banner'],
    char: '🇵🇹',
    category: 'flags',
    name: 'portugal',
    description: 'Portugal Flag',
    skinVariations: false
  },
  puerto_rico: {
    keywords: ['puerto', 'rico', 'flag', 'nation', 'country', 'banner'],
    char: '🇵🇷',
    category: 'flags',
    name: 'puerto-rico',
    description: 'Puerto Rico Flag',
    skinVariations: false
  },
  qatar: {
    keywords: ['qa', 'flag', 'nation', 'country', 'banner'],
    char: '🇶🇦',
    category: 'flags',
    name: 'qatar',
    description: 'Qatar Flag',
    skinVariations: false
  },
  reunion: {
    keywords: ['réunion', 'flag', 'nation', 'country', 'banner'],
    char: '🇷🇪',
    category: 'flags',
    name: 'reunion',
    description: 'Reunion Flag',
    skinVariations: false
  },
  romania: {
    keywords: ['ro', 'flag', 'nation', 'country', 'banner'],
    char: '🇷🇴',
    category: 'flags',
    name: 'romania',
    description: 'Romania Flag',
    skinVariations: false
  },
  ru: {
    keywords: ['russian', 'federation', 'flag', 'nation', 'country', 'banner'],
    char: '🇷🇺',
    category: 'flags',
    name: 'russia',
    description: 'Russia Flag',
    skinVariations: false
  },
  rwanda: {
    keywords: ['rw', 'flag', 'nation', 'country', 'banner'],
    char: '🇷🇼',
    category: 'flags',
    name: 'rwanda',
    description: 'Rwanda Flag',
    skinVariations: false
  },
  st_barthelemy: {
    keywords: ['saint', 'barthélemy', 'flag', 'nation', 'country', 'banner'],
    char: '🇧🇱',
    category: 'flags',
    name: 'st-barthelemy',
    description: 'St Barthelemy Flag',
    skinVariations: false
  },
  st_helena: {
    keywords: [
      'saint',
      'helena',
      'ascension',
      'tristan',
      'cunha',
      'flag',
      'nation',
      'country',
      'banner'
    ],
    char: '🇸🇭',
    category: 'flags',
    name: 'st-helena',
    description: 'St Helena Flag',
    skinVariations: false
  },
  st_kitts_nevis: {
    keywords: ['saint', 'kitts', 'nevis', 'flag', 'nation', 'country', 'banner'],
    char: '🇰🇳',
    category: 'flags',
    name: 'st-kitts-&-nevis',
    description: 'St Kitts Nevis Flag',
    skinVariations: false
  },
  st_lucia: {
    keywords: ['saint', 'lucia', 'flag', 'nation', 'country', 'banner'],
    char: '🇱🇨',
    category: 'flags',
    name: 'st-lucia',
    description: 'St Lucia Flag',
    skinVariations: false
  },
  st_pierre_miquelon: {
    keywords: ['saint', 'pierre', 'miquelon', 'flag', 'nation', 'country', 'banner'],
    char: '🇵🇲',
    category: 'flags',
    name: 'st-pierre-miquelon',
    description: 'St Pierre Miquelon Flag',
    skinVariations: false
  },
  st_vincent_grenadines: {
    keywords: ['saint', 'vincent', 'grenadines', 'flag', 'nation', 'country', 'banner'],
    char: '🇻🇨',
    category: 'flags',
    name: 'saint-vincent-and-the-grenadines',
    description: 'St Vincent Grenadines Flag',
    skinVariations: false
  },
  samoa: {
    keywords: ['ws', 'flag', 'nation', 'country', 'banner'],
    char: '🇼🇸',
    category: 'flags',
    name: 'samoa',
    description: 'Samoa Flag',
    skinVariations: false
  },
  san_marino: {
    keywords: ['san', 'marino', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇲',
    category: 'flags',
    name: 'san-marino',
    description: 'San Marino Flag',
    skinVariations: false
  },
  sao_tome_principe: {
    keywords: ['sao', 'tome', 'principe', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇹',
    category: 'flags',
    name: 'saint-thomas-and-prince',
    description: 'Sao Tome Principe Flag',
    skinVariations: false
  },
  saudi_arabia: {
    keywords: ['flag', 'nation', 'country', 'banner'],
    char: '🇸🇦',
    category: 'flags',
    name: 'saudi-arabia',
    description: 'Saudi Arabia Flag',
    skinVariations: false
  },
  senegal: {
    keywords: ['sn', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇳',
    category: 'flags',
    name: 'senegal',
    description: 'Senegal Flag',
    skinVariations: false
  },
  serbia: {
    keywords: ['rs', 'flag', 'nation', 'country', 'banner'],
    char: '🇷🇸',
    category: 'flags',
    name: 'serbia',
    description: 'Serbia Flag',
    skinVariations: false
  },
  seychelles: {
    keywords: ['sc', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇨',
    category: 'flags',
    name: 'seychelles',
    description: 'Seychelles Flag',
    skinVariations: false
  },
  sierra_leone: {
    keywords: ['sierra', 'leone', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇱',
    category: 'flags',
    name: 'sierra-leone',
    description: 'Sierra Leone Flag',
    skinVariations: false
  },
  singapore: {
    keywords: ['sg', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇬',
    category: 'flags',
    name: 'singapore',
    description: 'Singapore Flag',
    skinVariations: false
  },
  sint_maarten: {
    keywords: ['sint', 'maarten', 'dutch', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇽',
    category: 'flags',
    name: 'sint-maarten',
    description: 'Sint Maarten Flag',
    skinVariations: false
  },
  slovakia: {
    keywords: ['sk', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇰',
    category: 'flags',
    name: 'slovakia',
    description: 'Slovakia Flag',
    skinVariations: false
  },
  slovenia: {
    keywords: ['si', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇮',
    category: 'flags',
    name: 'slovenia',
    description: 'Slovenia Flag',
    skinVariations: false
  },
  solomon_islands: {
    keywords: ['solomon', 'islands', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇧',
    category: 'flags',
    name: 'solomon-islands',
    description: 'Solomon Islands Flag',
    skinVariations: false
  },
  somalia: {
    keywords: ['so', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇴',
    category: 'flags',
    name: 'somalia',
    description: 'Somalia Flag',
    skinVariations: false
  },
  south_africa: {
    keywords: ['south', 'africa', 'flag', 'nation', 'country', 'banner'],
    char: '🇿🇦',
    category: 'flags',
    name: 'south-africa',
    description: 'South Africa Flag',
    skinVariations: false
  },
  south_georgia_south_sandwich_islands: {
    keywords: ['south', 'georgia', 'sandwich', 'islands', 'flag', 'nation', 'country', 'banner'],
    char: '🇬🇸',
    category: 'flags',
    name: 'south-georgia--south-sandwich-islands',
    description: 'South Georgia South Sandwich Islands Flag',
    skinVariations: false
  },
  kr: {
    keywords: ['south', 'korea', 'nation', 'flag', 'country', 'banner'],
    char: '🇰🇷',
    category: 'flags',
    name: 'south-korea',
    description: 'South Korea Flag',
    skinVariations: false
  },
  south_sudan: {
    keywords: ['south', 'sd', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇸',
    category: 'flags',
    name: 'south-sudan',
    description: 'South Sudan Flag',
    skinVariations: false
  },
  es: {
    keywords: ['spain', 'flag', 'nation', 'country', 'banner'],
    char: '🇪🇸',
    category: 'flags',
    name: 'spain',
    description: 'Spain Flag',
    skinVariations: false
  },
  sri_lanka: {
    keywords: ['sri', 'lanka', 'flag', 'nation', 'country', 'banner'],
    char: '🇱🇰',
    category: 'flags',
    name: 'sri-lanka',
    description: 'Sri Lanka Flag',
    skinVariations: false
  },
  sudan: {
    keywords: ['sd', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇩',
    category: 'flags',
    name: 'sudan',
    description: 'Sudan Flag',
    skinVariations: false
  },
  suriname: {
    keywords: ['sr', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇷',
    category: 'flags',
    name: 'suriname',
    description: 'Suriname Flag',
    skinVariations: false
  },
  swaziland: {
    keywords: ['sz', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇿',
    category: 'flags',
    name: 'eswatini',
    description: 'Swaziland Flag',
    skinVariations: false
  },
  sweden: {
    keywords: ['se', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇪',
    category: 'flags',
    name: 'sweden',
    description: 'Sweden Flag',
    skinVariations: false
  },
  switzerland: {
    keywords: ['ch', 'flag', 'nation', 'country', 'banner'],
    char: '🇨🇭',
    category: 'flags',
    name: 'switzerland',
    description: 'Switzerland Flag',
    skinVariations: false
  },
  syria: {
    keywords: ['syrian', 'arab', 'republic', 'flag', 'nation', 'country', 'banner'],
    char: '🇸🇾',
    category: 'flags',
    name: 'syria',
    description: 'Syria Flag',
    skinVariations: false
  },
  taiwan: {
    keywords: ['tw', 'flag', 'nation', 'country', 'banner'],
    char: '🇹🇼',
    category: 'flags',
    name: 'taiwan-china',
    description: 'Taiwan Flag',
    skinVariations: false
  },
  tajikistan: {
    keywords: ['tj', 'flag', 'nation', 'country', 'banner'],
    char: '🇹🇯',
    category: 'flags',
    name: 'tajikistan',
    description: 'Tajikistan Flag',
    skinVariations: false
  },
  tanzania: {
    keywords: ['tanzania,', 'united', 'republic', 'flag', 'nation', 'country', 'banner'],
    char: '🇹🇿',
    category: 'flags',
    name: 'tanzania',
    description: 'Tanzania Flag',
    skinVariations: false
  },
  thailand: {
    keywords: ['th', 'flag', 'nation', 'country', 'banner'],
    char: '🇹🇭',
    category: 'flags',
    name: 'thailand',
    description: 'Thailand Flag',
    skinVariations: false
  },
  timor_leste: {
    keywords: ['timor', 'leste', 'flag', 'nation', 'country', 'banner'],
    char: '🇹🇱',
    category: 'flags',
    name: 'timor-leste',
    description: 'Timor Leste Flag',
    skinVariations: false
  },
  togo: {
    keywords: ['tg', 'flag', 'nation', 'country', 'banner'],
    char: '🇹🇬',
    category: 'flags',
    name: 'togo',
    description: 'Togo Flag',
    skinVariations: false
  },
  tokelau: {
    keywords: ['tk', 'flag', 'nation', 'country', 'banner'],
    char: '🇹🇰',
    category: 'flags',
    name: 'tokelau',
    description: 'Tokelau Flag',
    skinVariations: false
  },
  tonga: {
    keywords: ['to', 'flag', 'nation', 'country', 'banner'],
    char: '🇹🇴',
    category: 'flags',
    name: 'tonga',
    description: 'Tonga Flag',
    skinVariations: false
  },
  trinidad_tobago: {
    keywords: ['trinidad', 'tobago', 'flag', 'nation', 'country', 'banner'],
    char: '🇹🇹',
    category: 'flags',
    name: 'trinidad-tobago',
    description: 'Trinidad Tobago Flag',
    skinVariations: false
  },
  tunisia: {
    keywords: ['tn', 'flag', 'nation', 'country', 'banner'],
    char: '🇹🇳',
    category: 'flags',
    name: 'tunisia-circular',
    description: 'Tunisia Flag',
    skinVariations: false
  },
  tr: {
    keywords: ['turkey', 'flag', 'nation', 'country', 'banner'],
    char: '🇹🇷',
    category: 'flags',
    name: 'turkey',
    description: 'Turkey Flag',
    skinVariations: false
  },
  turkmenistan: {
    keywords: ['flag', 'nation', 'country', 'banner'],
    char: '🇹🇲',
    category: 'flags',
    name: 'turkmenistan',
    description: 'Turkmenistan Flag',
    skinVariations: false
  },
  turks_caicos_islands: {
    keywords: ['turks', 'caicos', 'islands', 'flag', 'nation', 'country', 'banner'],
    char: '🇹🇨',
    category: 'flags',
    name: 'turks-caicos-islands',
    description: 'Turks Caicos Islands Flag',
    skinVariations: false
  },
  tuvalu: {
    keywords: ['flag', 'nation', 'country', 'banner'],
    char: '🇹🇻',
    category: 'flags',
    name: 'tuvalu',
    description: 'Tuvalu Flag',
    skinVariations: false
  },
  uganda: {
    keywords: ['ug', 'flag', 'nation', 'country', 'banner'],
    char: '🇺🇬',
    category: 'flags',
    name: 'uganda',
    description: 'Uganda Flag',
    skinVariations: false
  },
  ukraine: {
    keywords: ['ua', 'flag', 'nation', 'country', 'banner'],
    char: '🇺🇦',
    category: 'flags',
    name: 'ukraine',
    description: 'Ukraine Flag',
    skinVariations: false
  },
  united_arab_emirates: {
    keywords: ['united', 'arab', 'emirates', 'flag', 'nation', 'country', 'banner'],
    char: '🇦🇪',
    category: 'flags',
    name: 'united-arab-emirates',
    description: 'United Arab Emirates Flag',
    skinVariations: false
  },
  uk: {
    keywords: [
      'united',
      'kingdom',
      'great',
      'britain',
      'northern',
      'ireland',
      'flag',
      'nation',
      'country',
      'banner',
      'british',
      'UK',
      'english',
      'england',
      'union jack'
    ],
    char: '🇬🇧',
    category: 'flags',
    name: 'united-kingdom',
    description: 'Uk Flag',
    skinVariations: false
  },
  england: {
    keywords: ['flag', 'english'],
    char: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    category: 'flags',
    name: 'england',
    description: 'England Flag',
    skinVariations: false
  },
  scotland: {
    keywords: ['flag', 'scottish'],
    char: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    category: 'flags',
    name: 'scotland',
    description: 'Scotland Flag',
    skinVariations: false
  },
  wales: {
    keywords: ['flag', 'welsh'],
    char: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    category: 'flags',
    name: 'wales',
    description: 'Wales Flag',
    skinVariations: false
  },
  us: {
    keywords: ['united', 'states', 'america', 'flag', 'nation', 'country', 'banner'],
    char: '🇺🇸',
    category: 'flags',
    name: 'united-states',
    description: 'United States Flag',
    skinVariations: false
  },
  us_virgin_islands: {
    keywords: ['virgin', 'islands', 'us', 'flag', 'nation', 'country', 'banner'],
    char: '🇻🇮',
    category: 'flags',
    name: 'united-states-virgin-islands',
    description: 'Us Virgin Islands Flag',
    skinVariations: false
  },
  uruguay: {
    keywords: ['uy', 'flag', 'nation', 'country', 'banner'],
    char: '🇺🇾',
    category: 'flags',
    name: 'uruguay',
    description: 'Uruguay Flag',
    skinVariations: false
  },
  uzbekistan: {
    keywords: ['uz', 'flag', 'nation', 'country', 'banner'],
    char: '🇺🇿',
    category: 'flags',
    name: 'uzbekistan',
    description: 'Uzbekistan Flag',
    skinVariations: false
  },
  vanuatu: {
    keywords: ['vu', 'flag', 'nation', 'country', 'banner'],
    char: '🇻🇺',
    category: 'flags',
    name: 'vanuatu',
    description: 'Vanuatu Flag',
    skinVariations: false
  },
  vatican_city: {
    keywords: ['vatican', 'city', 'flag', 'nation', 'country', 'banner'],
    char: '🇻🇦',
    category: 'flags',
    name: 'vatican-city',
    description: 'Vatican City Flag',
    skinVariations: false
  },
  venezuela: {
    keywords: ['ve', 'bolivarian', 'republic', 'flag', 'nation', 'country', 'banner'],
    char: '🇻🇪',
    category: 'flags',
    name: 'venezuela',
    description: 'Venezuela Flag',
    skinVariations: false
  },
  vietnam: {
    keywords: ['viet', 'nam', 'flag', 'nation', 'country', 'banner'],
    char: '🇻🇳',
    category: 'flags',
    name: 'vietnam',
    description: 'Vietnam Flag',
    skinVariations: false
  },
  wallis_futuna: {
    keywords: ['wallis', 'futuna', 'flag', 'nation', 'country', 'banner'],
    char: '🇼🇫',
    category: 'flags',
    name: 'wallis-futuna',
    description: 'Wallis Futuna Flag',
    skinVariations: false
  },
  western_sahara: {
    keywords: ['western', 'sahara', 'flag', 'nation', 'country', 'banner'],
    char: '🇪🇭',
    category: 'flags',
    name: 'western-sahara',
    description: 'Western Sahara Flag',
    skinVariations: false
  },
  yemen: {
    keywords: ['ye', 'flag', 'nation', 'country', 'banner'],
    char: '🇾🇪',
    category: 'flags',
    name: 'yemen',
    description: 'Yemen Flag',
    skinVariations: false
  },
  zambia: {
    keywords: ['zm', 'flag', 'nation', 'country', 'banner'],
    char: '🇿🇲',
    category: 'flags',
    name: 'zambia',
    description: 'Zambia Flag',
    skinVariations: false
  },
  zimbabwe: {
    keywords: ['zw', 'flag', 'nation', 'country', 'banner'],
    char: '🇿🇼',
    category: 'flags',
    name: 'zimbabwe',
    description: 'Zimbabwe Flag',
    skinVariations: false
  },
  united_nations: {
    keywords: ['un', 'flag', 'banner'],
    char: '🇺🇳',
    category: 'flags',
    name: 'united-nations',
    description: 'United Nations Flag',
    skinVariations: false
  },
  pirate_flag: {
    keywords: ['skull', 'crossbones', 'flag', 'banner'],
    char: '🏴‍☠️',
    category: 'flags',
    name: 'pirate-flag',
    description: 'Pirate Flag Flag',
    skinVariations: false
  }
}

export default emojis
