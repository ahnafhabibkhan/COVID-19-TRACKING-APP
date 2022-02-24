pipeline {
    agent any
    tools {
        nodejs 'node-16.13.0'
    }
    stages {
        stage('Build') {
            steps {
                dir('website/covid-19-website'){
                    bat 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                dir('website/covid-19-website'){
                    bat 'npm run test'
                }
            }
        }
        
    }
}
