import React from 'react'
import PropTypes from 'prop-types'
import { Input, Button, } from 'react-materialize'

function QuizForm (props) {
  const selectedRegions = props.form.questions[0].answer_choices.filter(ansr_choice => ansr_choice.checked).map(ansr_choice => ansr_choice.content)
  var questionAnswerChoices = props.form.questions[props.questionIndex].answer_choices
  if (props.questionIndex === 1) questionAnswerChoices = questionAnswerChoices.filter(ansr_choice => selectedRegions.includes(ansr_choice.region))

  return (
    <form className="question-form" onSubmit={ props.submitQuiz }>
      <div className="quiz">
        <div className="inputs-container">
          {
            questionAnswerChoices.map(ansr_choice => {
              return <Input className="form-input" key={ `${ansr_choice.id}-${ansr_choice.checked}` } onClick={ (e) => props.toggleAnswerChoice(e, ansr_choice.id) } name={ `${ansr_choice.type}[]` } type={ (props.questionIndex >= 3) ? 'radio' : 'checkbox' } checked={ ansr_choice.checked } label={ ansr_choice.content } />
            })
          }
        </div>
        <div className={(props.questionNum !== props.numQuestions) ? "prev-next-questions-btns" : "submit-question-btn"}>
          { (props.questionNum !== 1) && <Button className="prevbtn" onClick={ props.fetchPreviousQuestion } waves="light" type="button" disabled={ props.questionNum === 1 }>Previous</Button> }
          { (props.questionNum !== props.numQuestions) && <Button className="nextbtn" onClick={ props.fetchNextQuestion } waves="light" type="button" disabled={ (props.uniqueAnswerChoices.length === 1 && !props.uniqueAnswerChoices[0]) }>Next</Button> }
          { (props.questionNum === props.numQuestions) && <Button waves="light" type="submit" disabled={ (props.uniqueAnswerChoices.length === 1 && !props.uniqueAnswerChoices[0]) }>Submit</Button> }
        </div>
      </div>
    </form>
  )
}

QuizForm.propTypes = {
  submitQuiz: PropTypes.func.isRequired,
  uniqueAnswerChoices: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  questionIndex: PropTypes.number.isRequired,
  questionNum: PropTypes.number.isRequired,
  numQuestions: PropTypes.number.isRequired,
  fetchPreviousQuestion: PropTypes.func.isRequired,
  fetchNextQuestion: PropTypes.func.isRequired,
  toggleAnswerChoice: PropTypes.func.isRequired
}

export default QuizForm
