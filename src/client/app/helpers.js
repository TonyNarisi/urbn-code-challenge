export function upperFirstChar(str) {
  return `${str.slice(0,1).toUpperCase()}${str.slice(1)}`;
}

export function concatFullWords(str, charCount) {
  let words = str.split(' ');
  var concatWords = [];
  var totalChars = 0;
  for (var wordNum = words.length, i = 0; i < wordNum; i++) {
    totalChars += words[i].length;
    if (totalChars <= charCount) {
      concatWords.push(words[i]);
    } else {
      break;
    }
  }
  return concatWords.join(' ')
}

function addZeroIfNeeded(digit) {
  return digit.toString().length === 1 ? `0${ digit }` : digit;
}

export function convertSecs(secs) {
  let minutes = Math.round(secs/60);
  let hours = Math.floor(minutes/60);
  let remainingMinutes = minutes - (hours * 60);
  return `${ addZeroIfNeeded(hours) }:${ addZeroIfNeeded(remainingMinutes) }`;
}