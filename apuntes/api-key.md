## ¿Qué es una API Key?
son un método de autentificación útil para identificar quién está haciendo la solicitud a los endpoints de una API.
Es importante hacer la distinción entre autentificación y autorización
- **Autentificación**: ¿Quién eres?
- **Autorización**: Qué puedes hacer
Existen muchas maneras de autentificación. Una muy usada y preferida por su simpliciidad son las API keys, sobre todo en APIs de sólo lectura.
### ¿Cómo se crean estas llaves?
No existe ningún constraint para implementar esto. Cada sistema genera sus llaves a su manera. La más utilizada es un hash o número al azar. Otros sistemas crean un string combinando valores aleatorios junto con el hardware y la IP del cliente.
**Alternativas**
- Authorization: Basic
- Authorization: Bearer Token
- OAuth 2.0
- Access Key + Secret Key
   