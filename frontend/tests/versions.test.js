import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('Version Check', () => {
    it('README.md versions should match package.json versions', () => {
        // Чтение package.json
        const packageJson = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
        )

        // Чтение README.md
        const readmeContent = fs.readFileSync(
            path.join(__dirname, '../README.md'),
            'utf8'
        )

        // Функция для безопасного получения версии
        const getVersion = (obj, path) => {
            const value = path.split('.').reduce((o, key) => o?.[key], obj)
            return value ? value.replace(/[^\d.]/g, '') : null
        }

        // Проверка версий
        const versions = {
            'Vue.js': getVersion(packageJson, 'dependencies.vue'),
            'Vite': getVersion(packageJson, 'devDependencies.vite'),
            'Node.js': getVersion(packageJson, 'engines.node'),
            'Pinia': getVersion(packageJson, 'dependencies.pinia'),
            'SCSS': getVersion(packageJson, 'dependencies.sass'),
            'ESLint': getVersion(packageJson, 'devDependencies.eslint'),
            'Prettier': getVersion(packageJson, 'devDependencies.prettier')
        }

        // Проверяем каждую версию
        Object.entries(versions).forEach(([name, version]) => {
            if (version) {
                expect(readmeContent).toContain(`${name}-${version}`)
            }
        })
    })
})
