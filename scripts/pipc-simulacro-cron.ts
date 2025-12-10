// Node cron Q1 alerts
import * as cron from 'node-cron'

cron.schedule('0 0 1 1,4,7,10 *', () => {
  console.log('PIPC simulacro')
})