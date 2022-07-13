# cs-insights-frontend

<p align="center">
<a href="https://github.com/gipplab/NLP-Land-frontend/actions/workflows/release.yml"><img alt="Actions Status" src="https://github.com/gipplab/NLP-Land-frontend/actions/workflows/release.yml/badge.svg?branch=dev"></a>  
<a href="https://github.com/gipplab/NLP-Land-frontend/actions/workflows/main.yml"><img alt="Actions Status" src="https://github.com/gipplab/NLP-Land-frontend/actions/workflows/main.yml/badge.svg"></a>
<a href="https://github.com/gipplab/NLP-Land-frontend/releases"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/gipplab/NLP-Land-frontend?sort=semver"></a>
<a href="https://hub.docker.com/repository/docker/jpelhaw/nlp-land-frontend"><img alt="Docker Release" src="https://img.shields.io/docker/v/jpelhaw/nlp-land-frontend?label=Docker"></a>
<a href="https://github.com/gipplab/NLP-Land-frontend/blob/master/LICENSE"><img alt="License: MIT" src="https://black.readthedocs.io/en/stable/_static/license.svg"></a>
<a href="https://github.com/airbnb/javascript"><img alt="Code style: Airbnb" src="https://img.shields.io/badge/codestyle-Airbnb-success"></a>
</p>

## Getting Started
After cloning the repository you need to change the directory.
```shell
cd NLP-Land-frontend
```
Then we are providing two ways to set up this project.
In both cases, make sure the [backend](https://github.com/gipplab/NLP-Land-backend) is running after the setup, so you can properly use the app. 

<details> <summary> Production </summary>

First you need to create an `.env.production` file.
You can copy the `.env.development` file, if you do not intent to change the default values:
```shell
cp .env.development .env.production
```

Then you need to install all dependencies with
```shell
npm install --production
```
and build the project using
```shell
npm run build
```
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

Lastly, deploy the project (see [here](https://create-react-app.dev/docs/deployment/) for alternatives) with
```shell
npm install -g serve
serve -s build -l 3001
```
and visit it in your browser on [http://localhost:3001](http://localhost:3001).
</details>
<details> <summary> Development </summary>

First, you need to install all dependencies using
```shell
npm install
```

Then you can run the app in development mode with
```shell
npm start
```
and visit it in your browser on [http://localhost:3001](http://localhost:3001).
The page will reload if you make edits, and you will see any lint errors in the console.
</details>


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


## Branches, tags, and deploys.
Whenever a new issue is opened, it should be labeled whether it is a Patch, Minor, or Major upgrade. Please see the label descriptions for more info.
To work on that issue, a branch should be created with the leading issue number like "1-user-view".
We recommend using [GitHub's built-in system](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-a-branch-for-an-issue) for this.

When finalizing a branch, use:
```sh
npm version <label: {patch, minor, or major}>
```
and push your code. Then create a pull request, include "Fixes #{issue_number}" in the title and resolve any merge conflicts. When all tests are done, another contributor can review and merge the request.
After the merge is complete, please delete the branch on the bottom of the pull request.


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
