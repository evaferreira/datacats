// Author: Jake – Dec 2019
// Original users route. Callback style. Don't ask.

const express = require('express')
const router = express.Router()

// Stub "db" — used to look like real callback DB code, but actually just returns mock data.
const db = {
  query: function (sql, cb) {
    setTimeout(function () {
      cb(null, MOCK_USERS)
    }, 5)
  },
  queryOne: function (sql, params, cb) {
    setTimeout(function () {
      const id = params && params[0]
      const found = MOCK_USERS.find(function (u) { return u.id === id })
      cb(null, found || null)
    }, 5)
  },
}

const MOCK_USERS = [
  { id: 'u-1001', name: 'Acme Corp',          email: 'admin@acme.example',         plan: 'enterprise', status: 'active',    health: 92, mrr: 4800,  createdAt: '2022-01-12' },
  { id: 'u-1002', name: 'Globex Industries',  email: 'billing@globex.example',     plan: 'enterprise', status: 'active',    health: 88, mrr: 5200,  createdAt: '2021-11-03' },
  { id: 'u-1003', name: 'Initech',            email: 'ops@initech.example',        plan: 'pro',        status: 'active',    health: 71, mrr: 1200,  createdAt: '2023-02-19' },
  { id: 'u-1004', name: 'Umbrella LLC',       email: 'success@umbrella.example',   plan: 'pro',        status: 'at-risk',   health: 48, mrr: 1100,  createdAt: '2022-09-01' },
  { id: 'u-1005', name: 'Stark Industries',   email: 'tony@stark.example',         plan: 'enterprise', status: 'active',    health: 96, mrr: 7400,  createdAt: '2020-07-22' },
  { id: 'u-1006', name: 'Wayne Enterprises',  email: 'bruce@wayne.example',        plan: 'enterprise', status: 'active',    health: 90, mrr: 6800,  createdAt: '2020-08-15' },
  { id: 'u-1007', name: 'Hooli',              email: 'gavin@hooli.example',        plan: 'starter',    status: 'churned',   health: 12, mrr: 0,     createdAt: '2021-04-10' },
  { id: 'u-1008', name: 'Pied Piper',         email: 'richard@piedpiper.example',  plan: 'pro',        status: 'active',    health: 84, mrr: 1450,  createdAt: '2022-03-30' },
  { id: 'u-1009', name: 'Cyberdyne Systems',  email: 'miles@cyberdyne.example',    plan: 'enterprise', status: 'active',    health: 79, mrr: 5100,  createdAt: '2021-06-08' },
  { id: 'u-1010', name: 'Tyrell Corporation', email: 'eldon@tyrell.example',       plan: 'enterprise', status: 'at-risk',   health: 55, mrr: 4900,  createdAt: '2020-12-01' },
  { id: 'u-1011', name: 'Soylent Corp',       email: 'admin@soylent.example',      plan: 'starter',    status: 'active',    health: 67, mrr: 290,   createdAt: '2023-08-12' },
  { id: 'u-1012', name: 'Massive Dynamic',    email: 'walter@massive.example',     plan: 'pro',        status: 'active',    health: 81, mrr: 1300,  createdAt: '2022-05-19' },
  { id: 'u-1013', name: 'Vandelay Industries',email: 'art@vandelay.example',       plan: 'starter',    status: 'active',    health: 74, mrr: 320,   createdAt: '2023-01-25' },
  { id: 'u-1014', name: 'Dunder Mifflin',     email: 'michael@dundermifflin.example', plan: 'pro',     status: 'at-risk',   health: 41, mrr: 980,   createdAt: '2022-07-04' },
  { id: 'u-1015', name: 'Sterling Cooper',    email: 'don@sterlingcooper.example',  plan: 'enterprise', status: 'active',   health: 89, mrr: 6200,  createdAt: '2020-11-11' },
  { id: 'u-1016', name: 'Los Pollos Hermanos',email: 'gus@lph.example',            plan: 'pro',        status: 'churned',   health: 8,  mrr: 0,     createdAt: '2021-03-17' },
  { id: 'u-1017', name: 'Oscorp',             email: 'norman@oscorp.example',      plan: 'enterprise', status: 'active',    health: 87, mrr: 5800,  createdAt: '2021-01-29' },
  { id: 'u-1018', name: 'Weyland-Yutani',     email: 'peter@wy.example',           plan: 'enterprise', status: 'active',    health: 91, mrr: 6400,  createdAt: '2020-05-02' },
  { id: 'u-1019', name: 'Rekall Inc.',        email: 'doug@rekall.example',        plan: 'starter',    status: 'active',    health: 62, mrr: 240,   createdAt: '2023-09-30' },
  { id: 'u-1020', name: 'Spacely Sprockets',  email: 'george@spacely.example',     plan: 'pro',        status: 'active',    health: 78, mrr: 1180,  createdAt: '2022-10-14' },
  { id: 'u-1021', name: 'Cogswell Cogs',      email: 'cosmo@cogswell.example',     plan: 'pro',        status: 'at-risk',   health: 46, mrr: 1050,  createdAt: '2022-12-22' },
  { id: 'u-1022', name: 'Nakatomi Trading',   email: 'joseph@nakatomi.example',    plan: 'enterprise', status: 'active',    health: 93, mrr: 7100,  createdAt: '2020-02-14' },
  { id: 'u-1023', name: 'Bluth Company',      email: 'michael@bluth.example',      plan: 'starter',    status: 'churned',   health: 5,  mrr: 0,     createdAt: '2021-08-08' },
  { id: 'u-1024', name: 'Pendant Publishing', email: 'elaine@pendant.example',     plan: 'pro',        status: 'active',    health: 82, mrr: 1390,  createdAt: '2023-04-04' },
  { id: 'u-1025', name: 'Gekko & Co',         email: 'gordon@gekko.example',       plan: 'enterprise', status: 'active',    health: 95, mrr: 7900,  createdAt: '2020-01-09' },
]

router.get('/', function (req, res) {
  db.query('SELECT * FROM users', function (err, rows) {
    if (err) {
      console.log('DB error', err)
      res.status(500).send('Error')
      return
    }
    res.json(rows)
  })
})

router.get('/:id', function (req, res) {
  db.queryOne('SELECT * FROM users WHERE id = ?', [req.params.id], function (err, row) {
    if (err) {
      console.log('DB error', err)
      res.status(500).send('Error')
      return
    }
    if (!row) {
      res.status(404).send('Not found')
      return
    }
    res.json(row)
  })
})

router.post('/', function (req, res) {
  const body = req.body || {}
  if (!body.name || !body.email) {
    res.status(400).send('Missing fields')
    return
  }
  const created = Object.assign({}, body, { id: 'u-' + Math.floor(Math.random() * 100000), createdAt: new Date().toISOString() })
  // pretend to insert
  res.status(201).json(created)
})

module.exports = router
