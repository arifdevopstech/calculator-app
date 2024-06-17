pipeline {
    agent any

    environment {
        SCANNER_HOME= tool 'sonar-scanner'
    }

    stages {
        stage('Git Checkout') {
            steps {
                git 'https://github.com/arifdevopstech/calculator-app.git'
            }
        }
        stage('Trivy Filesystem Scan') {
            steps {
                sh 'trivy fs --format table -o trivy-fs-calc-scan.html .'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar') {
                   sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=Calculator-App -Dsonar.projectKey=Calculator-App '''
                }
            }
        }
        stage('Docker Build and Tag') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred1', toolName: 'docker') {
                        sh 'docker build -t ari786/calculator:v2.0 .'
                    }
                }
            }
        }
        stage('Trivy Image Scan') {
            steps {
                sh 'trivy image ari786/calculator:v2.0 > trivy-calcimage-scan.txt'
            }
        }
        stage('Docker Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred1', toolName: 'docker') {
                        sh 'docker push ari786/calculator:v2.0'
                    }
                }
            }
        }
        stage('Application Deploy') {
            steps {
                script {
                    withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'k8s-cred', namespace: 'webapps', restrictKubeConfigAccess: false, serverUrl: 'https://192.168.1.200:6443') {
                        sh 'kubectl apply -f deployment-svc.yaml'
                        sh 'kubectl get svc -n webapps | grep -i calc-svc'
                    }    
                }
            }
        }
        stage('Output') {
            steps {
                echo 'The website has been successfully deployed'
            }
        }
    }
}
