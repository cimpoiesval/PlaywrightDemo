import { test } from '@playwright/test'
import { HomePage } from './pages/home.page'

const experimentName = 'My experiment'
const projectName = 'External automation project C'
const primaryGoal = 'Open rate'

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.visit()
});

test('Create experiment without name', async ({ page }) => {
    const homePage = new HomePage(page)
    const experimentPage = await homePage.createExperiment()
    await experimentPage.fillExperimentName('')
    await experimentPage.checkErrorMessage('Please enter experiment name')
});

test('Create experiment of type email without Control Subject Line ', async ({ page }) => {
    const homePage = new HomePage(page)
    const experimentPage = await homePage.createExperiment()
    const setup = await experimentPage.fillExperimentName(experimentName)
    await setup.selectEmailExperimentType()
    await setup.selectProject(projectName)
    await setup.fillPrimaryGoal(primaryGoal, 500000, 25)
    await setup.checkNextButtonEnabled(false)
});

test('Create experiment of type email without Primary Goal Data ', async ({ page }) => {
    const homePage = new HomePage(page)
    const experimentPage = await homePage.createExperiment()
    const setup = await experimentPage.fillExperimentName(experimentName)
    await setup.selectEmailExperimentType()
    await setup.selectProject(projectName)
    await setup.fillControlSubjectLine('some control subject')
    await setup.checkNextButtonEnabled(false)
});

test('Create experiment of type email with all mandatory data', async ({ page }) => {
    const homePage = new HomePage(page)
    const experimentPage = await homePage.createExperiment()
    const setup = await experimentPage.fillExperimentName(experimentName)
    await setup.selectEmailExperimentType()
    await setup.selectProject(projectName)
    await setup.fillControlSubjectLine('some control subject')
    await setup.fillPrimaryGoal(primaryGoal, 500000, 25)
    await setup.checkNextButtonEnabled(true)
    await setup.goNext()
});