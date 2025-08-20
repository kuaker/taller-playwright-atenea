import { Locator, Page } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly accountMount: Locator;
    readonly addAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountMount = page.getByTestId('tarjeta-saldo-total');
        this.addAccountButton = page.getByTestId('agregar-tarjeta-agregar-cuenta');
    }

    async navigateToDashboard() {
        await this.page.goto('http://localhost:3000/dashboard');
    }

    clickOnAddAccountButton() {
        return this.addAccountButton.click();
    }

}