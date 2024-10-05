import { expect, Page, Locator } from '@playwright/test'
import { ExperimentLanguageGenerationPage } from './experimentLanguageGeneration.page'

export class ExperimentSetupPage {
    private readonly page: Page
    private readonly emailType: Locator
    private readonly projectDropDown: Locator
    private readonly optionsList: Locator
    private readonly controlSubjectLine: Locator
    private readonly primaryGoalDropDown: Locator
    private readonly primaryGoalSize: Locator
    private readonly primaryGoalRate: Locator
    private readonly nrOfSplits: Locator
    private readonly nextButton: Locator

    constructor(page: Page) {
        this.page = page
        this.emailType = page.getByText('Email')
        this.projectDropDown = page.locator('.css-1ukmwxr-indicatorContainer')
        this.optionsList = page.getByRole('option')
        this.controlSubjectLine = page.getByPlaceholder('Enter your control')
        this.primaryGoalDropDown = page.locator('[data-test="selection_metric"]').getByRole('combobox')
        this.primaryGoalSize = page.locator('#campaign_setup_list_size')
        this.primaryGoalRate = page.locator('#campaign_setup_baseline_open_rate')
        this.nrOfSplits = page.locator('#react-select-3-live-region')
        this.nextButton = page.getByRole('button', { name: 'Next' })
    }

    async selectEmailExperimentType() {
        await this.emailType.click()
    }

    async selectProject(projectName: string) {
        await this.projectDropDown.click();
        await this.optionsList.filter({ hasText: projectName }).click();
    }

    async fillControlSubjectLine(control: string) {
        await this.controlSubjectLine.fill(control)

    }

    async fillPrimaryGoal(primaryGoal: string, size: number, rate: number) {
        await this.primaryGoalDropDown.click();
        await this.optionsList.filter({ hasText: primaryGoal }).click()
        await this.primaryGoalSize.fill(String(size))
        await this.primaryGoalRate.fill(String(rate))
        await this.nrOfSplits.waitFor()
    }

    async checkNextButtonEnabled(state: boolean) {
        if (state === true) {
            await expect(this.nextButton).toBeEnabled()
        }
        else {
            await expect(this.nextButton).toBeDisabled()
        }
    }

    async goNext() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.nextButton.click()
        await this.nextButton.waitFor({ state: 'hidden', timeout: 30000 })
        return new ExperimentLanguageGenerationPage(this.page)
    }
}