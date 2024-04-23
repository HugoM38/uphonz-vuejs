pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'uphonz-frontend'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }

    stages {

        stage('Build Docker Image') {
            when {
                branch 'main' 
            }
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }
    }
}