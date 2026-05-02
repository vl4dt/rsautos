# RS Autos HN Website Management Guide

This guide explains how the RS Autos HN website works and how to manage it with confidence. It is written for the business owner, manager, or team member responsible for keeping the website and vehicle inventory updated.

## 1. What This System Does

The RS Autos HN website is a public sales and trust platform for imported vehicles in Honduras.

Its main job is to help customers:

- See available vehicles.
- Understand each vehicle's condition.
- Contact RS Autos HN quickly through WhatsApp.
- Trust the business because information is organized, transparent, and professional.

The system has three main parts:

- **Website**: The public site customers visit.
- **Sanity**: The content management system where the team manages vehicles and website content.
- **Vercel**: The hosting service that publishes the website online.

Think of it like this:

```text
Sanity = where you edit vehicle information
Website = what customers see
Vercel = what keeps the website live on the internet
```

## 2. Important Website Links

Local development website:

```text
http://localhost:3000
```

Local Sanity Studio:

```text
http://localhost:3000/studio
```

Production website:

```text
https://rsautos.vercel.app
```

Production Sanity Studio:

```text
https://rsautos.vercel.app/studio
```

The production Studio is where the business team will normally log in to manage content.

## 3. Main Roles

### Business Owner or Manager

Responsible for:

- Reviewing vehicle listings before publishing.
- Making sure prices and vehicle details are correct.
- Deciding what vehicles should be public.
- Checking customer experience and WhatsApp messages.

### Content Manager or Sales Assistant

Responsible for:

- Adding vehicle information into Sanity.
- Uploading vehicle photos.
- Updating vehicle status.
- Correcting typos or missing details.
- Unpublishing sold vehicles.

### Developer or Technical Support

Responsible for:

- Changing website layout or features.
- Fixing technical errors.
- Updating integrations.
- Managing deployment settings in Vercel.
- Adjusting Sanity schemas if new fields are needed.

## 4. How the Website Works

Customers visit the website and see pages such as:

- **Home page**: Introduces RS Autos HN and the transparency promise.
- **Inventory page**: Shows available vehicles with filters.
- **Vehicle detail pages**: Planned next phase. These will show full transparency details for each car.
- **Sanity Studio**: Private management area for the business team.

The inventory page gets vehicle data from Sanity. When a vehicle is added and published in Sanity, it can appear on the website.

## 5. How Sanity Works

Sanity is the backend system. It is where vehicle information is stored.

In Sanity, each vehicle is a document called:

```text
Car Listing
```

Each Car Listing contains details such as:

- Public title.
- Vehicle make.
- Vehicle model.
- Year.
- VIN.
- Public price.
- Mileage.
- Import status.
- Transmission.
- Drivetrain.
- Fuel type.
- Auction condition.
- Current local condition.
- Images.
- Inspection notes.
- Repair logs.

Sanity is not the public website. It is the private control panel that feeds the website.

## 6. How to Log In to Sanity Studio

Open:

```text
https://rsautos.vercel.app/studio
```

Then sign in using the Sanity account that has permission to manage the project.

If Sanity asks you to register the Studio again, check:

- The domain `https://rsautos.vercel.app` is added in Sanity CORS settings.
- **Allow credentials** is enabled for that domain.
- Vercel has the correct Sanity project environment variables.
- The latest code has been redeployed to Vercel.

## 7. Managing Vehicle Listings

### Creating a New Vehicle

In Sanity Studio:

1. Open **Car Listing**.
2. Click **Create new**.
3. Fill in the vehicle information.
4. Upload images.
5. Review all information carefully.
6. Set **Show on public website** to enabled only when ready.
7. Publish the document.

The vehicle should then become available to the website.

### Required Vehicle Information

At minimum, each public vehicle should have:

- Title.
- Make.
- Model.
- Year.
- Public price.
- Mileage.
- Import status.
- Published date.
- Slug.
- At least one good photo.

The **slug** is the website-friendly address for the vehicle. Example:

```text
toyota-rav4-2021
```

Use short, clear slugs with lowercase letters and hyphens.

### Recommended Vehicle Title Format

Use a clear format:

```text
2021 Toyota RAV4 XLE
```

Good examples:

```text
2020 Honda CR-V EX
2022 Toyota Corolla LE
2019 Ford Ranger XLT
```

Avoid vague titles like:

```text
Nice SUV
Carro rojo
Oferta especial
```

## 8. Vehicle Import Status

Each vehicle has an import status. This helps customers understand where the vehicle is in the process.

Available statuses:

```text
auctionWon
inTransit
customsClearance
atWorkshop
readyForSale
```

Plain-language meaning:

| Status | Meaning |
|---|---|
| auctionWon | The vehicle was bought at auction in the USA. |
| inTransit | The vehicle is on the way to Honduras. |
| customsClearance | The vehicle is going through customs. |
| atWorkshop | The vehicle is being inspected or repaired. |
| readyForSale | The vehicle is ready for a buyer. |

Use the status honestly. This is part of the transparency promise.

## 9. Public vs Internal Information

Some information is public. Some information is internal only.

### Public Information

This can be shown to customers:

