# 🍽️ MorfiBot — Generador de Recetas con IA

**Demo en producción:** [https://morfibot.netlify.app/](https://morfibot.netlify.app/)

Aplicación web fullstack donde ingresás los ingredientes que tenés en casa y un agente de inteligencia artificial (GPT-4o-mini) genera recetas argentinas completas al instante.

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Características principales](#características-principales)
- [Stack tecnológico](#stack-tecnológico)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [API Reference](#api-reference)
- [Modelos de datos](#modelos-de-datos)
- [Variables de entorno](#variables-de-entorno)
- [Instalación y ejecución local](#instalación-y-ejecución-local)
- [Testing](#testing)
- [Despliegue](#despliegue)

---

## Descripción

**MorfiBot** es una aplicación fullstack que combina autenticación de usuarios con generación de recetas mediante inteligencia artificial. El usuario puede registrarse, ingresar los ingredientes disponibles y recibir una receta detallada generada por GPT. Las recetas generadas se pueden guardar en su perfil y consultar en cualquier momento.

---

## Características principales

- 🤖 **Generación de recetas con IA** — usa GPT-4o-mini para crear recetas argentinas únicas a partir de los ingredientes proporcionados
- 🔐 **Autenticación completa** — registro, login y logout mediante JWT almacenados en cookies HTTP-only
- 💾 **Guardado de recetas** — cada receta generada puede guardarse en la cuenta del usuario
- 📋 **Dashboard personal** — listado de todas las recetas guardadas por el usuario
- 🔍 **Vista de receta individual** — detalle completo de cada receta (nombre, ingredientes, pasos, tiempo, dificultad)
- 🗑️ **Eliminación de recetas** — el usuario puede borrar recetas guardadas
- 🛡️ **Rutas protegidas** — el dashboard y las recetas solo son accesibles con sesión activa
- 📱 **Diseño responsive** — interfaz adaptada a escritorio y mobile con TailwindCSS

---

## Stack tecnológico

### Frontend
| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | Biblioteca de UI |
| Vite | 7 | Bundler y servidor de desarrollo |
| TailwindCSS | 4 | Estilos |
| React Router DOM | 7 | Enrutamiento |
| Axios | 1 | Peticiones HTTP |
| React Hook Form | 7 | Manejo de formularios |
| React Toastify | 11 | Notificaciones |
| SweetAlert2 | 11 | Alertas de confirmación |
| React Spinners | 0.17 | Loaders animados |

### Backend
| Tecnología | Versión | Uso |
|---|---|---|
| Node.js + Express | 5 | Servidor y API REST |
| MongoDB + Mongoose | 8 | Base de datos |
| OpenAI SDK | 6 | Integración con GPT-4o-mini |
| JWT (jsonwebtoken) | 9 | Autenticación stateless |
| bcrypt | 6 | Hash de contraseñas |
| cookie-parser | 1.4 | Manejo de cookies |
| dotenv | 17 | Variables de entorno |
| Jest + Supertest | 30 / 7 | Testing |
| mongodb-memory-server | 10 | Base de datos en memoria para tests |

---

## Arquitectura del proyecto

```
aplicacion-recetas-IA/
├── backend/
│   ├── index.js                  # Punto de entrada
│   ├── server.js                 # Inicialización del servidor
│   ├── app.js                    # Configuración de Express (CORS, middlewares, rutas)
│   ├── bd/
│   │   └── bd.js                 # Conexión a MongoDB
│   ├── controllers/
│   │   ├── user-controller.js    # Registro, login, dashboard, logout
│   │   ├── recipe-controller.js  # CRUD de recetas
│   │   └── agentAI-controller.js # Lógica de generación con OpenAI
│   ├── middlewares/
│   │   └── verify-token.js       # Verificación de JWT
│   ├── models/
│   │   ├── user-model.js         # Schema de usuario (Mongoose)
│   │   └── recipe-model.js       # Schema de receta (Mongoose)
│   ├── routes/
│   │   ├── user-routes.js        # /login, /register, /dashboard, /logout
│   │   └── recipe-routes.js      # /addRecipe, /allRecipes, /deleteRecipe, /recipeById
│   └── tests/
│       ├── setup.js
│       └── user.test.js
│
└── frontend/
    ├── src/
    │   ├── App.jsx               # Configuración de rutas
    │   ├── api/
    │   │   └── api.js            # Instancia de Axios con baseURL
    │   ├── context/
    │   │   ├── UserContext.jsx   # Estado global del usuario
    │   │   ├── RecipesContext.jsx# Estado global de recetas
    │   │   └── RecipeById.jsx    # Estado de receta individual
    │   ├── pages/
    │   │   ├── Home.jsx          # Landing page
    │   │   ├── Login.jsx         # Inicio de sesión
    │   │   ├── Register.jsx      # Registro de usuario
    │   │   ├── DashboardUser.jsx # Recetas guardadas del usuario
    │   │   ├── RecipeGenerated.jsx # Resultado de generación con IA
    │   │   └── Recipe.jsx        # Vista de receta individual
    │   └── components/
    │       ├── SecurityRoutes.jsx     # HOC de rutas protegidas
    │       ├── FormAddIngredients.jsx # Formulario para agregar ingredientes
    │       ├── FormSearchRecipe.jsx   # Formulario de búsqueda / generación
    │       ├── RecipeList.jsx         # Lista de recetas guardadas
    │       ├── HeaderSideDashboard.jsx
    │       ├── SideDashboard.jsx
    │       ├── Loader.jsx
    │       └── LoaderRecipes.jsx
```

---

## API Reference

### Usuarios

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| `POST` | `/register` | No | Registra un nuevo usuario |
| `POST` | `/login` | No | Inicia sesión y devuelve JWT en cookie |
| `GET` | `/dashboard` | JWT | Devuelve los datos del usuario autenticado |
| `POST` | `/logout` | JWT | Cierra la sesión y limpia la cookie |

### Recetas

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| `POST` | `/addRecipe` | JWT | Guarda una receta generada por IA |
| `GET` | `/allRecipes` | JWT | Obtiene todas las recetas del usuario |
| `GET` | `/recipeById/:id` | JWT | Obtiene una receta por su ID |
| `POST` | `/deleteRecipe/:id` | JWT | Elimina una receta por su ID |

> Todas las rutas protegidas requieren el token JWT enviado automáticamente en la cookie `token`.

---

## Modelos de datos

### Usuario

```js
{
  username: String,   // único, requerido
  email:    String,   // único, requerido
  password: String    // hasheado con bcrypt, requerido
}
```

### Receta

```js
{
  recipeName:   String,    // nombre de la receta
  ingredients:  [String],  // lista de ingredientes
  preparation:  [String],  // pasos de preparación
  time:         String,    // tiempo estimado
  difficulty:   String,    // nivel de dificultad
  active:       Boolean,   // estado activo (default: true)
  user:         String,    // username del propietario
  createdAt:    Date,      // generado automáticamente
  updatedAt:    Date       // generado automáticamente
}
```

---

## Variables de entorno

### Backend (`backend/.env`)

```env
MONGO_URL_PROD=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/<db>
JWT_SECRET=tu_clave_secreta_jwt
OPENAI_KEY=sk-...
FRONTEND_URL_DEV=http://localhost:5173
FRONTEND_URL_PROD=https://morfibot.netlify.app
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000   # en desarrollo
# o
VITE_API_URL=https://tu-backend.vercel.app   # en producción
```

---

## Instalación y ejecución local

### Requisitos previos
- Node.js 18+
- MongoDB Atlas (o instancia local)
- Clave de API de OpenAI

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/aplicacion-recetas-IA.git
cd aplicacion-recetas-IA
```

### 2. Configurar y ejecutar el Backend

```bash
cd backend
npm install
```

Crear el archivo `backend/.env` con las variables indicadas arriba, luego:

```bash
npm run dev
# Servidor corriendo en http://localhost:3000
```

### 3. Configurar y ejecutar el Frontend

```bash
cd frontend
npm install
```

Crear el archivo `frontend/.env` con `VITE_API_URL=http://localhost:3000`, luego:

```bash
npm run dev
# App corriendo en http://localhost:5173
```

---

## Testing

El backend incluye tests de integración para el módulo de autenticación de usuarios, usando **Jest**, **Supertest** y **mongodb-memory-server** (base de datos en memoria, sin necesidad de conexión real).

```bash
cd backend
npm test
```

Los tests cubren:
- Registro de usuario (campos válidos, duplicados)
- Login con email o username
- Manejo de errores de autenticación

---

## Despliegue

| Capa | Plataforma | URL |
|------|-----------|-----|
| Frontend | Netlify | [morfibot.netlify.app](https://morfibot.netlify.app) |
| Backend | Vercel | configurado en `backend/vercel.json` |
| Base de datos | MongoDB Atlas | cloud |

## Funcionamiento

- El usuario ingresa una lista de ingredientes.
- La aplicación envía la información al backend.
- El agente de IA procesa esos ingredientes y genera una receta completa.
- El resultado se muestra en pantalla y se puede guardar (si está implementado).

## Testing

### Para ejecutar los tests de autenticación y login:
- npm test
