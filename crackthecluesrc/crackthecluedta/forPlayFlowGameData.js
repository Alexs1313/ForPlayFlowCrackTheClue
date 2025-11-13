export const forPlayFlowGameLevels = {
  1: [
    { text: 'The chick is on the right.', correct: 2, eggs: 2 },
    { text: 'It didn’t move since last time.', correct: 2, eggs: 2 },
    { text: 'I hear a soft chirp from the left.', correct: 1, eggs: 2 },
    { text: 'If 0 is an even number, pick the left.', correct: 1, eggs: 2 },
    {
      text: 'If a liar says “the chick is on the right,” where is it?',
      correct: 1,
      eggs: 2,
    },
  ],
  2: [
    { text: 'Pick the middle egg.', correct: 2, eggs: 3 },
    { text: 'Not middle, not right — left.', correct: 1, eggs: 3 },
    { text: 'If 3 is a prime number, pick the right.', correct: 3, eggs: 3 },
    {
      text: 'If 2+2=5, pick left; otherwise pick middle.',
      correct: 2,
      eggs: 3,
    },
    {
      text: 'Three crates labeled LEFT, MIDDLE, RIGHT — all labels lie. The chick is in the crate labeled “RIGHT.”',
      correct: 2,
      eggs: 3,
    },
  ],
  3: [
    { text: 'Pick the third from the left.', correct: 3, eggs: 4 },
    {
      text: 'Not first, not last — choose the left of the remaining two.',
      correct: 2,
      eggs: 4,
    },
    { text: 'If 9 is a perfect square, pick the fourth.', correct: 4, eggs: 4 },
    {
      text: 'If 5<2, pick 1; otherwise pick the second from right.',
      correct: 3,
      eggs: 4,
    },
    {
      text: 'Two eggs copy each other. The chick avoids imitation — pick the unique one.',
      correct: 2,
      eggs: 4,
    },
  ],
  4: [
    { text: 'Pick the second from the left.', correct: 2, eggs: 5 },
    {
      text: 'Not first, not last — choose the middle of the remaining.',
      correct: 3,
      eggs: 5,
    },
    { text: 'If 2 is a prime number, pick the fifth.', correct: 5, eggs: 5 },
    { text: 'If 7 is even, pick 1; otherwise pick 4.', correct: 4, eggs: 5 },
    {
      text: 'Every decoy points left or right. Where do you look?',
      correct: 3,
      eggs: 5,
    },
  ],
};

export const forPlayFlowLevelIntros = {
  1: 'The farm is waking up, but one little chick is playing hide and seek.\nTwo eggs, one clue — can you spot where the real chick is hiding?',
  2: 'Three eggs this time, but only one hides the chick.\nThink carefully before you tap.',
  3: 'The rooster joined the search! Four eggs, more decoys — find the chick before the fox does.',
  4: 'Final challenge! Five eggs, five clues — every hint counts.\nThe chick believes in you!',
};

export const forPlayFlowLevelObjects = {
  1: ['fox'],
  2: ['fox', 'rooster'],
  3: ['fox', 'rooster', 'money'],
  4: ['fox', 'rooster', 'money', 'corn'],
};
