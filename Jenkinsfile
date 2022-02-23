pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh '''
                cd website/covid-19-website
                npm install
                '''
            }
        }
        stage('Test') {
            steps {
                sh '''cd website/covid-19-website
                npm run test
                '''
            }
        }
        
    }
}
