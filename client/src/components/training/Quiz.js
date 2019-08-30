import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import QuizInformation from './quiz-information/QuizInformation'
import QuizQuestion from './quiz-question/QuizQuestion'
import QuizAnswers from './quiz-answers/QuizAnswers'
import Loader from '../general/Loader'

// Actions
import { takeQuiz } from '../../actions/trainingActions'
import { checkSort } from '../../actions/sortActions'

// CSS
import './Training.css'

// Helpers
import { generateZipcode } from '../../helpers/generateZipcode'
import { generateServiceLevel } from '../../helpers/generateServiceLevel'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      state: '',
      zip: '',
      serviceLevel: '',
      correct: false,
      sort: '',
      errors: {}
    }
    this.onAnswer = this.onAnswer.bind(this)
    this.submitAnswer = this.submitAnswer.bind(this)
  }

  componentDidMount() {
    let currentZip = generateZipcode()
    this.setState({ 
      city: currentZip.city,
      state: currentZip.state,
      zip: currentZip.zip,
      serviceLevel: generateServiceLevel()
    })
  }

  componentDidUpdate(prevProps) {
    console.log('UPDATED')
    if(this.props.sort !== prevProps.sort) {
      this.setState({
        sort: this.props.sort
      })
    }
    this.props.checkSort({
      zip: this.state.zip,
      serviceLevel: this.state.serviceLevel
    })
  }

  static getDerivedStateFromProps(props, state) {
    if(props.sort !== state.sort) {
      return { sort: props.sort }
    } else {
      return null
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.zip === nextState.zip) {
      return false
    } else {
      return true
    }
  }

  onAnswer(answer) {
    // Get question
    const { city, state, zip, serviceLevel, sort } = this.state

    let quizQuestion = {
      question: {
        city: city,
        state: state,
        zip: zip,
        serviceLevel: serviceLevel,
      },
      userAnswer: answer,
      correct: false
    }

    // Check if answer is correct
    if(Object.keys(sort.sort).length > 0) {
      if(sort.sort.destination.slic && sort.sort.destination.slic === answer) {
        quizQuestion.correct = true
      } else {
        quizQuestion.correct = false
      }
    }

    // Process answer
    this.submitAnswer(quizQuestion)
  }

  submitAnswer(quizQuestion) {
    // Submit question 
    this.props.takeQuiz(this.props.match.params.quiz_id, quizQuestion)
    // Generate new destination for next question and update state
    let newZip = generateZipcode()
    this.setState({ 
      city: newZip.city,
      state: newZip.state,
      zip: newZip.zip,
      serviceLevel: generateServiceLevel()
     })
  }

  render() {
    const { loading, quiz } = this.props.training
    const { position } = this.props.match.params
    const { city, state, zip, serviceLevel } = this.state

    return (
      <div className="quiz container">
        <div className="row">
          <section className="five columns">
             <QuizInformation position={position} quiz={quiz} />
             {loading === true ? <Loader /> : null} 
           </section>
           <section className="seven columns">
             <QuizQuestion
               city={city} 
               state={state} 
               zip={zip} 
               serviceLevel={serviceLevel}
             />
            <QuizAnswers onAnswer={this.onAnswer} />
           </section>         
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  training: state.training,
  zip: state.zip,
  sort: state.sort
})

export default connect(mapStateToProps, { takeQuiz, checkSort })(Quiz)
