# Welcome

This is the official repository for the 2024 Open Booster.


In March 2023, water tables remain below normal, with 80% of levels between low and very low. Faced with the problems caused by our personal uses, how can we avoid using drinking water when rainwater would be perfectly suitable? What savings could I make by installing a water recovery system? With the global warning, will my installation still be suitable in 2, 5 or 10 years' time?

This project is designed to support the deployment of water recovery systems on all types of buildings. There's a wide range of products on the market, but how do you choose the right size of tank? And to which roof pitch should it be connected? The application will help you determine the right tank volume based on local rainfall forecasts and individual water usage, while providing an unbiased estimate of expected savings.


The benefits of this solution are manifold:
* **Optimization of water consumption**: By using rainwater for non-potable needs such as watering gardens, washing tools, or even toilets, users can reduce their dependence on drinking water, helping to preserve this precious resource.
* **Adaptability to changing weather conditions**: Thanks to climate and usage simulations, the tool can determine the right tank volume for each situation, guaranteeing efficient, sustainable use of rainwater, even in a changing climate.
* **Reduced pressure on drinking water networks**: By encouraging the use of rainwater for non-drinking needs, the tool helps to relieve the pressure on drinking water networks, reducing the risk of shortages and over-consumption.

By combining technological expertise, predictive analysis and a commitment to ecological resilience, the solution represents an innovative and effective response to the growing challenges of water management. By adopting this solution, private individuals and professionals can not only contribute to preserving the environment, but also make significant savings on their drinking water consumption, while ensuring responsible use of natural resources.


## Data Story and Architecture

![Architecture diagram](project_architecture.png)

The application integrates multiple datasets to deliver precise water management insights:

- **calculating roof surface area**
Using the [BAN API](https://www.data.gouv.fr/fr/dataservices/api-adresse-base-adresse-nationale-ban/) we convert addresses into precise latitude and longitude coordinates, enabling us to center satellite imagery on the desired building and accurately measure its roof area.
- **estimating daily rainfall for specific locations:**
We use local precipitation data supplied by [Météo France](https://meteo.data.gouv.fr/). These are provided on an 8 km x 8 km grid.
- **estimating monthly water usage:**
Water consumption calculations are based on national statistics provided by the Water Information Center, ensuring an accurate reflection of typical usage patterns.
- **calculate water pricing:**
By referencing data from the [National Observatory of Water and Sanitation Utilities](https://www.services.eaufrance.fr/), we estimate water tariffs in France. This allows us to calculate potential financial savings from implementing water recovery systems

## Installation

**Setup**
Install nvm: https://github.com/nvm-sh/nvm#installing-and-updating
run `nvm install`.

**Installing dependencies**

```bash
nvm use
npm ci
```

### Development server

Starts the dev server at `http://localhost:3000`:

```bash
npm run dev
```

### Production build

Builds the application for production deployment:

```bash
npm run build
```

You can preview the build locally:

```bash
npm run preview
```

### Environment variables
The `.env` file can be used to store parameters or settings that may change across different instances.

> /!\ DON’T COMMIT SECRETS (API keys, passwords…) THERE!!

To help you setup, another file, `.env.example` is provided.

## Contributing

You want to help to build and improve this project? Here is what you can do:
- Talk about it: share this project to make it more visible
- Report bugs you find via the issue tracker. Feel confident enough to correct it? PRs are welcome!
- Want to add missing functionality? Open an issue!
- Want to start developing? Look at the issues labeled "good first issue".

## Looking Forward

Here's a summary of how this project can be extended to provide an even better experience for the community:
- Using climate projection data. By going further and exploring the use of data from different climate change scenarios, we hope to raise awareness among service users of the challenges of saving on their water consumption and encourage changes in behavior.
- Expand information on the uses that rainwater could cover. Enable users to record their simulated water consumption to derive more precise estimates of how much water the user needs to collect.
- Automatically detect the roof of one or more buildings based on an address.
- Take into account the footprint required to install a water collector and validate the feasibility of such an installation.
- Monitor changes in consumption after the addition of this device to their home, and compare with the average consumption of equivalent households in the same area.


## Adding other languages
As of 2025, the application is available in French and English. To add another locale,
- add the code, file and name in the `nuxt.config.ts`, in the object `i18n`
- add the translation file into `i18n/locales`, you can copy an existing one and translate the strings by hand (for now)

## Licence

This software is published under the [MIT License](./LICENCE.md).

