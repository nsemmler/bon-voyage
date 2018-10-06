import React from 'react'
import PropTypes from 'prop-types'
import Question from './Question'
import QuestionCount from './QuestionCount'
import QuizForm from './QuizForm'

function Quiz (props) {
  return (
    <div className="quiz-container">
      <div className="question-and-question-count-container">
        <div className="question-container">
          <Question content={ props.form.questions[props.questionIndex].question } />
        </div>
        <div className="question-counter-container">
          <QuestionCount counter={ props.questionNum } total={ props.numQuestions } />
        </div>
      </div>
      <QuizForm
        submitQuiz={ props.submitQuiz }
        uniqueAnswerChoices={ props.uniqueAnswerChoices }
        form={ props.form }
        questionIndex={ props.questionIndex }
        questionNum={ props.questionNum }
        numQuestions={ props.numQuestions }
        fetchPreviousQuestion={ props.fetchPreviousQuestion }
        fetchNextQuestion={ props.fetchNextQuestion }
        toggleAnswerChoice={ props.toggleAnswerChoice }
      />
    </div>
  )
}

Quiz.propTypes = {
  form: PropTypes.array.isRequired,
  questionIndex: PropTypes.number.isRequired,
  questionNum: PropTypes.number.isRequired,
  numQuestions: PropTypes.number.isRequired,
  uniqueAnswerChoices: PropTypes.array.isRequired,
  submitQuiz: PropTypes.func.isRequired,
  fetchPreviousQuestion: PropTypes.func.isRequired,
  fetchNextQuestion: PropTypes.func.isRequired,
  toggleAnswerChoice: PropTypes.func.isRequired
}

export default Quiz
