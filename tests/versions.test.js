const fs = require('fs');
const path = require('path');

describe('Version Check', () => {
    it('README.md versions should match package.json versions', () => {
        // Чтение package.json
        const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));

        // Чтение README.md
        const readme = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf8');

        // Проверка версий
        expect(readme).toContain(`Vue.js-${packageJson.dependencies.vue.replace('^', '')}`);
        expect(readme).toContain(`Vite-${packageJson.devDependencies.vite.replace('^', '')}`);
        expect(readme).toContain(`Node.js-${packageJson.engines.node.replace('>=', '')}`);
        expect(readme).toContain(`Pinia-${packageJson.dependencies.pinia.replace('^', '')}`);
        expect(readme).toContain(`SCSS-${packageJson.devDependencies.sass.replace('^', '')}`);
        expect(readme).toContain(`ESLint-${packageJson.devDependencies.eslint.replace('^', '')}`);
        expect(readme).toContain(`Prettier-${packageJson.devDependencies.prettier.replace('^', '')}`);
    });
});
