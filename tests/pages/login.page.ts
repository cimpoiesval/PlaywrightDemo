import { Page, Locator } from '@playwright/test';
import { HomePage } from './home.page';

export class LoginPage {
    private readonly page: Page
    private readonly email: Locator
    private readonly password: Locator
    private readonly login: Locator

    constructor(page: Page) {
        this.page = page
        this.email = page.locator('id=1-email')
        this.password = page.locator('id=1-password')
        this.login = page.locator('id=1-submit')
    }

    async loginUser(email: string, password: string) {
        await this.page.goto("/")
        await this.email.fill(email)
        await this.password.fill(password)
        await this.login.click()
        await this.login.waitFor({ state: 'hidden' })
        return new HomePage(this.page)
    }

}