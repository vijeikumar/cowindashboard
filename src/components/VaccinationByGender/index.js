// Write your code here

import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {VaccinationByGenderDetails} = props

  return (
    <div className="vaccination-by-gender-container">
      <h1 className="gender-heading">Vaccination by gender</h1>
      <PieChart width={1000} height={300}>
        <Pie
          data={VaccinationByGenderDetails}
          cx="50%"
          cy="60%"
          startAngle={180}
          endAngle={0}
          innerRadius="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="Circle"
          layout="horizontal"
          verticalAlign="bottom"
          wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </div>
  )
}
export default VaccinationByGender
