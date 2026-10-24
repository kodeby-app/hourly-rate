# Hourly Rate Calculator

Find the hourly rate you need as a freelancer or small business. Free, no sign-up, and nothing leaves your device.

An example app made by the Kodeby team and listed on [kodeby.app](https://kodeby.app).

## What it does

- Start from the salary you want, before or after tax
- Add pension savings, business costs (per month or per year) and a safety margin
- Set your holidays, public holidays, sick days and how much of your time you can bill
- Get your minimum hourly rate, the price with VAT, a day rate and the sales you need per month
- See where the money goes in a year: take-home pay, tax, pension, costs and margin
- Test a rate you have in mind and see what it gives you per month
- Share your numbers with a link, or download a summary as PDF
- English and Norwegian

The result is an estimate to help you set a price. It is not tax or financial advice.

## How the rate is calculated

```
salary          = your salary before tax (or take-home ÷ (1 − tax rate))
needed per year = (salary + pension + business costs) × (1 + margin)
working days    = 260 − holiday weeks × 5 − public holidays − sick days
billable hours  = working days × hours per day × billable share
hourly rate     = needed per year ÷ billable hours, rounded up to an easy price
```

## Privacy

Everything is stored in your browser's local storage. There is no server, no account, no analytics and no cookies.
A shared link carries the numbers in the part after `#`, which browsers never send to a server.
The Content Security Policy in `vercel.json` blocks all network requests from the page (`connect-src 'none'`). Only kodeby.app may show the page in a frame, for the "Try it here" demo on its app page.

## Run locally

It is plain HTML, CSS and JavaScript with no build step:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Import the repository in Vercel with the default settings (Framework preset: Other, no build command).

## License

MIT
