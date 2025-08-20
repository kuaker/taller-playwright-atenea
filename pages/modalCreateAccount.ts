import { Page, Locator } from '@playwright/test';

export class ModalCreateAccount {
    readonly page: Page;
    readonly typeAccount: Locator;
    readonly mount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.typeAccount = page.getByTestId('tipo-cuenta');
        this.mount = page.getByTestId('monto');
    }
}