document.addEventListener('alpine:init', () => {
    Alpine.data('alpineHomepage', () => {
        return {

            //CROSS SECTIONAL CHECKS
            loginSection:'true',
            homepage:'false',

            sidebarOpen:false,

            
        }
    });
});