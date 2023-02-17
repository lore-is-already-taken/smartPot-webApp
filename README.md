# Foobar

In order to execute this. you must have node and docker in your system

## Installation

go into the downloaded folder and install the node dependencies with npm

or simply copy and paste the code below.

```bash
cd server && npm install && cd .. && cd client && npm i && cd ..
```

that should have installed all the dependencies

## Usage

first you need to run docker for the database with

```bash
cd server && docker compose up -d
```

then run

```bash
npm run dev
```

in your **server/** and the **client/** folder to get your app up and running

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
