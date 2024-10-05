import { expect, Page, Locator } from '@playwright/test'
import moment from 'moment'

export class ExperimentLanguageGenerationPage {
    private readonly page: Page
    private readonly languageGenerationTab: Locator
    private readonly date: Locator
    private readonly campaignType: Locator
    private readonly optionsList: Locator
    private readonly generateButton: Locator

    constructor(page: Page) {
        this.page = page
        this.languageGenerationTab = page.getByRole('menuitem', { name: 'Language Generation' })
        this.date = page.getByPlaceholder('Date')
        this.campaignType = page.getByText('Select an option')
        this.optionsList = page.getByRole('option')
        this.generateButton = page.getByRole('button', { name: 'Generate' })
    }

    async selectLanguageGenerationTab() {
        await this.languageGenerationTab.click();
    }

    async selectDate() {
        const formattedDate = moment(new Date()).format('DD MMM YYYY')
        await this.date.clear()
        await this.date.fill(formattedDate)
    }

    async selectCampaignType(campaingType: string) {
        await this.campaignType.click()
        await this.optionsList.filter({ hasText: campaingType }).click()
    }

    async clickGenerate() {
        await this.generateButton.click()
    }

    async checkErrorMessage(error: string) {
        await expect(this.page.getByText(error)).toBeVisible()
    }
}