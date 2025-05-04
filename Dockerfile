# ---------- Build Stage ----------
    FROM node:18-alpine AS builder

    # Set working directory
    WORKDIR /app
    
    # Install dependencies
    COPY package*.json ./
    RUN npm install
    
    # Copy source files and build
    COPY . .
    RUN npm run build
    
    # ---------- Production Stage ----------
    FROM nginx:alpine
    
    # Copy built assets to Nginx web root
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Use custom Nginx config to support client-side routing
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Expose port 80 and run Nginx
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]