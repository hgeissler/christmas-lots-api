### Setup

- download heroku cli  
  `heroku login`  
  `heroku create christmas-lots-api`

### Deploy

`git push heroku main`
`heroku ps:scale web=1`

### Open

`heroku open`

### Environment Vars

`heroku config:set TIMES=2`
