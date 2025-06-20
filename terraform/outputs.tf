output "instance_public_ip" {
  description = "IP pública de la instancia EC2"
  value       = aws_instance.cors_mvp.public_ip
}

output "ssh_connection" {
  description = "Comando para conectarse por SSH a la instancia"
  value       = "ssh -i cors-mvp-key.pem ubuntu@${aws_instance.cors_mvp.public_ip}"
}

output "application_url" {
  description = "URL de la aplicación"
  value       = "http://${aws_instance.cors_mvp.public_ip}"
}