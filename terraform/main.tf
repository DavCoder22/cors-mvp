# Configuración del proveedor AWS
provider "aws" {
  region = "us-east-1"
}

# Obtener la AMI más reciente de Ubuntu 20.04
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Generar una clave SSH
resource "tls_private_key" "this" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Guardar la clave privada localmente
resource "local_file" "private_key" {
  content  = tls_private_key.this.private_key_pem
  filename = "${path.module}/cors-mvp-key.pem"
  file_permission = "0400"
}

# Crear par de claves en AWS
resource "aws_key_pair" "generated_key" {
  key_name   = "cors-mvp-key"
  public_key = tls_private_key.this.public_key_openssh
}

# Grupo de seguridad
resource "aws_security_group" "cors_mvp_sg" {
  name        = "cors-mvp-sg"
  description = "Allow HTTP, HTTPS, SSH and Node.js app"

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

  # Aplicación Node.js
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

  tags = {
    Name = "cors-mvp-sg"
  }
}

# Instancia EC2
resource "aws_instance" "cors_mvp" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t2.micro"
  key_name               = aws_key_pair.generated_key.key_name
  vpc_security_group_ids = [aws_security_group.cors_mvp_sg.id]
  
  # Script de inicialización
  user_data = <<-EOF
              #!/bin/bash
              # Actualizar el sistema
              sudo apt update -y
              sudo apt upgrade -y

              # Instalar Node.js y npm
              curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
              sudo apt install -y nodejs

              # Instalar Nginx
              sudo apt install -y nginx

              # Configurar Nginx
              sudo tee /etc/nginx/sites-available/cors-mvp << 'NGINX'
              server {
                  listen 80;
                  server_name _;

                  location / {
                      proxy_pass http://localhost:3000;
                      proxy_http_version 1.1;
                      proxy_set_header Upgrade \$http_upgrade;
                      proxy_set_header Connection 'upgrade';
                      proxy_set_header Host \$host;
                      proxy_cache_bypass \$http_upgrade;
                  }
              }
              NGINX

              # Habilitar el sitio
              sudo ln -sf /etc/nginx/sites-available/cors-mvp /etc/nginx/sites-enabled/
              sudo nginx -t
              sudo systemctl restart nginx

              # Clonar el repositorio
              cd /home/ubuntu
              git clone https://github.com/DavCoder22/cors-mvp.git
              cd cors-mvp

              # Instalar dependencias
              npm install

              # Instalar PM2
              sudo npm install -g pm2

              # Iniciar la aplicación con PM2
              pm2 start server.js --name "cors-mvp"
              pm2 startup
              pm2 save
              EOF

  tags = {
    Name = "cors-mvp-instance"
  }
}

# Mostrar la IP pública
output "public_ip" {
  value = aws_instance.cors_mvp.public_ip
}
