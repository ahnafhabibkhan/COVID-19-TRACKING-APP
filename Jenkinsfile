pipeline {
    agent any
    tools {
        nodejs
    }
    stages {
        stage('Build') {
            steps {
                dir('website/covid-19-website'){
                    sh 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                dir('website/covid-19-website'){
                    sh 'npm run test'
                }
            }
        }
        
    }
}
