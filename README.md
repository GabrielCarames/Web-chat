# Parches chat

Webchat
=============

> Aplicación web sobre un chat en tiempo real con Socket.io

<br />

## Imágenes

<br />

![Alt Text](https://media.giphy.com/media/c8St5Snp2NBFeMbKof/giphy.gif)

<br />

## Tecnologías

<br />

[![Handlebars](https://img.shields.io/badge/-handlebars-blue?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAACc0lEQVR4nO3XS2hVVxTG8V9SJIVOqkKQ0toYBamTYq2UaumwWHVioA4Mgp05sBOLY4kjrR239GU7bmdSLHRgdZSISjtwoIagjoQQfCTRxkfSDva%2BcHI8N7nJPRcCrj8suOy917e%2Fde45%2B0EQBEEQBEEQBEEQBEEQBEEQBC8LXTXrbcYneB%2BbsC63j2MEv2J4EY0d2I8P0Jvb7mIMl%2FEnbtbquk26MSiZ%2B6%2BF%2BAvvVOhswYUWNS7hgJr%2FwDdwAr%2FhG%2BxsIWdTNtOK6WJM4dOCzl5ML0NnBBtb8PkRvs21DeVa57ETExUTHF9AdA%2FuL8N0Ix7jwzz3v23o3MPuBXwOVeRM5LnB25hcQLyKz%2FG8DdONGMvRrs5zHGri9UGTnIdYD1%2BXOm5iH27gWoXgYczWYLrumM3eylzLtQzk2oo5p1U0Hs2JX0iLW5EvMbcCim0WcwX%2FDQZxJP8%2BVhp%2FHWZKjd%2Fnwa8VRLrw1QoosNU4Zf4O0ajlx9K4x6Rvodj4BNsKyevxRwdMTuF2jqkO6J%2FL3htsx9PSmAek76OcPI0z%2BLlmc8M4iDe9yFu5b7jG%2BSZzHWfwqKL%2FBvzSgadfjBnpBLijouhmvIfvLO9ssJT4CT7rkPiotCCtXkLhZVZnjdEOeRyAV3C1JsFZnMUu6YhcF91Z86z6tuAruXbQjzttiI3jJPpqLLoZfXmu8Tb83sKGsvBaaZsor5TNYg7npUtJT%2F11LkpPnvu81s8mT%2FED1jREqm5TvdLlZKt02enDKmnLmME%2F0utzUXqSK4F%2BfCxtde%2FiVbyOZ5LHMfyN36U3JwiCIAiCIAiCIAiCIAiCIAiCl5D%2FAfRgc8CWIgbMAAAAAElFTkSuQmCC&style=for-the-badge)](https://handlebarsjs.com/)
[![Express](https://img.shields.io/badge/-express-black?style=for-the-badge&logo=express)](https://expressjs.com/es/)
[![Javascript](https://img.shields.io/badge/-Javascript-critical?style=for-the-badge&logo=Javascript)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/-Bootstrap-white?style=for-the-badge&logo=Bootstrap)](https://getbootstrap.com/)
[![Html](https://img.shields.io/badge/-html-black?style=for-the-badge&logo=html5)](https://developer.mozilla.org/es/docs/Web/HTML)
[![Jquery](https://img.shields.io/badge/-Jquery-violet?style=for-the-badge&logo=Jquery)](https://jquery.com/)
[![Mongodb](https://img.shields.io/badge/-Mongodb-lightblue?style=for-the-badge&logo=Mongodb)](https://www.mongodb.com/es)
[![Node](https://img.shields.io/badge/-Node-black?style=for-the-badge&logo=Node.js)](https://nodejs.org/es/)
[![Passport](https://img.shields.io/badge/-Passport-black?style=for-the-badge&logo=passport)](http://www.passportjs.org/)
[![Socket](https://img.shields.io/badge/-Socket-black?style=for-the-badge&logo=Socket.io)](https://socket.io/)

<br />

## Funcionalidades

<br />

> Registro/ingreso

* Cuenta con secciones de registro de cuenta e ingreso. Ambas estan compuestas por un formulario, cuyos datos son verificados y almacenados en una BD en MongoDB. La autenticación e ingreso a una cuenta registrada, es administrada a través de Passport.js.

> Index

* Posee una página de inicio en donde se pueden visualizar los datos de la cuenta propia, grupos pertenecientes y amigos conectados.

> Agregar amigos

* Tiene un sistema de búsqueda de personas, a las cuales se les puede enviar una solicitud de amistad. 

> Notificaciones

* Cada usuario cuenta con una pestaña de notificaciones, en donde se podrán ver las solicitudes de amistad, y aceptarlas o rechazarlas.

> Chats individuales

* Al momento de añadir a un amigo, se crea automaticamente un chat en donde se podran enviar y recibir mensajes en tiempo real a través de Socket.io.

> Chat grupales

* Se pueden crear chat grupales indicando nombre del grupo y sus integrantes. Este chat cuenta con sus respectivas características anteriores.

> Modo oscuro

* Dentro de la pestaña de configuración del chat, se podrá activar o desactivar el modo oscuro de la página.
