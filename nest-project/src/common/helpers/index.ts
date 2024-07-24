export function getDiscreption(method:string, operation: string, id:any){
    if(operation.endsWith('upload') && method === 'POST'){
        return 'Your profile image is updated'
    }
    if(operation === '/users' && method === 'GET'){
        return 'You get information of all users'
    }
    if(operation === '/auth/signup' && method === 'POST'){
        return 'You did signup'
    }
    if(operation === '/auth/login' && method === 'POST'){
        return 'You logged in'
    }
    if(operation.startsWith('/users/search') && method === 'GET'){
        return 'You searched information about users'
    }
    if(operation.startsWith('/users') && method === 'GET' && id){
        return 'You get information about any user'
    }
    if(operation.startsWith('/users') && method === 'PUT' && id){
        return 'Your informations updated'
    }
    if(operation.startsWith('/users') && method === 'DELETE' && id){
        return 'Deleted any user'
    }
    if(operation.startsWith('/activity-log') && method === 'GET' && id){
        return 'You get information about your activity'
    }

}
export function getTime(){
    const now = new Date();
    
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');  
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}