- Make.
- Model.
- Year.
- Public price.
- Mileage.
- VIN, if the business wants to show it.
- Vehicle photos.
- Condition summary.
- Import status.
- Inspection details.
- Repair logs.

### Internal Information

This should not be shown to customers:

- USA auction purchase price.
- Internal price breakdown.
- Profit margin.
- Internal repair cost strategy.
- Private notes about negotiation.

The system is designed so fields like these are not included in public inventory queries:

```text
usaAuctionPrice
priceBreakdown
```

Still, only trusted managers should edit sensitive internal fields.

## 10. Image Guidelines

Images are very important for trust.

Use:

- Clear exterior photos.
- Clear interior photos.
- Dashboard photo.
- Mileage photo.
- VIN plate photo, if appropriate.
- Damage photos from auction, if available.
- Repair progress photos.
- Final condition photos.

Avoid:

- Blurry images.
- Dark photos where damage cannot be seen.
- Cropped images that hide important parts.
- Overedited images.
- Using only beauty shots without showing condition.

Recommended image order:

1. Best current exterior photo.
2. Front angle.
3. Rear angle.
4. Interior.
5. Dashboard and mileage.
6. Engine bay.
7. Auction or damage photos.
8. Repair progress photos.

## 11. Transparency Toggle Concept

The planned key feature is the **Transparency Toggle**.

This will let a customer switch between:

- **USA Auction / As-Is**: How the vehicle looked when bought.
- **Current Local State**: How the vehicle looks now after inspection or repair.

The purpose is to prove that RS Autos HN is not hiding the vehicle history.

To prepare for this feature, keep both types of information in Sanity:

- Auction photos and condition notes.
- Current photos and condition notes.
- Repair logs.
- Inspection checklist.

## 12. WhatsApp Lead Flow

WhatsApp is the main sales channel.

The website creates WhatsApp links with pre-filled messages. When a customer clicks WhatsApp on a vehicle, the message can include:

- Vehicle title.
- VIN, if available.
- Vehicle status.
- Website link.

Example message:

```text
Hola RS Autos HN, quiero mas informacion sobre 2021 Toyota RAV4 VIN XXXXX. Estado actual: Listo para venta. Enlace: https://rsautos.vercel.app/inventory/toyota-rav4-2021
```

The phone number comes from the website environment settings, not from hardcoded page text.

Current phone variable:

```text
NEXT_PUBLIC_CONTACT_PHONE
```

If the WhatsApp number changes, update it in Vercel environment variables and redeploy.

## 13. Vercel Explained

Vercel hosts the website online.

When code is pushed to the connected GitHub repository, Vercel can automatically build and publish the new version.

Vercel controls:

- Production website deployment.
- Website environment variables.
- Build logs.
- Domain settings.
- Preview deployments.

The business team normally does not need to edit Vercel unless changing business configuration such as:

- Website URL.
- Sanity project ID.
- WhatsApp number.
- Business name.
- Business location.

## 14. Important Vercel Environment Variables

These settings should exist in Vercel:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-01
NEXT_PUBLIC_SITE_URL=https://rsautos.vercel.app
NEXT_PUBLIC_BUSINESS_NAME=RS Autos HN
NEXT_PUBLIC_PRIMARY_MARKET=Honduras
NEXT_PUBLIC_CONTACT_PHONE=50489057397
NEXT_PUBLIC_BUSINESS_LOCATION=Santa Rosa de Copan, Copan
```

If these are wrong, the website may:

- Not connect to Sanity.
- Show empty inventory.
- Send WhatsApp messages to the wrong number.
- Use the wrong website link in messages.
- Show incorrect business information.

After changing Vercel environment variables, redeploy the website.

## 15. Sanity CORS Settings

For the production Studio to work, Sanity must trust the website domain.

In Sanity Manage:

1. Open the Sanity project.
2. Go to **Settings**.
3. Go to **API**.
4. Find **CORS Origins**.
5. Add:

```text
https://rsautos.vercel.app
```

6. Enable:

```text
Allow credentials
```

This is required because Studio needs to make authenticated requests to Sanity.

Do not add the `/studio` path in CORS. Use only the origin:

```text
Correct:   https://rsautos.vercel.app
Incorrect: https://rsautos.vercel.app/studio
```

## 16. Publishing Workflow

Use this checklist for every vehicle.

### Before Publishing

- Confirm vehicle title is correct.
- Confirm make, model, year, and VIN.
- Confirm mileage.
- Confirm public price.
- Confirm import status.
- Upload clear images.
- Add auction condition if available.
- Add current condition if available.
- Add inspection details.
- Check that sensitive internal cost fields are not written into public text fields.

### Publishing

1. Set **Show on public website** to enabled.
2. Click **Publish**.
3. Open the website inventory page.
4. Confirm the vehicle appears.
5. Test the WhatsApp button.

### After Vehicle Is Sold

Recommended options:

- Turn off **Show on public website** to remove it from active inventory.
- Or later add a **Sold** status if the website is updated to support sold inventory.

For now, the cleanest approach is to unpublish or hide sold vehicles.

## 17. Troubleshooting

### Vehicle Does Not Appear on Website

Check:

- Is the vehicle published in Sanity?
- Is **Show on public website** enabled?
- Does it have a slug?
- Is it using the `Car Listing` document type?
- Is the website connected to the correct Sanity dataset?
- Has the website cache refreshed?

The website uses a one-hour refresh window for Sanity pages. Some updates may not appear instantly in production.

### Studio Keeps Asking to Register

Check:

- Sanity CORS includes `https://rsautos.vercel.app`.
- **Allow credentials** is enabled.
- Vercel has the correct `NEXT_PUBLIC_SANITY_PROJECT_ID`.
- You are logged into the correct Sanity account.
- The project was redeployed after changing environment variables.

