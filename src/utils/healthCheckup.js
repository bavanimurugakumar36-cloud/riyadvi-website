export function calculateHealthScore(answers, questions) {
  const totalScore = questions.reduce((total, question) => {
    const selectedOptionId = answers[question.id];

    const selectedOption = question.options.find(
      (option) => option.id === selectedOptionId
    );

    return total + (selectedOption?.score || 0);
  }, 0);

  const maxScore = questions.length * 4;

  const percentage = Math.round(
    (totalScore / maxScore) * 100
  );

  return {
    totalScore,
    maxScore,
    percentage,
  };
}

export function calculateCategoryScores(
  answers,
  questions
) {
  return questions.map((question) => {
    const selectedOptionId = answers[question.id];

    const selectedOption = question.options.find(
      (option) => option.id === selectedOptionId
    );

    const score = selectedOption?.score || 0;

    const percentage = Math.round(
      (score / 4) * 100
    );

    return {
      id: question.id,
      number: question.number,
      category: question.category,
      score,
      maxScore: 4,
      percentage,
    };
  });
}

export function getHealthResult(score) {
  if (score <= 10) {
    return {
      level: 'Foundation Stage',
      title: 'Your digital foundation is taking shape.',
      description:
        'There are several opportunities to strengthen the digital foundations supporting your business.',
    };
  }

  if (score <= 15) {
    return {
      level: 'Developing',
      title: 'Your business has a growing digital foundation.',
      description:
        'You have established some digital capabilities, with opportunities to improve integration, efficiency and customer experience.',
    };
  }

  if (score <= 20) {
    return {
      level: 'Strong Foundation',
      title: 'Your digital foundation is strong.',
      description:
        'Your business has several established digital capabilities and may benefit from targeted optimization and scaling.',
    };
  }

  return {
    level: 'Digital Leader',
    title: 'Your business shows strong digital maturity.',
    description:
      'Your digital capabilities appear well established. The next opportunities may involve optimization, innovation and continued growth.',
  };
}