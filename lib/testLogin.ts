import {Page} from 'puppeteer';

async function testLogin(username: string, password: string, page: Page): Promise<void> {
    if (typeof username !== 'string' || typeof password !== 'string') {
        throw new Error('Username and password must be strings');
    }

    console.log('Typing username and password...');
    await page.type('#LoginForm_login', username);
    await page.type('#LoginForm_password', password);
    await page.click('.btn.btn-primary.w-100');

    console.log('Waiting for navigation...');
    try {
        await page.waitForNavigation({
            waitUntil: 'networkidle2',
            timeout: 60000 // Увеличиваем тайм-аут до 60 секунд
        });
        // Ожидание загрузки элемента, который появляется после успешного логина
        await page.waitForSelector('.main-header-user-title.mr-3', { timeout: 60000 });
    } catch (error) {
        console.error('Navigation timeout:', error);
        throw error;
    }

    console.log('Taking screenshot...');
    await page.screenshot({ path: 'login_test.png' });

    console.log('Login test completed. Check login_test.png for the result.');
}

export default testLogin;
