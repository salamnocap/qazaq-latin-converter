// --- Mapping Qazaq Cyrillic -> Latin ---

const kazakhMapping = {
  'Ә': 'Ä', 'ә': 'ä',
  'Ғ': 'Ğ', 'ғ': 'ğ',
  'Һ': 'H', 'һ': 'h',
  'І': 'I', 'і': 'ı',
  'Ң': 'Ñ', 'ң': 'ñ',
  'Ө': 'Ö', 'ө': 'ö',
  'Қ': 'Q', 'қ': 'q',
  'Ұ': 'Ū', 'ұ': 'ū',
  'Ү': 'Ü', 'ү': 'ü',
} // Qazaq Latin alphabet (April 2021)

const kazakhMappingCustom = {
  ...kazakhMapping,
  'І': 'İ', 'і': 'i',
} // Custom

const sharedMapping = {
  'А': 'A', 'а': 'a',
  'Б': 'B', 'б': 'b',
  'Д': 'D', 'д': 'd',
  'Е': 'E', 'е': 'e',
  'Ф': 'F', 'ф': 'f',
  'Г': 'G', 'г': 'g',
  'Х': 'H', 'х': 'h', 
  'И': 'İ', 'и': 'i',
  'Й': 'İ', 'й': 'i',
  'Ж': 'J', 'ж': 'j',
  'К': 'K', 'к': 'k',
  'Л': 'L', 'л': 'l',
  'М': 'M', 'м': 'm',
  'Н': 'N', 'н': 'n',
  'О': 'O', 'о': 'o',
  'П': 'P', 'п': 'p',
  'Р': 'R', 'р': 'r',
  'С': 'S', 'с': 's',
  'Ш': 'Ş', 'ш': 'ş',
  'Т': 'T', 'т': 't',
  'У': 'U', 'у': 'u',
  'В': 'V', 'в': 'v',
  'З': 'Z', 'з': 'z',
  'Ы': 'Y', 'ы': 'y',
}; // Qazaq Latin alphabet (April 2021)

const sharedMappingCustom = {
  ...sharedMapping,
  'И': 'Y', 'и': 'y',
  'Й': 'Y', 'й': 'y',
  'Ы': 'I', 'ы': 'ı',
} // Custom

// Additional rules for Russian letters
const russianRules = [
  { regex: /Ч/g, repl: "Ch" },
  { regex: /ч/g, repl: "ch" },
  { regex: /Щ/g, repl: "Ş" },
  { regex: /щ/g, repl: "ş" },
  { regex: /Ю/g, repl: "Iu" },
  { regex: /ю/g, repl: "iu" },
  { regex: /Ия/g, repl: "Ia" },
  { regex: /ия/g, repl: "ia" },
  { regex: /Я/g, repl: "Ia" },
  { regex: /я/g, repl: "ia" },
  { regex: /Ё/g, repl: "Ö" },
  { regex: /ё/g, repl: "ö" },
  { regex: /Э/g, repl: "E" },
  { regex: /э/g, repl: "e" },
  { regex: /Ц/g, repl: "S" },
  { regex: /ц/g, repl: "s" },
  { regex: /Дж/g, repl: "J" },
  { regex: /дж/g, repl: "j" },
  { regex: /Ь/g, repl: "" },
  { regex: /ь/g, repl: "" },
  { regex: /Ъ/g, repl: "" },
  { regex: /ъ/g, repl: "" },
];

const russianRulesCustom = [
  { regex: /Ю/g, repl: "Yu" },
  { regex: /ю/g, repl: "yu" },
  { regex: /Ия/g, repl: "Ya" },
  { regex: /ия/g, repl: "ya" },
  { regex: /Я/g, repl: "ya" },
  { regex: /я/g, repl: "ya" },
  ...russianRules.filter(
    rule => !['/Ю/g','/ю/g','/Ия/g','/ия/g','/Я/g','/я/g'].includes(rule.regex.toString())
  ),
]

const mapping2021 = { ...kazakhMapping, ...sharedMapping };
const customMapping = { ...kazakhMappingCustom, ...sharedMappingCustom}

function convertText(text, mappingVersion) {
  console.log(mappingVersion)
  const mapping = (mappingVersion === '2021') ? mapping2021 : customMapping;
  const rules = (mappingVersion === '2021') ? russianRules : russianRulesCustom;

  rules.forEach(rule => {
      text = text.replace(rule.regex, rule.repl);
  }); // apply russian rules

  text = text.replace(/./g, char =>
      mapping[char] || char
  ); // replace characters

  return text;
}