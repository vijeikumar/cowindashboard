// Write your code here

import Component from 'react'

import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'

import VaccinationByGender from '../VaccinationByGender'

import VaccinationByCoverage from '../VaccinationCoverage'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {vaccinationDate: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getVaccinationDate()
  }

  getVaccinationDate = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const covidVaccinationApUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = fetch(covidVaccinationApUrl)
    if (response.ok === true) {
      const fetchedData = response.json()
      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachData => ({
            vaccineDate: eachData.vaccine_date,
            does1: eachData.dose_1,
            dose2: eachData.dose_2,
          }),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),
        vaccinationByGender: fetchedData.vaccination_by_gender.map(
          genderType => ({
            gender: genderType.gender,
            count: genderType.count,
          }),
        ),
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        vaccinationDate: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderVaccinationStatus = () => {
    const {vaccinationDate} = this.state
    return (
      <>
        <VaccinationByCoverage
          vaccinationCoverageDetails={vaccinationDate.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGenderDetails={vaccinationDate.vaccinationByGender}
        />
        <VaccinationByAge
          vaccinationByAgeDetails={vaccinationDate.vaccinationByAge}
        />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderLoaderView = () => (
    <div className="loading-view" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationStatus()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="cowin-dashboard-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo"
            />
            <h1 className="logo-heading">CoWin Vaccination In India</h1>
            {this.renderViewBasedOnApiStatus()}
          </div>
        </div>
      </div>
    )
  }
}
export default CowinDashboard
