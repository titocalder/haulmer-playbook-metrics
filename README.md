# Playbook de métricas Haulmer

Tablero interactivo de métricas por unidad de negocio (TUU, Apanio, AndCo, SuperApp).

## Ver en vivo (GitHub Pages)

Tras publicar el repo, la URL será:

`https://<tu-usuario>.github.io/haulmer-playbook-metrics/`

## Cómo guardar cambios

| Acción | Qué hace |
|--------|----------|
| **Guardar tablero** | Persiste en el navegador (localStorage) + agrega entrada al historial |
| **Exportar JSON** | Descarga un archivo para compartir o subir al repo |
| **Importar JSON** | Carga un archivo exportado por otra persona |
| **Historial** | Restaura versiones guardadas en este navegador |
| **Restaurar base** | Vuelve al tablero embebido original del HTML |

### Compartir con todo el equipo (GitHub Pages)

1. Editá el tablero en la web.
2. Apretá **Guardar tablero**.
3. Apretá **Exportar JSON**.
4. Reemplazá `data/state.json` en este repo con el archivo exportado.
5. Commit + push → todos verán esa versión al abrir la página (si no tienen cambios locales guardados).

> **Nota:** GitHub Pages es estático: no puede escribir al repo solo con HTML. El flujo oficial es exportar JSON → commit manual (o CI). Para guardado colaborativo en tiempo real haría falta un backend (Supabase, Firebase, etc.).

## Desarrollo local

```bash
python3 -m http.server 8080
# Abrir http://localhost:8080
```
