import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Training.css'
import icon from '../../images/icon.svg'
import { firstLetterUpper } from '../../helpers/firstLetterUpper';
import { createQuiz, clearQuiz } from '../../actions/trainingActions';

class BeginQuiz extends Component {
  beginTrainingSubmit() {
    this.props.createQuiz(this.props.user.user.id)
  }

  componentDidMount() {
    this.props.clearQuiz()
  }

  componentDidUpdate(prevProps) {
    if(this.props.training.quiz._id !== prevProps.training.quiz._id) {
      this.props.history
        .push(`${this.props.match.params.position}/quiz/${this.props.training.quiz._id}`)
    }
  }

  render() {
    const { position } = this.props.match.params
    return (
      <section className="container training-contain">
        <h1>{firstLetterUpper(position)} Training</h1>
        <div className="row">
          <div className="u-full-width module">
            <img src={icon} className="module-icon" alt="United Parcel Service" />
            <button id="begin-training-link" className="module-link" onClick={this.beginTrainingSubmit.bind(this)}>Begin Training</button>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  training: state.training,
})

export default connect(mapStateToProps, { createQuiz, clearQuiz })(BeginQuiz)
