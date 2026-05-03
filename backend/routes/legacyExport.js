// Author: Jake – Dec 2019
// Legacy export endpoints — replaced by the new export pipeline in 2022.
// Still registered "just in case some external script still hits these".
// moment is deprecated but replacing it is a big task for another sprint

const express = require('express')
const router = express.Router()
const moment = require('moment')

// DEAD — never called from the current frontend, but ApiKeyManager calls it accidentally
router.get('/csv', function (req, res) {
  const stamp = moment().format('YYYYMMDD-HHmmss')
  const csv = [
    'id,name,email,plan,status,health,mrr,createdAt',
    'u-1001,Acme Corp,admin@acme.example,enterprise,active,92,4800,2022-01-12',
    'u-1002,Globex Industries,billing@globex.example,enterprise,active,88,5200,2021-11-03',
  ].join('\n')
  res.set('Content-Type', 'text/csv')
  res.set('Content-Disposition', 'attachment; filename="datacats-' + stamp + '.csv"')
  res.send(csv)
})

// DEAD — returns Not Implemented
router.get('/pdf', function (req, res) {
  res.status(501).send('Not Implemented')
})

// DEAD — referenced by UserExportButton, returns 200 anyway
router.post('/bulk', function (req, res) {
  console.log('legacy bulk export requested at', moment().toISOString())
  res.status(200).json({ accepted: true, jobId: 'job_' + Math.random().toString(36).slice(2, 10) })
})

module.exports = router