### Inventory Is Empty

Check:

- Sanity has published `Car Listing` documents.
- The documents have **Show on public website** enabled.
- The website is connected to the `production` dataset.
- Filters are not hiding all vehicles.

### WhatsApp Button Opens Wrong Message or Number

Check Vercel:

```text
NEXT_PUBLIC_CONTACT_PHONE
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_BUSINESS_NAME
```

Then redeploy.

### Website Shows Old Information

Possible reasons:

- The production website has cache.
- The Sanity document was saved but not published.
- Vercel was not redeployed after environment variable changes.
- The browser needs a hard refresh.

## 18. Daily or Weekly Management Routine

Recommended weekly checklist:

- Review all public vehicles.
- Remove vehicles that are sold or no longer available.
- Confirm prices are current.
- Confirm import statuses are current.
- Check that WhatsApp buttons work.
- Add new photos when a vehicle moves from auction state to workshop or ready-for-sale state.
- Review customer questions and improve listing details if the same question is asked often.

Recommended daily checklist when actively selling:

- Check new WhatsApp leads.
- Update status changes.
- Publish new arrivals.
- Hide sold vehicles.
- Review the public inventory page on mobile.

## 19. Content Standards

Write clearly and honestly.

Good content:

```text
Unidad importada desde subasta en USA. Golpe frontal reparado. Motor y transmision verificados. Lista para inspeccion del cliente.
```

Weak content:

```text
Super nitida, full extras, aproveche.
```

The brand promise is transparency, so descriptions should answer customer questions before they ask.

Recommended tone:

- Professional.
- Direct.
- Honest.
- Helpful.
- Confident without exaggeration.

## 20. Security Rules

Only trusted users should have access to Sanity.

Recommended rules:

- Do not share Sanity login credentials.
- Use individual accounts for each team member.
- Remove access when someone leaves the business.
- Do not publish internal pricing in public text fields.
- Do not store passwords or private customer data inside vehicle listings.
- Do not give Vercel access to non-technical users unless necessary.

## 21. Who to Contact for Each Problem

| Problem | Contact |
|---|---|
| Vehicle info needs correction | Content manager or sales assistant |
| Vehicle does not appear | Content manager first, developer if still unresolved |
| Website is down | Developer or technical support |
| Studio login issue | Sanity admin or developer |
| WhatsApp number is wrong | Developer or Vercel admin |
| Need a new website feature | Developer |
| Need to add new vehicle fields | Developer |

## 22. Glossary

### Sanity

The private content management system where the team edits vehicles and content.

### Studio

The Sanity editing interface. This is the page at `/studio`.

### Vercel

The hosting service that publishes the website online.

### Dataset

The Sanity database where content is stored. The main live dataset is usually:

```text
production
```

### Document

A content item inside Sanity. A vehicle listing is one document.

### Slug

The URL-friendly name for a page.

Example:

```text
toyota-rav4-2021
```

### Publish

Making a Sanity document live so the website can use it.

### CORS

A security setting that allows the website domain to communicate with Sanity.

### Environment Variable

A private or configurable setting used by the website, such as the Sanity project ID or WhatsApp number.

## 23. Quick Reference

### Add a Vehicle

```text
Studio -> Car Listing -> Create new -> Fill fields -> Upload photos -> Enable public -> Publish
```

### Hide a Vehicle

```text
Studio -> Car Listing -> Open vehicle -> Disable public visibility -> Publish
```

### Fix Studio Login/Register Issue

```text
Sanity Manage -> Settings -> API -> CORS Origins -> Add https://rsautos.vercel.app -> Allow credentials
```

### Change WhatsApp Number

```text
Vercel -> Project Settings -> Environment Variables -> NEXT_PUBLIC_CONTACT_PHONE -> Redeploy
```

### Change Business Location

```text
Vercel -> Project Settings -> Environment Variables -> NEXT_PUBLIC_BUSINESS_LOCATION -> Redeploy
```

## 24. Current Website Status

Current completed foundation:

- Website scaffold is built.
- Sanity Studio is embedded at `/studio`.
- Vehicle schema exists in Sanity code.
- Inventory page exists.
- Inventory filters exist.
- WhatsApp CTAs exist.
- Public queries avoid internal pricing fields.

Planned next features:

- Vehicle detail pages.
- Transparency Toggle.
- Inspection dashboard.
- Repair log display.
- Technical condition report download.
- VIN decoder integration.
- Honduran import tax estimate.

