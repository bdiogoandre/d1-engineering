FROM nginx:1.17-alpine
COPY --from=builder /cadastro-usuarios/dist/cadastro-usuarios/ /usr/share/nginx/html
