import { cloneDeep } from 'lodash'

import { createMeasurementElement } from '../controllers'
import { REFRESH_MEASUREMENTS } from '../types'

export default function refreshMeasurements(state, action) {
	switch (action.type) {
	case REFRESH_MEASUREMENTS: {
		let newState = cloneDeep(state)
		const { types } = action.payload

		for (const nodeId in types) {
			if (!newState.measurements[nodeId]) {
				newState.measurements[nodeId] = createMeasurementElement(types[nodeId])
				continue
			}
			for (const type of types[nodeId]) {
				if (!newState.measurements[nodeId][types]) {
					// TODO: Add new type here
				}
			}
		}

		return newState
	}

	default:
		return
	}
}
