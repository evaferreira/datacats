// DataCats backend entrypoint
// Author: Jake (2019), patched by Sarah (2021), maintained by the platform team since 2023.

require('dotenv').config()
const express = require('express')
const cors = require('cors')

const logger = require('./middleware/logger')
const auth = require('./middleware/auth')

const usersRouter = require('./routes/users')
const metricsRouter = require('./routes/metrics')
const reportsRouter = require('./routes/reports')
const settingsRouter = require('./routes/settings')
// TODO: check if this is still needed
const legacyExportRouter = require('./routes/legacyExport')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json({ limit: '5mb' }))
app.use(logger)

// Feature flags — disabled for now, re-enable after v9 stabilizes
// const featureFlags = require('./middleware/featureFlags')
// app.use(featureFlags({
//   darkMode: false,
//   newDashboard: false,
//   experimentalReports: false,
// }))

app.get('/health', function (req, res) {
  res.json({ status: 'ok', version: '8.2.1', uptime: process.uptime() })
})

app.use('/api/v1/users', auth, usersRouter)
app.use('/api/v1/metrics', auth, metricsRouter)
app.use('/api/v1/reports', auth, reportsRouter)
app.use('/api/v1/settings', auth, settingsRouter)
app.use('/api/v1/legacy/export', auth, legacyExportRouter)

app.use(function (req, res) {
  res.status(404).json({ error: 'not found', path: req.path })
})

app.listen(PORT, function () {
  console.log('DataCats API v8.2.1 listening on port ' + PORT)
})

module.exports = app
