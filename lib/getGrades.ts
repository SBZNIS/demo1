import puppeteer from 'puppeteer';
import testLogin from './testLogin';

export async function getGrades(): Promise<{ name: string, currentGrades: string }[]> {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://school.bilimal.kz', {
        waitUntil: 'networkidle2',
        timeout: 60000 // Увеличиваем тайм-аут до 60 секунд
    });

    await testLogin(process.env.LOGIN!, process.env.PASS!, page);

    const loginSuccess = await page.evaluate(() => {
        return document.querySelector('.main-header-user-title.mr-3') !== null;
    });

    if (!loginSuccess) {
        console.error('Login failed or took too long');
        await browser.close();
        throw new Error('Login failed');
    }

    // Перейдите на страницу с оценками и убедитесь, что она полностью загружена
    try {
        await page.goto('https://school.bilimal.kz/cabinet_teacher/advisement/performance', {
            waitUntil: 'networkidle2',
            timeout: 60000 // Увеличиваем тайм-аут до 60 секунд
        });
        await page.waitForSelector('table.items', { timeout: 60000 }); // Убедитесь, что таблица загрузилась
    } catch (error) {
        console.error('Failed to navigate:', error);
        await browser.close();
        throw error;
    }

    // Сбор данных из таблицы
    const grades = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('table.items tbody tr'));
        return rows.map(row => {
            const columns = row.querySelectorAll('td');
            const name = columns[1].innerText; // ФИО учащегося
            const currentGrades = columns[6].innerText; // Текущие оценки
            return {
                name: name,
                currentGrades: currentGrades,
            };
        });
    });

    await browser.close();

    return grades;
}

export default getGrades;
