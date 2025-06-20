# Configuración del proveedor AWS
provider "aws" {
  region = "us-east-1"
}

# Obtener las zonas de disponibilidad
data "aws_availability_zones" "available" {
  state = "available"
}

# Generar una clave SSH
resource "tls_private_key" "this" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Crear par de claves en AWS
resource "aws_key_pair" "generated_key" {
  key_name   = "cors-mvp-key"
  public_key = tls_private_key.this.public_key_openssh

  # Guardar la clave privada localmente
  provisioner "local-exec" {
    command = <<-EOT
      echo '${tls_private_key.this.private_key_pem}' > ./cors-mvp-key.pem
      chmod 400 ./cors-mvp-key.pem
    EOT
  }
}

# Grupo de seguridad para la instancia EC2
resource "aws_security_group" "cors_mvp_sg" {
  name        = "cors-mvp-sg"
  description = "Allow HTTP, HTTPS and SSH traffic"

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Puerto de la aplicación
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Todo el tráfico de salida permitido
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Configuración de red
resource "aws_default_vpc" "default" {
  tags = {
    Name = "Default VPC"
  }
}

# Crear una subred pública
resource "aws_default_subnet" "default_az1" {
  availability_zone = data.aws_availability_zones.available.names[0]
  
  tags = {
    Name = "Default subnet for ${data.aws_availability_zones.available.names[0]}"
  }
}

# Instancia EC2
resource "aws_instance" "cors_mvp" {
  ami           = "ami-0c7217cdde317cfec"  # Amazon Linux 2
  instance_type = "t2.micro"
  key_name      = aws_key_pair.generated_key.key_name
  
  vpc_security_group_ids = [aws_security_group.cors_mvp_sg.id]
  subnet_id              = aws_default_subnet.default_az1.id
  associate_public_ip_address = true
  
  # Script de inicialización
  user_data = <<-EOF
              #!/bin/bash
              # Actualizar el sistema
              yum update -y
              
              # Instalar Node.js
              curl -sL https://rpm.nodesource.com/setup_16.x | bash -
              yum install -y nodejs
              
              # Crear directorio de la aplicación
              mkdir -p /home/ec2-user/cors-mvp
              cd /home/ec2-user/cors-mvp
              
              # Crear package.json
              cat > package.json << 'PACKAGE_JSON'
              {
                "name": "cors-mvp",
                "version": "1.0.0",
                "description": "Demo de CORS",
                "main": "server.js",
                "scripts": {
                  "start": "node server.js"
                },
                "dependencies": {
                  "cors": "^2.8.5",
                  "express": "^4.18.2"
                }
              }
              PACKAGE_JSON
              
              # Crear server.js
              cat > server.js << 'SERVER_JS'
              const express = require('express');
              const path = require('path');
              const cors = require('cors');
              const app = express();
              const port = 3000;
              
              // Configurar CORS
              app.use(cors({
                  origin: '*',
                  methods: ['GET', 'OPTIONS'],
                  allowedHeaders: ['Content-Type', 'Accept']
              }));
              
              // Middleware para parsear JSON
              app.use(express.json());
              
              // Servir archivos estáticos
              app.use(express.static('.'));
              
              // Ruta de ejemplo para probar CORS
              app.get('/api/saludo', (req, res) => {
                  res.json({
                      mensaje: '¡Hola CORS! La petición se realizó correctamente con CORS habilitado.'
                  });
              });
              
              // Ruta principal
              app.get('/', (req, res) => {
                  res.sendFile(path.join(__dirname, 'index.html'));
              });
              
              // Iniciar el servidor
              app.listen(port, '0.0.0.0', () => {
                  console.log('Servidor corriendo en http://0.0.0.0:' + port);
              });
              SERVER_JS
              
              # Crear index.html
              cat > index.html << 'HTML'
              <!DOCTYPE html>
              <html lang="es">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>MVP CORS</title>
                  <style>
                      body {
                          font-family: Arial, sans-serif;
                          max-width: 800px;
                          margin: 0 auto;
                          padding: 20px;
                      }
                      .container {
                          text-align: center;
                          margin-top: 50px;
                      }
                      button {
                          padding: 10px 20px;
                          font-size: 16px;
                          cursor: pointer;
                      }
                      #resultado {
                          margin-top: 20px;
                          padding: 10px;
                          border: 1px solid #ccc;
                          border-radius: 5px;
                          min-height: 50px;
                      }
                  </style>
              </head>
              <body>
                  <div class="container">
                      <h1>MVP CORS Demo</h1>
                      <button id="saludar">Saludar al Servidor</button>
                      <div id="resultado"></div>
                  </div>
                  <script>
                      document.getElementById('saludar').addEventListener('click', async () => {
                          const resultado = document.getElementById('resultado');
                          try {
                              const response = await fetch('/api/saludo');
                              const data = await response.json();
                              resultado.textContent = data.mensaje;
                          } catch (error) {
                              resultado.textContent = 'Error: ' + error.message;
                          }
                      });
                  </script>
              </body>
              </html>
              HTML
              
              # Instalar dependencias e iniciar la aplicación
              npm install
              nohup node server.js > app.log 2>&1 &
              EOF

  tags = {
    Name = "cors-mvp-instance"
  }
}

# Las salidas se han movido a outputs.tf
