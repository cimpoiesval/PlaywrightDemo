import { test as setup } from '@playwright/test';
import { storageStateFile } from '../playwright.config';
import { LoginPage } from './pages/login.page'

setup('Authenticate', async ({ page }) => {
    const email = String(process.env.EMAIL)
    const password = String(process.env.PASSWORD)

    const loginPage = new LoginPage(page)
    const homePage = await loginPage.loginUser(email, password)
    await homePage.checkPageIsOpened()

    //save storage state
    await page.context().storageState({ path: storageStateFile })
})