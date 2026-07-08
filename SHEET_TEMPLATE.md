# Google Sheet CMS – Column Reference

## Sheet Column Headers (Row 1 — exact spelling matters)

| Column       | What to put                                         | Example            |
|--------------|-----------------------------------------------------|--------------------|
| name         | Product name (as shown on website)                  | Black Forest       |
| alternate_name | Malayalam / alternate name (optional)               | Jilebi · ജലേബി    |
| type         | cake OR sweet                                       | cake               |
| category     | See categories below                                | chocolate          |
| tag          | Small badge label (optional, leave blank = no badge)| Bestseller         |
| image_key    | Key from the image map (see below)                  | blackforest        |
| price        | Numerical price, custom string, or 'Enquire'         | ₹140/kg            |
| available    | YES to show on site, NO to hide                     | YES                |

## Valid categories

### For cakes (type = cake)
- custom
- chocolate
- fruit
- special
- occasion

### For sweets (type = sweet)
- laddu
- pak
- milk
- fried

## Valid image_key values

| image_key      | Product                |
|----------------|------------------------|
| customized     | Customized Cake        |
| barbie         | Barbie Cake            |
| rainbow        | Rainbow Cake           |
| dream          | Dream Cake             |
| box            | Box Cake               |
| blackforest    | Black Forest           |
| chocolate      | Chocolate Cake         |
| truffle        | Choco Truffle          |
| choconut       | Choconut Cake          |
| kitkat         | KitKat Cake            |
| ferrero        | Ferrero Rocher         |
| blackmagic     | Black Magic Cake       |
| vancho         | Vancho Cake            |
| whiteforest    | White Forest           |
| redvelvet      | Red Velvet             |
| strawberry     | Strawberry Cake        |
| blueberry      | Blueberry Cake         |
| mango          | Mango Cake             |
| orange         | Orange Cake            |
| coconut        | Tender Coconut Cake    |
| biscoff        | Biscoff Cake           |
| cheese         | Cheese Cake            |
| nutty          | Nutty Bubble           |
| almond         | Almond Fudge           |
| pista          | Pista Fudge            |
| pistachio      | Pistachio Cake         |
| redbee         | Red Bee Cake           |
| honeyalmond    | Honey Almond           |
| marble         | Marble Cake            |
| ghee           | Ghee Cake              |
| honey          | Honey Cake             |
| plum           | Plum Cake              |
| tea            | Tea Cake               |
| carrot         | Carrot Cake            |
| butterscotch   | Butterscotch           |
| wedding        | Wedding Cake           |
| birthday       | Birthday Cake          |
| babyshower     | Baby Shower            |
| anniversary    | Anniversary Cake       |
| mini           | Mini Cakes             |
| cupcakes       | Cupcakes               |
| laddu          | Laddu                  |
| datesladdu     | Dates Laddu            |
| nutsroll       | Nuts Roll              |
| kajukatli      | Kaju Katli             |
| mysorepak      | Mysore Pak             |
| gheepak        | Ghee Pak               |
| carrotpak      | Carrot Pak             |
| milkgheepak    | Milk Ghee Pak          |
| halwa          | Halwa                  |
| gulabjamun     | Gulab Jamun            |
| rasgulla       | Rasgulla               |
| rasmalai       | Rasmalai               |
| milkkhova      | Milk Khova             |
| jalebi         | Jalebi                 |
| babyjalebi     | Baby Jalebi            |
| sweetboondi    | Sweet Boondi           |
| savories       | Savories               |

## How to publish the sheet (one-time setup)

1. Open the Google Sheet
2. File → Share → Publish to web
3. Under "Link" tab → select "Sheet1" and "Comma-separated values (.csv)"
4. Click Publish → copy the URL
5. Copy the Sheet ID from the URL (long string between /d/ and /edit)
   Example: https://docs.google.com/spreadsheets/d/[THIS_PART_IS_THE_ID]/edit
6. Paste that ID into index.html where it says: SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'
7. Commit & push → Netlify auto-deploys in 30 seconds
