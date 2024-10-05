import { test } from '@playwright/test'
import { HomePage } from './pages/home.page'
import { ExperimentLanguageGenerationPage } from './pages/experimentLanguageGeneration.page'

const experimentName = 'My experiment'
const projectName = 'External automation project C'
const primaryGoal = 'Open rate'
const campaingType = 'Discount off Product'

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.visit()
    if (await homePage.isExperimentCreated()) {
        await homePage.openRecentExperiment()
    }
    else {
        const experimentPage = await homePage.createExperiment()
        const setup = await experimentPage.fillExperimentName(experimentName)
        await setup.selectEmailExperimentType()
        await setup.selectProject(projectName)
        await setup.fillControlSubjectLine('some control subject')
        await setup.fillPrimaryGoal(primaryGoal, 500000, 25)
        await setup.checkNextButtonEnabled(true)
        await setup.goNext()
    }

});

test('Generate language without mandatory data', async ({ page }) => {
    const languageGeneration = new ExperimentLanguageGenerationPage(page)
    await languageGeneration.selectLanguageGenerationTab()
    await languageGeneration.selectDate()
    await languageGeneration.selectCampaignType(campaingType)
    await languageGeneration.clickGenerate()
    await languageGeneration.checkErrorMessage('Please enter an answer.')
    await languageGeneration.checkErrorMessage('Please enter a value')
});