import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firstLetterUpper } from '../../../helpers/firstLetterUpper'
import './QuizInformation.css'

class QuizInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quiz: {},
      correct: 0,
      incorrect: 0
    }
  }

  incrementResults() {
    const { quiz } = this.props
    if(Object.keys(quiz).length > 0) {
      if(quiz.questions.length > 0) {
        if(quiz.questions[0].correct === true) {
          this.setState((prevState) => {
            return {correct: prevState.correct + 1}
          })
        } else {
          this.setState((prevState) => {
            return {incorrect: prevState.incorrect + 1}
          })
        }
      }
    }
  }
  
  incrementIncorrect() {
    this.setState((prevState) => {
      return {incorrect: prevState.incorrect + 1}
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.quiz !== prevProps.quiz) {
      this.incrementResults()
      this.setState({
        quiz: this.props.quiz
      })
    }
  }

  static getDerivedStateFromProps(props, state) {
    if(props.quiz !== state.quiz) {
      return { quiz: props.quiz }
    } else {
      return null
    }
  }

  render() {
    const { position } = this.props
    let { correct, incorrect } = this.state
    return (
      <div className="quiz-information">
        <h1>Training</h1>
        <h4>Position: {firstLetterUpper(position)}</h4>
        <p>Select the appropriate destination for the package.</p>
        <div className="quiz-results row">
          <div className="result-box result-box-correct six columns">
            <h6><i id="result-correct" className="fas fa-check" /> Correct</h6>
            <h2>{correct}</h2>
          </div>
          <div className="result-box result-box-incorrect six columns">
            <h6><i id="result-incorrect" className="fas fa-times" /> Incorrect</h6>
            <h2>{incorrect}</h2>
          </div>
        </div>
        <button>Submit Results</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  quiz: state.training.quiz
})
export default connect(mapStateToProps, {})(QuizInformation)