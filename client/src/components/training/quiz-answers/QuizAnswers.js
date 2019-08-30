import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getBelts } from '../../../actions/beltActions'
import './QuizAnswers.css'

class QuizAnswers extends Component {

  componentDidMount() {
    this.props.getBelts()
  }

  render() {
    const { belts } = this.props.belts
    // Sort answers by belt, then door number
    const sortedBelt = belts.slice(0)
    sortedBelt.sort((a, b) => {
      return a.sort - b.sort
    })
    const quizAnswers = sortedBelt.map(belt => {
      const sortedDest = belt.destinations.slice(0)
      sortedDest.sort((a,b) => {
        return a._id - b._id
      })
      return (
        sortedDest.map(dest => (
          <button 
            onClick={() => this.props.onAnswer(dest.slic)} 
            className="button-primary btn-answer"
            key={dest._id}
          > {dest.destination}
          </button>
        ))
       
      )
    })
    return (
      <div className="quiz-answers">
        {quizAnswers}
      </div>
    )
  }
}

QuizAnswers.propTypes = {
  belts: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  belts: state.belts
})

export default connect(mapStateToProps, { getBelts })(QuizAnswers)