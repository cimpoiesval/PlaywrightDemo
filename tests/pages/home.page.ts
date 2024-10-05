import { expect, Page, Locator } from '@playwright/test'
import { ExperimentPage } from './experiment.page'
import { ExperimentLanguageGenerationPage } from './experimentLanguageGeneration.page'

export class HomePage {
    private readonly page: Page
    private readonly userAvatar: Locator
    private readonly createButton: Locator
    private readonly experimentMenuItem: Locator
    private readonly recentExperiments: Locator
    private readonly myExperiment: Locator

    constructor(page: Page) {
        this.page = page
        this.userAvatar = page.getByTestId('user-avatar')
        this.createButton = page.getByRole('button', { name: 'Create', exact: true })
        this.experimentMenuItem = page.getByRole('menuitem', { name: 'experiment' })
        this.recentExperiments = page.getByText('Recent experiments')
        this.myExperiment = page.getByRole('button', { name: 'My experiment' }).first()
    }
    async visit() {
        await this.page.goto('/')
        await this.userAvatar.waitFor()
    }
    async checkPageIsOpened() {
        await expect(this.userAvatar).toBeVisible()
    }

    async createExperiment() {
        await this.createButton.click()
        await this.experimentMenuItem.click()
        return new ExperimentPage(this.page)
    }

    async isExperimentCreated(): Promise<boolean> {
        await this.page.waitForLoadState('domcontentloaded')
        await this.recentExperiments.waitFor()
        return await this.myExperiment.isVisible()
    }

    async openRecentExperiment() {
        await this.myExperiment.click()
        return new ExperimentLanguageGenerationPage(this.page)
    }
}