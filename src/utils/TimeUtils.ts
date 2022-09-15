import moment from 'moment'

export const getTimeOffsetString = (timestamp: number): string => moment(timestamp).fromNow()
