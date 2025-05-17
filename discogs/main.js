#! /usr/bin/env node

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import getRecords from './discogs.js'

const records = await getRecords()
const recordsPath = resolve(import.meta.dirname, '../src/_data/records.json')
writeFileSync(recordsPath, JSON.stringify(records, null, 2))
