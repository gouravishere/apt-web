// pipeline {
//     agent any
//     environment {
//         DEPLOY_SERVER = '192.168.10.8'  
//         SSHUSERNAME = 'antino'    
//         SCRIPTPATH = '' 
//     }
//     stages {
// 	stage('Build & Deployment') {
//             steps {
//                 script {
// 		    sshagent(credentials: ['frontend_deployments']) {  
//                     sh """
//                         ssh -o StrictHostKeyChecking=no ${SSHUSERNAME}@${DEPLOY_SERVER} '	    
// 	      		    ls -a'
//                     """
//                 }
                
//             }
//         }
//     }
// }
// }

pipeline {
    agent any

    stages {
    	stage('Build & Deploy') {
            steps {
                sh """sudo -u ubuntu bash -c 'cd /home/antino/apt-global-fincon-website && bash deploy.sh'
                """
            }
        } 
        
    }
}
//

