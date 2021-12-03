const puppeteer = require("puppeteer");
import cloudinary from "./cloudinary";

export const screenShoot = async (id: string) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // set params here before open headless browser
  await page.goto(`${process.env.APP_URLs}/live-preview/${id}`);

  await page.waitForSelector(`.ready-to-screen-${id}`, {
    visible: true,
    timeout: 200000,
  });

  const thumbnail = await page.screenshot({
    encoding: "binary",
  });
  await browser.close();

  return await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "thumbnails",
          allowed_formats: ["png"],
          public_id: `thumbnail-${id}`,
        },
        (error: any, result: any) => {
          if (error) {
            reject(error);
          }

          resolve(result);
        }
      )
      .end(thumbnail);
  });
};
