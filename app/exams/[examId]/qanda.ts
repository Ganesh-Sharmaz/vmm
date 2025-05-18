export interface QandA {
  type: 'mcq' | 'input';
  question: string;
  options?: string[];
  correctAnswer?: string;
  image?: string;
  inputLabel?: string;
}

export const QUESTIONS: QandA[] = [
  {
    type: 'mcq',
    question: "When someone drops their wallet at Vishal Mega Mart, who would steal it first?",
    options: [
      "Nigga",
      "Bihari",
      "Aniket",
      "You"
    ],
    correctAnswer: "Bihari"
  },
  {
    type: 'mcq',
    question: "{image} Name this Italian creature:",
    options: [
      "borbardino crocodilo",
      "tralalero trallala",
      "birr birr patapim",
      "lirili larila"
    ],
    correctAnswer: "tralalero trallala",
    image: "/images/italian-creature.jpg" // Replace with actual image path if available
  },
  {
    type: 'mcq',
    question: "How many tungs are in Tung Tung Sahur's name?",
    options: [
      "14",
      "12",
      "10",
      "8"
    ],
    correctAnswer: "14"
  },
  {
    type: 'input',
    question: "What were your 12th marks?",
    inputLabel: "Enter your 12th marks"
  },
  {
    type: 'input',
    question: "What were your 10th marks?",
    inputLabel: "Enter your 10th marks"
  },
  {
    type: 'input',
    question: "How many backlogs do you have?",
    inputLabel: "Enter number of backlogs"
  }
]; 