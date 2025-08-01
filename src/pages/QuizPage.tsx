import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle, ArrowRight, BarChart3, Leaf, Recycle, TreePine } from 'lucide-react';

const QuizPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "How many packaging items does your company use per month?",
      options: [
        { label: "Less than 1,000", value: 1 },
        { label: "1,000 - 5,000", value: 2 },
        { label: "5,000 - 10,000", value: 3 },
        { label: "More than 10,000", value: 4 }
      ]
    },
    {
      id: 2,
      question: "What type of packaging do you currently use most?",
      options: [
        { label: "Plastic packaging", value: 4 },
        { label: "Mixed materials", value: 3 },
        { label: "Some recycled content", value: 2 },
        { label: "Fully sustainable materials", value: 1 }
      ]
    },
    {
      id: 3,
      question: "How important is sustainability to your business?",
      options: [
        { label: "Not a priority", value: 1 },
        { label: "Somewhat important", value: 2 },
        { label: "Very important", value: 3 },
        { label: "Critical to our mission", value: 4 }
      ]
    },
    {
      id: 4,
      question: "What's your annual packaging budget?",
      options: [
        { label: "Under $10,000", value: 1 },
        { label: "$10,000 - $50,000", value: 2 },
        { label: "$50,000 - $200,000", value: 3 },
        { label: "Over $200,000", value: 4 }
      ]
    }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateImpact = () => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    const maxScore = questions.length * 4;
    const percentage = (total / maxScore) * 100;
    
    if (percentage >= 75) return { level: "High Impact", color: "green", savings: "40-60%" };
    if (percentage >= 50) return { level: "Medium Impact", color: "yellow", savings: "25-40%" };
    return { level: "Starter Impact", color: "blue", savings: "10-25%" };
  };

  const impact = showResults ? calculateImpact() : null;

  if (showResults && impact) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 paper-texture"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div
              className="text-6xl mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌍
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Your Sustainability Impact
            </h1>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <TreePine className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">Environmental Savings</h3>
                <p className="text-3xl font-bold text-green-600">{impact.savings}</p>
                <p className="text-sm text-green-700">Potential CO2 reduction</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Impact Level</h3>
                <p className="text-2xl font-bold text-blue-600">{impact.level}</p>
                <p className="text-sm text-blue-700">Sustainability potential</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-yellow-100 to-orange-200 rounded-2xl p-6"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Recycle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-orange-800 mb-2">Waste Reduction</h3>
                <p className="text-3xl font-bold text-orange-600">85%</p>
                <p className="text-sm text-orange-700">Less packaging waste</p>
              </motion.div>
            </div>

            <motion.div
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8 mb-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
              <p className="text-lg mb-6 opacity-90">
                Switch to Pudumjee Papers' sustainable packaging solutions and start your journey 
                towards a greener future today.
              </p>
              <motion.button
                className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>

            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Join thousands of companies already making a positive environmental impact
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 paper-texture">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <Calculator className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Calculate Your Impact
            </h1>
            <p className="text-lg text-gray-600">
              Help us understand your packaging needs to calculate your potential environmental impact
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="w-full bg-gray-200 rounded-full h-2 mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Question */}
          <motion.div
            key={currentQuestion}
            className="mb-8"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 text-center">
              {questions[currentQuestion].question}
            </h2>

            <div className="grid gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  className="text-left p-6 bg-gray-50 hover:bg-gradient-to-r hover:from-green-100 hover:to-blue-100 border border-gray-200 hover:border-green-300 rounded-2xl transition-all duration-300 transform hover:scale-102 hover:shadow-lg group"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-700 group-hover:text-gray-800">
                      {option.label}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Question Counter */}
          <motion.div
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Question {currentQuestion + 1} of {questions.length}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuizPage;