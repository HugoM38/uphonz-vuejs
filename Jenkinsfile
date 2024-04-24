pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'uphonz-frontend'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Build and Push Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                    docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").tag("latest")
                }
            }
        }
        stage('Trigger Production Pipeline') {
            steps {
                script {
                    build job: 'uphonz-prod/main'
                }
            }
        }
    }
}
