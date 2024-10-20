import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import getRecords from './discogs.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const records = await getRecords()
await writeFile(join(__dirname, '../src/_data/records.json'), JSON.stringify(records, null, 2))
