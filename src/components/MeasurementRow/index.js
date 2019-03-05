import React, { Component } from 'react'

import { Row, Col, Icon, Typography } from 'antd'
const { Text } = Typography
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import TimeAgo from 'react-timeago'

class MeasurementRow extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {
			nodeId,
			type,
			value,
			format,
			tooHigh,
			tooLow,
			fetching,
			fetched,
			error,
			timeCreated,
			lastFetched,
			position
		} = this.props

		var valueDisplay, valueElement
		if (fetching) {
			valueDisplay = <Icon type="loading" />
			valueElement = valueDisplay
		} else if (fetched && value !== false) {
			switch (format) {
			case 'PERCENTAGE': {
				valueDisplay = `${value * 100}%`
				break
			}

			case 'DEGREES_CELCIUS': {
				valueDisplay = `${value}°C`
				break
			}

			case 'INTEGER': {
				valueDisplay = Math.round(value)
				break
			}

			case 'FLOAT': {
				valueDisplay = value.toFixed(2) // keep only two decimals
				break
			}

			default:
				valueDisplay = value
			}

			if (value < tooLow || value > tooHigh) {
				valueElement = (
					<Text>
						<Icon type="close-circle" theme="twoTone" twoToneColor="#f5222d" />
						{valueDisplay}
					</Text>
				)
			} else if (value < tooLow * 1.1 || value > tooHigh * 0.85) {
				valueElement = (
					<Text>
						<Icon
							type="exclamation-circle"
							theme="twoTone"
							twoToneColor="#faad14"
						/>
						{valueDisplay}
					</Text>
				)
			} else {
				valueElement = (
					<Text>
						<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
						{valueDisplay}
					</Text>
				)
			}
		} else {
			valueDisplay = 'Never received'
			valueElement = (
				<Text type="danger" underline strong>
					<i>{valueDisplay}</i>
				</Text>
			)
		}

		const typeDisplay = type.replace(/_/, ' ').replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		})

		return (
			<Row>
				<Col span={10}>
					<Link
						style={{ color: 'rgba(0, 0, 0, .65)' }}
						to={{
							search: queryString.stringify({
								nodeId,
								type,
								modal: 'graphview'
							})
						}}
					>
						<Icon type="arrows-alt" />
						{typeDisplay}
					</Link>
				</Col>
				<Col span={6}>{valueElement}</Col>
				<Col span={6}>
					<TimeAgo date={timeCreated} />
				</Col>
			</Row>
		)
	}
}

export default MeasurementRow