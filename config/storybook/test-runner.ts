import path from 'path';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { Page } from '@playwright/test';

export default {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postRender(page: Page) {
    const image = await page.screenshot({ fullPage: true });
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: path.resolve(__dirname, '..', '..', 'snapshot'),
      failureThreshold: 0.05,
      failureThresholdType: 'percent',
    });
  },
};
