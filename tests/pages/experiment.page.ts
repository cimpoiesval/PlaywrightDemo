import { expect, Page, Locator } from '@playwright/test'
import { ExperimentSetupPage } from './experimentSetup.page'

export class ExperimentPage {
    private readonly page: Page
    private readonly experimentName: Locator

    constructor(page: Page) {
        this.page = page
        this.experimentName = page.getByPlaceholder('Enter an experiment name…')
    }

    async fillExperimentName(name: string) {
        await this.experimentName.fill(name)
        await this.experimentName.press('Enter')
        return new ExperimentSetupPage(this.page)
    }

    async checkErrorMessage(error: string) {
        await expect(this.page.getByText(error)).toBeVisible()
    }
}