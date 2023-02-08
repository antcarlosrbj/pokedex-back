<p align="center">
  <a href="https://github.com/antcarlosrbj/pokedex-back">
    <img src="https://www.freepnglogos.com/uploads/pokemon-symbol-logo-png-31.png" alt="Pokedex-logo" width="100" height="100">
  </a>

  <h3 align="center">
    Pokedex
  </h3>
</p>

## Usage

```
$ git clone https://github.com/antcarlosrbj/pokedex-back
$ cd pokedex-back
$ npm install
$ npm start
```

## API:

```
- POST /signup
    - Route to register new user
    - headers: {}
    - body: {
        "name": "Carlos",
        "email": "carlos@carlos.com",
        "password": "123",
        "confirmPassword": "123"
    }
```