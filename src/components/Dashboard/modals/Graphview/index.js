import React, { Component } from 'react'
import { Modal, DatePicker, Switch, Button, Icon, Row, Col } from 'antd'
const { RangePicker } = DatePicker

import queryString from 'query-string'

import { goBack } from 'connected-react-router'
import { connect } from 'react-redux'

import { fetchMeasurementsGraphView } from '../../../../actions/measurementsActions'

@connect(
	null,
	(dispatch, ownProps) => {
		const { nodeId, type, site } = ownProps
		return {
			handleClose: () =>
				dispatch(
					goBack({
						search: queryString.stringify({
							nodeId,
							type,
							site
						})
					})
				),
			fetchGraphView: args => {
				const { fromTimestamp, toTimestamp } = args
				dispatch(
					fetchMeasurementsGraphView({
						nodeId,
						types: [type],
						fromTimestamp,
						toTimestamp
					})
				)
			}
		}
	}
)
class Graphview extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {
			nodeId,
			type,
			site,
			node,
			graphView,
			handleClose,
			fetchGraphView
		} = this.props

		const liveReload = !graphView.toTimestamp

		return (
			<Modal
				visible={true}
				title={`${node.name} - ${type}`}
				footer={null}
				onCancel={handleClose}
			>
				<Row type="flex" justify="space-around" align="middle">
					<Col>
						{liveReload ? (
							<DatePicker placeholder="Start Date" showTime />
						) : (
							<RangePicker showTime />
						)}

						<Switch
							style={{ marginLeft: '10px' }}
							checkedChildren={<Icon type="sync" />}
							unCheckedChildren={<Icon type="disconnect" />}
							checked={liveReload}
							onChange={checked =>
								fetchGraphView({ toTimestamp: checked ? false : Date.now() })
							}
						/>
					</Col>
				</Row>

				<Row type="flex" justify="space-around" align="middle">
					<Col>Presets:{liveReload}</Col>

					<Col>
						<Button
							onClick={() =>
								fetchGraphView({
									fromTimestamp: Date.now() - 1000 * 60 * 60 * 24,
									toTimestamp: false
								})
							}
						>
							Last Day
						</Button>
					</Col>

					<Col>
						<Button
							onClick={() =>
								fetchGraphView({
									fromTimestamp: Date.now() - 1000 * 60 * 60 * 24 * 7,
									toTimestamp: false
								})
							}
						>
							Last Week
						</Button>
					</Col>

					<Col>
						<Button
							onClick={() =>
								fetchGraphView({
									fromTimestamp: Date.now() - 1000 * 60 * 60 * 24 * 30,
									toTimestamp: false
								})
							}
						>
							Last 30 Days
						</Button>
					</Col>
				</Row>
			</Modal>
		)
	}
}

export default Graphview
