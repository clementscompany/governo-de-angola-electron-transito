#sistema de gesrao de transito com electron JS
- instalacao:
```sh
npm install

```

- rodar o projeto:
```sh
  npm run start
```


configuracao do servidor:
no aruivo ``env.js`` coloque a url da api: ``API_URL``

API_LINK: <a href="https://github.com/clementscompany/api-sistema-transito.git">API_URL</a>



let sendData = await fetch(`${API_URL}/setpassword`, {
            method: "POST",
            headers: {
              "conttent-type": "application/json",
            },
            body: JSON.stringify({
              password: inputs[1].value,
              username: username,
            }),
          });
          if (sendData.ok) {
            let data = await sendData.json();
            if (data.check.sucess) {
              textError.innerHTML = data.check.sucess;
              setTimeout(() => {
                LoginPage();
              }, 3000);
            } else {
              textError.innerHTML = data.check.error;
            }
          } else {
            ErrorSchema("Erro inesperado! " + sendData.statusText, "error");
          }