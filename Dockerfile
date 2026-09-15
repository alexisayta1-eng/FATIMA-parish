FROM php:8.2-apache

# Install PDO MySQL extension
RUN docker-php-ext-install pdo pdo_mysql

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy project files to Apache web directory
COPY . /var/www/html/

# Ensure correct permissions
RUN chown -R www-data:www-data /var/www/html

# Expose HTTP port
EXPOSE 80

CMD ["apache2-foreground"]
