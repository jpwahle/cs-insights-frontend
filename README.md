<br/>
<div align="center">
  <a href="https://cs-insights.uni-goettingen.de">
    <img src="images/logo.png" alt="Logo" width="500">
  </a>
</div>
<br/>
<p align="center">
  <a href="https://github.com/jpwahle/cs-insights-frontend/actions/workflows/release.yml"><img alt="Actions Status" src="https://github.com/jpwahle/cs-insights-frontend/actions/workflows/release.yml/badge.svg?branch=dev"></a>  
  <a href="https://github.com/jpwahle/cs-insights-frontend/actions/workflows/main.yml"><img alt="Actions Status" src="https://github.com/jpwahle/cs-insights-frontend/actions/workflows/main.yml/badge.svg"></a>
  <a href="https://github.com/jpwahle/cs-insights-frontend/releases"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/jpwahle/cs-insights-frontend?sort=semver"></a>
  <a href="https://github.com/jpwahle/cs-insights-frontend/blob/master/LICENSE"><img alt="License: MIT" src="https://black.readthedocs.io/en/stable/_static/license.svg"></a>
  <a href="https://github.com/airbnb/javascript"><img alt="Code style: Airbnb" src="https://img.shields.io/badge/codestyle-Airbnb-success"></a>
  <a href="https://jpwahle.github.io/cs-insights-uptime/"><img alt="All-time uptime 100.00%" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjpwahle%2Fcs-insights-uptime%2FHEAD%2Fapi%2Ffrontend%2Fuptime.json"></a>
  <a href="https://jpwahle.github.io/cs-insights-uptime/"><img alt="Response time 773" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjpwahle%2Fcs-insights-uptime%2FHEAD%2Fapi%2Ffrontend%2Fresponse-time.json"></a>
  <br/>
  <br/>
</p>

## Demo
<div align="center">
  <a href="http://cs-insights.uni-goettingen.de/">
      <img src="images/showcase.png" alt="Logo">
  </a>
  <br/>
  <br/>
  <a href="http://cs-insights.uni-goettingen.de/">View Demo</a>
  <br/>
  <br/>
  Demo Credentials <br/>
  user: demo@cs-insights.com <br/>
  password: demo
</div>

## Getting Started

This project is part of the `cs-insights`-ecosystem. Please refer to the readme [here](https://github.com/jpwahle/cs-insights) to spin up the development and production system.


## Repository
### Structure
In the `src` folder we have the following structure:
- /components: All UI components
  - /charts: UI components that visualize data
- /context: All context used for global state
- /routes: All routes of this app
  - /dashboards: Routes that visualize data
- Other files

### Packages
The following is a list of some notable packages we use:
- [ApexCharts](https://apexcharts.com/react-chart-demos/): Charts
- [Material UI (MUI)](https://mui.com/): UI components (except charts)
  - [Emotion](https://emotion.sh/docs/introduction): Styling in MUI
- [React Query](https://react-query.tanstack.com/): Data synchronization for network calls
- [React Router](https://reactrouter.com/): Routing

## Contributing
Fork the repo, make changes and send a PR. We'll review it together!

Commit messages should follow [Angular's conventions](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).

## License
This project is licensed under the terms of MIT license. For more information, please see the [LICENSE](LICENSE) file.

## Citation
If you use this repository, or use our tool for analysis, please cite our work:
```
@inproceedings{Wahle2022c,
  title        = {D3: A Massive Dataset of Scholarly Metadata for Analyzing the State of Computer Science Research},
  author       = {Wahle, Jan Philip and Ruas, Terry and Mohammad, Saif M. and Gipp, Bela},
  year         = {2022},
  month        = {July},
  booktitle    = {Proceedings of The 13th Language Resources and Evaluation Conference},
  publisher    = {European Language Resources Association},
  address      = {Marseille, France},
  doi          = {},
}
```
